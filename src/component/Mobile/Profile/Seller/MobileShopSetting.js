import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ShopSettingPart from "../../../CommonScreen/Profile/Seller/Shop/ShopSettingPart";

class MobileShopSetting extends PureComponent {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="Shop Info"/>
            <Container className='mobileContainer'>
                <ShopSettingPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileShopSetting;