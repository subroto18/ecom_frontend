import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserAddressPart from "../../../CommonScreen/Profile/User/MyAddress/UserAddressPart";

class MobileUserAddressNew extends Component {
  render() {
    return (
        <Fragment>
        <MobileTopBack title="My Address"/>
        <Container className='mobileContainer mobileBackground'>
            <UserAddressPart/>
        </Container>
    </Fragment>
    )
  }
}
export default MobileUserAddressNew;
