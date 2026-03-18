import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import SupportPart from "../../../CommonScreen/Profile/User/MyTickets/SupportPart";

class MobileSupport extends Component {
  render() {
    return (
      <Fragment>
          <MobileTopBack title="Support Ticket"/>
          <Container className='mobileContainer'>
              <SupportPart/>
          </Container>
      </Fragment>
    )
  }
}
export default MobileSupport;
