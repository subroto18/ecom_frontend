import React, {PureComponent, Fragment} from 'react';
import ViewCancelOrderPart from "../../../../CommonScreen/Profile/User/MyCancellations/ViewCancelOrderPart";
class ViewCancelOrder extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <span className="profile title mb-4">Cancel order Details</span>
                </div>
                <Fragment>
                    <ViewCancelOrderPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default ViewCancelOrder;