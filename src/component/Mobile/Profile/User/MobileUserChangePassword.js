import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserChangePasswordPart from "../../../CommonScreen/Profile/User/MyProfile/UserChangePasswordPart";

class MobileUserChangePassword extends Component {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="Change password"/>
            <Container className='mobileContainer mobileBackground'>
                <UserChangePasswordPart/>
            </Container>
    </Fragment>
    )
  }
}
export default MobileUserChangePassword;