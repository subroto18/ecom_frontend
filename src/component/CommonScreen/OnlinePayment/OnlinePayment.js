import React, {PureComponent, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Api from "../../../ClientApi/Api";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import SimpleReactValidator from "simple-react-validator";
import {connect} from "react-redux";
import {getWalletData} from "../../../services/actions/walletAction";
import {sendEmail} from "../../../services/actions/commonAction";
import {onlinePayData} from "../../../services/actions/onlinePaymentAction";
import {toggleStripeModal} from "../../../services/actions/stripeAction";
import {alert} from "../../../services/common";
import {onCurrencyConvert} from "../../../services/common";
import Router from "next/router";
import Photo from "../Image/Photo";
import Link from "next/link";
import StripeConsumer from "./Stripe/StripePay";
class OnlinePayment extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator()
        this.state = {
            termsCondition:false,
            paymentMethod:"",
            walletAmount:0,
            walletRechargeAmount:'',
            modal:false,
            stripeModal:false,
            paymentAmount:0,
            loadingBtn:false
        }
        this.onPaymentMethod  = this.onPaymentMethod.bind(this)
        this.onTermsConditionCheck = this.onTermsConditionCheck.bind(this)
        this.onTermsConditionCheck = this.onTermsConditionCheck.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.onApprove = this.onApprove.bind(this)
        this.onPaypalConfirm = this.onPaypalConfirm.bind(this)
        this.onPaypalModalHide = this.onPaypalModalHide.bind(this)
        this.onParentModalHide = this.onParentModalHide.bind(this)
        this.onAmount = this.onAmount.bind(this)
        this.onStripeHide = this.onStripeHide.bind(this)
        this.onWalletPayment = this.onWalletPayment.bind(this)
        this.onAmountFocus = this.onAmountFocus.bind(this)
    }
    componentDidMount() {
        if(this.props.walletActivation!==0){
            this.props.getWalletData();
        }
        this.setState({
            termsCondition:false,
            paymentMethod:"",
            walletAmount:0,
            walletRechargeAmount:'',
            modal:false,
            stripeModal:false,
            paymentAmount:0
        })
    }

    onPaymentMethod(e){
        this.setState({
            paymentMethod:e.target.value
        })
    }

    onTermsConditionCheck(){
        let termsCondition = this.state.termsCondition;
        this.setState({
            termsCondition:termsCondition!==true?true:false
        })
    }

    createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: this.props.paymentFor==="wallet" ? `${onCurrencyConvert(this.props.walletAmountForOnlinePay)}` : `${onCurrencyConvert(this.props.amount)}`,
                    },
                },
            ],
        })
            .then((orderId) => {
                return orderId;
            });
    }

    onApprove(data, actions) {

        this.setState({
            loadingBtn:false
        })

        return actions.order.capture().then(details=> {
            let tnxId = details.purchase_units[0].payments.captures[0].id
            this.onPaypalConfirm(tnxId)
        });


    };

    onPaypalConfirm(tnx_id){
        this.onPaypalModalHide();
        if(this.props.paymentFor==="wallet"){
            const data = {
                tnx_id :tnx_id,
                amount: this.props.walletAmountForOnlinePay,
                paymentMethod: 'paypal',
                paymentType:'online',
                paymentFor:'wallet',
            }
            Api().post('online-wallet-recharge',data).then(res=>{
                if(res.data==1){
                     alert('success','Your have successfully purchased the wallet!');
                     this.props.sendEmail();
                     Router.push("/my-wallet")
                     this.props.callback();
                }


            }).catch(error=>{
                this.setState({
                    loadingBtn:false
                })
            })
        }else{
            const data = {
                tnx_id :tnx_id,
                amount:this.props.amount,
                paymentMethod: 'paypal',
                paymentType:'online',
                paymentFor:'seller-package',
                packageId:this.props.packageId,
            }
            Api().post('online-seller-package-recharge',data).then(res=>{
                if(res.data==1){
                    alert('success','Your have successfully purchased the package!');
                    this.props.sendEmail();
                }

                this.setState({
                    loadingBtn:false
                })
            }).catch(error=>{
                this.setState({
                    loadingBtn:false
                })
            })
        }
    }

    onPaypalModalHide(){
        this.setState({
            modal:false,
            termsCondition:false,
            stripeModal:false,
        })
    }

    onParentModalHide(){
        this.setState({
            termsCondition:false,
            paymentMethod:"",
            modal:false,
            stripeModal:false,
            paymentAmount:0,
        })
        this.props.onModalHide();
    }

    onConfirm(){

            if(this.props.paymentFor==="wallet"){
                let data = {
                    onlinePaymentFor:"wallet"
                }
                this.props.onlinePayData(data);
                if(this.validator.allValid()){

                    let paymentMethod = this.state.paymentMethod;

                    if(paymentMethod==="paypal"){
                        let convertCurrency =  parseFloat(onCurrencyConvert(this.props.walletAmountForOnlinePay));
                        if(convertCurrency<1){
                            alert('warning','Recharge should not less then $1 or its equivalent!');
                        }else{
                            this.onParentModalHide();
                            this.setState({
                                modal:true
                            })
                        }
                    }
                    if(paymentMethod==="stripe"){
                        let convertCurrency =  parseFloat(onCurrencyConvert(this.props.walletAmountForOnlinePay));
                        if(convertCurrency<1){
                            alert('warning','Recharge should not less then $1 or its equivalent!');
                        }else{
                            this.onParentModalHide();
                            this.props.toggleStripeModal(true)
                        }
                    }
                    if(paymentMethod=="sslcommerce"){
                        this.setState({
                            loadingBtn:true
                        })
                        const data = {
                            amount:this.props.walletAmountForOnlinePay,
                            paymentMethod: 'sslcommerz',
                            paymentType:'online',
                            paymentFor:'wallet',
                            callbackUrl:this.props.baseApi
                        }
                        Api().post('online-wallet-recharge',data).then(res=>{
                            if(res.data.status==="success"){
                                window.location.href = res.data.data
                            }
                        })
                    }
                }else{
                    this.forceUpdate();
                    this.validator.showMessages();
                }
            }else{
                let data = {
                    onlinePaymentFor:"seller-package"
                }
                this.props.onlinePayData(data);
                let paymentMethod = this.state.paymentMethod;
                if(paymentMethod==="paypal"){

                    let convertCurrency =  parseFloat(onCurrencyConvert(this.props.amount));
                    if(convertCurrency<1){
                        alert('warning','Recharge should not less then $1 or its equivalent!');
                    }else{
                        this.onParentModalHide();
                        this.setState({
                            modal:true
                        })
                    }

                }
                if(paymentMethod==="stripe"){

                    let convertCurrency =  parseFloat(onCurrencyConvert(this.props.amount));
                    if(convertCurrency<1){
                        alert('warning','Recharge should not less then $1 or its equivalent!');
                    }else{
                        this.onParentModalHide();
                        this.props.toggleStripeModal(true)
                    }

                }
                if(paymentMethod==="sslcommerce"){
                    this.setState({
                        loadingBtn:true
                    })

                    const data = {
                        packageId:this.props.sellerPackageIdForOnlinePay,
                        paymentMethod: 'sslcommerz',
                        paymentType:'online',
                        paymentFor:'seller-package',
                        callbackUrl:this.props.baseApi
                    }
                    Api().post('online-seller-package-recharge',data).then(res=>{
                        let data = {
                            sellerPackageIdForOnlinePay:0,
                        }
                        this.props.onlinePayData(data);
                        if(res.data.status==="success"){
                            window.location.href = res.data.data
                        }
                    })
                }
                else if(paymentMethod==="WALLET"){
                    this.onWalletPayment();
                }
        }

    }

    onWalletPayment(){
        const walletBalance = this.props.walletData.map(pd=>{
            return pd.walletBalance
        })
        let amount = this.props.amount;
        if(amount>walletBalance){
            alert('warning','Wallet amount is not sufficient!!');
        }else{
            const data = {
                tnx_id :'',
                amount:this.props.amount,
                paymentMethod: 'wallet',
                paymentType:'online',
                paymentFor:'seller-package',
                packageId:this.props.packageId,
            }
            Api().post('online-seller-package-recharge',data).then(res=>{
                if(res.data==1){
                    alert('success','Your have successfully purchased the package!');
                    this.props.sendEmail();
                    Router.push(`/seller-products`);
                }
            })
        }
    }

    onStripeHide(){
        this.props.toggleStripeModal(false)
    }
    onAmount(e){
            let data = {
                walletAmountForOnlinePay:e.target.value
            }
        this.props.onlinePayData(data);
    }
    onAmountFocus(){
        let data = {
            walletAmountForOnlinePay:""
        }
        this.props.onlinePayData(data);
    }



    render() {


        let activePaymentGateway = this.props.activePaymentGateway;
        return (
            <Fragment>

                <Modal size="xl | lg | sm" className='responsiveModal' centered scrollable={true} show={this.props.modal} onHide={this.onParentModalHide} >
                    <Modal.Header>
                        <h6>
                            {this.props.paymentFor == "wallet" ?
                                <span>  Online wallet recharge</span> :
                                <span>  Online package purchase</span>
                            }
                          </h6>
                        <button onClick={this.onParentModalHide} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body className="offline-payment-modal">
                        <hr/>
                        {activePaymentGateway.paypalStatus===1 || activePaymentGateway.stripeStatus===1 || activePaymentGateway.sslcommerzStatus===1 ?
                            <Fragment>
                                <Fragment>
                                    <Row>
                                        {activePaymentGateway.paypalStatus===1 &&
                                            <Col lg={3} md={4} sm={4} xs={6} className="text-center">
                                                <label className="pGatewayLabel mobilePGatewayLabel">
                                                    <input  className="pGatewayRadio" type="radio" name="gateway" value="paypal"  onClick={(e)=>this.onPaymentMethod(e)}  />
                                                    <span className="gatewayDiv">

                                                            <Photo
                                                                src="/paypal.png"
                                                                blurDataURL="/blank.jpg"
                                                                class="img-fluid pGatewayImg"
                                                            />
                                                        <span className="pGatewayName">PayPal</span>
                                                    </span>
                                                </label>
                                            </Col>
                                        }
                                        {activePaymentGateway.stripeStatus===1 &&
                                            <Col lg={3} md={4} sm={4} xs={6} className="text-center">
                                                <label className="pGatewayLabel mobilePGatewayLabel">
                                                    <input className="pGatewayRadio" type="radio" name="gateway" value="stripe"  onClick={(e)=>this.onPaymentMethod(e)} />
                                                    <span className="gatewayDiv">
                                                         <Photo
                                                             src="/stripe.png"
                                                             blurDataURL="/blank.jpg"
                                                             class="img-fluid pGatewayImg"
                                                         />
                                                        <span className="pGatewayName">Stripe</span>
                                                    </span>
                                                </label>
                                            </Col>
                                        }


                                        {this.props.currencyCode==="BDT"  &&

                                            <Fragment>
                                                {activePaymentGateway.sslcommerzStatus===1 &&
                                                    <Col lg={3} md={4} sm={4} xs={6} className="text-center">
                                                        <label className="pGatewayLabel mobilePGatewayLabel">
                                                            <input className="pGatewayRadio" type="radio" name="gateway" value="sslcommerce" onClick={(e)=>this.onPaymentMethod(e)}  />
                                                            <span className="gatewayDiv">

                                                              <Photo
                                                                  src="/sslcommerce.png"
                                                                  blurDataURL="/sslcommerce.jpg"
                                                                  class="img-fluid pGatewayImg"
                                                              />

                                                        <span className="pGatewayName">Sslcommerz</span>
                                                    </span>
                                                        </label>
                                                    </Col>
                                                }
                                            </Fragment>

                                        }

                                        {this.props.paymentFor==="wallet" &&
                                            <Col lg={12} className=" mb-3">
                                                <div className="form-group">
                                                    <label>Amount * </label>
                                                    <input value={this.props.walletAmountForOnlinePay} onFocus={this.onAmountFocus} onChange={(e)=>this.onAmount(e)}   type="text" className="form-control"  placeholder="Enter your recharged Amount"/>
                                                    <div className="mb-2 text-danger"> {this.validator.message('amount', this.props.walletAmountForOnlinePay, 'required|currency')}</div>
                                                </div>
                                            </Col>
                                        }
                                        <Col lg={12} className="mb-3">
                                                <div className="checkoutAgreeDiv mt-3">

                                                    <div className="form-check">
                                                        <input  type="checkbox"
                                                               id="flexCheckChecked"
                                                               onClick={this.onTermsConditionCheck}
                                                               checked={this.state.termsCondition}
                                                        />
                                                    </div>

                                                    <span className="ml-2">I agree to the <Link className="checkoutAgreeLink" href="/terms-conditions">terms and conditions</Link>, <Link className="checkoutAgreeLink" href="/refund-policy">Refund Policy</Link> & <Link className="checkoutAgreeLink"
                                                                                                                                                                                                                           href="/privacy-policy">Privacy Policy</Link>.</span>
                                                </div>
                                                <div className="purchase-btn">
                                                    {this.props.paymentFor==="wallet" ?
                                                        <Fragment>
                                                            {this.state.termsCondition && this.state.paymentMethod!=="" && this.props.walletAmountForOnlinePay>0  ?
                                                                <Fragment>
                                                                    {this.state.loadingBtn ?
                                                                        <Button className="float-right"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                                            Loading...
                                                                        </Button>:
                                                                        <Button className="float-right" onClick={()=>this.onConfirm()}>Purchase now</Button>
                                                                    }
                                                                </Fragment>
                                                                :
                                                                <Button disabled className="float-right">Purchase now</Button>
                                                            }
                                                        </Fragment>:
                                                        <Fragment>
                                                            {this.state.termsCondition && this.state.paymentMethod!==""  ?
                                                                <Fragment>
                                                                    {this.state.loadingBtn ?
                                                                            <Button className="float-right"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                                                Loading...
                                                                            </Button> :
                                                                        <Button className="float-right" onClick={()=>this.onConfirm()}>Purchase now</Button>
                                                                    }
                                                                </Fragment>
                                                                :
                                                                <Button disabled className="float-right">Purchase now</Button>
                                                            }
                                                        </Fragment>
                                                    }
                                                </div>
                                        </Col>
                                    </Row>
                                </Fragment>
                            </Fragment>
                            :
                            <Fragment>
                                <Fragment>
                                    <div className="emptyPage">
                                        <div className="py-5">
                                            <div className="text-center pageContent">
                                                <h2 className='text-muted iconSize'><i class="fas fa-person-dolly"></i></h2>
                                                <h6 className='text-muted'>There is no online payment gateway setup  yet</h6>
                                                <Link href="/support-ticket"><div className='btn btn-outline-warning text-uppercase'>Talk to support</div></Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            </Fragment>
                        }
                    </Modal.Body>
                </Modal>


                <Modal centered show={this.state.modal} onHide={this.onPaypalModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Online payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-3  paypal-btn">
                        <PayPalScriptProvider  options={{ "client-id":  activePaymentGateway.paypalClientId}}>
                            <PayPalButtons
                                createOrder={(data,actions)=>this.createOrder(data,actions)}
                                onApprove={(data,actions)=>this.onApprove(data,actions)}
                                style={{ layout: "horizontal" }} />
                        </PayPalScriptProvider>
                    </Modal.Body>
                </Modal>


                <Modal centered show={this.props.stripeModal} onHide={this.onStripeHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Online payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-3">
                        <Elements   stripe={loadStripe(activePaymentGateway.stripeClientId)}>
                            <StripeConsumer   />
                        </Elements>
                    </Modal.Body>
                </Modal>


            </Fragment>
        );
    }
}




const mapDispatchToProps = {
    getWalletData,
    sendEmail,
    onlinePayData,
    toggleStripeModal
};

function mapStateToProps(state) {

    const walletActivation = state.walletReducer.walletActivation;
    const walletAmountForOnlinePay = state.walletReducer.walletAmountForOnlinePay;
    const sellerPackageIdForOnlinePay = state.sellerPackageReducer.sellerPackageIdForOnlinePay;
    const baseApi = state.starterReducer.baseApi;
    const currencyCode = state.starterReducer.currencyCode
    const stripeModal = state.stripeReducer.stripeModal
    const activePaymentGateway = state.userReducer.activePaymentGateway


    console.log(stripeModal,'stripeModal');


    return {
        walletActivation,
        walletAmountForOnlinePay,
        sellerPackageIdForOnlinePay,
        baseApi,
        currencyCode,
        stripeModal,
        activePaymentGateway
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePayment);
