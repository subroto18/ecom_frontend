import React, { Fragment, PureComponent} from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ViewCancelOrderPart from "../../../CommonScreen/Profile/User/MyCancellations/ViewCancelOrderPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileViewCancelOrder extends PureComponent {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="Cancel order Details"/>
            <Container className='mobileContainer'>
               <ViewCancelOrderPart/>
            </Container>
            <NavMobileBottom/>
        </Fragment>
    )
  }
}
export default MobileViewCancelOrder;