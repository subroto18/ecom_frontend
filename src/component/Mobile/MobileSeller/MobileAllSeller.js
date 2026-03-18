import React, {PureComponent,Fragment} from 'react';
import MobileTopBack from "../MobileCommon/MobileTopBack";
import AllSellerPart from "../../CommonScreen/AllSeller/AllSellerPart";
import NavMobileBottom from "../MobileCommon/NavMobileBottom";
class MobileAllSeller extends PureComponent {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="All Seller"/>
                      <AllSellerPart mobile={true}/>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}
export default MobileAllSeller;