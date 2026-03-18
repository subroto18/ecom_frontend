import React, { PureComponent, Fragment } from "react";
import NavMobileTop from "../MobileCommon/NavMobileTop";
import SellerRegistrationPart from "../../CommonScreen/Registration/SellerRegistrationPart";
import NavMobileBottom from "../MobileCommon/NavMobileBottom";
class MobileSellerRegistraion extends PureComponent {

  render() {
    return (
      <Fragment>
           <NavMobileTop/>
            <SellerRegistrationPart/>
          <NavMobileBottom/>
      </Fragment>
    );
  }
}

export default MobileSellerRegistraion;
