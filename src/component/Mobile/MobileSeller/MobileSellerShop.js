import React, {PureComponent,Fragment} from 'react';
import MobileTopBack from "../MobileCommon/MobileTopBack";
import SellerShopPart from "../../CommonScreen/AllSeller/SellerShopPart";
import NavMobileBottom from "../MobileCommon/NavMobileBottom";

class MobileSellerShop extends PureComponent {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="Shop"/>
                  <SellerShopPart mobile={true}/>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}

export default MobileSellerShop;