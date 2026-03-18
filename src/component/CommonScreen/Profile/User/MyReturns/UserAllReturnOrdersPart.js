import React, {PureComponent, Fragment} from 'react';
import Api from "../../../../../ClientApi/Api";
import Link from "next/link";
import Photo from "../../../Image/Photo";
import {connect} from "react-redux";
class UserAllReturnOrdersPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading:true,
            data:[]
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        Api().get('getAllReturnOrders').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        })
    }

  render() {
      const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
    return (
      <Fragment>
          {this.state.loading ?
              <div>
                  <Fragment>{loader}</Fragment>
              </div>
              :
              <Fragment>
                  {this.state.data.length>0 ?
                      <Fragment>
                          {this.state.data.map(pd=>{
                              if(pd.orderProductInfo.length>0){
                                  return  <div key={1} className="orderDiv">
                                      <div className="d-flex justify-content-between">
                                          <div className='orderDetails'>
                                              <p> <span className="mr-2">Order</span><span className="orderId">{pd.orderId}</span></p>
                                              <p> <span>Placed on {pd.orderData}</span></p>
                                          </div>
                                          <div className='manageText'>
                                              <Link href={`order/return-order/view/${pd.orderId.substring(1)}/productIndex/${pd.productIndex}/productId/${pd.productId}`}>MORE DETAILS</Link>
                                          </div>
                                      </div>
                                      <hr/>
                                      {pd.orderProductInfo.map(product=>{
                                          return  <div key={1} className="order-details-div d-flex">
                                              <div className="oder-cd-div">

                                                  <Photo
                                                      src={`${this.props.backendApi}${product.product_thumbnail}`}
                                                      blurDataURL="/blank.jpg"
                                                      class="order-img"
                                                  />

                                              </div>
                                              <div className="order-title-div oder-cd">
                                                  <p>{product.product_name}</p>
                                              </div>
                                              <div   className="order-qnt-div oder-cd">
                                                  <p>Qty: {product.product_qnt}</p>
                                              </div>
                                              <div   className="order-cancel-d oder-cd">
                                                  <p>{product.status}</p>
                                              </div>
                                          </div>
                                      })}
                                  </div>
                              }
                          })}
                      </Fragment>
                      :
                      <Fragment>
                          <div className="emptyPage">
                              <div className="py-5">
                                  <div className="text-center pageContent">
                                      <h2 className='text-muted iconSize'><i class="fas fa-person-dolly"></i></h2>
                                      <h6 className='text-muted'>There is no refundable Order  yet</h6>
                                      <Link href="/"><div className='btn btn-outline-warning text-uppercase'>Continue Shopping</div></Link>
                                  </div>
                              </div>
                          </div>
                      </Fragment>
                  }
              </Fragment>
          }
      </Fragment>
    )
  }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(UserAllReturnOrdersPart);


