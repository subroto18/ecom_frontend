import React, {PureComponent,Fragment} from 'react';
import AuthContext from "../../../Auth/Auth";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
const wishlistLogo = React.lazy(() => import("../../../asset/images/wishlist/wishlist.jpg"));
class DesktopWishlist extends PureComponent {
    constructor() {
        super();
    }
    onProductDel(index){
        this.context.onDelWishlistProduct(index);
    }
    static contextType = AuthContext;
    render() {
        return (
            <Fragment>
                {this.context.wishlistProduct.length>0 ?
                    <Fragment>
                        <div className="wishlist-desktop">
                            <div className="desktop-wishlist-arrow-up"></div>
                            <div className="card desktop-wishlist">
                                <div className="card-header desktop-cwc-header">
                                    Wishlist Items
                                </div>
                                {this.context.wishlistProductLoadingStatus ?
                                    <Fragment>
                                        <div className="card-data">
                                            <div  className="card-body desktop-cwc-body">
                                                <div className="loader-spinner">
                                                    <div className="spinner-border text-muted"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer desktop-cwc-footer">
                                            <div className="m-auto d-flex">
                                                <Link className="btn" to="/compare" className="m-auto">View Compare</Link>
                                            </div>
                                        </div>
                                    </Fragment>:
                                    <Fragment>
                                        {this.context.wishlistProduct.map((pd, i) => {
                                            if (i < 3) {
                                                return <div key={i} className="card-data">
                                                    <div className="card-body desktop-cwc-body">
                                                        <div className="cart-item-div d-flex ">
                                                            <div className="img-content">
                                                                <LazyLoadImage
                                                                    className="d-cart-img img-fluid"
                                                                    variant="top"
                                                                    src={`${this.context.backendApi}${pd.product_image}`}
                                                                />
                                                            </div>
                                                            <div className="cart-content">
                                                                <p className="cart-content-title">{pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." : pd.product_name}</p>
                                                                <p className="cart-content-price">
                                                                    {pd.product_discount !== undefined ?
                                                                        <Fragment>
                                                                            <span
                                                                                className="discountPrice">${pd.product_discount}</span>
                                                                            <span className="regularPrice ml-3 mr-3"><del>${pd.product_price}</del></span>
                                                                        </Fragment> :
                                                                        <Fragment>
                                                                            <span className="regularPrice ml-3 mr-3">${pd.product_price}</span>
                                                                        </Fragment>
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="cart-remove">
                                                                <i onClick={() => this.onProductDel(i)}
                                                                   className="far fa-times"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })
                                        }
                                        <div className="card-footer desktop-cwc-footer">
                                            <div className="m-auto d-flex">
                                                <Link  to="/compare" className="m-auto">View More</Link>
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </Fragment>
                  :
                    <Fragment>
                        <div className="wishlist-empty">
                            <div className="desktop-wishlist-arrow-up"></div>
                            <div className="card desktop-wishlist">
                                <div className="card-header desktop-cwc-header">
                                    Wishlist Items
                                </div>
                                <div className="card-body desktop-cwc-body">
                                    <img className="img-fluid" src={wishlistLogo} />
                                </div>
                                <div className="card-footer desktop-cwc-footer">
                                    <p>No  Item in your wishlist cart</p>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }
            </Fragment>
        );
    }
}
export default DesktopWishlist;