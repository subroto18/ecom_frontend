import React, { PureComponent, Fragment } from "react";
import SupportPart from "../../../../CommonScreen/Profile/User/MyTickets/SupportPart";
class Support extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <span className="profile title mb-4">Support Ticket</span>
                </div>
                <Fragment>
                     <SupportPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default Support;
