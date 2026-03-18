import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserAllReturnOrdersPart from "../../../CommonScreen/Profile/User/MyReturns/UserAllReturnOrdersPart";
class MobileUserAllReturnOrders extends Component {
  render() {
    return (
        <Fragment>
        <MobileTopBack title="My Returns"/>
        <Container className='mobileContainer'>
            <UserAllReturnOrdersPart/>
        </Container>
    </Fragment>
    )
  }
}
export default MobileUserAllReturnOrders;