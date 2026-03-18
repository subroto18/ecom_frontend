import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import CommissionsPart from "../../../CommonScreen/Profile/Seller/Commisions/CommissionsPart";

class MobileCommissions extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Commission History"/>
            <Container className='mobileContainer'>
               <CommissionsPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileCommissions;