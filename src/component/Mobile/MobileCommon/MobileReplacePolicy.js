import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import dynamic from "next/dynamic"
import NavMobileTop from "./NavMobileTop";
import NavMobileBottom from "./NavMobileBottom";
const ReplacePolicyPart = dynamic(() => import('../../CommonScreen/Policy/ReplacePolicyPart'));
class MobileReplacePolicy extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavMobileTop/>
                <Container className="py-5">
                    <ReplacePolicyPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}
export default MobileReplacePolicy;