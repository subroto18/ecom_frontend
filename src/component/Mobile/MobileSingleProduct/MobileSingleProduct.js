import React, {PureComponent, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import dynamic from "next/dynamic"
import Router from "next/router";
import NavSingleProductTop from "../MobileCommon/NavSingleProductTop";
const PopupLogin = dynamic(() => import("../../Desktop/Profile/PopupLogin"));
const CustomerReview = dynamic(() => import("../../Desktop/SingleProduct/CustomerReview"));
const SingleProductCard = dynamic(() => import("../../CommonScreen/ProductCardDetails/SingleProductCard"));
const CartVariationModal = dynamic(() => import("../../CommonScreen/Modal/CartVariationModal"));
const CartSuccessModal = dynamic(() => import("../../CommonScreen/Modal/CartSuccessModal"));
const MobileProductDescription = dynamic(() => import("./MobileProductDescription"));
const MobileRelatedProduct = dynamic(() => import("./MobileRelatedProduct"));

class MobileSingleProduct extends PureComponent {
    render() {

        const mobileLoader =  <div  className="mobile-pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        if(this.props.singleProductLoadingStatus){
            return <Fragment>
                {mobileLoader}
               </Fragment>
        }else if(this.props.singleProductData.length>0){
            return (
                <Fragment>
                    <div className="mobile-product-img-div">
                        <Container>
                            <NavSingleProductTop/>
                            {this.props.singleProductLoadingStatus ?
                                <Fragment>
                                    {mobileLoader}
                                </Fragment>
                                :
                                <Fragment>
                                    <SingleProductCard url={this.props.link} loading={this.props.singleProductLoadingStatus} data={this.props.singleProductData} mobile={true} />
                                    <CustomerReview rating={this.props.singleProductData[0].allRating} />
                                    <MobileProductDescription des={this.props.singleProductData[0].description} video_link={this.props.singleProductData[0].video_link} />
                                    <MobileRelatedProduct link={this.props.singleProductData} />
                                </Fragment>
                            }
                        </Container>
                    </div>
                    <PopupLogin/>
                    <CartVariationModal/>
                    <CartSuccessModal/>
                </Fragment>
            );
        }else{
            Router.push("/");
        }
    }
}



function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const symbolFormat = state.starterReducer.symbolFormat;
    const backendApi = state.starterReducer.backendApi;
    const singleProductLoadingStatus = state.productReducer.singleProductLoadingStatus;
    const singleProductData = state.productReducer.singleProductData;

    return {
        defaultCurrency,
        symbolFormat,
        backendApi,
        singleProductLoadingStatus,
        singleProductData
    };
}





export default connect(mapStateToProps)(MobileSingleProduct);

