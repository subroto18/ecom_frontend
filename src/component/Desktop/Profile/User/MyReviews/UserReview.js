import React, {PureComponent,Fragment} from 'react';
import UserReviewPart from "../../../../CommonScreen/Profile/User/MyReviews/UserReviewPart";
class UserReview extends PureComponent {
    render() {
        return (
                <Fragment>
                    <div className="d">
                        <span className="profile title mb-4">Write Review</span>
                    </div>
                    <Fragment>
                        <UserReviewPart/>
                    </Fragment>
                </Fragment>
        );
    }
}
export default UserReview
