import React, {PureComponent, Fragment} from 'react';
import UserAllReturnOrdersPart from "../../../../CommonScreen/Profile/User/MyReturns/UserAllReturnOrdersPart";
class UserAllReturnOrders extends PureComponent {
    render() {
        return (
            <Fragment>
                <span className="profile title mb-4">My Returns</span>
                <Fragment>
                    <UserAllReturnOrdersPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserAllReturnOrders;