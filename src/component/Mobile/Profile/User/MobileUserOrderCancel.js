import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserOrderCancelPart from "../../../CommonScreen/Profile/User/MyCancellations/UserOrderCancelPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
class MobileUserOrderCancel extends Component {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Request Cancellation"/>
            <Container className='mobileContainer'>
               <UserOrderCancelPart/>
            </Container>
            <NavMobileBottom/>
        </Fragment>
    )
  }
}
export default MobileUserOrderCancel;