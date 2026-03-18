import React, { PureComponent, Fragment } from "react";
import parse from "html-react-parser";

class ProductSpecifications extends PureComponent {
  render() {
    return (
      <Fragment>
        <Fragment>{parse(this.props.descriptionValue)}</Fragment>
      </Fragment>
    );
  }
}
export default ProductSpecifications;
