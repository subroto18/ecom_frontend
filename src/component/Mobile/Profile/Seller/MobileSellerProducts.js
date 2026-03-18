import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import SellerProductsPart from "../../../CommonScreen/Profile/Seller/SellerProduct/SellerProductsPart";
class MobileSellerProducts extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Products"/>
            <Container className='mobileContainer'>
                <SellerProductsPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileSellerProducts;