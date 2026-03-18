import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserCancellationsPart from "../../../CommonScreen/Profile/User/MyCancellations/UserCancellationsPart";
class MobileUserCancellations extends Component {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="My Cancellations"/>
            <Container className='mobileContainer'>
                <UserCancellationsPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileUserCancellations;