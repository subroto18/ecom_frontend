import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import ProductReviewsPart from "../../../../CommonScreen/Profile/Seller/ProductReviews/ProductReviewsPart";
class ProductReviews extends PureComponent {
    render() {
        return (
            <Container>
                <span className="profile title mb-4">All Reviews</span>
                <Fragment>
                    <ProductReviewsPart/>
                </Fragment>
            </Container>
        );
    }
}
export default ProductReviews;