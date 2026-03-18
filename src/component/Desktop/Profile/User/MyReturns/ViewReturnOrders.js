import React, {PureComponent, Fragment} from 'react';
import ViewReturnOrdersPart from "../../../../CommonScreen/Profile/User/MyReturns/ViewReturnOrdersPart";

class ViewReturnOrders extends PureComponent {


    render() {

        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <span className="profile title mb-4">Return Order details</span>
                </div>
                <Fragment>
                    <ViewReturnOrdersPart/>
                </Fragment>

            </Fragment>
        );
    }
}

export default ViewReturnOrders;