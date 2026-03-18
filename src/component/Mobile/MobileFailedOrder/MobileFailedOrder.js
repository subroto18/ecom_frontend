import React, {PureComponent,Fragment} from 'react';
import Link from "next/link";
import FailedOrderPart from "../../CommonScreen/FailedOrder/FailedOrderPart";
class MobileFailedOrder extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="mobilePaymentTopBar">
                    <Link href="/" className="paymentArrow"><i className="far fa-arrow-left"/></Link>
                    <span className="paymentText">Order failed</span>
                </div>
                <FailedOrderPart/>
            </Fragment>
        );
    }
}
export default MobileFailedOrder;