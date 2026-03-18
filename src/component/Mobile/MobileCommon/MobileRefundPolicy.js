import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import NavMobileTop from "./NavMobileTop";
import NavMobileBottom from "./NavMobileBottom";
import RefundPolicyPart from "../../CommonScreen/Policy/RefundPolicyPart";
class MobileRefundPolicy extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavMobileTop/>
                <Container className="py-5">
                    <RefundPolicyPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}
export default MobileRefundPolicy;