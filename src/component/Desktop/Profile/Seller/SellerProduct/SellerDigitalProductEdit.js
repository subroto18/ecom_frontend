import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import SellerDigitalProductEditPart
    from "../../../../CommonScreen/Profile/Seller/SellerProduct/SellerDigitalProductEditPart";

class SellerDigitalProductEdit extends PureComponent {
    render() {
        return (
            <Container>
                <Fragment>
                <h4 className="seller-dashboard-title mb-3">Edit Product</h4>
                <Fragment>
                    <SellerDigitalProductEditPart/>
                </Fragment>
            </Fragment>
            </Container>
        );
    }
}
export default SellerDigitalProductEdit;
