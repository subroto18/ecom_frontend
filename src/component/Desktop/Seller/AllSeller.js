import React, {PureComponent,Fragment} from 'react';
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import AllSellerPart from "../../CommonScreen/AllSeller/AllSellerPart";

class AllSeller extends PureComponent {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                   <AllSellerPart  />
                 <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default AllSeller;