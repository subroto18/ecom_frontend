import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import EditUserProfilePart from "../../../../CommonScreen/Profile/User/MyProfile/EditUserProfilePart";
class EditUserProfile extends PureComponent {
    render() {
        return (
            <Fragment>
                <section id="editUserProfile">
                    <Container>
                        <span className="profile title mb-4">Edit Profile</span>
                        <EditUserProfilePart/>
                    </Container>
                </section>
            </Fragment>
        );
    }
}
export default EditUserProfile;
