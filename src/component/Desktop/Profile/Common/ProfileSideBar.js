import React, {PureComponent,Fragment} from 'react';
import Api from "../../../../ClientApi/Api";
import {connect} from "react-redux";
import {notification} from "../../../../services/actions/notificationAction";
import Photo from "../../../CommonScreen/Image/Photo";
import Link from "next/link";
class ProfileSideBar extends PureComponent {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
        Api().get('get-notification').then(res=>{
            this.props.notification(res.data);
        })
    }


    render() {
        let avatar = this.props.avatar;
        let avatarUrl = "";
        if(avatar.length>0){
            avatar.map(pd=>{
                if(pd.id!==undefined){
                    avatarUrl = `${this.props.backendApi}${pd.media_url}`
                }else{
                    avatarUrl = pd.media_url;
                }
            })
        }else{
            avatarUrl = "/admin.png"
        }

        return (
            <Fragment>
                <div className="accountInfoDiv">
                  <div className="user-avatar-div">
                      <div className="d-flex  userAvatar">
                          <div>
                              <Photo
                                  src={avatarUrl}
                                  blurDataURL="/admin.png"
                                  class="user-avatar"
                              />
                          </div>
                          <div className="profile-name-div">
                              <p className="hello-user">Hello,</p>
                              <p>{this.props.name}</p>
                          </div>
                      </div>
                  </div>


                  <div className="user-profile-menu">
                      <h5><Link href="/dashboard">Manage my account</Link></h5>
                      <ul className="profile-sub-menu mb-4">
                        <li><Link href="/profile">My Profile</Link></li>
                        <li><Link href="/address">Address Book</Link></li>
                        <li><Link href="/my-coupon">Vouchers</Link></li>
                    </ul>
                      {this.props.role===2 &&
                        <Fragment>
                            <h5>Manage Shop</h5>

                            <ul className="profile-sub-menu mb-4">
                                <li><Link href="/seller-products">Products</Link></li>
                                <li><Link href="/seller-digital-products">Digital Products</Link></li>
                                <li><Link href="/seller-orders">Orders  {this.props.newOrder>0 && <span className="seller-new-notification">{this.props.newOrder}</span>}</Link></li>
                                {this.props.couponActivation!==0 &&
                                    <li><Link href="/coupon">Coupon</Link></li>
                                }
                                <li><Link href="/product-reviews"> Product Reviews   {this.props.productReview>0 && <span className="seller-new-notification">{this.props.productReview}</span>}</Link></li>
                                <li><Link href="/shop-setting">Shop Settings</Link></li>
                            </ul>
                            <h5>Request</h5>

                            <ul className="profile-sub-menu mb-4">
                                <li><Link href="/return-request">Return Request {this.props.returnRequest>0 && <span className="seller-new-notification">{this.props.returnRequest}</span>}</Link></li>
                                <li><Link href="/replace-request">Replace Request {this.props.replaceRequest>0 && <span className="seller-new-notification">{this.props.replaceRequest}</span>}</Link></li>
                                <li><Link href="/refund-request">Refund Request {this.props.refundRequest>0 && <span className="seller-new-notification">{this.props.refundRequest}</span>}</Link></li>
                            </ul>
                            <h5>Financial</h5>

                            <ul className="profile-sub-menu mb-4">
                                <li><Link href="/commission-history">Commission history</Link></li>
                                <li><Link href="/money-withdraw">Money withdraw</Link></li>
                            </ul>

                        </Fragment>
                      }

                    <h5><Link href="/my-orders">My Orders</Link></h5>
                    <ul className="profile-sub-menu mb-4">
                        <li><Link  href="/my-returns">My Returns</Link></li>
                        <li><Link  href="/my-replaces">My Replace</Link></li>
                        <li><Link  href="/my-cancellation">My Cancellations</Link></li>
                    </ul>

                      <h5 className="mb-4"><Link href="/my-downloads">My Downloads</Link></h5>
                    <h5 className="mb-4"><Link href="/reviews">My Reviews</Link></h5>
                    <h5 className="mb-4"><Link href="/wishlist">My Wishlist</Link></h5>
                    {this.props.walletActivation!==0 &&
                        <h5 className="mb-4"><Link href="/my-wallet">My Wallet</Link></h5>
                    }
                    <h5 className="mb-4"><Link href="/support-ticket">Support ticket</Link></h5>
                 </div>
                </div>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    notification
};

function mapStateToProps(state) {
    const avatar = state.userReducer.avatar;
    const name = state.userReducer.name;
    const role = state.userReducer.role;
    const backendApi = state.starterReducer.backendApi;
    const couponActivation = state.voucherReducer.couponActivation;
    const walletActivation = state.walletReducer.walletActivation;
    const newOrder = state.notificationReducer.newOrder;
    const productReview = state.notificationReducer.productReview;
    const returnRequest = state.notificationReducer.returnRequest;
    const replaceRequest = state.notificationReducer.replaceRequest;
    const refundRequest = state.notificationReducer.refundRequest;


    return {
        avatar,
        name,
        role,
        backendApi,
        couponActivation,
        walletActivation,
        newOrder,
        productReview,
        returnRequest,
        replaceRequest,
        refundRequest
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSideBar);


