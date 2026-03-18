import React, {Component, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import dynamic from "next/dynamic"
import DesktopHeaderPart from "./DesktopHeaderPart";
import DesktopFooterPart from "./DesktopFooterPart";
const TermsConditionPart = dynamic(() => import("../../CommonScreen/Policy/TermsConditionPart"))
class DesktopTermsCondition extends Component {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <Container className="py-5">
                    <TermsConditionPart/>
                </Container>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default DesktopTermsCondition;