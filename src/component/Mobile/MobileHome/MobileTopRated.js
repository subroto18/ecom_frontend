import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Api from "../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import {topRatedProduct} from "../../../services/actions/topRatedAction";
import {connect} from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
const MobileProduct = dynamic(() => import('../MobileProductCard/MobileProduct'), {
    ssr: false,
})

class MobileTopRated extends PureComponent {


    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.topRatedApi!==true){
                Api().get('getTopRatedProduct').then(res=>{
                    this.props.topRatedProduct(res.data);
                })
            }
        }
    }


    render() {
        return (
            <Fragment>
                <VisibilitySensor  onChange={this.onVisible}>
                    <section className="pb-2">
                        <Container>
                            <div className="div">
                                <Row >
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv">
                                            <span className="productCategory title">Top rated Product</span>
                                        </div>
                                        <div>
                                            <Link  href="/product/top-rated-product" className="btn">Show More</Link>
                                        </div>
                                    </Col>
                                </Row>
                                <MobileProduct data={this.props.topRatedData} loading={this.props.topRatedLoading}  />
                            </div>
                        </Container>
                    </section>
                </VisibilitySensor>

            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    topRatedProduct
};

function mapStateToProps(state) {
    const topRatedLoading = state.topRatedReducer.topRatedLoading;
    const topRatedData = state.topRatedReducer.topRatedData;
    const topRatedApi =state.topRatedReducer.topRatedApi
    return {
        topRatedLoading,
        topRatedData,
        topRatedApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTopRated);
