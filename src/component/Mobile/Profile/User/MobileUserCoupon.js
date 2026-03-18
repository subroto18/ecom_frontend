import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserCouponPart from "../../../CommonScreen/Profile/User/MyCoupon/UserCouponPart";

class MobileUserCoupon extends Component {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="My Coupon"/>
            <Container className='mobileContainer'>
               <UserCouponPart/> 
            </Container>
        </Fragment>
    )
  }
}
export default MobileUserCoupon;
