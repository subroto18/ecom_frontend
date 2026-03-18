import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import UserCouponPart from "../../../../CommonScreen/Profile/User/MyCoupon/UserCouponPart";
class UserCoupon extends PureComponent {
    render() {
        return (
            <Fragment>
                <Fragment>
                    <span className="profile title mb-4">My Coupon</span>
                    <Fragment>
                        <UserCouponPart/>
                    </Fragment>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserCoupon;