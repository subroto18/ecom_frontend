import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import EditUserAddressPart from "../../../CommonScreen/Profile/User/MyAddress/EditUserAddressPart";

class MobileEditUserAddress extends Component {
  render() {
    return (
        <Fragment>
        <MobileTopBack title="Edit Address"/>
          <Container className='mobileContainer'>
              <EditUserAddressPart/>
          </Container>
    </Fragment>
    )
  }
}
export default MobileEditUserAddress;