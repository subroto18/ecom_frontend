import React, {PureComponent, Fragment} from 'react';
import DeliveryInfoPart from "../../../CommonScreen/DeliveryInfo/DeliveryInfoPart";
class AddBillingModal extends PureComponent {
    render() {
        return (
            <Fragment>
                <DeliveryInfoPart billing={true}/>
            </Fragment>
        );
    }
}
export default AddBillingModal;