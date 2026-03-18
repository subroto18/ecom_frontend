import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import SellerOrdersPart from "../../../CommonScreen/Profile/Seller/Orders/SellerOrdersPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileSellerOrders extends PureComponent {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="All Orders"/>
              <Container className='mobileContainer'>
                <SellerOrdersPart/>
             </Container>
            <NavMobileBottom/>
        </Fragment>
    )
  }
}
export default MobileSellerOrders;