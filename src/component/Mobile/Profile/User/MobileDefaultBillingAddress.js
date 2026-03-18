import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import DefaultBillingAddressPart from "../../../CommonScreen/Profile/User/MyAddress/DefaultBillingAddressPart";

class MobileDefaultBillingAddress extends Component {
  render() {
    return (
      <Fragment>
          <MobileTopBack title="Default Billing Address"/>
          <Container className='mobileContainer'>
              <DefaultBillingAddressPart/>
          </Container>
      </Fragment>
    )
  }
}
export default MobileDefaultBillingAddress;