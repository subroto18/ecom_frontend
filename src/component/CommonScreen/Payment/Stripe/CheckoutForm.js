import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import Api from "../../../../ClientApi/Api";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {alert} from "../../../../services/common";
import Router from "next/router";

class CheckoutForm extends React.Component {
    constructor() {
        super();
        this.state = {
            loading:false,
            success:false,
            failed:false
        }
    }

    componentDidMount() {
        this.setState({
            loading:false,
            successRedirectPage:false,
            failedRedirectPage:false,
            orderId:""
        })
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
            const button = document.querySelector('.btn-pay')
            button.disabled = true
            let orderData  = this.props.orderData
            let tax =  orderData.tax!=null && orderData.tax.length>0 ? orderData.tax:null ;

            const data = {
                paymentMethod:orderData.paymentMethod,
                num_of_product:orderData.num_of_product,
                sub_total:orderData.sub_total,
                discount:orderData.discount,
                tax:tax,
                voucher:orderData.voucher,
                totalPrice:orderData.totalPrice,
                shipping_fee:orderData.shipping_fee,
                shippingZone:orderData.shippingZone,
                product:orderData.product,
                token:result.token.id,
                status:[{
                    'time':new Date(),
                    'status':'order_placed',
                }],
                callbackApi:this.props.baseApi,
            }


            this.setState({
                loading:true
            })
            Api().post('order',data).then(res=>{
                if(res.data!==0){
                    this.setState({
                        loading:false,
                        success:true,
                        failed:false,
                        orderId:res.data
                    })
                    Router.push(`/confirm/${res.data}`)
                }else{
                    this.setState({
                        loading:false,
                        success:false,
                        failed:true
                    })
                    Router.push(`/failed`)

                }
            }).catch(error=>{
                alert('warning',error.response.data.error);
            });
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
                        <button  disabled={!this.props.stripe} className='btn-pay btn'>
                          Buy Now
                        </button>
                    }
                </form>
            </div>
        );
    }
}

 function InjectedCheckoutForm(props) {
    return (
        <ElementsConsumer>
            {({ stripe, elements,orderData }) => (
                <CheckoutForm orderData={props.orderData} stripe={stripe} elements={elements}   />
            )}
        </ElementsConsumer>
    );
}


function mapStateToProps(state) {
    const orderData = state.checkoutReducer.orderData;
    const baseApi = state.starterReducer.baseApi;
    return {
        orderData,
        baseApi
    };
}

export default connect(mapStateToProps)(InjectedCheckoutForm);
