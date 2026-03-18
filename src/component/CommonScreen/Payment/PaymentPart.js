import React, {Component, Fragment} from 'react';
import {Button, Col, Modal, Row} from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import OrderSummary from "../CheckoutDetails/OrderSummary";
import Api from "../../../ClientApi/Api";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import InjectedCheckoutForm from "./Stripe/CheckoutForm";
import {connect} from "react-redux";
import Router from "next/router";
import {resetAllAfterOrder} from "../../../services/actions/checkoutAction";
import {onOrderData} from "../../../services/actions/checkoutAction";
import {alert, onCurrencyConvert} from "../../../services/common";
import Photo from "../Image/Photo";
import Link from "next/link";


class PaymentPart extends Component {
    constructor() {
        super();

        this.state = {
            termsCondition: false,
            paymentMethod: "",
            walletAmount: 0,
            modal: false,
            stripeModal: false,
            paymentAmount: 0,
            loading: false
        }
        this.onPaymentType = this.onPaymentType.bind(this)
        this.onTermsConditionCheck = this.onTermsConditionCheck.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onApprove = this.onApprove.bind(this)
        this.onPaypalConfirm = this.onPaypalConfirm.bind(this)
        this.onSslCommerce = this.onSslCommerce.bind(this)
        this.onStripeHide = this.onStripeHide.bind(this)
        this.onOrderInfoStore = this.onOrderInfoStore.bind(this)
    }

    async componentDidMount() {
        window.scroll(0, 0)
        if (this.props.walletActivation !== 0) {
            await Api().get('getWalletAmount').then(res => {
                this.setState({
                    walletAmount: res.data
                })
            })
        }


    }


    stripePromise() {
        return loadStripe(this.props.activePaymentGateway.stripeClientId);
    }


    createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: `${onCurrencyConvert(this.state.paymentAmount)}`,
                    },
                },
            ],
        })
            .then((orderId) => {
                return orderId;
            });
    }

    onApprove(data, actions) {
        return actions.order.capture().then(details => {
            let tnxId = details.purchase_units[0].payments.captures[0].id
            this.onPaypalConfirm(tnxId)
        });
    };


    async onPaypalConfirm(tnx_id) {
        this.setState({
            modal: false
        })
        let orderData = this.props.orderData
        let data = {
            discount: orderData.discount,
            num_of_product: orderData.num_of_product,
            paymentMethod: orderData.paymentMethod,
            product: orderData.product,
            shippingZone: orderData.shippingZone,
            shipping_fee: orderData.shipping_fee,
            status: orderData.status,
            sub_total: orderData.sub_total,
            tax: orderData.tax,
            totalPrice: orderData.totalPrice,
            voucher: orderData.voucher,
            tnx_id: tnx_id,
        };
        await Api().post('order', data).then(res => {
            if (res.data !== 0) {
                this.setState({
                    modal: false,
                    successRedirectPage: true,
                    orderId: res.data
                })

                Router.push(`/confirm/${res.data}`)

            } else {
                this.setState({
                    loading: false,
                    failedRedirectPage: true
                })
                this.props.resetAllAfterOrder();
            }
        })
    }


    onPaymentType(e) {
        this.setState({
            paymentMethod: e.target.value
        })
    }

    onHide() {
        this.setState({
            modal: false
        })
    }

    onStripeHide() {
        this.setState({
            stripeModal: false
        })
    }

    onTermsConditionCheck() {
        let termsCondition = this.state.termsCondition;
        this.setState({
            termsCondition: termsCondition !== true ? true : false
        })
    }


    onSslCommerce(orderData) {
        let data = {
            discount: orderData.discount,
            num_of_product: orderData.num_of_product,
            paymentMethod: orderData.paymentMethod,
            product: orderData.product,
            shippingZone: orderData.shippingZone,
            shipping_fee: orderData.shipping_fee,
            status: orderData.status,
            sub_total: orderData.sub_total,
            tax: orderData.tax,
            totalPrice: orderData.totalPrice,
            voucher: orderData.voucher,
            currency: 'BDT',
            callbackUrl: this.props.baseApi
        };
        Api().post('order', data).then(res => {
            if (res.data.status === "success") {
                window.location.href = res.data.data
            }
        })
    }

    onOrderInfoStore() {
        let paymentMethod = this.state.paymentMethod;
        let num_of_product = this.props.checkoutProduct.length;
        let sub_total = 0;
        let discount = 0;
        let tax = [];
        let total = 0;
        let totalPrice = 0;
        let shipping_fee = 0;
        let productInfo = [];
        let product = this.props.checkoutProduct;
        let shippingDays = 0;
        let shippingDaysMax = Math.max.apply(Math, product.map(function (pd) {
            return pd.shipping_days;
        }));
        let shippingDaysMin = Math.min.apply(Math, product.map(function (pd) {
            return pd.shipping_days;
        }));
        let shippingZone = "";
        let inVoiceProductInfo = [];
        if (product.length > 0) {
            product.map(pd => {
                let info = {
                    id: pd.id,
                    index: Math.round(Math.random() * (new Date()).getTime() * 10000),
                    name: pd.productName,
                    thumbnail: this.props.imageSrc !== "" ? this.props.imageSrc : pd.product_image,
                    quantity: pd.quantity,
                    product_price: pd.product_price,
                    discount_price: pd.discount_price,
                    total_price: pd.final_price * pd.quantity,
                    discount: pd.discount,
                    discountType: pd.discount_type,
                    tax: pd.tax,
                    variation: pd.selectedVariation,
                    variationAttribute: pd.variation,
                    shopName: pd.shop_name,
                    returnStatus: pd.refund,
                    replaceStatus: pd.replace,
                    shippingDaysMax: shippingDaysMax,
                    shippingDaysMin: shippingDaysMin,
                    status: 'active',
                    cat_type: pd.cat_type,
                    digital_product_id: pd.file
                }
                productInfo.push(info);
                let temp_product_price = pd.final_price * pd.quantity
                sub_total = sub_total + temp_product_price
                if (pd.tax != null) {
                    pd.tax.map(v => {
                        tax.push(v);
                    })
                }
                total = total + (pd.final_price * pd.quantity)
                if (Array.isArray(this.props.pickupPointData) === false) {
                    shipping_fee = 0;
                    shippingZone = this.props.pickupPointData.address
                } else {
                    if (this.props.shippingMethod !== "") {
                        if (this.props.shippingMethod !== "product_wise") {
                            shipping_fee = this.props.shippingFee
                        } else {
                            shipping_fee = shipping_fee + pd.shipping_fees
                        }
                    }
                }
                if (pd.product_discount_price !== undefined) {
                    discount = discount + pd.discount
                }
                if (pd.shipping_days > shippingDays) {
                    shippingDays = pd.shipping_days;
                }
                let invoiceInfo = {
                    thumbnail: pd.product_image,
                    name: pd.productName,
                    product_price: pd.product_price,
                    discount_price: pd.product_discount_price,
                    total_price: pd.final_price * pd.quantity,
                    quantity: pd.quantity,
                    discount: pd.discount,
                    discountType: pd.discount_type,
                    tax: pd.tax,
                    variation: pd.selectedVariation,
                    variationAttribute: pd.variation,
                    shopName: pd.shop_name,
                }
                inVoiceProductInfo.push(invoiceInfo);
            })
        }
        sub_total = sub_total - this.props.totalCouponDiscountPrice;
        totalPrice = total + shipping_fee - this.props.totalCouponDiscountPrice;
        let voucher = [];
        if (this.props.matchVoucher) {
            voucher.push({
                'voucher': this.props.voucher,
                'voucher_discount': this.props.totalCouponDiscount,
                'voucher_discount_type': this.props.voucherDiscountType,
                'total_discount_amount': this.props.totalCouponDiscountPrice
            });
        } else {
            voucher = null;
        }
        const data = {
            paymentMethod: paymentMethod,
            num_of_product: num_of_product,
            sub_total: sub_total,
            discount: discount,
            tax: tax.length > 0 ? tax : null,
            voucher: voucher,
            totalPrice: totalPrice,
            shipping_fee: shipping_fee,
            shippingZone: shippingZone,
            product: productInfo,
            status: [{
                'time': new Date(),
                'status': 'order_placed',
            }],
            callbackApi: this.props.baseApi,
            from: window.location.pathname
        }
        this.setState({
            orderData: data,
            paymentAmount: totalPrice
        })
        this.props.onOrderData(data);
    }

    onConfirm() {

        this.onOrderInfoStore();

        let paymentMethod = this.state.paymentMethod;
        let num_of_product = this.props.checkoutProduct.length;
        let sub_total = 0;
        let discount = 0;
        let tax = [];
        let total = 0;
        let totalPrice = 0;
        let shipping_fee = 0;
        let productInfo = [];
        let product = this.props.checkoutProduct;
        let shippingDays = 0;
        let shippingDaysMax = Math.max.apply(Math, product.map(function (pd) {
            return pd.shipping_days;
        }));
        let shippingDaysMin = Math.min.apply(Math, product.map(function (pd) {
            return pd.shipping_days;
        }));
        let shippingZone = "";
        let inVoiceProductInfo = [];

        if (product.length > 0) {
            product.map(pd => {
                let info = {
                    id: pd.id,
                    index: Math.round(Math.random() * (new Date()).getTime() * 10000),
                    name: pd.productName,
                    thumbnail: this.props.imageSrc !== "" ? this.props.imageSrc : pd.product_image,
                    quantity: pd.quantity,
                    product_price: pd.product_price,
                    discount_price: pd.discount_price,
                    total_price: pd.final_price * pd.quantity,
                    discount: pd.discount,
                    discountType: pd.discount_type,
                    tax: pd.tax,
                    variation: pd.selectedVariation,
                    variationAttribute: pd.variation,
                    shopName: pd.shop_name,
                    returnStatus: pd.refund,
                    replaceStatus: pd.replace,
                    shippingDaysMax: shippingDaysMax,
                    shippingDaysMin: shippingDaysMin,
                    status: 'active',
                    cat_type: pd.cat_type,
                    digital_product_id: pd.file
                }
                productInfo.push(info);
                let temp_product_price = pd.final_price * pd.quantity
                sub_total = sub_total + temp_product_price
                if (pd.tax != null) {
                    pd.tax.map(v => {
                        tax.push(v);
                    })
                }
                total = total + (pd.final_price * pd.quantity)
                if (Array.isArray(this.props.pickupPointData) === false) {
                    shipping_fee = 0;
                    shippingZone = this.props.pickupPointData.address
                } else {
                    if (this.props.shippingMethod !== "") {
                        if (this.props.shippingMethod !== "product_wise") {
                            shipping_fee = this.props.shippingFee
                        } else {
                            shipping_fee = shipping_fee + pd.shipping_fees

                        }
                    }
                }

                if (pd.product_discount_price !== undefined) {
                    discount = discount + pd.discount
                }
                if (pd.shipping_days > shippingDays) {
                    shippingDays = pd.shipping_days;
                }
                let invoiceInfo = {
                    thumbnail: pd.product_image,
                    name: pd.productName,
                    product_price: pd.product_price,
                    discount_price: pd.product_discount_price,
                    total_price: pd.final_price * pd.quantity,
                    quantity: pd.quantity,
                    discount: pd.discount,
                    discountType: pd.discount_type,
                    tax: pd.tax,
                    variation: pd.selectedVariation,
                    variationAttribute: pd.variation,
                    shopName: pd.shop_name,
                }
                inVoiceProductInfo.push(invoiceInfo);
            })
        }
        sub_total = sub_total - this.props.totalCouponDiscountPrice;
        totalPrice = total + shipping_fee - this.props.totalCouponDiscountPrice;
        let voucher = [];
        if (this.props.matchVoucher) {
            voucher.push({
                'voucher': this.props.voucher,
                'voucher_discount': this.props.totalCouponDiscount,
                'voucher_discount_type': this.props.voucherDiscountType,
                'total_discount_amount': this.props.totalCouponDiscountPrice
            });
        } else {
            voucher = null;
        }

        const data = {
            paymentMethod: paymentMethod,
            num_of_product: num_of_product,
            sub_total: sub_total,
            discount: discount,
            tax: tax.length > 0 ? tax : null,
            voucher: voucher,
            totalPrice: totalPrice,
            shipping_fee: shipping_fee,
            shippingZone: shippingZone,
            product: productInfo,
            status: [{
                'time': new Date(),
                'status': 'order_placed',
            }],
            callbackApi: this.props.baseApi,
            from: window.location.pathname
        }
        this.setState({
            paymentAmount: totalPrice
        })
        if (paymentMethod === "paypal") {

            if (onCurrencyConvert(totalPrice) < 1) {
                alert('warning', 'Payment is too low for paypal transaction.');
            } else {
                this.setState({
                    modal: true
                })
            }

        }
        if (paymentMethod === "stripe") {

            if (onCurrencyConvert(totalPrice) < 1) {
                alert('warning', 'Payment is too low for stripe transaction.');
            } else {
                this.setState({
                    stripeModal: true
                })
            }

        }
        if (paymentMethod == "sslcommerce") {
            this.setState({
                loading: true
            })
            this.onSslCommerce(data);
        }
        if (paymentMethod === "COD") {
            this.setState({
                loading: true
            })

            Api().post('confirmOrder', data).then(res => {
                if (res.data !== 0) {
                    Router.push(`/confirm/${res.data}`)

                } else {
                    Router.push(`/failed/`)

                }
            });


        }
        if (paymentMethod === "WALLET") {
            if (data.totalPrice > this.state.walletAmount) {
                alert('info', 'Insufficient amount!');
            } else {
                this.setState({
                    loading: true
                })
                Api().post('confirmOrder', data).then(res => {
                    if (res.data !== 0) {
                        Router.push(`/confirm/${res.data}`)
                    } else {
                        Router.push(`/failed/`)
                    }
                });
            }
        }
    }

    render() {

        let cash_on_delivery = 1;
        let product = this.props.checkoutProduct;
        product.map(pd => {
            if (parseInt(pd.cash_on_delivery) === 0) {
                cash_on_delivery = 0;
            }
        })

        let activePaymentGateway = this.props.activePaymentGateway;
        return (
            <Fragment>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <span className="profile title mb-4 paymentHeaderText">Select Payment Method</span>
                        <Row>
                            <Col lg={8} md={8} sm={12} xs={12}>
                                <Row className="pGatewayRow ">
                                    <Fragment>
                                        {(activePaymentGateway.paypalStatus === 1) &&
                                            <Col lg={4} md={4} sm={6} xs={12} className="text-center">
                                                <label className="pGatewayLabel mobilePGatewayLabel">
                                                    <input className="pGatewayRadio" type="radio" name="gateway"
                                                           value="paypal" onClick={(e) => this.onPaymentType(e)}/>
                                                    <span className="gatewayDiv">
                                                        <Photo
                                                            src="/paypal.png"
                                                            blurDataURL="/paypal.png"
                                                            class="pGatewayImg"
                                                        />
                                                                <span className="pGatewayName">PayPal</span>
                                                            </span>
                                                </label>
                                            </Col>
                                        }
                                        {activePaymentGateway.stripeStatus === 1 &&
                                            <Col lg={4} md={4} sm={6} xs={12} className="text-center">
                                                <label className="pGatewayLabel mobilePGatewayLabel">
                                                    <input className="pGatewayRadio" type="radio" name="gateway"
                                                           value="stripe" onClick={(e) => this.onPaymentType(e)}/>
                                                    <span className="gatewayDiv">
                                                         <Photo
                                                             src="/stripe.png"
                                                             blurDataURL="/stripe.png"
                                                             class="pGatewayImg"
                                                         />
                                                                <span className="pGatewayName">Stripe</span>
                                                            </span>
                                                </label>
                                            </Col>
                                        }

                                        {this.props.currencyCode === "BDT" &&
                                            <Fragment>
                                                {activePaymentGateway.sslcommerzStatus === 1 &&
                                                    <Col lg={4} md={4} sm={6} xs={12} className="text-center">
                                                        <label className="pGatewayLabel mobilePGatewayLabel">
                                                            <input className="pGatewayRadio" type="radio" name="gateway"
                                                                   value="sslcommerce"
                                                                   onClick={(e) => this.onPaymentType(e)}/>
                                                            <span className="gatewayDiv">
                                                                 <Photo
                                                                     src="/sslcommerce.png"
                                                                     blurDataURL="/sslcommerce.png"
                                                                     class="pGatewayImg"
                                                                 />
                                                                <span className="pGatewayName">Sslcommerz</span>
                                                            </span>
                                                        </label>
                                                    </Col>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                    {this.props.walletActivation !== 0 &&
                                        <Col lg={4} md={4} sm={6} xs={12} className="text-center">
                                            <label className="pGatewayLabel mobilePGatewayLabel">
                                                <input onClick={(e) => this.onPaymentType(e)} className="pGatewayRadio"
                                                       type="radio" name="gateway" value="WALLET"/>
                                                <span className="gatewayDiv">
                                                      <Photo
                                                          src="/wallet.png"
                                                          blurDataURL="/wallet.png"
                                                          class="pGatewayImg"
                                                      />
                                                    <span className="pGatewayName">Wallet</span>
                                                 </span>
                                            </label>
                                        </Col>
                                    }
                                    <Fragment>
                                        {cash_on_delivery === 1 &&
                                            <Col lg={4} md={4} sm={6} xs={12} className="text-center">
                                                <label className="pGatewayLabel mobilePGatewayLabel">
                                                    <input onClick={(e) => this.onPaymentType(e)}
                                                           className="pGatewayRadio" type="radio" name="gateway"
                                                           value="COD"/>
                                                    <span className="gatewayDiv">
                                                          <Photo
                                                              src="/cod.png"
                                                              blurDataURL="/cod.png"
                                                              class="pGatewayImg"
                                                          />
                                                        <span className="pGatewayName">Cash on delivery</span>
                                                    </span>
                                                </label>
                                            </Col>
                                        }
                                    </Fragment>
                                </Row>
                                <div className="checkoutAgreeDiv mt-3">
                                    <Checkbox className="mr-2"
                                              inputProps={{'aria-label': 'primary checkbox'}}
                                              onClick={this.onTermsConditionCheck}
                                              checked={this.state.termsCondition}
                                    />
                                    <span>I agree to the <Link className="checkoutAgreeLink" href="/terms-conditions">terms and conditions</Link>, <Link
                                        className="checkoutAgreeLink" href="/refund-policy">Refund</Link> & <Link
                                        className="checkoutAgreeLink"
                                        href="/replace-policy">Replace Policy</Link> </span>
                                </div>
                            </Col>
                            <Col lg={4} md={4} sm={12} xs={12}>
                                <div className="checkoutPaymentSummery">
                                    {this.props.payment &&
                                        <OrderSummary/>
                                    }
                                    <div className="confirm-btn">
                                        {this.state.termsCondition && this.state.paymentMethod !== "" ?
                                            <Fragment>
                                                {this.state.loading ?
                                                    <Button disabled={true} className="btn"><span
                                                        className="spinner-border spinner-border-sm" role="status"
                                                        aria-hidden="true"/>
                                                        Loading...
                                                    </Button>
                                                    :
                                                    <Button className="btn" onClick={() => this.onConfirm()}>Confirm
                                                        Order</Button>
                                                }
                                            </Fragment>
                                            :
                                            <Button disabled={true} className="btn">Confirm Order</Button>
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {this.props.mobilePayment &&
                    <Fragment>
                        {this.state.termsCondition && this.state.paymentMethod !== "" ?
                            <OrderSummary confirm={this.onConfirm} mobilePayment={true}/> :
                            <OrderSummary mobilePayment={true}/>
                        }
                    </Fragment>
                }
                <Modal centered show={this.state.modal} onHide={this.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Online payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-3 paypal-btn">
                        <PayPalScriptProvider options={{"client-id": activePaymentGateway.paypalClientId}}>
                            <PayPalButtons
                                createOrder={(data, actions) => this.createOrder(data, actions)}
                                onApprove={(data, actions) => this.onApprove(data, actions)}
                                style={{layout: "horizontal"}}/>
                        </PayPalScriptProvider>

                    </Modal.Body>
                </Modal>


                <Modal centered show={this.state.stripeModal} onHide={this.onStripeHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Online payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-3 paypal-btn">
                        <Elements stripe={loadStripe(activePaymentGateway.stripeClientId)}>
                            <InjectedCheckoutForm/>
                        </Elements>
                    </Modal.Body>
                </Modal>


            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    resetAllAfterOrder,
    onOrderData
};

function mapStateToProps(state) {
    const walletActivation = state.userReducer.walletActivation;
    const activePaymentGateway = state.userReducer.activePaymentGateway;
    const imageSrc = state.productReducer.imageSrc;
    const checkoutProduct = state.productReducer.checkoutProduct;
    const pickupPointData = state.shippingBillingPickupReducer.pickupPointData;
    const shippingMethod = state.shippingBillingPickupReducer.shippingMethod;
    const shippingFee = state.shippingBillingPickupReducer.shippingFee;
    const baseApi = state.starterReducer.baseApi;
    const currencyCode = state.starterReducer.currencyCode;
    const totalCouponDiscountPrice = state.voucherReducer.totalCouponDiscountPrice;
    const matchVoucher = state.voucherReducer.matchVoucher;
    const voucher = state.voucherReducer.voucher;
    const totalCouponDiscount = state.voucherReducer.totalCouponDiscount;
    const voucherDiscountType = state.voucherReducer.voucherDiscountType;
    const orderData = state.checkoutReducer.orderData;

    return {
        walletActivation,
        activePaymentGateway,
        orderData,
        imageSrc,
        pickupPointData,
        shippingMethod,
        shippingFee,
        baseApi,
        currencyCode,
        totalCouponDiscountPrice,
        matchVoucher,
        voucher,
        totalCouponDiscount,
        voucherDiscountType,
        checkoutProduct
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPart);






