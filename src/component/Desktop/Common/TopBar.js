import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from "next/link";
import {connect} from "react-redux";
class TopBar extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="topBar">
                    <Container>
                        <Row>
                            <Col lg={6} md={6} sm={4} className="float-left">
                                <p className="hotLine">
                                    {this.props.phone!=null &&
                                      <span className="mr-4"><i className="far fa-phone-volume mr-1"/>{this.props.phone}</span>
                                    }
                                    {this.props.mail!=null &&
                                       <span><i className="fal fa-envelope mr-1"/>{this.props.mail}</span>
                                    }
                                </p>
                            </Col>
                            {this.context.vendor!==0 &&
                                <Col lg={6} md={6} sm={8}>
                                    <div className="d-flex float-right">
                                        <Link href="seller/registration"  className="hotLineLink">Be a seller</Link>
                                    </div>
                                </Col>
                            }
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    const phone = state.starterReducer.phone;
    const mail = state.starterReducer.mail;
    const vendor = state.starterReducer.vendor
    return {
        phone,
        mail,
        vendor
    };
}



export default connect(mapStateToProps)(TopBar);