import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Api from "../../../../../ClientApi/Api";
import SimpleReactValidator from "simple-react-validator";
import {connect} from "react-redux";
import Photo from "../../../Image/Photo";
import Select from "react-select";
import Link from "next/link";
import Router from "next/router";
import {alert} from "../../../../../services/common";
class UserOrderReturnPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            loading:true,
            data:[],
            returnReason:"",
            additionalReason:"",
            termsCondition:false,
            refundMethod:'',
            refundMethodDetails:'',
            dropOffAddress:'',
            courierChecked:false,
            dropOffChecked:false,
            dropOffAddressChecked:"",
            selectedDropOffOption:"",
            refundOptionSetup:true,
            loadingBtn:false
        }
        this.onReturnReason=  this.onReturnReason.bind(this)
        this.onAdditionalMessage=  this.onAdditionalMessage.bind(this)
        this.onTermsConditionCheck=  this.onTermsConditionCheck.bind(this)
        this.onChangeRefundMethod = this.onChangeRefundMethod.bind(this)
        this.onRefundMethodDetails = this.onRefundMethodDetails.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onShipment = this.onShipment.bind(this)
        this.onDropOffAddress = this.onDropOffAddress.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0);

        let productUniqueId = window.location.pathname.split("/")[5];
        let returnProductId = window.location.pathname.split("/")[7];
        let returnOrderId =  window.location.pathname.split("/")[3];

        const data = {
            productUniqueId : productUniqueId,
            returnProductId:returnProductId,
            returnOrderId:returnOrderId
        }
        Api().post('getReturnProduct',data).then(res=>{
           this.setState({
               data:res.data,
               loading:false
           })
        }).catch(error=>{
        })
    }
    onReturnReason(e){
        this.setState({
            returnReason:e.value
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
    onShipment(e){
        this.setState({
            selectedDropOffOption:e.target.value
        })
        if(e.target.value==="courier"){
            this.setState({
                courierChecked:true,
                dropOffChecked:false,
                dropOffAddressChecked:''
            })
        }else{
            this.setState({
                courierChecked:false,
                dropOffChecked:true
            })
        }
    }
    onDropOffAddress(e){
        this.setState({
            dropOffAddressChecked:e.target.value
        })
    }
    onSubmit(){
        if (this.validator.allValid()) {
            let returnReason = this.state.returnReason;
            let additionalReason = this.state.additionalReason;

            let productUniqueId = window.location.pathname.split("/")[5];
            let returnProductId =  window.location.pathname.split("/")[7];
            let returnOrderId =  window.location.pathname.split("/")[3];


            let  refundMethod = this.state.refundMethod;
            let  refundMethodDetails = this.state.refundMethodDetails;
            let selectedDropOffOption = this.state.selectedDropOffOption;
            let selectedDropOffAddress =  this.state.dropOffAddressChecked;
            const data = {
                returnReason:returnReason,
                additionalReason:additionalReason,
                productUniqueId:productUniqueId,
                returnProductId :returnProductId,
                returnOrderId:returnOrderId,
                refundMethod:refundMethod,
                refundMethodDetails:refundMethodDetails,
                selectedDropOffOption:selectedDropOffOption,
                selectedDropOffAddress:selectedDropOffAddress
            }

            if(this.state.selectedDropOffOption=="dropOff"){

                if(this.state.dropOffAddressChecked!==""){
                    this.onPostData(data);
                }else{
                    window.scroll(0,0)
                }
            }else if(this.state.selectedDropOffOption=="courier"){
                this.onPostData(data);
            }
        } else {
            window.scroll(0,0)
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }
    onPostData(data){
        this.setState({
            loadingBtn:true
        })
        Api().post('postReturnOrder',data).then(res=>{
            if(res.data===1){
                alert('success','Refund request has been placed');
                Router.push("/my-returns")
            }
            this.setState({
                loadingBtn:true
            })
        }).catch(error=>{
            this.setState({
                loadingBtn:true
            })
        })
    }


  render() {
    const options = [
        { value: 'Item is defective or not working', label: 'Item is defective or not working' },
        { value: 'Item or accessory is missing in the package', label: 'Item or accessory is missing in the package' },
        { value: 'Item does not match description or picture', label: 'Item does not match description or picture' },
        { value: 'I did not order this size', label: 'I did not order this size' },
        { value: 'I received the wrong item', label: 'I received the wrong item' },
        { value: 'I received the wrong item', label: ' I received the wrong item' },
        { value: 'Item is damaged/broken/has dent or scratches', label: 'Item is damaged/broken/has dent or scratches' },
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

      if(this.state.loading){
          return <Fragment>
              <div className="loader-spinner-div mt-3">
                  {loader}
              </div>
          </Fragment>
      }else if(this.state.data.length>0){
          return      <Fragment>
              {this.state.refundOptionSetup ?
                  <Fragment>
                      {this.state.data.map(pd=>{
                          return  <Fragment>
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
                                      <div   className="order-qnt-div oder-cd">
                                          <p>Qty: {pd.product_quantity}</p>
                                      </div>
                                  </Fragment>
                                  <div className="order-cancel-div oder-cd selectInput">
                                      <Select
                                          className='inputTextSize'
                                          options={options}
                                          onChange={this.onReturnReason}
                                      />
                                      <div className="mb-2 text-danger inputTextSize"> {this.validator.message('returnReason', this.state.returnReason, 'required')}</div>
                                  </div>
                              </div>
                              <div className="order-cancel-details-div returnHeader">
                                  <h6>Additional Information(Optional)</h6>
                                  <textarea onChange={(e)=>this.onAdditionalMessage(e)} className="form-control" rows="3"/>
                              </div>
                              <div className="order-cancel-details-div returnHeader">
                                  <h6>Select preferred option:</h6>
                                  <p>Refund timeline: 4-5 working days after return quality check is completed by Heyshop.</p>
                                  <p className="text-muted">Money will be refunded to your Selected account. Please fill in your  Account details bellow:</p>
                                  <div className="form-group mt-2 selectOptionDiv">
                                      <label className='selectOption'>Choose your refund method</label>
                                      <Select
                                          className='inputTextSize'
                                          options={refundMethod}
                                          onChange={this.onChangeRefundMethod}
                                      />
                                      <div className="mb-2 text-danger inputTextSize"> {this.validator.message('refundMethod', this.state.refundMethod, 'required')}</div>
                                  </div>
                                  <div className="form-group mt-2">
                                      <label className="text-muted information">Write down all of the necessary  information according your selected refund method that you have chosen. If you still have any confusion then please check it out our <Link href="/refund-policy"><span className="text-dark">Refund policy </span></Link>  </label>
                                      <textarea onChange={(e)=>this.onRefundMethodDetails(e)} className="form-control" rows="3"/>
                                      <div className="mb-2 text-danger inputTextSize"> {this.validator.message('refund_details', this.state.refundMethodDetails, 'required')}</div>
                                  </div>
                              </div>
                              <div className="order-cancel-details-div">
                                  <h6>Select Shipment option:</h6>
                                  <div className="form-group selectOptionDiv">
                                      <input onChange={this.onShipment} className="mr-2"  type="radio" value="courier" checked={this.state.courierChecked}  name="shipment" />
                                      <span>Courier pick up</span>
                                  </div>
                                  {this.state.courierChecked &&
                                      <div className="pickupAddress mb-3">
                                          <p className="text-muted">Pickup Address:</p>
                                          <Fragment>
                                              {pd.shipping_address.map(data=>{
                                                  return <Fragment>
                                                      <div className="my-2">
                                                          <p>{data.name} </p>
                                                          <p>{data.phone} </p>
                                                          <p>{data.address} ,{ data.area},{ data.city},{ data.country} </p>
                                                      </div>
                                                  </Fragment>
                                              })}
                                          </Fragment>
                                          <div className='logistics-choices'>
                                              <p>will contact you for the pickup in the next couple of working days after request submission</p>
                                          </div>
                                      </div>
                                  }
                                  <div className="form-group">
                                      <input onChange={this.onShipment}  className="mr-2"  type="radio" checked={this.state.dropOffChecked}  value="dropOff" name="shipment"  />
                                      <span>Drop off</span>
                                  </div>
                                  {this.state.dropOffChecked &&
                                      <div className="dropOffDiv">
                                          <p className="text-muted">Drop off your return item(s) at a nearby courier office.</p>
                                          <div className='logistics-choices'>
                                              <p>Select drop off courier:</p>
                                              <div className="dropOffArea">
                                                  <Row className='pGatewatRadioRow'>
                                                      {pd.drop_off_address.map(data=>{
                                                          return   <Col lg={3} md={4} sm={4} xs={12} className="text-center">
                                                              <label className="pGatewayLabel mobilePGatewayLabel">
                                                                  <input onChange={this.onDropOffAddress} className="pGatewayRadio" name="dropOffAddress"  type="radio" value={data.index}/>
                                                                  <div className="gatewayReturnDiv text-left">
                                                                      <h6>{data.name}</h6>
                                                                      <p>{data.phone} </p>
                                                                      <p>{data.email} </p>
                                                                      <p>{data.address}</p>
                                                                  </div>
                                                              </label>
                                                          </Col>
                                                      })}
                                                  </Row>
                                              </div>
                                              {this.state.selectedDropOffOption!=="courier" &&
                                                  <Fragment>
                                                      {this.state.dropOffAddressChecked=="" &&
                                                          <div className="mb-2 text-danger inputTextSize">
                                                              The drop off address field is required.</div>
                                                      }
                                                  </Fragment>
                                              }
                                          </div>
                                      </div>
                                  }
                                  <div className="mb-2 text-danger inputTextSize"> {this.validator.message('dropOffPoint', this.state.selectedDropOffOption, 'required')}</div>
                              </div>
                              <div className="order-cancel-details-div">
                                  <h6>Cancellation Policy</h6>
                                  <div className="order-cancel-policy">
                                      <p className="mb-2">  Before cancelling the order, kindly read thoroughly our following terms & conditions:</p>
                                      <ul className='information'>
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
                                      <span className='acceptedBox ml-2'> I have read and accepted the <Link href="/refund-policy">Refund Policy.</Link></span>
                                  </div>

                              </div>
                              { this.state.termsCondition ?
                                  <Fragment>
                                      {this.state.loadingBtn ?
                                          <Button disabled={true} className="float-right mt-3"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                              Loading...
                                          </Button> :
                                          <Button onClick={this.onSubmit} className="float-right mt-3">Submit</Button>
                                      }
                                  </Fragment>
                                  :
                                  <Button className="float-right mt-3 disabled">Submit</Button>
                              }
                          </Fragment>
                      })}
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
      }else{
          Router.push("/dashboard")
      }

  }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(UserOrderReturnPart);

