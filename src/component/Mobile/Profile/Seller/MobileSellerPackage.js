import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import SellerPackagePart from "../../../CommonScreen/Profile/Seller/SellerPackagePart";

class MobileSellerPackage extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Premium Packages"/>
            <Container className='mobileContainer'>
                <SellerPackagePart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileSellerPackage;