import React, {PureComponent,Fragment} from 'react';
import DesktopHeaderPart from "../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../Common/DesktopFooterPart";
import AllBrandsPart from "../../../CommonScreen/AllBrands/AllBrandsPart";
class AllBrands extends PureComponent {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                 <AllBrandsPart/>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default AllBrands;