import React, {Component,Fragment} from 'react';
import DesktopHeaderPart from "./DesktopHeaderPart";
import Container from "react-bootstrap/Container";
import DesktopFooterPart from "./DesktopFooterPart";
import dynamic from "next/dynamic"
const RefundPolicyPart = dynamic(() => import("../../CommonScreen/Policy/RefundPolicyPart"))
class DesktopRefundPolicy extends Component {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <Container className="py-5">
                   <RefundPolicyPart/>
                </Container>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default DesktopRefundPolicy;