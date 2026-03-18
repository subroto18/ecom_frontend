import React, {PureComponent, Fragment} from 'react';
import UserAllReviewsPart from "../../../../CommonScreen/Profile/User/MyReviews/UserAllReviewsPart";
class UserAllReviews extends PureComponent {
    render() {
        return (
            <Fragment>
                <h4 className="mb-4">My Reviews</h4>
                <Fragment>
                    <UserAllReviewsPart/>
                </Fragment>
            </Fragment>
        );
    }
}
export default UserAllReviews;