import React, { PureComponent, Fragment } from "react";
import dynamic from "next/dynamic"
const NavMobileTop = dynamic(() => import("../../Mobile/MobileCommon/NavMobileTop"))
const NavMobileBottom = dynamic(() => import("../../Mobile/MobileCommon/NavMobileBottom"))
const LoginPart = dynamic(() => import("../../CommonScreen/Login/LoginPart"))
class MobileLogin extends PureComponent {
  render() {
    return (
      <Fragment>
         <NavMobileTop/>
          <LoginPart/>
        <NavMobileBottom/>
      </Fragment>
    );
  }
}

export default MobileLogin;
