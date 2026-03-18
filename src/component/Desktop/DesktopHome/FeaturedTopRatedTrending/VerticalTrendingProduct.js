import React, {Fragment, PureComponent} from 'react';
import Api from "../../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import {connect} from "react-redux";
import {trendingProduct} from "../../../../services/actions/trendingAction"
import ProductCard from "../../ProductCard/ProductCard";


class VerticalTrendingProduct extends PureComponent {

    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.trendingApi!==true){
                Api().get('getTrendingProduct').then(res=>{
                    this.props.trendingProduct(res.data);
                }).catch(error=>{})
            }
        }
    }

    render() {
            return (
                <Fragment>
                    <VisibilitySensor  onChange={this.onVisible}>
                        <ProductCard sliderProduct={true} title="Trending product" loading={this.props.trendingLoading} data={this.props.trendingData} link={`product/trending-product`} />
                    </VisibilitySensor>
                </Fragment>

             );
        }
}

const mapDispatchToProps = {
    trendingProduct
};

function mapStateToProps(state) {
    const trendingLoading = state.trendingReducer.trendingLoading;
    const trendingData = state.trendingReducer.trendingData;
    const trendingApi = state.trendingReducer.trendingApi
    return {
        trendingLoading,
        trendingData,
        trendingApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTrendingProduct);

