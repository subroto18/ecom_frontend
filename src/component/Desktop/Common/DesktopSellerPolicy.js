import React, {Component, Fragment} from 'react';
import DesktopHeaderPart from "./DesktopHeaderPart";
import Container from "react-bootstrap/Container";
import DesktopFooterPart from "./DesktopFooterPart";
import dynamic from "next/dynamic"
const SellerPolicyPart = dynamic(() => import("../../CommonScreen/Policy/SellerPolicyPart"))
class DesktopSellerPolicy extends Component {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <Container className="py-5">
                    <SellerPolicyPart/>
                </Container>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default DesktopSellerPolicy;