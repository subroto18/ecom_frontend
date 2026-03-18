import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import SellerDigitalProductPart from "../../../CommonScreen/Profile/Seller/SellerProduct/SellerDigitalProductPart";

class MobileSellerDigitalProduct extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Digital Product"/>
            <Container className='mobileContainer'>
                <SellerDigitalProductPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileSellerDigitalProduct;