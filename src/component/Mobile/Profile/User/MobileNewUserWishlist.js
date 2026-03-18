import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserWishlistPart from "../../../CommonScreen/Profile/User/MyWishlist/UserWishlistPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";
class MobileNewUserWishlist extends Component {
  render() {
    return (
      <Fragment>
          <MobileTopBack title="My Wishlist"/>
          <Container className='mobileContainer'>
              <UserWishlistPart/>
          </Container>
          <NavMobileBottom/>
      </Fragment>
    )
  }
}
export default MobileNewUserWishlist;