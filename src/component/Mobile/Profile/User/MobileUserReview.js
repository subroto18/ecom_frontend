import React, { Fragment, PureComponent} from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserReviewPart from "../../../CommonScreen/Profile/User/MyReviews/UserReviewPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
class MobileUserReview extends PureComponent {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="Write Review"/>
            <Container className='mobileContainer'>
                <UserReviewPart/>
           </Container>
            <NavMobileBottom/>
    </Fragment>
    )
  }
}
export default MobileUserReview;
