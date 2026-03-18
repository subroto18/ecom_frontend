import React, {Component, Fragment} from 'react';
import { Container } from 'react-bootstrap';
import ShopSettingPart from '../../../../CommonScreen/Profile/Seller/Shop/ShopSettingPart';
class ShopSetting extends Component {
    render() {
        return (
            <Container>
                <span className="profile title mb-4">Shop Settings</span>
                <Fragment>
                    <ShopSettingPart/> 
                </Fragment>
            </Container>
        );
    }
}
export default ShopSetting;