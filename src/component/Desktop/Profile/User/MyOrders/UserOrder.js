import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import UserOrderPart from "../../../../CommonScreen/Profile/User/MyOrders/UserOrderPart";
class UserOrder extends PureComponent {
    render() {
        return (
                <Fragment>
                    <Fragment>
                        <span className="profile title mb-4">My orders</span>
                        <Fragment>
                            <UserOrderPart/>
                        </Fragment>
                    </Fragment>
                </Fragment>
        );
    }
}
export default UserOrder;