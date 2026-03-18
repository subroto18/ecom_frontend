import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Api from "../../../../../ClientApi/Api";
import SimpleReactValidator from "simple-react-validator";
import Router from "next/router";
import {alert} from "../../../../../services/common";
import Photo from "../../../Image/Photo";
import {connect} from "react-redux";
import Link from "next/link";

class UserOrderCancelPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            loading:true,
            data:[],
            cancelReason:"Change of mind",
            additionalReason:"",
            termsCondition:false,
            refundMethod:'',
            refundMethodDetails:'',
            refundOptionSetup:true,
            loadingBtn:false
        }
        this.onCancelHandle=  this.onCancelHandle.bind(this)
        this.onAdditionalMessage=  this.onAdditionalMessage.bind(this)
        this.onTermsConditionCheck=  this.onTermsConditionCheck.bind(this)
        this.onChangeRefundMethod = this.onChangeRefundMethod.bind(this)
        this.onRefundMethodDetails = this.onRefundMethodDetails.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0);
        let uniqueId = window.location.pathname.split("/")[5];
        let productId = window.location.pathname.split("/")[7];
        let orderId = window.location.pathname.split("/")[3];


        const data = {
            uniqueId : uniqueId,
            productId:productId,
            orderId:orderId
        }
        Api().post('getCancelProduct',data).then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch()
    }
    onCancelHandle(e){
      this.setState({
          cancelReason:e.value
      })
    }
    onAdditionalMessage(e){
        this.setState({
            additionalReason:e.target.value
        })
    }
    onTermsConditionCheck(e){
        let termsCondition = this.state.termsCondition;
        this.setState({
            termsCondition:termsCondition!==true?true:false
        })
    }
    onChangeRefundMethod(e){
        this.setState({
            refundMethod:e.value
        })
    }
    onRefundMethodDetails(e){
        this.setState({
            refundMethodDetails:e.target.value
        })
    }
    onSubmit(){
        if (this.validator.allValid()) {
            this.setState({
                loadingBtn:true
            })
            let cancelReason = this.state.cancelReason;
            let additionalReason = this.state.additionalReason;
            let orderId = window.location.pathname.split("/")[3];
            let productId = window.location.pathname.split("/")[7];
            let productUniqueId = window.location.pathname.split("/")[5];
            let  refundMethod = this.state.refundMethod;
            let  refundMethodDetails = this.state.refundMethodDetails
            const data = {
                cancelReason:cancelReason,
                additionalReason:additionalReason,
                uniqueId:productUniqueId,
                orderId : orderId,
                productId:productId,
                refundMethod:refundMethod,
                refundMethodDetails:refundMethodDetails,
            }
            Api().post('postCancelOrder',data).then(res=>{
                if(res.data===1){
                    alert('success','Order has been cancelled!')
                    Router.push("/my-cancellation")
                }
            }).catch()
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

  render() {
    const options = [
        { value: 'Change of mind', label: 'Change of mind' },
        { value: 'Duplicate order', label: 'Duplicate order' },
        { value: 'Found cheap price on other site', label: 'Found cheap price on other site' },
        { value: 'Takes too long to delivery', label: 'Takes too long to delivery' }
    ]
    const refundMethod = [];
    this.state.data.map(pd=>{
        if(pd.refund_method!=null){
            pd.refund_method.map(rm=>{
                refundMethod.push( { value: rm.name, label: rm.name })
            })
        }else{
            this.setState({
                refundOptionSetup:false
            })
        }
    })
    const loader =  <div  className="pre-loader">
        <div className="loader-spinner">
            <div className="spinner-border text-muted"/>
        </div>
    </div>
        return (
                 <Fragment>
                        {this.state.loading ?
                                    <Fragment>
                                        <div className="loader-spinner-div mt-3">
                                            {loader}
                                        </div>
                                    </Fragment>:
                                  <Fragment>
                                      {this.state.refundOptionSetup ?
                                          <Fragment>
                                              <Fragment>
                                                  {this.state.data.map(pd=>{
                                                      if(pd.product_status=="cancel"){
                                                          Router.push("/my-orders")
                                                      }else{
                                                          return <Fragment>
                                                              <div className="d-flex order-cancel-details-div">
                                                                  <Fragment>
                                                                      <div className="oder-cd-div ">
                                                                          <Photo
                                                                              src={`${this.props.backendApi}${pd.product_thumbnail}`}
                                                                              blurDataURL="/blank.jpg"
                                                                              class="order-img"
                                                                          />

                                                                      </div>
                                                                      <div className="order-title-div oder-cd">
                                                                          <h6>{pd.product_name}</h6>
                                                                          <p className="text-muted">
                                                                              {pd.product_variation!=null &&
                                                                                  <Fragment>{
                                                                                      pd.product_variation.map((variant,i)=>{
                                                                                          return <Fragment className="text-left mb-1"><span className="variation">{(Object.keys(variant))[0]}: </span> <span className="variation mr-1"> {(Object.values(variant))[0]}</span></Fragment>
                                                                                      })
                                                                                  }
                                                                                  </Fragment>
                                                                              }
                                                                          </p>
                                                                      </div>
                                                                  </Fragment>
                                                                  <div   className="order-cancel-div oder-cd">
                                                                      <Select
                                                                          options={options}
                                                                          defaultValue={options[0]}
                                                                          onChange={this.onCancelHandle}
                                                                      />
                                                                  </div>
                                                              </div>
                                                              <div className="order-cancel-details-div">
                                                                  <h6>Additional Information(Optional)</h6>
                                                                  <textarea onChange={(e)=>this.onAdditionalMessage(e)} className="form-control" rows="3"/>
                                                              </div>
                                                              {pd.payment_status==="Paid" &&
                                                                  <div className="order-cancel-details-div">
                                                                      <h6>Select preferred option:</h6>
                                                                      <p>Refund timeline: 4-5 working days after return quality check is completed by Daraz.</p>
                                                                      <p className="text-muted">Money will be refunded to your Selected account. Please fill in your  Account details bellow:</p>
                                                                      <div className="form-group mt-2">
                                                                          <label>Choose your refund method</label>
                                                                          <Select
                                                                              options={refundMethod}
                                                                              onChange={this.onChangeRefundMethod}
                                                                          />
                                                                          <div className="mb-2 text-danger"> {this.validator.message('refundMethod', this.state.refundMethod, 'required')}</div>
                                                                      </div>
                                                                      <div className="form-group mt-2">
                                                                          <label className="text-muted">Write down all of the necessary  information according your selected refund method that you have chosen. If you still have any confusion then please check it out our <Link><span className="text-dark">Refund policy </span></Link>  </label>
                                                                          <textarea onChange={(e)=>this.onRefundMethodDetails(e)} className="form-control" rows="3"/>
                                                                          <div className="mb-2 text-danger"> {this.validator.message('Refund details', this.state.refundMethodDetails, 'required')}</div>
                                                                      </div>
                                                                  </div>
                                                              }
                                                              <div className="order-cancel-details-div">
                                                                  <h6>Cancellation Policy</h6>
                                                                  <div className="order-cancel-policy">
                                                                      <p className="mb-2">  Before cancelling the order, kindly read thoroughly our following terms & conditions:</p>
                                                                      <ul>
                                                                          <li className="text-muted mb-2">1. Once you submit this form you agree to cancel the selected item(s) in your order. We will be unable to retrieve your order once it is cancelled.</li>
                                                                          <li className="text-muted mb-2">2. Once you confirm your item(s) cancellation, we will process your refund within 24 hours, provided the item(s) has not been handed over to the logistics partner yet. Please note that, if your item has already been handed over to the logistics partner we will be unable to proceed with your cancellation request and we will inform you accordingly.</li>
                                                                          <li className="text-muted mb-2">3. If you are cancelling your order partially, ie. not all the items in your order, then we will be unable to refund you the shipping fee.</li>
                                                                          <li className="text-muted mb-2">4. Once your item(s) has been successfully cancelled you will receive a notification from us with your refund summary.</li>
                                                                      </ul>
                                                                  </div>

                                                                  <div className="d-flex">
                                                                      <div className="form-check">
                                                                          <input className="form-check-input"
                                                                                 type="checkbox"
                                                                                 onClick={this.onTermsConditionCheck}
                                                                                 checked={this.state.termsCondition}
                                                                          />

                                                                      </div>
                                                                      <span className='acceptedBox ml-2'> I have read and accepted the <Link href="/seller-policy">seller Policy.</Link></span>

                                                                  </div>

                                                              </div>
                                                              {this.state.cancelReason!=="" && this.state.termsCondition ?
                                                                  <Fragment>
                                                                      {this.state.loadingBtn?
                                                                          <Button disabled={true} className="float-right mt-3"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                                              Loading...
                                                                          </Button>:
                                                                          <Button onClick={this.onSubmit} className="float-right mt-3">Submit</Button>
                                                                      }
                                                                  </Fragment>
                                                                   :
                                                                  <Button className="float-right mt-3 disabled">Submit</Button>
                                                              }
                                                          </Fragment>
                                                      }
                                                  })}
                                              </Fragment>
                                          </Fragment>:
                                          <Fragment>
                                              <Fragment>
                                                  <div className="emptyPage">
                                                      <div className="py-5">
                                                          <div className="text-center pageContent">
                                                              <h2 className='text-muted iconSize'><i className="fas fa-box-full"/></h2>
                                                              <h6 className='text-muted'>Return option is not setup yet</h6>
                                                              <Link href="/support-ticket">
                                                                  <div className='btn btn-outline-warning text-uppercase'>
                                                                     Talk to  support
                                                                  </div>
                                                              </Link>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </Fragment>
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

export default connect(mapStateToProps)(UserOrderCancelPart);


