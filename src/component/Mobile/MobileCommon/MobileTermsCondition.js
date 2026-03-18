import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import dynamic from "next/dynamic"
const TermsConditionPart = dynamic(() => import('../../CommonScreen/Policy/TermsConditionPart'));
const NavMobileTop = dynamic(() => import('../MobileCommon/NavMobileTop'));
const NavMobileBottom = dynamic(() => import('./NavMobileBottom'));
class MobileTermsCondition extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavMobileTop/>
                <Container className="py-5">
                    <TermsConditionPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}
export default MobileTermsCondition;