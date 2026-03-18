import React, {PureComponent,Fragment} from 'react';
import AuthContext from "../../../Auth/Auth";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
const cartLogo = React.lazy(() => import('../../../asset/images/cart/card-background.jpg'));
class DesktopCart extends PureComponent {
    onProductDel(product){
        let data = {
            id:product.id,
            variation:product.selectedVariation
        }
        this.context.onDetailsDelCartProduct(data);
        this.setState({
            selectedProduct:[]
        })
    }
    static contextType = AuthContext;
    render() {
        let product = [];
        if(this.context.cartProductDetails.length>0){
            this.context.cartProductDetails.map(pd=>{
                if(pd.cart_product.length>0){
                    let single_product  = pd.cart_product;
                    single_product.map(sp=>{
                        product.push(sp);
                    })
                }
            })
        }
        return (
            <Fragment>
                {this.context.cartProductDetails.length>0 ?
                    <div className="cart-desktop">
                        <div className="desktop-arrow-up"></div>
                        <div className="card desktop-cwc">
                            <div className="card-header desktop-cwc-header">
                                Cart Items
                            </div>
                            {this.context.cartProductLoadingStatus ?
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
                                </Fragment>
                                :
                                <Fragment>
                                    {product.map((pd, i) => {
                                            return <div className="card-data">
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
                                                            <p className="cart-content-title">{pd.productName.length > 20 ? pd.productName.substring(0, 20) + "..." : pd.productName}</p>
                                                            <p className="cart-content-price"><span className="deskto-quantity mr-1">{pd.quantity}X</span><span className="price">${pd.product_price}</span></p>
                                                        </div>
                                                        <div className="cart-remove">
                                                            <i onClick={() => this.onProductDel(pd)}
                                                               className="far fa-times"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                   </div>
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
                    :
                    <div className="cart-empty">
                        <div className="desktop-arrow-up"></div>
                        <div className="card desktop-cwc d-cart-empty">
                            <div className="card-header desktop-cwc-header">
                                Cart Items
                            </div>
                            <div className="card-body desktop-cwc-body">
                                <img className="img-fluid" src={cartLogo} />
                            </div>
                            <div className="card-footer desktop-cwc-footer">
                                <p>No Item in your cart </p>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}
export default DesktopCart;