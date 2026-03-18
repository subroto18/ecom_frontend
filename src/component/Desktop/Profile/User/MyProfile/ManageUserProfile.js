import React, { PureComponent, Fragment } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../../../ClientApi/Api";
import Link from "next/link";
import Photo from "../../../../CommonScreen/Image/Photo";
import {connect} from "react-redux";
class ManageUserProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      email:"",
      msg:"",
      data:[]
    }
    this.validator = new SimpleReactValidator();
    this.onEmail  = this.onEmail.bind(this)
    this.onSubscribe  = this.onSubscribe.bind(this)
  }
  componentDidMount() {
    Api().get('getLatestOrder').then(res=>{
      this.setState({
        data:res.data
      })
    })
  }
  onEmail(e){
    this.setState({
      email:e.target.value
    })
  }
  onSubscribe(){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
    {
      const data = {
        email:this.state.email
      }
      Api().post('subscribe',data).then(res=>{
        if(res.data===1){
          this.setState({
            email:""
          })
        }
      }).catch(res=>{
      })
    }
  }

  render() {
    return (
      <Fragment>
        <span className="profile title mb-4">Manage my account</span>
        <Row>
          <Col lg={4} md={4} className="p-1">
            <Card
              className="profile-info-card "
              style={{ width: "100%", height: "100%" }}
            >
              <Card.Body>
                <Card.Title className="profile-info-card  title">
                  Personal Profile{" "}
                  <span className="title-profile-edit-option">
                    <Link href="/edit-profile">Edit</Link>
                  </span>
                </Card.Title>
                <Card.Text>
                  <p className="mb-1 profile-info-card name ">{this.props.name}</p>
                  <p className="profile-info-card  email">{this.props.email}</p>
                  <p className="profile-info-sub-news" >Subscribe to our newsletter</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8} md={8} className="p-1">
            <Card className="profile-info-card" style={{ width: "100%", height: "100%" }}>
              <Card.Body>
                <Card.Title className="profile-info-card title">
                  Address Book{" "}
                  <span className="title-profile-edit-option">
                    {this.props.shippingName==="" ?
                        <Link href="/add-address">Add new</Link>:
                        <Link href="/address">Edit</Link>
                    }
                  </span>
                </Card.Title>
                <div className="d-flex">
                  <Card.Text className="w-100">
                    <h6 className="profile-info-card address">
                      DEFAULT SHIPPING ADDRESS
                    </h6>
                    <p className="mb-1 font-weight-bold profile-info-card address">{this.props.shippingName}</p>
                    <p className="profile-info-card address">{this.props.shippingAddress} {this.props.shippingNumber}</p>
                  </Card.Text>
                  <Card.Text className="w-100">
                    <h6 className="profile-info-card title">
                      DEFAULT BILLING ADDRESS
                    </h6>
                    <p className="mb-1 font-weight-bold profile-info-card address name">
                      {this.props.match ?
                          <Fragment>  {this.props.shippingName}</Fragment>
                           :
                          <Fragment>  {this.props.billingName}</Fragment>
                      }
                    </p>
                    <p className="profile-info-card address address">
                      {this.props.match ?
                          <Fragment>  {this.props.shippingAddress}</Fragment>
                          :
                          <Fragment>  {this.props.billingAddress}</Fragment>
                      }
                    </p>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {this.state.data.length>0 &&
            <Col lg={12} md={8} className="p-1 my-3">
              <Fragment>
                <div className="orderDiv  d-flex">
                  <div className="orderDiv-l">
                    <h6>Latest orders</h6>
                  </div>
                </div>
                  <Fragment>
                    {this.state.data.map(pd=>{
                      return  <div className="orderDiv ">
                        <div className="d-flex justify-content-between">
                          <div className='orderDetails'>
                            <p> <span className="mr-2">Order</span><span className="orderId">{pd.orderId}</span></p>
                            <p> <span>Placed on {pd.orderData}</span></p>
                          </div>
                          <div className='manageText'>
                            <Link href={`orders/view/${pd.orderId.substring(1)}`}>MANAGE</Link>
                          </div>
                        </div>
                        <hr/>
                        {pd.orderProductInfo.map(product=>{
                          return <div className="d-flex">
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
                            <div   className="order-qnt-div oder-cd">
                              <p>Qty: {product.product_qnt}</p>
                            </div>
                            {product.cat_type!=="digital" &&
                                <div className="order-delivery-div oder-cd">
                                  {product.delivery_status==="Pending" ?
                                      <Fragment>
                                        {product.product_status!=="cancel" ?
                                            <Fragment>
                                              {product.shipping_days_same ?
                                                  <p>Estimated Delivery By {product.min_shipping_days}</p>:
                                                  <p>Estimated Delivery By {product.min_shipping_days} - {product.max_shipping_days}</p>
                                              }
                                            </Fragment>:
                                            <Fragment>
                                              <p>Cancelled</p>
                                            </Fragment>
                                        }
                                      </Fragment>
                                      :
                                      <Fragment>
                                        <p>{product.delivery_status}</p>
                                      </Fragment>
                                  }
                                </div>
                            }
                          </div>
                        })}
                      </div>
                    })}
                  </Fragment>
              </Fragment>
            </Col>
              }
        </Row>
      </Fragment>
    );
  }
}



function mapStateToProps(state) {
  const backendApi = state.starterReducer.backendApi;
  const name = state.userReducer.name;
  const email = state.userReducer.email;
  const shippingName = state.shippingBillingPickupReducer.shippingName;
  const shippingAddress = state.shippingBillingPickupReducer.shippingAddress;
  const match = state.shippingBillingPickupReducer.match;
  const billingName = state.shippingBillingPickupReducer.billingName;
  const shippingNumber = state.shippingBillingPickupReducer.shippingNumber;

  return {
    backendApi,
    name,
    email,
    shippingName,
    shippingAddress,
    match,
    billingName,
    shippingNumber
  };
}

export default connect(mapStateToProps)(ManageUserProfile);


