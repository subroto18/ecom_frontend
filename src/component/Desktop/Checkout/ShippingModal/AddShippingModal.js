import React, {PureComponent, Fragment} from 'react';
import dynamic from "next/dynamic"
const DeliveryInfoPart = dynamic(() => import("../../../CommonScreen/DeliveryInfo/DeliveryInfoPart"));
class AddShippingModal extends PureComponent {

    render() {
        return (
            <Fragment>
               <DeliveryInfoPart shipping={true}/>
            </Fragment>
        );
    }
}
export default AddShippingModal;