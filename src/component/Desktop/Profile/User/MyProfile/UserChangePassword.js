import React, {PureComponent, Fragment} from 'react';
import UserChangePasswordPart from "../../../../CommonScreen/Profile/User/MyProfile/UserChangePasswordPart";
class UserChangePassword extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <span className="profile title mb-4">Change password</span>
                </div>
                <Fragment>
                    <UserChangePasswordPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserChangePassword;
