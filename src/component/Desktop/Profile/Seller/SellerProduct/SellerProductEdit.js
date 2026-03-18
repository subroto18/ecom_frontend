import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import SellerProductEditPart from "../../../../CommonScreen/Profile/Seller/SellerProduct/SellerProductEditPart";
class SellerProductEdit extends PureComponent {
    render() {
        return (
            <Container>
                <Fragment>
                <h4 className="seller-dashboard-title mb-3">Edit Product</h4>
                <Fragment>
                    <SellerProductEditPart/>
                </Fragment>
            </Fragment>
            </Container>
        );
    }
}
export default SellerProductEdit;
