import React, {PureComponent,Fragment} from 'react';
import {connect} from "react-redux";
import MobileProduct from "../MobileProductCard/MobileProduct";
class MobileShowAllFilterProduct extends PureComponent {

    render() {
        return (
            <Fragment>
                {this.props.searchFilterLoading ?
                    <Fragment>
                        <Fragment>
                            <div className="loader-spinner">
                                <div className="spinner-border text-muted"/>
                            </div>
                        </Fragment>
                    </Fragment> :
                    <Fragment>
                        <MobileProduct  loading={this.props.searchFilterLoading} data={this.props.searchProduct} />
                    </Fragment>
                }
            </Fragment>
        );
    }
}




function mapStateToProps(state) {
    const searchFilterLoading = state.filterReducer.searchFilterLoading;
    const searchProduct = state.filterReducer.searchProduct
    return {
        searchFilterLoading,
        searchProduct
    };
}

export default connect(mapStateToProps)(MobileShowAllFilterProduct);

