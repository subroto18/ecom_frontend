import React, { Fragment, PureComponent} from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import EditUserProfilePart from "../../../CommonScreen/Profile/User/MyProfile/EditUserProfilePart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileUserEditProfile extends PureComponent {


    render() {
        return (
            <Fragment>
                <MobileTopBack title="Edit Profile"/>
                <Container className='mobileContainer'>
                    <EditUserProfilePart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}

export default MobileUserEditProfile;