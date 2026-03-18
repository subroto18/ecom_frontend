import React, {PureComponent, Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import VisibilitySensor from "react-visibility-sensor";
import {newArrival} from "../../../services/actions/productAction";
import {connect} from "react-redux";
import Link from "next/link";

import dynamic from "next/dynamic";

const MobileProduct = dynamic(() => import('../MobileProductCard/MobileProduct'), {
    ssr: false,
})

class MobileNewArrival extends PureComponent {


    onVisible = (isVisible) => {

        if (this.props.newArrivalApi !== true) {
            if (isVisible) {
                Api().get('newArrival').then(res => {
                    this.props.newArrival(res.data);
                })
            }
        }
    }


    render() {
        return (
            <Fragment>
                <VisibilitySensor onChange={this.onVisible}>
                    <section className="pb-5">
                        <Container>
                            <div className="div">
                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv">
                                            <span className="productCategory title">New Arrival</span>
                                        </div>
                                        <div>
                                            <Link href={`/product/new-arrival`} className="btn">Show More</Link>
                                        </div>
                                    </Col>
                                </Row>

                                <MobileProduct data={this.props.newArrivalData} loading={this.props.newArrivalLoading}/>

                            </div>
                        </Container>
                    </section>
                </VisibilitySensor>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    newArrival
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const newArrivalData = state.productReducer.newArrivalData;
    const newArrivalLoading = state.productReducer.newArrivalLoading;
    const newArrivalApi = state.productReducer.newArrivalApi
    return {
        newArrivalApi,
        isAuthorized,
        newArrivalData,
        newArrivalLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileNewArrival);
