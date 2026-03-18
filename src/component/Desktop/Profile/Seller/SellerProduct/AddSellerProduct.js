import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import AddSellerProductPart from "../../../../CommonScreen/Profile/Seller/SellerProduct/AddSellerProductPart";
class AddSellerProduct extends PureComponent {

  render() {
        return <Fragment>
                  <Container>
                  <div>
                      <span className="profile title mb-4">Add New Product</span>
                  </div>
                  <Fragment>
                      <AddSellerProductPart/>
                  </Fragment>
                  </Container>
        </Fragment>

    }
}
export default AddSellerProduct;
