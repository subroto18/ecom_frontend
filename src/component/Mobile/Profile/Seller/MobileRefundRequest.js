import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import RefundRequestPart from "../../../CommonScreen/Profile/Seller/RefundRequest/RefundRequestPart";

class MobileRefundRequest extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="All Refund"/>
            <Container className='mobileContainer'>
                <RefundRequestPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileRefundRequest;