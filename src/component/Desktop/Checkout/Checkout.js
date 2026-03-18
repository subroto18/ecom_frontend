import React, {Fragment, Component} from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {connect} from "react-redux";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import Router from "next/router";
import Link from "next/link";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import dynamic from "next/dynamic";
import OrderSummary from "../../CommonScreen/CheckoutDetails/OrderSummary";
import ShippingBilling from "../../CommonScreen/CheckoutDetails/ShippingBilling";
import CheckoutProduct from "../../CommonScreen/CheckoutDetails/CheckoutProduct";


const ShippingModal = dynamic(() => import('../../CommonScreen/CheckoutDetails/ShippingModal'), {
    ssr: false,
})

const BillingModal = dynamic(() => import('../../CommonScreen/CheckoutDetails/BillingModal'), {
    ssr: false,
})
const PickupPointModal = dynamic(() => import('../../CommonScreen/CheckoutDetails/PickupPointModal'), {
    ssr: false,
})

class Checkout extends Component {

    render() {

        if (this.props.checkoutProductExist) {

            let physical_product = false;
            let selectedProduct = this.props.checkoutProduct;
            if (selectedProduct.length > 0) {
                selectedProduct.map(pd => {
                    if (pd.cat_type == "physical") {
                        physical_product = true
                    }
                })
            }

            return (
                <Fragment>
                    <DesktopHeaderPart/>
                    <section id="checkout">
                        <Container className="p-lg-5">
                            <Row>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                    <CheckoutProduct/>
                                </Col>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <div className="orderSummery mt-3">

                                        {physical_product &&
                                            <ShippingBilling/>
                                        }

                                        <OrderSummary/>
                                        {this.props.singleCheckoutProductLoading ?
                                            <Fragment>
                                                <Link href="" className="oNextBtn btn disabled">Next</Link>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <Link href="/payment" className="oNextBtn btn">Next</Link>
                                            </Fragment>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <DesktopFooterPart/>
                    <ShippingModal/>
                    <BillingModal/>
                    <PickupPointModal/>
                </Fragment>
            )
        } else {
            Router.push("/");
        }
    }
}


function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const checkoutProductExist = state.productReducer.checkoutProductExist;
    const checkoutProduct = state.productReducer.checkoutProduct;
    const singleCheckoutProductLoading = state.productReducer.singleCheckoutProductLoading
    return {
        isAuthorized,
        checkoutProductExist,
        checkoutProduct,
        singleCheckoutProductLoading
    };
}

export default connect(mapStateToProps)(Checkout);