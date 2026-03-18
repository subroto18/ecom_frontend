import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import AddSellerDigitalProductPart
    from "../../../../CommonScreen/Profile/Seller/SellerProduct/AddSellerDigitalProductPart";
class AddSellerDigitalProduct extends PureComponent {
    render() {
        return (
            <Fragment>
                <Container>
                <div>
                     <span className="profile title mb-4">Add Digital Product</span>
                </div>
                <Fragment>
                    <AddSellerDigitalProductPart/>
                </Fragment>
                </Container>
            </Fragment>
        );
    }
}
export default AddSellerDigitalProduct;
