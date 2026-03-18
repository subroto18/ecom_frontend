import React, { Fragment, PureComponent} from 'react';
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ViewReplaceOrdersPart from "../../../CommonScreen/Profile/User/MyReplaces/ViewReplaceOrdersPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileViewReplaceOrders extends PureComponent {
  render() {
    return (
        <Fragment>
        <MobileTopBack title="Replace Order details"/>
          <Container className='mobileContainer'>
              <ViewReplaceOrdersPart />
          </Container>
       <NavMobileBottom/>
      </Fragment>
    )
  }
}
export default MobileViewReplaceOrders;
