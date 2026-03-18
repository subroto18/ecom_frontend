import React, {Component, Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserProfilePart from "../../../CommonScreen/Profile/User/MyProfile/UserProfilePart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
class MobileUserProfile extends Component {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="My Profile"/>
                <Container className='mobileContainer'>
                    <UserProfilePart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}

export default MobileUserProfile;