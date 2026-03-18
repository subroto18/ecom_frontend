import React, {PureComponent, Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import VisibilitySensor from "react-visibility-sensor";
import {featuredProduct} from "../../../services/actions/featuredAction";
import {connect} from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
const MobileProduct = dynamic(() => import('../MobileProductCard/MobileProduct'), {
    ssr: false,
})
class MobileFeaturedProduct extends PureComponent {

    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.featuredApi!==true){
                Api().get('getFeaturedProduct').then(res=>{
                    this.props.featuredProduct(res.data);
                }).catch(error=>{});
            }
        }
    }

    render() {
        return (
        <Fragment>
            <VisibilitySensor  onChange={this.onVisible}>
                <section className="pb-5">
                    <Container>
                        <div className="div">
                            <Row >
                                <Col className="d-flex justify-content-between">
                                    <div className="TitleDiv">
                                        <span className="productCategory title">Featured Product</span>
                                    </div>
                                    <div>
                                        <Link href={`/product/featured-product`} className="btn">Show More</Link>
                                    </div>
                                </Col>
                            </Row>
                            <MobileProduct data={this.props.featuredData} loading={this.props.featuredLoading}  />
                        </div>
                    </Container>
                </section>
            </VisibilitySensor>

        </Fragment>
        );
    }
}

const mapDispatchToProps = {
    featuredProduct
};

function mapStateToProps(state) {
    const featuredLoading = state.featuredReducer.featuredLoading;
    const featuredData = state.featuredReducer.featuredData;

    return {
        featuredLoading,
        featuredData
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(MobileFeaturedProduct);
