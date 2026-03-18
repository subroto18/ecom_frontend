import React, {PureComponent, Fragment} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ContentLoader from "react-content-loader";
import {billingModalShow, pickUpModalShow, shippingModalShow} from "../../../services/actions/shippingBillingPickupAction";
import {getVoucher} from "../../../services/actions/voucherAction";
import {connect} from "react-redux";

class ShippingBilling extends PureComponent {
    constructor() {
        super();
        this.onEditShipping = this.onEditShipping.bind(this)
        this.onEditBilling = this.onEditBilling.bind(this)
        this.onPickUpPoint = this.onPickUpPoint.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0)
    }
    onEditShipping(){
        this.props.shippingModalShow();
    }
    onEditBilling(){
        this.props.billingModalShow();
    }
    onPickUpPoint(){
        this.props.pickUpModalShow();
    }
    onVoucher(e){
        this.setState({
            voucher:e.target.value
        })
    }

    onChangeVoucher(e){
        this.setState({
            voucher:"",
            matchVoucher:false,
            invalidVoucher:false,
            totalCouponDiscount:0,
            totalCouponDiscountPrice:0
        })
        const data = {
            totalCouponDiscount:0,
            totalCouponDiscountPrice:0,
            voucher:"",
            voucherDiscountType:""
        }
        this.props.getVoucher(data);
    }


    render() {
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
        );
        return (
            <div className='shipingBilling'>
                <h4 className="shipingBillingTitle">Shipping & Billing</h4>
                <Fragment>{this.props.shippingBillingLoadingStatus ?
                    <Fragment>
                        <MyLoader/>
                    </Fragment>
                    :
                    <Fragment>
                        {Array.isArray(this.props.pickupPointData) ===false ?
                            <Fragment>
                                <div key={1} className="checkoutShippingAddress">
                                    <div className="shippingAddressInitial">
                                        <div>
                                            <i className="far fa-map-marker-alt checkoutIcons"></i>{" "}
                                            <span className="checkoutAddressName">{this.props.shippingName}</span>
                                        </div>
                                        {this.props.mobileCheckout ?
                                            <Button onClick={this.onPickUpPoint} className="checkoutEdit" >Edit</Button>:
                                            <Button onClick={this.onPickUpPoint} className="checkoutEdit" >Edit</Button>
                                        }
                                    </div>
                                    <div className="checkoutFullAddress">
                                        <span>
                                            <Badge className="badge-info">pickup zone</Badge>
                                            {this.props.pickupPointData.address} , {this.props.pickupPointData.area}
                                        </span>
                                        <p onClick={this.onEditShipping} className="title-profile-edit-option">Change shipping address</p>
                                    </div>
                                    <div className="checkoutBillingAddress">
                                        <div className="billingAddressInitial">
                                            <div>
                                                <i className="far fa-file-invoice checkoutIcons"></i>{" "}
                                                <span className="billSameAddress">Bill to the same address</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>:
                            <Fragment>
                                <div className="checkoutShippingAddress">
                                    <div className="shippingAddressInitial">
                                        <div>
                                            <i className="far fa-map-marker-alt checkoutIcons"></i>{" "}
                                            <span className="checkoutAddressName">{this.props.shippingName}</span>
                                        </div>
                                        {this.props.mobileCheckout ?
                                            <Button onClick={this.onEditShipping} className="checkoutEdit" >Edit</Button>:
                                            <Button onClick={this.onEditShipping} className="checkoutEdit" >Edit</Button>
                                        }
                                    </div>

                                    <div className="checkoutFullAddress">
                                  <span>
                                    <Badge className="badge-info">{this.props.shippingPlace}</Badge>
                                      {this.props.shippingAddress}
                                  </span>
                                    </div>
                                    <Fragment>
                                        {this.props.pickup_point_status!==0 &&
                                          <Fragment>
                                              {this.props.pickupPoint>0 &&
                                                  <Fragment>{
                                                      this.props.mobileCheckout ?
                                                          <div onClick={this.onPickUpPoint} className="checkoutPickupPoint">
                                                    <span>
                                                        Free delivery on collecting your order from HeyShop
                                                        Pick-up Point
                                                    </span>
                                                              <br />
                                                              <span className="ppSuggested">
                                                 {this.props.pickupPoint} suggested collection point nearby
                                                  </span>
                                                          </div>:
                                                          <div onClick={this.onPickUpPoint} className="checkoutPickupPoint">
                                                    <span>
                                                        Free delivery on collecting your order from HeyShop
                                                        Pick-up Point
                                                   </span>
                                                              <br />
                                                              <span className="ppSuggested">
                                                     {this.props.pickupPoint} suggested collection point nearby
                                                   </span>
                                                          </div>
                                                  }</Fragment>
                                              }
                                          </Fragment>
                                        }
                                    </Fragment>
                                </div>
                                <div className="checkoutBillingAddress">
                                    {this.props.match ?
                                        <div className="checkoutBillingAddress">
                                            <div className="billingAddressInitial">
                                                <div>
                                                    <i className="far fa-file-invoice checkoutIcons"></i>{" "}
                                                    <span className="billSameAddress">Bill to the same address</span>
                                                </div>
                                                {this.props.mobileCheckout ?
                                                    <Button onClick={this.onEditBilling} className="checkoutEdit" >Edit</Button>:
                                                    <Button onClick={this.onEditBilling} className="checkoutEdit" >Edit</Button>
                                                }
                                            </div>

                                        </div> :
                                        <Fragment>
                                            <div className="billingAddressInitial">
                                                <div>
                                                    <i className="far fa-map-marker-alt checkoutIcons"></i>{" "}
                                                    <span className="checkoutAddressName">{this.props.billingName}</span>
                                                </div>
                                                {this.props.mobileCheckout ?
                                                    <Button onClick={this.onEditBilling} className="checkoutEdit" >Edit</Button>:
                                                    <Button onClick={this.onEditBilling} className="checkoutEdit" >Edit</Button>
                                                }
                                            </div>
                                            <div className="checkoutFullAddress">
                                      <span>
                                        <Badge className="badge-info">{this.props.billingPlace}</Badge> {this.props.billingAddress}
                                      </span>
                                            </div>
                                        </Fragment>
                                    }
                                </div>
                                <div className="checkoutPhone">
                                    <div className="phoneInitial">
                                        <div>
                                            <i className="far fa-phone checkoutIcons"></i>{" "}
                                            <span className="checkoutPhone">{this.props.shippingPhone}</span>
                                        </div>
                                    </div>
                                </div>
                                {this.props.shippingEmail!="" &&
                                    <div className="checkoutEmail">
                                        <div className="emailInitial">
                                            <div>
                                                <i className="far fa-envelope checkoutIcons"></i>{" "}
                                                <span className="checkoutEmail">{this.props.shippingEmail}</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </Fragment>
                        }
                    </Fragment>
                }</Fragment>
            </div>
        );
    }
}


const mapDispatchToProps = {
    billingModalShow,
    pickUpModalShow,
    shippingModalShow,
    getVoucher
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const shippingBillingLoadingStatus = state.shippingBillingPickupReducer.shippingBillingLoadingStatus;
    const pickupPointData = state.shippingBillingPickupReducer.pickupPointData;
    const shippingName = state.shippingBillingPickupReducer.shippingName;
    const shippingPlace = state.shippingBillingPickupReducer.shippingPlace;
    const shippingAddress = state.shippingBillingPickupReducer.shippingAddress;
    const pickupPoint = state.shippingBillingPickupReducer.pickupPoint;
    const billingName = state.shippingBillingPickupReducer.billingName;
    const billingPlace = state.shippingBillingPickupReducer.billingPlace;
    const billingAddress = state.shippingBillingPickupReducer.billingAddress;
    const shippingPhone = state.shippingBillingPickupReducer.shippingPhone;
    const shippingEmail = state.shippingBillingPickupReducer.shippingEmail;
    const match = state.shippingBillingPickupReducer.match

    return {
        isAuthorized,
        shippingBillingLoadingStatus,
        pickupPointData,
        shippingName,
        shippingPlace,
        shippingAddress,
        pickupPoint,
        billingName,
        billingPlace,
        billingAddress,
        shippingPhone,
        shippingEmail,
        match
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingBilling);


