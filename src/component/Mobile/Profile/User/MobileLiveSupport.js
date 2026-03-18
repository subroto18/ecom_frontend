import React, { Component, Fragment } from 'react'
import NavMobileTop from "../../MobileCommon/NavMobileTop";
import Container from "react-bootstrap/Container";
import LiveSupportPart from "../../../CommonScreen/Profile/User/MyTickets/LiveSupportPart";

class MobileLiveSupport extends Component {
      render() {
        return (
          <Fragment>
              <NavMobileTop/>
              <Container className='mobileContainer'>
                 <LiveSupportPart token={this.props.token}/>
              </Container>
          </Fragment>
        )
      }
}
export default MobileLiveSupport;