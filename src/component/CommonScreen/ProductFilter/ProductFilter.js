import React, {Component, Fragment} from 'react';
import AuthContext from "../../../Auth/Auth";
const ApplyFilterButton = React.lazy(() => import("../../Desktop/ProductFilter/ApplyFilterButton"));
const ProductFilterByPrice = React.lazy(() => import("../../Desktop/ProductFilter/ProductFilterByPrice"));
const ProductVariation = React.lazy(() => import("../../Desktop/ProductFilter/ProductVariation"));
class ProductFilter extends Component {
    static contextType = AuthContext;
    render() {
        return (
            <Fragment>
                <ApplyFilterButton
                    search={this.context.searchFilterLoading}
                    variation={this.state.variationArray}
                    minPrice={this.state.MinPrice}
                    maxPrice={this.state.MaxPrice}
                    brands={this.state.Brands}
                    sort={this.state.Sort}
                    seller={this.state.Seller}
                    slug={this.state.menu}
                    triggerParentUpdate={this.onClear}
                />
                <ProductFilterByPrice triggerParentUpdate={this.onPrice} />
                <ProductVariation clear={this.state.clear} triggerParentUpdate={this.onVariation} />
            </Fragment>
        );
    }
}
export default ProductFilter;