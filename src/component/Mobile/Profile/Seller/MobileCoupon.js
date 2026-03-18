import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import CouponPart from "../../../CommonScreen/Profile/Seller/Coupon/CouponPart";

class MobileCoupon extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Coupon"/>
            <Container className='mobileContainer'>
                <CouponPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileCoupon;