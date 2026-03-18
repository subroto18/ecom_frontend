import React, {Fragment} from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import Api from "../../../../ClientApi/Api";
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {alert} from "../../../../services/common";
import {onlinePayData} from "../../../../services/actions/onlinePaymentAction";
import {toggleStripeModal} from "../../../../services/actions/stripeAction";
import {getWalletData} from "../../../../services/actions/walletAction";
import {connect} from "react-redux";
import Router from "next/router";
class StripePay extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator()
        this.state = {
            loading:false,
            successRedirectToDashboard:false,
            successRedirectToWallet:false,
            failedRedirectPage:false,
            orderId:""
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { stripe, elements } = this.props;
        if (!stripe || !elements) {
            alert('warning',"Unauthorized token!")
        }
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
            alert('warning',"Unauthorized token!")

        } else {

            if(this.props.onlinePaymentFor==="wallet"){
                const data = {
                    token:result.token.id,
                    amount:this.props.walletAmountForOnlinePay,
                    paymentMethod: 'stripe',
                    paymentType:'online',
                    paymentFor:'wallet',
                }
                this.setState({
                    loading:true
                })

                Api().post('online-wallet-recharge',data).then(res=>{
                    if(res.data===1){
                        alert('success','Your wallet recharge is successful');
                        let data = {
                            sellerPackageAmountForOnlinePay:0,
                            sellerPackageIdForOnlinePay:0,
                            walletAmountForOnlinePay:0
                        }

                        this.props.onlinePayData(data);
                        this.props.toggleStripeModal(false);
                        this.props.getWalletData();

                        Router.push("/my-wallet");

                    }else{
                        alert('error','Something went wrong');
                        let data = {
                            walletAmountForOnlinePay:0
                        }
                        this.props.onlinePayData(data);
                        this.props.toggleStripeModal(false);

                    }
                }).catch(error=>{
                  // alert('error', error.response.data.error);
                    let data = {
                        walletAmountForOnlinePay:0
                    }
                    this.props.onlinePayData(data);
                    this.props.getWalletData(false);
                })


            }else{
                const data = {
                    token:result.token.id,
                    packageId:this.props.sellerPackageIdForOnlinePay,
                    paymentMethod: 'stripe',
                    paymentType:'online',
                    paymentFor:'seller-package',
                }
                this.setState({
                    loading:true
                })
                Api().post('online-seller-package-recharge',data).then(res=>{
                    if(res.data===1){
                        alert('success','Your have successfully purchased the package');
                        let data = {
                            sellerPackageIdForOnlinePay:0,
                        }
                        this.props.onlinePayData(data);
                        Router.push("/dashboard");
                    }else{
                        alert('error','Something went wrong');
                        this.props.toggleStripeModal(false);
                        this.setState({
                            failedRedirectPage:true
                        })
                    }
                    this.setState({
                        loading:true
                    })
                }).catch(error=>{
                    // alert('error',error.response.data.error);
                    let data = {
                        sellerPackageIdForOnlinePay:0,
                    }
                    this.props.onlinePayData(data);
                    this.props.toggleStripeModal(false);
                    this.setState({
                        loading:false
                    })
                    Router.push("/failed");
                })
            }
        }
    };



    render() {
        return (
            <div className='cardcontainer'>
                <form onSubmit={this.handleSubmit}>
                    <CardElement />
                    {this.state.loading ?
                        <Button disabled={true}><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                            Loading...
                        </Button>:
                        <Fragment>
                            <button  disabled={!this.props.stripe} className='btn-pay btn onlinePaymentBtn'>
                                Buy Now
                            </button>
                        </Fragment>
                    }
                </form>
            </div>
        );
    }
}

 function StripeConsumer(props) {
    return (
        <ElementsConsumer>
            {({ stripe, elements,amount,packageId }) => (
                <StripePay onlinePaymentFor={props.onlinePaymentFor}
                           stripe={stripe}
                           elements={elements}
                           amount={amount}
                           packageId={packageId}
                           walletAmountForOnlinePay={props.walletAmountForOnlinePay}
                           sellerPackageIdForOnlinePay={props.sellerPackageIdForOnlinePay}
                           onlinePayData={props.onlinePayData}
                           toggleStripeModal={props.toggleStripeModal}
                           getWalletData={props.getWalletData}

                />
            )}
        </ElementsConsumer>
    );
}


const mapDispatchToProps = {
    onlinePayData,
    toggleStripeModal,
    getWalletData
};

function mapStateToProps(state) {
    const onlinePaymentFor = state.onlinePaymentReducer.onlinePaymentFor;
    const walletAmountForOnlinePay = state.walletReducer.walletAmountForOnlinePay;
    const sellerPackageIdForOnlinePay = state.sellerPackageReducer.sellerPackageIdForOnlinePay
    return {
        onlinePaymentFor,
        walletAmountForOnlinePay,
        sellerPackageIdForOnlinePay
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(StripeConsumer);




