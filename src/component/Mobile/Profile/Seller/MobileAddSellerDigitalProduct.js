import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import AddSellerDigitalProductPart
    from "../../../CommonScreen/Profile/Seller/SellerProduct/AddSellerDigitalProductPart";
class MobileAddSellerDigitalProduct extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Add Digital Product"/>
            <Container className='mobileContainer formContainer'>
                <AddSellerDigitalProductPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileAddSellerDigitalProduct;