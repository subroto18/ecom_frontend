import React, {Component, Fragment} from 'react';
import DesktopHeaderPart from "./DesktopHeaderPart";
import DesktopFooterPart from "./DesktopFooterPart";
import Container from "react-bootstrap/Container";
import dynamic from "next/dynamic"
const PrivacyPolicyPart = dynamic(() => import("../../CommonScreen/Policy/PrivacyPolicyPart"))
class DesktopPrivacyPolicy extends Component {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                 <Container className="py-5">
                     <PrivacyPolicyPart/>
                 </Container>
                <DesktopFooterPart/>
            </Fragment>
        )
    }
}
export default DesktopPrivacyPolicy;