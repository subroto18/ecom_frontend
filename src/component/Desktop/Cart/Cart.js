import React, {PureComponent, Fragment} from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import {connect} from "react-redux";
import Link from "next/link";
import OrderSummary from "../../CommonScreen/CheckoutDetails/OrderSummary";
import CartPart from "../../CommonScreen/Cart/CartPart";

class Cart extends PureComponent {

    render() {

        const loader = <div className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <section id="cart">
                    <Container>
                        <Row className="cartRow">
                            {this.props.cartProductLoadingStatus ?
                                <Fragment>
                                    <Col lg={12}>
                                        <div className="cart-empty-div">
                                            {loader}
                                        </div>
                                    </Col>
                                </Fragment> :
                                <Fragment>
                                    {this.props.cartProductDetails.length > 0 ?
                                        <Fragment>

                                            <Col lg={7} md={7} sm={12} xs={12}>
                                                <CartPart/>
                                            </Col>

                                            <Col lg={5} md={5} sm={12} xs={12}>
                                                <OrderSummary cart={true}/>
                                            </Col>
                                        </Fragment> :
                                        <Fragment>
                                            <Col lg={12}>
                                                <div className="cart-empty-div">
                                                    <div className="emptyPage">
                                                        <div className="py-5">
                                                            <div className="text-center pageContent">
                                                                <h2 className='text-muted iconSize'><i
                                                                    class="far fa-cart-plus"></i></h2>
                                                                <h6 className='text-muted'>There is no product yet</h6>
                                                                <Link href="/">
                                                                    <div
                                                                        className='btn btn-outline-warning text-uppercase'>Continue
                                                                        Shopping
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Fragment>
                                    }
                                </Fragment>
                            }
                        </Row>
                    </Container>
                </section>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    const cartProductLoadingStatus = state.cartReducer.cartProductLoadingStatus;
    const cartProductDetails = state.cartReducer.cartProductDetails;

    return {
        cartProductLoadingStatus,
        cartProductDetails
    };
}

export default connect(mapStateToProps)(Cart);


