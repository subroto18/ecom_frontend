import React, {PureComponent, Fragment} from 'react';
import ViewReplaceOrdersPart from "../../../../CommonScreen/Profile/User/MyReplaces/ViewReplaceOrdersPart";
class ViewReplaceOrders extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <span className="profile title mb-4">Replace Order details</span>
                </div>
                <Fragment>
                    <ViewReplaceOrdersPart />
                </Fragment>
            </Fragment>
        );
    }
}
export default ViewReplaceOrders;