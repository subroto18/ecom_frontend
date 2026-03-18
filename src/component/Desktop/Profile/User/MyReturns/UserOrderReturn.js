import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import UserOrderReturnPart from "../../../../CommonScreen/Profile/User/MyReturns/UserOrderReturnPart";
class UserOrderReturn extends PureComponent {
    render() {
        return (
            <Fragment>
                <Fragment>
                    <span className="profile title mb-4">Request Return</span>
                    <div className="order-cancel-div">
                      <Fragment>
                          <UserOrderReturnPart/>
                      </Fragment>
                    </div>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserOrderReturn;
