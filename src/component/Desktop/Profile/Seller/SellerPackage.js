import React, {PureComponent, Fragment} from 'react';
import DesktopHeaderPart from "../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../Common/DesktopFooterPart";
import SellerPackagePart from "../../../CommonScreen/Profile/Seller/SellerPackagePart";

class SellerPackage extends PureComponent {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                  <Fragment>
                    <SellerPackagePart/>
                  </Fragment>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default SellerPackage;
