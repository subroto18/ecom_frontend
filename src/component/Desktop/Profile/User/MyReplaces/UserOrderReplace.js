import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import UserOrderReplacePart from "../../../../CommonScreen/Profile/User/MyReplaces/UserOrderReplacePart";
class UserOrderReplace extends PureComponent {
    render() {
        return (
            <Fragment>
                <Fragment>
                    <span className="profile title mb-4">Request Replace</span>
                    <div className="order-cancel-div">
                        <div>
                            <Fragment>
                                <UserOrderReplacePart/>
                            </Fragment>
                        </div>
                    </div>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserOrderReplace;
