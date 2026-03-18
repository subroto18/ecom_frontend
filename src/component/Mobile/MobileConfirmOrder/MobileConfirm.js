import React, {PureComponent,Fragment} from 'react';
import Link from "next/link";
import ConfirmPart from "../../CommonScreen/Confirm/ConfirmPart";

class MobileConfirm extends PureComponent {

    render() {
        return (
            <Fragment>
                <div className="mobilePaymentTopBar">
                    <Link href="/" className="paymentArrow"><i className="far fa-arrow-left"/></Link>
                    <span className="paymentText">Confirm Order</span>
                </div>
                <ConfirmPart/>
            </Fragment>
        );
    }
}
export default MobileConfirm;