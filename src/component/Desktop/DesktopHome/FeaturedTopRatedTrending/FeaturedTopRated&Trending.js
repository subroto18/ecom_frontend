import React from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Api from "../../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import FeaturedTopRatedTrendingProductCard from "./FeaturedTopRatedTrendingProductCard";

import {featuredProduct} from "../../../../services/actions/featuredAction";
import {topRatedProduct} from "../../../../services/actions/topRatedAction";
import {trendingProduct} from "../../../../services/actions/trendingAction";
import {connect} from "react-redux";
import VerticalFeaturedProduct from "./VerticalFeaturedProduct";
import VerticalTrendingProduct from "./VerticalTrendingProduct";
import VerticalTopRatedProduct from "./VerticalTopRatedProduct";

class FeaturedTopRatedTrending extends React.PureComponent {


    onFeaturedTopRatedTrendingVisible = () => {

            if(this.props.featuredApi!==true){
                Api().get('getFeaturedProduct').then(res=>{
                    this.props.featuredProduct(res.data);
                }).catch(error=>{});
            }

            if(this.props.topRatedApi!==true){
                Api().get('getTopRatedProduct').then(res=>{
                    this.props.topRatedProduct(res.data);
                })
            }
            if(this.props.trendingApi!==true){
                Api().get('getTrendingProduct').then(res=>{
                    this.props.trendingProduct(res.data);
                }).catch(error=>{})
            }

    }


    render() {
            return (
                <VisibilitySensor  onChange={this.onFeaturedTopRatedTrendingVisible}>
                    <section id="trendingAndNewArrival" className="pt-4">
                        <Container>
                            <div className="div featuredTrending">
                                <Row>
                                    <Col xl={4} lg={4} md={12}>
                                        <div className="without-res">
                                               <FeaturedTopRatedTrendingProductCard link={`product/featured-product`} title="Featured product" loading={this.props.featuredLoading} data={this.props.featuredData}/>
                                        </div>
                                        <div className="res">
                                           <VerticalFeaturedProduct/>
                                        </div>
                                    </Col>
                                    <Col xl={4} lg={4} md={12}>
                                        <div className="without-res">

                                              <FeaturedTopRatedTrendingProductCard link={`product/trending-product`} title="Trending product" loading={this.props.trendingLoading} data={this.props.trendingData}/>

                                        </div>
                                        <div className="res">
                                           <VerticalTrendingProduct/>
                                        </div>
                                    </Col>
                                    <Col xl={4} lg={4} md={12}>
                                        <div className="without-res">
                                               <FeaturedTopRatedTrendingProductCard link={`product/top-rated-product`} title="Top rated product" loading={this.props.topRatedLoading} data={this.props.topRatedData}/>
                                        </div>
                                        <div className="res">
                                           <VerticalTopRatedProduct/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>
                </VisibilitySensor>

                   );
    }
}


const mapDispatchToProps = {
    featuredProduct,
    topRatedProduct,
    trendingProduct
};

function mapStateToProps(state) {
    const featuredLoading = state.featuredReducer.featuredLoading;
    const featuredData = state.featuredReducer.featuredData;

    const trendingLoading = state.trendingReducer.trendingLoading;
    const trendingData = state.trendingReducer.trendingData;

    const topRatedLoading = state.topRatedReducer.topRatedLoading;
    const topRatedData = state.topRatedReducer.topRatedData;

    return {
        featuredLoading,
        featuredData,
        trendingLoading,
        trendingData,
        topRatedLoading,
        topRatedData
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(FeaturedTopRatedTrending);



