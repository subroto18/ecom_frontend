import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
import ResetPasswordPart from "../../../CommonScreen/Profile/User/MyProfile/ResetPasswordPart";
class MobileResetPassword extends Component {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="Reset password"/>
                <Container className='mobileContainer'>
                    <ResetPasswordPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        )
    }
}
export default MobileResetPassword;