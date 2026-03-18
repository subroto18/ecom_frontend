import React, {Component, Fragment} from 'react';
import DesktopHeaderPart from "./DesktopHeaderPart";
import Container from "react-bootstrap/Container";
import DesktopFooterPart from "./DesktopFooterPart";
import dynamic from "next/dynamic"
const ReplacePolicyPart = dynamic(() => import('../../CommonScreen/Policy/ReplacePolicyPart'));

class DesktopReplacePolicy extends Component {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <Container className="py-5">
                    <ReplacePolicyPart/>
                </Container>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default DesktopReplacePolicy;