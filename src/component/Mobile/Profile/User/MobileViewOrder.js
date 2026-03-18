import React, { Fragment, PureComponent} from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ViewOrderPart from "../../../CommonScreen/Profile/User/MyOrders/ViewOrderPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileViewOrder extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="My Reviews"/>
            <Container className='mobileContainer'>
                <ViewOrderPart  id={this.props.id}/>
            </Container>
            <NavMobileBottom/>
        </Fragment>
    )
  }
}
export default MobileViewOrder;
