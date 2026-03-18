import React, {PureComponent, Fragment} from 'react';
import Api from "../../../../../ClientApi/Api";
import {starter} from "../../../../../services/actions/starterAction";
import {connect} from "react-redux";
import Photo from "../../../Image/Photo";
import {onCurrencyFormat} from "../../../../../services/common";
import Link from "next/link";
import Router from "next/router";
class ViewCancelOrderPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading : true,
            data:[]
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        let id =  window.location.pathname.split("/")[4];
        const data = {
            orderId:id,
        }
        Api().post('getCancelOrderDetails',data).then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch()
    }
  render() {
        let defaultCurrency =    this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat;
        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>

      if(this.state.loading){
          return    <Fragment>{loader}</Fragment>
      }else if(this.state.data.length>0){
           return   <Fragment>
                      {this.state.data.map(pd=>{
                   return  <Fragment>
                       <div className="orderDiv  d-flex">
                           <div>
                               <p> <span className="mr-2">Order</span><span className="orderId">{pd.orderId}</span></p>
                               <p> <span className="text-muted">Placed on {pd.orderData}</span></p>
                           </div>
                       </div>
                       <div className="orderDiv">
                           <p><i className="fas fa-box-open"/> Package 1</p>
                           <p>Sold by <span className="shop-name">{pd.seller}</span></p>
                           <hr/>
                       </div>
                       {pd.orderProductInfo.map(product=>{
                           return    <div className="orderDiv">
                               <Fragment>
                                   {product.refund_status!==null ?
                                       <Fragment>{
                                           product.refund_status=="pending"?
                                               <div className="stepper-wrapper">
                                                   <div className="stepper-item completed active">
                                                       <div className="step-counter">1</div>
                                                       <div className="step-name">Cancellation in Progress</div>
                                                   </div>
                                                   <div className="stepper-item completed active">
                                                       <div className="step-counter">2</div>
                                                       <div className="step-name">Refund processing</div>
                                                   </div>
                                                   <div className="stepper-item">
                                                       <div className="step-counter">3</div>
                                                       <div className="step-name">Refunded</div>
                                                   </div>
                                               </div>
                                               :
                                               product.refund_status=="refunded" ?
                                                   <div className="stepper-wrapper">
                                                       <div className="stepper-item completed active">
                                                           <div className="step-counter">1</div>
                                                           <div className="step-name">Cancellation in Progress</div>
                                                       </div>
                                                       <div className="stepper-item completed active">
                                                           <div className="step-counter">2</div>
                                                           <div className="step-name">Refund Processed</div>
                                                       </div>
                                                       <div className="stepper-item completed active">
                                                           <div className="step-counter">3</div>
                                                           <div className="step-name">Refunded</div>
                                                       </div>
                                                   </div>
                                                   :
                                                   <div className="stepper-wrapper">
                                                       <div className="stepper-item completed active">
                                                           <div className="step-counter">1</div>
                                                           <div className="step-name">Cancellation in Progress</div>
                                                       </div>
                                                       <div className="stepper-item completed active">
                                                           <div className="step-counter">2</div>
                                                           <div className="step-name">Refund Processed</div>
                                                       </div>
                                                       <div className="stepper-item completed active">
                                                           <div className="step-counter">3</div>
                                                           <div className="step-name">Rejected</div>
                                                       </div>
                                                   </div>
                                       }</Fragment>
                                       :
                                       <Fragment>
                                           <div className="stepper-wrapper">
                                               <div className="stepper-item completed active">
                                                   <div className="step-counter">1</div>
                                                   <div className="step-name">Cancellation in Progress</div>
                                               </div>
                                               <div className="stepper-item completed active">
                                                   <div className="step-counter">2</div>
                                                   <div className="step-name">Cancelled</div>
                                               </div>
                                           </div>
                                       </Fragment>
                                   }
                               </Fragment>
                               <div className="d-flex order-details">
                                   <div className="oder-cd-div">

                                       <Photo
                                           src={`${this.props.backendApi}${product.product_thumbnail}`}
                                           blurDataURL="/blank.jpg"
                                           class="order-img"
                                       />

                                   </div>
                                   <div className="order-title-div oder-cd">
                                       <p>{product.product_name}</p>
                                       <span className="text-muted">
                                                                               {product.product_variation!=null &&
                                                                                   <Fragment>{
                                                                                       product.product_variation.map((pd,i)=>{
                                                                                           return <Fragment className="text-left"><span className="variation">{(Object.keys(pd))[0]}: </span> <span className="variation">{(Object.values(pd))[0]}</span></Fragment>
                                                                                       })
                                                                                   }
                                                                                   </Fragment>
                                                                               }
                                                                          </span>
                                   </div>
                                   <div   className="order-price-div oder-cd">
                                       {product.product_price!==product.discount_price ?
                                           <Fragment>
                                               {currencySymbolFormat===1 ?
                                                   <p>{onCurrencyFormat(product.discount_price)}{defaultCurrency}<del className="ml-1 text-danger">{onCurrencyFormat(product.product_price)}{defaultCurrency}</del> x {product.product_qnt} </p>:
                                                   <p>{defaultCurrency}{onCurrencyFormat(product.discount_price)}<del className="ml-1 text-danger">{defaultCurrency}{onCurrencyFormat(product.product_price)}</del> x {product.product_qnt} </p>
                                               }
                                           </Fragment>
                                           :
                                           <Fragment>
                                               {currencySymbolFormat===1 ?
                                                   <p>{onCurrencyFormat(product.product_price)}{defaultCurrency} x {product.product_qnt} </p>
                                                   :
                                                   <p>{defaultCurrency}{onCurrencyFormat(product.product_price)} x {product.product_qnt} </p>
                                               }
                                           </Fragment>
                                       }
                                   </div>
                                   <div className="order-qnt-div oder-cd">
                                       {product.product_price!==product.discount_price ?
                                           <Fragment>
                                               {currencySymbolFormat===1 ?
                                                   <p>{onCurrencyFormat(product.discount_price * product.product_qnt)}{defaultCurrency} </p> :
                                                   <p>{defaultCurrency}{onCurrencyFormat(product.discount_price * product.product_qnt)} </p>
                                               }
                                           </Fragment>
                                           :
                                           <Fragment>
                                               {currencySymbolFormat===1 ?
                                                   <p>{onCurrencyFormat(product.product_price * product.product_qnt)}{defaultCurrency} </p> :
                                                   <p>{defaultCurrency}{onCurrencyFormat(product.product_price * product.product_qnt)} </p>
                                               }
                                           </Fragment>
                                       }
                                   </div>
                               </div>
                           </div>
                       })}
                       <Fragment>
                           {pd.reject_status==="rejected" &&
                               <div className="orderDiv">
                                   <p>Rejection Reason</p>
                                   <hr/>
                                   <p>{pd.refund_rejection_reason}</p>
                                   <p className="alert alert-info mt-3">If you have any inquiries regrading this rejection please talk to our <Link to="/support-ticket"><span className="badge badge-dark">support</span></Link>  </p>
                               </div>
                           }
                       </Fragment>
                   </Fragment>
               })}
                    </Fragment>
      }else{
          Router.push("/dashboard")
      }

  }
}

const mapDispatchToProps = {
    starter
};

function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat  = state.starterReducer.currencySymbolFormat;
    const backendApi = state.starterReducer.backendApi
    return {
        defaultCurrency,
        currencySymbolFormat,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCancelOrderPart);



