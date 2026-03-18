import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import dynamic from "next/dynamic"
import NavMobileTop from "./NavMobileTop";
import NavMobileBottom from "./NavMobileBottom";
const SellerPolicyPart = dynamic(() => import('../../CommonScreen/Policy/SellerPolicyPart'));
class MobileSellerPolicy extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavMobileTop/>
                <Container className="py-5">
                    <SellerPolicyPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>

        );
    }
}

export default MobileSellerPolicy;