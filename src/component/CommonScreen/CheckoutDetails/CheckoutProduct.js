import React, { Fragment, Component} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContentLoader from "react-content-loader";
import {connect} from "react-redux";
import Photo from "../Image/Photo";
import {onCurrencyFormat} from "../../../services/common";

class CheckoutProduct extends Component {

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="300" height="10"/>
            </ContentLoader>
        );
        let shippingDays = 0;
        let selectedProduct = this.props.checkoutProduct;
        selectedProduct.map(pd => {
            if (pd.shipping_days > shippingDays) {
                shippingDays = pd.shipping_days;
            }
        });

        return (
            <Fragment>
                <div className="packageHeader">
                    <Row>
                        {this.props.singleCheckoutProductLoading ?
                            <Fragment>
                                <div className="shipment-loader">
                                    <MyLoader/>
                                </div>
                            </Fragment> :
                            <Fragment className="package-shipped">
                                <Col lg={6} md={6} sm={6} xs={6} className="text-lg-left text-md-left ">
                                    <span className="packageShipped">Shipped by </span>
                                    <span className="packageSeller">{this.props.selectedProductShop}</span>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6} className="text-lg-right text-md-right">
                                    <span className="packageEstS">Estimated shipping </span>
                                    <span className="packageCount"> {shippingDays} days</span>
                                </Col>
                            </Fragment>
                        }
                    </Row>
                </div>
                <div>
                    <Fragment>
                        {this.props.singleCheckoutProductLoading ?
                            <Fragment>
                                <div className="packageDiv packageDivPart  mt-3">
                                    <div className="productDetails">
                                        <Row>
                                            <Col lg={12} xl={12}>
                                                <MyLoader/>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Fragment>
                            :
                            <Fragment>
                                {this.props.checkoutProduct.map(pd => {
                                    return <div className="packageDiv packageDivPart mt-3">
                                        <div className="productDetails">
                                            <Row>
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <div className="pDetail">
                                                        <div>

                                                            <Photo
                                                                src={`${this.props.backendApi}${pd.product_image}`}
                                                                blurDataURL="/blank.jpg"
                                                                class="checkoutProductImg"
                                                            />

                                                        </div>
                                                        <div className="checkoutProductDetail checkoutProductDetailDiv">
                                                            <span
                                                                className="checkoutProductName">{pd.productName}</span>
                                                            <br/>
                                                            <span className="checkoutProductVariation">
                                                                <span className="mr-1">Seller:</span>
                                                                {this.props.selectedProductShop} ,
                                                                {pd.variation != null &&
                                                                    <Fragment>{
                                                                        pd.variation.map((pd, i) => {
                                                                            return <Fragment className="text-left mb-1"><span
                                                                                className="variation vname">{(Object.keys(pd))[0]}: </span>
                                                                                <span
                                                                                    className="variation vvalue">{(Object.values(pd))[0]}</span></Fragment>
                                                                        })
                                                                    }
                                                                    </Fragment>
                                                                }
                                                                <div className="checkout-priceDiv">
                                                                   {pd.discount_price != null ?
                                                                       <Fragment>
                                                                           {symbolFormat === 1 ?
                                                                               <span
                                                                                   className="checkoutProductSalePrice">{onCurrencyFormat(pd.discount_price * pd.quantity)}{defaultCurrency}</span> :
                                                                               <span
                                                                                   className="checkoutProductSalePrice">{defaultCurrency}{onCurrencyFormat(pd.discount_price * pd.quantity)}</span>
                                                                           }
                                                                       </Fragment> :
                                                                       <Fragment>
                                                                           {symbolFormat === 1 ?
                                                                               <span
                                                                                   className="checkoutProductSalePrice">{onCurrencyFormat(pd.product_price * pd.quantity)}{defaultCurrency}</span> :
                                                                               <span
                                                                                   className="checkoutProductSalePrice">{defaultCurrency}{onCurrencyFormat(pd.product_price * pd.quantity)}</span>
                                                                           }
                                                                       </Fragment>
                                                                   }
                                                                </div>
                                                                <div className="qntDiv">
                                                                    <span
                                                                        className="checkoutProductQuantity">QTY: {pd.quantity}</span>
                                                                </div>
                                                          </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                })}
                            </Fragment>
                        }
                    </Fragment>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const backendApi = state.starterReducer.backendApi;
    const checkoutProduct = state.productReducer.checkoutProduct;
    const isAuthorized = state.userReducer.isAuthorized;
    const singleCheckoutProductLoading = state.productReducer.singleCheckoutProductLoading;
    const selectedProductShop = state.productReducer.selectedProductShop;

    return {
        defaultCurrency,
        currencySymbolFormat,
        checkoutProduct,
        isAuthorized,
        backendApi,
        singleCheckoutProductLoading,
        selectedProductShop
    };
}

export default connect(mapStateToProps)(CheckoutProduct);

