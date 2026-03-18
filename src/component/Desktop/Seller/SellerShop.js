import React, { PureComponent, Fragment } from "react";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import SellerShopPart from "../../CommonScreen/AllSeller/SellerShopPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
class SellerShop extends PureComponent {
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    return (
      <Fragment>
        <DesktopHeaderPart/>
           <SellerShopPart mobile={false}/>
        <DesktopFooterPart/>
      </Fragment>
    );
  }
}
export default SellerShop;
