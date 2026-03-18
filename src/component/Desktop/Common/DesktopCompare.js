import React, {PureComponent,Fragment} from 'react';
import AuthContext from "../../../Auth/Auth";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
const compareLogo = React.lazy(() => import("../../../asset/images/compare/compare.png"));
class DesktopCompare extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:false
        }
        this.onProductDel = this.onProductDel.bind(this)
    }
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    onProductDel(index){
        this.context.onDelCompareProduct(index);
    }
    static contextType = AuthContext;
    render() {
        let loading =  this.context.compareProductLoadingStatus;
        let data = this.context.compareProduct;
        return (
            <Fragment>
                {data.length>0 ?
                    <div className="compare-desktop">
                        <div className="desktop-compare-arrow-up"></div>
                        <div className="card desktop-compare">
                            <div className="card-header desktop-cwc-header">
                                Compare Items
                            </div>
                            {loading ?
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
                                     <div className="dc-b">
                                         {data.map((pd,i)=>{
                                             return     <div key={i} className="card-data">
                                                 <div  className="card-body desktop-cwc-body">
                                                     <div className="cart-item-div d-flex ">
                                                         <div className="img-content">
                                                             <LazyLoadImage
                                                                 className="d-cart-img img-fluid"
                                                                 variant="top"
                                                                 src={`${this.context.backendApi}${pd.product_image}`}
                                                             />
                                                         </div>
                                                         <div className="cart-content">
                                                             <p className="cart-content-title">{  pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." :  pd.product_name}</p>
                                                             <p className="cart-content-price">
                                                                 {pd.product_discount!=null ?
                                                                     <Fragment>
                                                                         <span className="discountPrice">${pd.product_discount}</span>
                                                                         <span className="regularPrice ml-3 mr-3"><del>${pd.product_price}</del></span>
                                                                     </Fragment> :
                                                                     <Fragment>
                                                                         <span className="regularPrice ml-3 mr-3">${pd.product_price}</span>
                                                                     </Fragment>
                                                                 }
                                                             </p>
                                                         </div>
                                                         <div className="cart-remove">
                                                             <i onClick={()=>this.onProductDel(i)}  className="far fa-times"></i>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         })}
                                     </div>
                                    <div className="card-footer desktop-cwc-footer">
                                        <div className="m-auto d-flex">
                                            <Link  to="/compare" className="m-auto">View All</Link>
                                        </div>
                                    </div>
                                </Fragment>
                                }
                        </div>
                    </div>
                    :
                    <div className="compare-empty">
                        <div className="desktop-compare-arrow-up"></div>
                        <div className="card desktop-compare d-compare-empty">
                            <div className="card-header desktop-cwc-header">
                                Compare Items
                            </div>
                            <div className="card-body desktop-cwc-body">
                                <img className="img-fluid" src={compareLogo} />
                            </div>
                            <div className="card-footer desktop-cwc-footer">
                                <p>No  Item in your compare cart</p>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}
export default DesktopCompare;