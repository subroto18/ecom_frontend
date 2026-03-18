import React, { PureComponent, Fragment } from "react";
import DefaultBillingAddressPart from "../../../../CommonScreen/Profile/User/MyAddress/DefaultBillingAddressPart";
class DefaultBillingAddress extends PureComponent {
    render() {
        return (
                <Fragment>
                    <div className="d-flex justify-content-between">
                        <span className="profile title mb-4">Default Billing Address</span>
                    </div>
                    <Fragment>
                        <DefaultBillingAddressPart/>
                    </Fragment>
                </Fragment>
        );
    }
}
export default DefaultBillingAddress;
