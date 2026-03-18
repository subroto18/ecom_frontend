import React, {PureComponent, Fragment} from 'react';
import UserAllReplaceOrderPart from "../../../../CommonScreen/Profile/User/MyReplaces/UserAllReplaceOrderPart";
class UserAllReplaceOrder extends PureComponent {
    render() {
        return (
            <Fragment>
                <span className="profile title mb-4">My Replaces</span>
                <Fragment>
                    <UserAllReplaceOrderPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserAllReplaceOrder