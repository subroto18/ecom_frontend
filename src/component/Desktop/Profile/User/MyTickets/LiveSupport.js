import React, { PureComponent, Fragment } from "react";
import LiveSupportPart from "../../../../CommonScreen/Profile/User/MyTickets/LiveSupportPart";
class LiveSupport extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <span id="live"  className="profile title mb-4">Live support</span>
                </div>
                <Fragment>
                    <LiveSupportPart token={this.props.token} />
                </Fragment>
            </Fragment>
        );
    }
}
export default LiveSupport;
