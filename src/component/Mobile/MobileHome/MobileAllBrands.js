import React, {PureComponent,Fragment} from 'react';
import MobileTopBack from "../MobileCommon/MobileTopBack";
import AllBrandsPart from "../../CommonScreen/AllBrands/AllBrandsPart";
import NavMobileBottom from "../MobileCommon/NavMobileBottom";
class MobileAllBrands extends PureComponent {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="All Brands"/>
                 <AllBrandsPart mobile={true}/>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}
export default MobileAllBrands;