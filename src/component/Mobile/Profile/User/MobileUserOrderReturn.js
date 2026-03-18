import React, { Fragment, PureComponent} from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserOrderReturnPart from "../../../CommonScreen/Profile/User/MyReturns/UserOrderReturnPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
class MobileUserOrderReturn extends PureComponent {
  render() {
    return (
        <Fragment>
        <MobileTopBack title="Request Return"/>
        <Container className='mobileContainer'>
            <UserOrderReturnPart />
        </Container>
        <NavMobileBottom/>
    </Fragment>
    )
  }
}
export default MobileUserOrderReturn;