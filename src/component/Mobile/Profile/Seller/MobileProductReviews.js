import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ProductReviewsPart from "../../../CommonScreen/Profile/Seller/ProductReviews/ProductReviewsPart";

class MobileProductReviews extends PureComponent {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="All Reviews"/>
            <Container className='mobileContainer'>
                <ProductReviewsPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileProductReviews;