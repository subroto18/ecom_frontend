import React, { PureComponent, Fragment } from "react";
import DefaultShippingAddressPart from "../../../../CommonScreen/Profile/User/MyAddress/DefaultShippingAddressPart";

class DefaultShippingAddress extends PureComponent {
    render() {
        return (
                <Fragment>
                    <div className="d-flex justify-content-between">
                        <span className="profile title mb-4">Default shipping Address</span>
                    </div>
                    <Fragment>
                        <DefaultShippingAddressPart/>
                    </Fragment>
                </Fragment>
        );
    }
}
export default DefaultShippingAddress;
