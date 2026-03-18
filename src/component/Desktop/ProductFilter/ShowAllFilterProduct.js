import React, {Fragment, Component} from 'react';
import ProductCard from "../ProductCard/ProductCard";
import {connect} from "react-redux";

class ShowAllFilterProduct extends Component {
    render() {
        return (
            <Fragment>
                <ProductCard loading={this.props.searchFilterLoading} data={this.props.searchProduct} searchProduct={true} />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const searchFilterLoading = state.filterReducer.searchFilterLoading;
    const searchProduct = state.filterReducer.searchProduct;

    return {
        searchFilterLoading,
        searchProduct,

    };
}

export default connect(mapStateToProps)(ShowAllFilterProduct);