import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {resetAllAfterOrder} from "../../../services/actions/checkoutAction";
import {sendEmail} from "../../../services/actions/commonAction";
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../services/common";
import Photo from "../Image/Photo";
import Link from "next/link";
import Api from "../../../ClientApi/Api";
import Router from "next/router";

class ConfirmPart extends PureComponent {


    constructor() {
        super();
        this.state = {
            data:[],
            loading:true
        }
    }

    componentDidMount() {
        this.props.resetAllAfterOrder();
        let url = window.location.pathname.split("/")[2];
        const data  = {
            tnxId:url
        }
        this.setState({
            loading:true
        })
        Api().post('getOrderDetailsByTnxId',data).then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
            this.props.sendEmail();
        }).catch(error=>{
            this.setState({
                loading:false
            })
        });

    }

    render() {
        const data = this.state.data;
        const loading = this.state.loading;
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat

        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>

        if(loading){
            return (
                <Fragment>
                    <Container className="Confirm-Container">
                            <div className="loader-spinner-div">
                                {loader}
                            </div>
                    </Container>
                </Fragment>
            );
        }else if(data.length>0){
            return (
                <Fragment>
                    <Container className="Confirm-Container">
                            <Fragment>
                                {data.map(pd=>{
                                    return    <Row>
                                        <Col lg={12} md={12} sm={12} xs={12} className="orderInvoice white-bg">
                                            <p className="thankNote"><i className="fas fa-heart"/> Thank You for your purchase!</p>
                                            <p className="orderNumber">Your order number is: #{pd.orderId}</p>
                                            <p className="orderAmountReady">Please have this amount ready on delivery day.</p>
                                            <p className="orderAmount">
                                                {currencySymbolFormat===1 ?
                                                    <span>{onCurrencyFormat(pd.total)}{defaultCurrency}</span>
                                                    :
                                                    <span>{defaultCurrency}{onCurrencyFormat(pd.total)}</span>
                                                }
                                            </p>
                                            <div className="d-flex justify-content-between ">
                                                <p className="deliveryDates">Your Delivery Dates</p>
                                                {pd.shipping_days_same==true ?
                                                    <p className="estDate">Est: {pd.max_shipping_days}</p>
                                                    :
                                                    <p className="estDate">Est: {pd.min_shipping_days} - {pd.max_shipping_days}</p>
                                                }
                                            </div>
                                            <div className="deliveryDateDiv">
                                                <Fragment>
                                                    {
                                                        pd.orderProductInfo.map(pInfo => {
                                                            return   <div className="dateInfo d-flex justify-content-between">
                                                                <div className="d-flex">
                                                                    <div className="confirm-thum-div">

                                                                        <Photo
                                                                            src={this.props.backendApi +  pInfo.product_thumbnail}
                                                                            blurDataURL="/blank.jpg"
                                                                            class="dateInfoImg"
                                                                        />

                                                                    </div>
                                                                    <div>
                                                                        <p className="deliveryPn">{pInfo.product_name} </p>
                                                                        <div className="confirm-p-name-div">
                                                                            <p className="deliveryDates text-muted">
                                                                                {pInfo.product_variation != null &&
                                                                                    <Fragment>{
                                                                                        pInfo.product_variation.map((attr, i) => {
                                                                                            return <Fragment
                                                                                                className="text-left mb-1"><span
                                                                                                className="variation">{(Object.keys(attr))[0]}: </span>
                                                                                                <span className="variation">{(Object.values(attr))[0]}</span>
                                                                                            </Fragment>
                                                                                        })
                                                                                    }
                                                                                    </Fragment>
                                                                                }
                                                                            </p>
                                                                            <p className="deliveryDates text-muted"><span>Qnt:</span> <span>{pInfo.product_qnt}</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="confirmPd">
                                                                    {currencySymbolFormat===1 ?
                                                                        <p className="orderAmount">{onCurrencyFormat(pInfo.total_price)}{defaultCurrency}</p>
                                                                        :
                                                                        <p className="orderAmount"> {defaultCurrency}{onCurrencyFormat(pInfo.product_price*pInfo.product_qnt)}</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        })}
                                                </Fragment>
                                                <div>
                                                    <hr className="orderInvoiceHR"/>
                                                    <Row>
                                                        <Col className="ml-auto" lg={6} md={6} sm={12} xs={12}>
                                                            <div className="cart-summery">
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="cart-summery-subtitle">Subtotal</p>
                                                                    {currencySymbolFormat===1 ?
                                                                        <p className="cart-summery-subtitle-price">{onCurrencyFormat(pd.sub_total)}{defaultCurrency}</p>
                                                                        :
                                                                        <p className="cart-summery-subtitle-price">{defaultCurrency}{onCurrencyFormat(pd.sub_total)}</p>
                                                                    }
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="cart-summery-subtitle">Shipping Fee</p>
                                                                    {currencySymbolFormat===1 ?
                                                                        <p className="cart-summery-subtitle-price">{onCurrencyFormat(pd.shipping_fee)}{defaultCurrency}</p>
                                                                        :
                                                                        <p className="cart-summery-subtitle-price">{defaultCurrency}{onCurrencyFormat(pd.shipping_fee)}</p>
                                                                    }
                                                                </div>
                                                                {pd.tax !== null &&
                                                                    <Fragment>
                                                                        {pd.tax.map(pd=>{
                                                                            return    <div className="d-flex justify-content-between">
                                                                                <p className="cart-summery-subtitle">{pd.name}({pd.type})</p>
                                                                                <p className="cart-summery-subtitle-price">{onCurrencyFormat(pd.price)}%</p>
                                                                            </div>
                                                                        })}
                                                                    </Fragment>
                                                                }
                                                                {pd.voucher!==null &&
                                                                    <Fragment>
                                                                        {pd.voucher.map(voucher=>{
                                                                            return <div className="d-flex justify-content-between">
                                                                                <p className="cart-summery-subtitle">  Coupon Discount({voucher.voucher_discount_type})</p>
                                                                                <p className="cart-summery-subtitle-price">{onCurrencyFormat(voucher.voucher_discount)}%</p>
                                                                            </div>
                                                                        })}
                                                                    </Fragment>
                                                                }
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="cart-summery-total">Total </p>
                                                                    {currencySymbolFormat===1 ?
                                                                        <p className="orderAmount">{onCurrencyFormat(pd.total)}{defaultCurrency}</p>
                                                                        :
                                                                        <p className="orderAmount">{defaultCurrency}{onCurrencyFormat(pd.total)}</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            {pd.product_type!=="digital" &&
                                                <Row className="mt-3">
                                                    {pd.pickup_point!==null ?
                                                        <Col md={12} lg={12} xs={12} sm={12}>
                                                            <div className="deliveryDateDiv">
                                                                <div className="shippingDiv">
                                                                    <h6>Shipping & Billing Address</h6>
                                                                    <hr/>
                                                                    <p><span className="badge badge-primary mr-2">Pickup point address</span> {pd.pickup_point}</p>
                                                                </div>
                                                            </div>
                                                        </Col> :
                                                        <Fragment>
                                                            <Col md={6} lg={6} sm={12}>
                                                                <div className="deliveryDateDiv">
                                                                    <div className="shippingDiv">
                                                                        <h6>Shipping Address</h6>
                                                                        <hr/>
                                                                        <Fragment>
                                                                            {pd.shipping.map(shipping=>{
                                                                                return <Fragment>
                                                                                    <p>{shipping.name}</p>
                                                                                    <p>{shipping.address +', '+ ' ' + shipping.area + ' ' +shipping.city}</p>
                                                                                    <p>{shipping.phone}</p>
                                                                                    <p>{shipping.email}</p>
                                                                                </Fragment>
                                                                            })}
                                                                        </Fragment>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={6} lg={6} sm={12}>
                                                                <div className="deliveryDateDiv">
                                                                    <div className="billingDiv">
                                                                        <h6>Billing Address</h6>
                                                                        <hr/>
                                                                        {pd.billing.map(billing=>{
                                                                            return <Fragment>
                                                                                <p>{billing.name}</p>
                                                                                <p>{billing.address +', '+ ' ' + billing.area + ' ' +billing.city}</p>
                                                                                <p>{billing.phone}</p>
                                                                                <p>{billing.email}</p>
                                                                            </Fragment>
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Fragment>
                                                    }
                                                </Row>
                                            }
                                            <div className="orderEmail">
                                                <p className="orderEmailText"><i className="far fa-envelope orderEmailIcon"/> We've sent a confirmation message to your registered email/phone with order details.</p>
                                            </div>
                                            <div className="viewOrder mt-3">
                                                <p className="orderMoreDetails mr-2">For more details track your delivery status under <span className="boldPath">My Account  My Order</span></p>
                                                <Link href="/my-orders" className="btn">View Order</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                })}
                            </Fragment>
                    </Container>
                </Fragment>
            );
        }else{
            Router.push("/")
        }


    }
}



const mapDispatchToProps = {
    resetAllAfterOrder,
    sendEmail,
};

function mapStateToProps(state) {
    const invoice = state.confirmOrderReducer.invoice;
    const backendApi = state.starterReducer.backendApi;
    const invoiceDataLoading = state.confirmOrderReducer.invoiceDataLoading;
    const defaultCurrency = state.confirmOrderReducer.defaultCurrency;
    const currencySymbolFormat = state.confirmOrderReducer.currencySymbolFormat;
    return {

        backendApi,
        invoice,
        invoiceDataLoading,
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPart);