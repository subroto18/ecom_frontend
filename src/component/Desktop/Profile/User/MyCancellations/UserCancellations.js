import React, {PureComponent, Fragment} from 'react';
import UserCancellationsPart from "../../../../CommonScreen/Profile/User/MyCancellations/UserCancellationsPart";
class UserCancellations extends PureComponent {
    render() {
        return (
            <Fragment>
                  <span className="profile title mb-4">My Cancellations</span>
                <Fragment>
                    <UserCancellationsPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserCancellations;