import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import NavMobileTop from "./NavMobileTop";
import NavMobileBottom from "./NavMobileBottom";
import dynamic from "next/dynamic"
const PrivacyPolicyPart = dynamic(() => import('../../CommonScreen/Policy/PrivacyPolicyPart'));
class MobilePrivacyPolicy extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavMobileTop/>
                <Container className="py-5">
                    <PrivacyPolicyPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}
export default MobilePrivacyPolicy;