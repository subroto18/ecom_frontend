import React, {PureComponent, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import MobileTopBack from "../MobileCommon/MobileTopBack";
import PaymentPart from "../../CommonScreen/Payment/PaymentPart";

class MobilePayment extends PureComponent {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="Select payment method"/>
                <Container className='mobileContainer'>
                    <PaymentPart mobilePayment={true}/>
                </Container>
            </Fragment>
        );
    }
}
export default MobilePayment;