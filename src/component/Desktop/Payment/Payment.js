import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import {connect} from "react-redux";
import Router from "next/router";
import PaymentPart from "../../CommonScreen/Payment/PaymentPart";

class Payment extends PureComponent {


    render() {

        if(this.props.checkoutProduct.length>0){
            return    <Fragment>
                <DesktopHeaderPart/>
                <section id="payment">
                    <Container className="pt-5">
                        <PaymentPart payment={true}/>
                    </Container>
                </section>
                <DesktopFooterPart/>
            </Fragment>
        }else{
            Router.push("/")
        }


    }
}



function mapStateToProps(state) {
    const checkoutProduct = state.productReducer.checkoutProduct;

    return {
        checkoutProduct
    };
}

export default connect(mapStateToProps)(Payment);

