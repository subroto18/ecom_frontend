import React, {PureComponent} from 'react';
import Api from "../../../ClientApi/Api";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import VisibilitySensor from "react-visibility-sensor";
import {trendingProduct} from "../../../services/actions/trendingAction";
import {connect} from "react-redux";
import dynamic from "next/dynamic"
import Link from "next/link";
const MobileProduct = dynamic(() => import("../MobileProductCard/MobileProduct"));
class MobileTrendingProduct extends PureComponent {


    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.trendingApi!==true){
                Api().get('getTrendingProduct').then(res=>{
                    this.props.trendingProduct(res.data);
                }).catch(error=>{})
            }
        }
    }


    render() {
        return (
        <section className="pb-5">
            <VisibilitySensor  onChange={this.onVisible}>
                <Container>
                    <div className="div">
                        <Row >
                            <Col className="d-flex justify-content-between">
                                <div className="TitleDiv">
                                    <span className="productCategory title">Trending Product</span>
                                </div>
                                <div>
                                    <Link href="/product/trending-product" className="btn">Show More</Link>
                                </div>
                            </Col>
                        </Row>
                        <MobileProduct data={this.props.trendingData} loading={this.props.featuredLoading}  />
                    </div>
                </Container>
            </VisibilitySensor>

        </section>
        );
    }
}

const mapDispatchToProps = {
    trendingProduct
};

function mapStateToProps(state) {
    const trendingLoading = state.trendingReducer.trendingLoading;
    const trendingData = state.trendingReducer.trendingData;
    const trendingApi = state.trendingReducer.trendingApi
    return {
        trendingLoading,
        trendingData,
        trendingApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTrendingProduct);

