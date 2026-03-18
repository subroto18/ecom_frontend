import React, {PureComponent, Fragment} from 'react';
import ContentLoader from "react-content-loader";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Reviews from "../../CommonScreen/Reviews/Reviews";
import {addCompareProduct} from "../../../services/actions/compareAction";
import {popupLoginOpen} from "../../../services/actions/commonAction";
import {addWishlistProduct} from "../../../services/actions/wishlishAction";
import {cartVariationShow, getSingleProduct} from "../../../services/actions/productAction";
import {connect} from "react-redux";
import Router from "next/router";
import Photo from "../../CommonScreen/Image/Photo";
import {onCurrencyFormat} from "../../../services/common";

class Product extends PureComponent {
    onGetProduct(link) {
        Router.push(`/product/${link}`);
        this.props.getSingleProduct(link);
    }

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        let loading = this.props.loading;
        let data = this.props.data;
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
            </ContentLoader>
        );
        const placeholder = (
            <Fragment>
                {Array.apply(null, {length: 6}).map((e, i) => (
                    <Col key={i} sm={4} xs={6} className="csadjust">
                        <Card className="product-card product-card-card">
                            <div
                                className="cardImgDiv mobile-product d-flex justify-content-center align-items-center mobile-cardImgDiv">
                                <MyLoader/>
                            </div>
                            <Card.Body className="mobile-card-body">
                                <div className="mobile-card-details">
                                    <div className="rating ">
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <span className="quantity off"></span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

            </Fragment>
        );

        const product = data.map(pd => {
            return <Col sm={4} xs={6} className="csadjust">
                <div onClick={() => this.onGetProduct(pd.slug)}>
                    <Card className="product-card product-card-card">
                        <div
                            className="cardImgDiv mobile-product d-flex justify-content-center align-items-center mobile-cardImgDiv">
                            <Photo
                                src={pd.product_image !== null ? `${this.props.backendApi}${pd.product_image}` : "/blank.jpg"}
                                blurDataURL="/blank.jpg"
                                class=""
                            />
                        </div>
                        <Card.Body className="mobile-card-body">
                            <div className="mobile-card-details">
                                <Card.Title>
                                    <p className="productTitle"> {pd.product_name.length > 20 ? pd.product_name.substring(0, 25) + "..." : pd.product_name}</p>
                                </Card.Title>
                                <Card.Text>
                                    <div className="mobile-card-price-details">
                                        {symbolFormat === 1 ?
                                            <Fragment>
                                                {pd.discount_price !== undefined ?
                                                    <Fragment>
                                                        <p className="discountPrice">{onCurrencyFormat(pd.discount_price)}{defaultCurrency}</p>
                                                        <p className="regularPrice ml-3 mr-3">
                                                            <del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del>
                                                        </p>
                                                    </Fragment> :
                                                    <Fragment>
                                                        <p className="regularPrice singlePrice ml-3 mr-3">{onCurrencyFormat(pd.product_price)}{defaultCurrency}</p>
                                                    </Fragment>
                                                }
                                            </Fragment> :
                                            <Fragment>
                                                {pd.discount_price !== undefined ?
                                                    <Fragment>
                                                        <p className="discountPrice">{defaultCurrency}{onCurrencyFormat(pd.discount_price)}</p>
                                                        <p className="regularPrice ml-3 mr-3">
                                                            <del>{defaultCurrency}{onCurrencyFormat(pd.product_price)}</del>
                                                        </p>
                                                    </Fragment> :
                                                    <Fragment>
                                                        <p className="regularPrice singlePrice ml-3 mr-3">{defaultCurrency}{onCurrencyFormat(pd.product_price)}</p>
                                                    </Fragment>
                                                }
                                            </Fragment>
                                        }
                                        {pd.discount_type !== undefined &&
                                            <Fragment>
                                                {pd.discount_type === "flat" ?
                                                    <div className="price-off-div">
                                                        <p className="mobile-price-off">-{pd.off}%</p>
                                                        <div className="arrow-left"/>
                                                    </div> :
                                                    <div className="price-off-div">
                                                        <p className="mobile-price-off">-{pd.off}%</p>
                                                        <div className="arrow-left"/>
                                                    </div>
                                                }
                                            </Fragment>
                                        }
                                    </div>
                                    <Fragment>
                                        <Reviews value={pd.review}/>
                                    </Fragment>
                                </Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        })

        return (
            <Fragment>
                <Row className="product-card-row rsadjust">
                    {loading ?
                        <Fragment>{placeholder}</Fragment> :
                        <Fragment>
                            <Fragment>{product}</Fragment>
                        </Fragment>

                    }
                </Row>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    addCompareProduct,
    popupLoginOpen,
    addWishlistProduct,
    cartVariationShow,
    getSingleProduct
};

function mapStateToProps(state) {
    const emailVerified = state.userReducer.emailVerified;
    const isAuthorized = state.userReducer.isAuthorized;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat
    const backendApi = state.starterReducer.backendApi;

    return {
        emailVerified,
        isAuthorized,
        defaultCurrency,
        currencySymbolFormat,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

