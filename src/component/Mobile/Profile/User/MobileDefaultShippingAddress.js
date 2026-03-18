import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import DefaultShippingAddressPart from "../../../CommonScreen/Profile/User/MyAddress/DefaultShippingAddressPart";

class MobileDefaultShippingAddress extends Component {
  render() {
    return (
      <Fragment>
          <MobileTopBack title="My Reviews"/>
            <Container className='mobileContainer'>
                <DefaultShippingAddressPart/>
            </Container>
      </Fragment>
    )
  }
}
export default MobileDefaultShippingAddress;