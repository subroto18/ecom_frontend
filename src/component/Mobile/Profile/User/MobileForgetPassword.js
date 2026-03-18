import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ForgetPasswordPart from "../../../CommonScreen/Profile/User/MyProfile/ForgetPasswordPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
class MobileForgetPassword extends Component {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="Forget password"/>
                <Container className='mobileContainer'>
                    <ForgetPasswordPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        )
    }
}
export default MobileForgetPassword;