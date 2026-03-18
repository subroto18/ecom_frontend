import React, { Fragment, PureComponent} from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ViewReturnOrdersPart from "../../../CommonScreen/Profile/User/MyReturns/ViewReturnOrdersPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
class MobileViewReturnOrders extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Return Order details"/>
            <Container className='mobileContainer'>
                <ViewReturnOrdersPart/>
            </Container>
            <NavMobileBottom/>
    </Fragment>
    )
  }
}
export default MobileViewReturnOrders;
