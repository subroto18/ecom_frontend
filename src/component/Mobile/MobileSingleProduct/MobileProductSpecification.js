import React, {PureComponent,Fragment} from 'react';
const ProductSpecifications = React.lazy(() => import("../../Desktop/SingleProduct/ProductSpecifications"));

class MobileProductSpecification extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="mobile-product-specification">
                    <ProductSpecifications/>
                </div>
            </Fragment>
        );
    }
}

export default MobileProductSpecification;