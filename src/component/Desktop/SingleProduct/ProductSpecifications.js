import React, {PureComponent,Fragment} from 'react';
import ReactHtmlParser from "react-html-parser";
class ProductSpecifications extends PureComponent {
    render() {
        return (
            <Fragment>
                 <Fragment>
                     {ReactHtmlParser(this.props.descriptionValue)}
                 </Fragment>
            </Fragment>
        );
    }
}
export default ProductSpecifications;