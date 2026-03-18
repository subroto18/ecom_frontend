import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
class OurServices extends PureComponent {
    render() {
        return (
            <Fragment>
                <section id="ourService" className="pt-4">
                    <Container>
                        <div className="div">
                                    <Row>
                                        <Col lg={3} md={3} sm={3} xs={3} className="p-0">
                                            <div className="our-facilities">
                                                <div>
                                                    <i className="fas fa-heart ourServiceLogo"></i>
                                                </div>
                                                <div>
                                                    <p className="m-0 ourServiceText">Quality<br/>Products</p>
                                                </div>
                                            </div>
                                            <div className="vl"></div>
                                        </Col>
                                        <Col lg={3} md={3} sm={3} xs={3} className="p-0">
                                            <div className="our-facilities">
                                                <div>
                                                    <i className="fas fa-shipping-fast ourServiceLogo"></i>
                                                </div>
                                                <div>
                                                    <p className="m-0 ourServiceText">Fast<br/>Delivery</p>
                                                </div>
                                            </div>
                                            <div className="vl"></div>
                                        </Col>
                                        <Col lg={3} md={3} sm={3} xs={3} className="p-0">
                                            <div className="our-facilities">
                                                <div>
                                                    <i className="far fa-money-check-alt ourServiceLogo"></i>
                                                </div>
                                                <div>
                                                    <p className="m-0 ourServiceText">Secure<br/>Payments</p>
                                                </div>
                                            </div>
                                            <div className="vl"></div>
                                        </Col>
                                        <Col lg={3} md={3} sm={3} xs={3} className="p-0">
                                            <div className="our-facilities">
                                                <div>
                                                    <i className="fas fa-user-headset ourServiceLogo"></i>
                                                </div>
                                                <div>
                                                    <p className="m-0 ourServiceText">Customer<br/>Support</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                        </div>
                    </Container>
                </section>
            </Fragment>
        );
    }
}
export default OurServices;