import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserAllReviewsPart from "../../../CommonScreen/Profile/User/MyReviews/UserAllReviewsPart";

class MobileUserAllReviews extends Component {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="My Reviews"/>
            <Container className='mobileContainer'>
                <UserAllReviewsPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileUserAllReviews;