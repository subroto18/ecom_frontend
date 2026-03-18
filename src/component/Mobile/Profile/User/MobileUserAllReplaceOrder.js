import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserAllReplaceOrderPart from "../../../CommonScreen/Profile/User/MyReplaces/UserAllReplaceOrderPart";

class MobileUserAllReplaceOrder extends Component {

  render() {
    return (
      <Fragment>
          <MobileTopBack title="My Replaces"/>
            <Container className='mobileContainer'>
                <UserAllReplaceOrderPart/>
            </Container>
      </Fragment>
    )
  }
}
export default MobileUserAllReplaceOrder;
