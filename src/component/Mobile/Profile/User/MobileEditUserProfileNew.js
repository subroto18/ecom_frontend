import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ForgetPasswordPart from "../../../CommonScreen/Profile/User/MyProfile/ForgetPasswordPart";
class MobileEditUserProfileNew extends Component {
  render() {
    return (
        <Fragment>
          <MobileTopBack title="Edit Address"/>
             <Container className='mobileContainer'>
              <ForgetPasswordPart/>
            </Container>
    </Fragment>
    )
  }
}
export default MobileEditUserProfileNew;