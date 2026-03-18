import React, {PureComponent, Fragment} from 'react';
import ViewOrderPart from "../../../../CommonScreen/Profile/User/MyOrders/ViewOrderPart";
class ViewOrder extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <span className="profile title mb-4">Order Details</span>
                </div>
                <Fragment>
                    <ViewOrderPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default ViewOrder;