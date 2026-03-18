import React, {PureComponent, Fragment} from 'react';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Api from "../../../../../ClientApi/Api";
import PaidDownloadOrderProgressState from "../OrderStage/PaidDownloadOrderProgressState";
import {connect} from "react-redux";
import Photo from "../../../Image/Photo";
import {onCurrencyFormat} from "../../../../../services/common";
import Link from "next/link";
import PaidOrderProgressStage from "../OrderStage/PaidOrderProgressStage";
import UnpaidOrderProgressStage from "../OrderStage/UnpaidOrderProgressStage";
import Router from "next/router";

class ViewOrderPart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            data:[],
            id:""
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        let id = window.location.pathname.split("/")[3]
        this.setState({
            id:id
        })

        const data = {
          id:id,
      }
      Api().post('getOrderDetails',data).then(res=>{
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


      let physical_product = true;


      if(this.state.data.length>0){
          this.state.data.map(pd=>{
            pd.orderProductInfo.map(product=>{
                 if(product.cat_type=="digital"){
                     physical_product = false
                 }
            })
          })
      }

      if(this.state.loading){
          return    <Fragment>{loader}</Fragment>
      }else if(this.state.data.length>0){
          return    <Fragment>
              {this.state.data.map(pd=>{
                  return  <Fragment>
                      <div className="orderDiv  d-flex">
                          <div className='orderDetails'>
                              <p> <span className="mr-2">Order</span><span className="orderId">{pd.orderId}</span></p>
                              <p> <span className="text-muted">Placed on {pd.orderData}</span></p>
                          </div>
                      </div>
                      <div className="orderDiv orderDetails">
                          <p><i className="fas fa-box-open"/> Package 1</p>
                          <p>Sold by <span className="shop-name">{pd.seller}</span></p>
                          <hr/>
                          {pd.order_status==="Pending" ?
                              <div className="estimated-arrival-date-div mb-5">
                                  {pd.shipping_days_same ?
                                      <p>Estimated Delivery By {pd.min_shipping_days}</p>:
                                      <p>Estimated Delivery By {pd.min_shipping_days} - {pd.max_shipping_days}</p>
                                  }
                              </div>
                              :
                              <Fragment/>
                          }


                          {physical_product===true ?

                              <Fragment>
                                  {pd.payment_status=="Paid" ?
                                      <Fragment>
                                          <PaidOrderProgressStage refunsStatus={pd.refund_status} orderStatus={pd.order_status}/>
                                      </Fragment>
                                      :
                                      <Fragment>
                                          <UnpaidOrderProgressStage orderStatus={pd.order_status}></UnpaidOrderProgressStage>
                                      </Fragment>
                                  }
                              </Fragment>:
                              <Fragment>
                                  <PaidDownloadOrderProgressState/>
                              </Fragment>

                          }




                          {pd.orderProductInfo.map(product=>{
                              return  <Fragment>
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
                                      <div className="order-price-div oder-cd">
                                          {product.product_price!==product.discount_price ?
                                              <Fragment>
                                                  {currencySymbolFormat===1 ?
                                                      <p>{onCurrencyFormat(product.discount_price)}{defaultCurrency}<del className="ml-1 text-danger">{onCurrencyFormat(product.product_price)}{defaultCurrency}</del> x {product.product_qnt} </p>:
                                                      <p>{defaultCurrency}{onCurrencyFormat(product.discount_price)}<del className="ml-1 text-danger">{onCurrencyFormat(product.product_price)}</del> x {product.product_qnt} </p>
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
                                      <Fragment>
                                          {product.cat_type!=='digital'  &&
                                              <Fragment>
                                                  {product.product_status!=="cancel" ?
                                                      <Fragment>
                                                          <Fragment>
                                                              {pd.order_status==="Pending" ?
                                                                  <Fragment>
                                                                      {pd.coupon !== null ?
                                                                          <div className="order-review oder-cd">
                                                                              <p><span className="text-muted">Cancel <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="left" title="You can not cancel this product right now. Because voucher has been applied."/></span></p>
                                                                          </div>
                                                                          :
                                                                          <Fragment>
                                                                              {pd.payment_status!=="Paid" ?
                                                                                  <div className="order-review oder-cd"><Link href={{pathname: `/my-order/orderId/${this.state.id}/productIndex/${product.unique_index}/productId/${product.product_id}`}}>Cancel</Link></div>:
                                                                                  <div className="order-review oder-cd"><span className="text-muted">Cancel <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="left" title="You can not cancel this product right now."/></span></div>
                                                                              }
                                                                          </Fragment>
                                                                      }
                                                                  </Fragment>
                                                                  :pd.order_status==="Delivered" ?
                                                                      <div className="order-review oder-cd">
                                                                          <div className="return-order">
                                                                              {(product.returnDate!==null && pd.payment_status==="Paid" && product.return_status===0) &&
                                                                                  <Fragment>
                                                                                      <Fragment>
                                                                                          <Link href={{pathname: `/return-request/orderId/${this.state.id}/productIndex/${product.unique_index}/productId/${product.product_id}`}}> <i  className="fas fa-info-circle"/> Return</Link>
                                                                                          <p className="text-muted"> until {product.returnDate} </p>
                                                                                      </Fragment>
                                                                                  </Fragment>
                                                                              }
                                                                          </div>
                                                                          <div className="replace-order">
                                                                              {(product.replaceDate!==null &&  pd.payment_status==="Paid" && product.return_status===0 ) &&
                                                                                  <Fragment>
                                                                                      <Fragment>
                                                                                          <Link href={{pathname: `/replace-request/orderId/${this.state.id}/productIndex/${product.unique_index}/productId/${product.product_id}`}}> <i  className="fas fa-info-circle"/> Replace</Link>
                                                                                          <p className="text-muted"> until {product.replaceDate} </p>
                                                                                      </Fragment>
                                                                                  </Fragment>
                                                                              }
                                                                          </div>
                                                                          <div>
                                                                              {product.review_status===0 &&  pd.payment_status==="Paid" &&
                                                                                  <Link href={{pathname: `/my-review/orderId/${this.state.id}/productIndex/${product.unique_index}/productId/${product.product_id}`}}>WRITE A REVIEW</Link>
                                                                              }
                                                                          </div>
                                                                      </div>
                                                                      :
                                                                      <div className="order-review oder-cd">
                                                                          <p><span className="text-muted">cancel <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="left" title="Cancellation Not Available
                                                                                                    Sorry, you cannot cancel this package as it has already been shipped by the seller."/></span></p>
                                                                      </div>
                                                              }
                                                          </Fragment>
                                                      </Fragment>:
                                                      <Fragment>
                                                          <div className="order-review oder-cd">
                                                              <p><span className="text-muted">cancel <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="left" title="This Product has been already canceled "/></span></p>
                                                          </div>
                                                      </Fragment>
                                                  }
                                              </Fragment>
                                          }
                                      </Fragment>
                                  </div>
                              </Fragment>
                          })}
                      </div>
                      {pd.order_status !== 'cancel' &&
                          <Row>
                              <Col lg={6}>
                                  {pd.product_type!=="digital" &&
                                      <Row>
                                          {pd.pickup_point!=null ?
                                              <Col lg={12}>
                                                  <div className="orderDiv">
                                                      <div className="shippingDiv">
                                                          <h6>Shipping Address</h6>
                                                          <hr/>
                                                          <p><Badge variant="danger mr-2">"Pickup point"</Badge>{pd.pickup_point} </p>
                                                      </div>
                                                  </div>
                                              </Col>
                                              :
                                              <Fragment>
                                                  <Col lg={12}>
                                                      <div className="orderDiv">
                                                          <div className="shippingDiv">
                                                              <h6>Shipping Address</h6>
                                                              <hr/>
                                                              {pd.shipping.map(shipping => {
                                                                  return <Fragment>
                                                                      <p>{shipping.name}</p>
                                                                      <p><Badge
                                                                          variant="danger mr-2">{shipping.delivery_place}</Badge>{shipping.address} , {shipping.region}
                                                                      </p>
                                                                      <p>{shipping.phone}</p>
                                                                  </Fragment>
                                                              })}
                                                          </div>
                                                      </div>
                                                  </Col>
                                                  <Col lg={12}>
                                                      <div className="orderDiv">
                                                          <div className="billingDiv">
                                                              <h6>Billing Address</h6>
                                                              <hr/>
                                                              {pd.billing.map(billing => {
                                                                  return <Fragment>
                                                                      <p>{billing.name}</p>
                                                                      <p><Badge
                                                                          variant="danger mr-2">{billing.delivery_place}</Badge>{billing.address} , {billing.region}
                                                                      </p>
                                                                      <p>{billing.phone}</p>
                                                                  </Fragment>
                                                              })}
                                                          </div>
                                                      </div>
                                                  </Col>
                                              </Fragment>
                                          }
                                      </Row>
                                  }
                              </Col>
                              <Col  lg={pd.product_type=="digital" ? 12 : 6}>
                                  <Row>
                                      <Col lg={12}>
                                          <div className="orderDiv">
                                              <div className="cart-summery">
                                                  <h4>Order Summery</h4>
                                                  <div className="d-flex justify-content-between">
                                                      <p className="cart-summery-subtitle text-muted">Subtotal</p>
                                                      <p className="cart-summery-subtitle-price">
                                                          {currencySymbolFormat===1 ?
                                                              <span>{onCurrencyFormat(pd.sub_total)}{defaultCurrency}</span>
                                                              :
                                                              <span>{defaultCurrency}{onCurrencyFormat(pd.sub_total)}</span>
                                                          }
                                                      </p>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                      <p className="cart-summery-subtitle text-muted">Shipping
                                                          fee</p>
                                                      <p className="cart-summery-subtitle-price">
                                                          {currencySymbolFormat===1 ?
                                                              <span>{onCurrencyFormat(pd.shipping_fee)}{defaultCurrency}</span>
                                                              :
                                                              <span>{defaultCurrency}{onCurrencyFormat(pd.shipping_fee)}</span>
                                                          }
                                                      </p>
                                                  </div>
                                                  {pd.tax !== null ?
                                                      <Fragment>
                                                          {pd.tax.map(tx=>{
                                                              return   <div className="d-flex justify-content-between">
                                                                  <p className="cart-summery-subtitle text-muted">{tx.name}({tx.type})</p>
                                                                  <p className="cart-summery-subtitle-price">
                                                                      {currencySymbolFormat===1 ?
                                                                          <span>{onCurrencyFormat(tx.price)}%</span>
                                                                          :
                                                                          <span>{onCurrencyFormat(tx.price)}%</span>
                                                                      }
                                                                  </p>
                                                              </div>
                                                          })}
                                                      </Fragment>
                                                      :
                                                      <div className="d-flex justify-content-between">
                                                          <p className="cart-summery-subtitle text-muted">Tax fee</p>
                                                          <p className="cart-summery-subtitle-price">
                                                              {currencySymbolFormat===1 ?
                                                                  <span>{onCurrencyFormat(0)}%</span>
                                                                  :
                                                                  <span>{onCurrencyFormat(0)}%</span>
                                                              }
                                                          </p>
                                                      </div>
                                                  }
                                                  {pd.coupon !== null &&
                                                      <Fragment>
                                                          {pd.coupon.map(voucher=>{
                                                              return   <div className="d-flex justify-content-between">
                                                                  <p className="cart-summery-subtitle text-muted">Voucher({voucher.voucher_discount_type})</p>
                                                                  <p className="cart-summery-subtitle-price">
                                                                      {currencySymbolFormat===1 ?
                                                                          <span>{onCurrencyFormat(voucher.voucher_discount)}%</span>
                                                                          :
                                                                          <span>{onCurrencyFormat(voucher.voucher_discount)}%</span>
                                                                      }
                                                                  </p>
                                                              </div>
                                                          })}
                                                      </Fragment>
                                                  }
                                                  <hr/>
                                                  <div className="orderTotal">
                                                      <span className="oTotalLabel">Total</span>
                                                      <span className="oTotalValue">
                                                                               {currencySymbolFormat===1 ?
                                                                                   <span>{onCurrencyFormat(pd.total)}{defaultCurrency}</span>
                                                                                   :
                                                                                   <span>{defaultCurrency}{onCurrencyFormat(pd.total)}</span>
                                                                               }
                                                                           </span>
                                                  </div>
                                                  {pd.payment_method==="COD" ?
                                                      <p className='paidOption'>Paid by Cash on Delivery</p>:pd.payment_method==="WALLET" ?
                                                          <p className='paidOption'>Paid by Wallet</p>:<p>Paid by {pd.payment_method}</p>
                                                  }
                                              </div>
                                          </div>
                                      </Col>
                                  </Row>
                              </Col>
                          </Row>
                      }
                  </Fragment>
              })}
          </Fragment>
      }else{
          Router.push("/dashboard")
      }

  }
}




function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat  =  state.starterReducer.currencySymbolFormat;
    const backendApi = state.starterReducer.backendApi
    return {
        defaultCurrency,
        currencySymbolFormat,
        backendApi
    };
}

export default connect(mapStateToProps)(ViewOrderPart);


