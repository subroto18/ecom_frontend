import React, {PureComponent, Fragment} from 'react';
import MobileTopBack from "../MobileCommon/MobileTopBack";
import DeliveryInfoPart from "../../CommonScreen/DeliveryInfo/DeliveryInfoPart";
class MobileDeliveryInfo extends PureComponent {
    componentDidMount() {
        window.scroll(0,0)
    }

    render() {
        return (
            <Fragment>
                <MobileTopBack  title="Add delivery information" />
                <DeliveryInfoPart mobileDelivery={true} />
            </Fragment>
        );
    }
}
export default MobileDeliveryInfo;