import React, {PureComponent,Fragment} from 'react';
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import AuthContext from "../../../../Auth/Auth";
class SellerProfileSideBar extends PureComponent {
    constructor() {
        super();
        this.state = {
            expanded:false
        }
    }
     handleChange = (panel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded  ? panel : false});
    };
    static contextType = AuthContext;
    render() {
        return (
            <Fragment>
                <div className="accountInfoDiv">
                    <div className="user-avatar-div">
                        <div className="d-flex">
                            <div>
                                {this.context.avatar.length>0 ?
                                    <LazyLoadImage
                                        placeholderSrc={process.env.PUBLIC_URL + "/admin.png"}
                                        className="user-avatar"
                                        variant="top"
                                        src={ this.context.avatar.map(pd=>{
                                            return `http://localhost:8000/${pd.media_url}`
                                        }) }
                                        width="100%"
                                        height="100%"
                                    /> :
                                    <LazyLoadImage
                                        placeholderSrc={process.env.PUBLIC_URL + "/admin.png"}
                                        className="user-avatar"
                                        variant="top"
                                        src={process.env.PUBLIC_URL + "/admin.png"}
                                        width="100%"
                                        height="100%"
                                    />
                                }
                            </div>
                            <div className="profile-name-div">
                                <p className="hello-user">Hello,</p>
                                <p>{this.context.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="user-profile-menu">
                        <h5><Link to="/dashboard">Dashboard</Link></h5>
                        <h5><Link>Manage Shop</Link></h5>
                        <ul className="profile-sub-menu mb-4">
                            <li><Link to="/seller-products">Products</Link></li>
                            <li><Link to="/seller-digital-products">Digital Products</Link></li>
                            <li><Link to="/seller-orders">Orders</Link></li>
                            <li><Link to="/coupon">Coupon</Link></li>
                            <li><Link to="/product-reviews">Product Reviews</Link></li>
                            <li><Link to="/shop-setting">Shop Settings</Link></li>
                        </ul>
                        <h5><Link>Request</Link></h5>
                        <ul className="profile-sub-menu mb-4">
                            <li><Link to="/return-request">Return Request</Link></li>
                            <li><Link to="/replace-request">Replace Request</Link></li>
                            <li><Link to="/refund-request">Refund Request</Link></li>
                        </ul>
                        <h5><Link>Financial</Link></h5>
                        <ul className="profile-sub-menu mb-4">
                            <li><Link to="/commission-history">Commission history</Link></li>
                            <li><Link to="/commission-history">Payment history</Link></li>
                            <li><Link to="/money-withdraw">Money withdraw</Link></li>
                        </ul>
                        <h5><Link>Manage account</Link></h5>
                        <ul className="profile-sub-menu mb-4">
                            <li><Link to="/profile">My Profile</Link></li>
                            <li><Link to="/address">Address Book</Link></li>
                            <li><Link to="/my-coupon">Vouchers</Link></li>
                        </ul>
                        <h5><Link to="/my-orders">My Orders</Link></h5>
                        <ul className="profile-sub-menu mb-4">
                            <li><Link  to="/my-returns">My Returns</Link></li>
                            <li><Link  to="/my-replaces">My Replace</Link></li>
                            <li><Link  to="/my-refunds">My Refunds</Link></li>
                            <li><Link  to="/my-cancellation">My Cancellations</Link></li>
                        </ul>
                        <h5 className="mb-4"><Link to="/reviews">My Reviews</Link></h5>
                        <h5 className="mb-4"><Link to="/wishlist">My Wishlist</Link></h5>
                        <h5 className="mb-4"><Link to="/my-wallet">My Wallet</Link></h5>
                        <h5 className="mb-4"><Link to="/support-ticket">Support ticket</Link></h5>
                        <h5><Link to="/commission-history">Commission history</Link></h5>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default SellerProfileSideBar;