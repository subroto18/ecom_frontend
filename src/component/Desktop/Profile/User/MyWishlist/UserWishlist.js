import React, {PureComponent,Fragment} from 'react';
import UserWishlistPart from "../../../../CommonScreen/Profile/User/MyWishlist/UserWishlistPart";
class UserWishlist extends PureComponent {
    render() {
        return (
            <Fragment>
                <span className="profile title mb-4 myWishlistHead">My Wishlist</span>
                <UserWishlistPart/>
            </Fragment>
        );
    }
}
export default UserWishlist;