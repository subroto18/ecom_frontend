import React, { Fragment, PureComponent} from 'react';
import Container from 'react-bootstrap/Container';
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserOrderReplacePart from "../../../CommonScreen/Profile/User/MyReplaces/UserOrderReplacePart";

class MobileUserOrderReplace extends PureComponent {
  render() {
    return (
      <Fragment>
        <MobileTopBack title="My Reviews"/>
          <Container className='mobileContainer'>
              <UserOrderReplacePart/>
          </Container>
         <NavMobileBottom/>
      </Fragment>
    )
  }
}
export default MobileUserOrderReplace;