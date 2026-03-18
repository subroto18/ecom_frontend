import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import SellerProductEditPart from "../../../CommonScreen/Profile/Seller/SellerProduct/SellerProductEditPart";

class MobileSellerProductEdit extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="All orders"/>
            <Container className='mobileContainer'>
                <SellerProductEditPart />
            </Container>
        </Fragment>
    )
  }
}
export default MobileSellerProductEdit;