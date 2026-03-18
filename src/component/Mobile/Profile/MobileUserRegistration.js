import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import NavMobileTop from "../MobileCommon/NavMobileTop";

import UserRegistrationPart from "../../CommonScreen/Registration/UserRegistrationPart";
class MobileUserRegistration extends PureComponent {

  render() {
    return (
      <Fragment>
           <NavMobileTop/>
           <Container>
               <UserRegistrationPart/>
           </Container>

      </Fragment>
    );
  }
}






export default MobileUserRegistration;
