import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import UserOrderCancelPart from "../../../../CommonScreen/Profile/User/MyCancellations/UserOrderCancelPart";
class UserOrderCancel extends PureComponent {
    render() {
        return (
            <Fragment>
                <Fragment>
                    <span className="profile title mb-4">Request Cancellation</span>
                    <div className="order-cancel-div">
                        <div>
                            <Fragment>
                                <UserOrderCancelPart/>
                            </Fragment>
                        </div>
                    </div>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserOrderCancel;
