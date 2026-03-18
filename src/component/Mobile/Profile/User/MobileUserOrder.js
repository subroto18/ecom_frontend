import React, { Fragment, PureComponent} from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserOrderPart from "../../../CommonScreen/Profile/User/MyOrders/UserOrderPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileUserOrder extends PureComponent {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="My orders"/>
            <Container className='mobileContainer'>
                <UserOrderPart/>
            </Container>
         <NavMobileBottom/>
    </Fragment>
    )
  }
}
export default MobileUserOrder;