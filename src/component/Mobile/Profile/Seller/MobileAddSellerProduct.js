import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import AddSellerProductPart from "../../../CommonScreen/Profile/Seller/SellerProduct/AddSellerProductPart";

class MobileAddSellerProduct extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Add New Product"/>
            <Container className='mobileContainer formContainer'>
                <AddSellerProductPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileAddSellerProduct;