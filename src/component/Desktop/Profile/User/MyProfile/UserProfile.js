import React, { PureComponent, Fragment } from "react";
import UserProfilePart from "../../../../CommonScreen/Profile/User/MyProfile/UserProfilePart";
class UserProfile extends PureComponent {
  render() {
    return (
      <Fragment>
        <span className="profile title mb-4">My Profile</span>
        <Fragment>
            <UserProfilePart/>
        </Fragment>
      </Fragment>
    );
  }
}
export default UserProfile;
