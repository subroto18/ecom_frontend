import React, {PureComponent,Fragment} from 'react';
import Api from "../../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import {connect} from "react-redux";
import {topRatedProduct} from "../../../../services/actions/topRatedAction";
import ProductCard from "../../ProductCard/ProductCard";
class VerticalTopRatedProduct extends PureComponent {


    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.topRatedApi!==true){
                Api().get('getTopRatedProduct').then(res=>{
                    this.props.topRatedProduct(res.data);
                })
            }
        }
    }

    render() {
            return (
                <Fragment>
                    <VisibilitySensor  onChange={this.onVisible}>
                        <Fragment>
                              <ProductCard sliderProduct={true} title="Top rated Product" loading={this.props.topRatedLoading} data={this.props.topRatedData} link={`product/top-rated-product`} />
                        </Fragment>

                    </VisibilitySensor>
                </Fragment>

            );
        }
}


const mapDispatchToProps = {
    topRatedProduct
};

function mapStateToProps(state) {
    const topRatedLoading = state.topRatedReducer.topRatedLoading;
    const topRatedData = state.topRatedReducer.topRatedData;
    const topRatedApi =state.topRatedReducer.topRatedApi
    return {
        topRatedLoading,
        topRatedData,
        topRatedApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTopRatedProduct);




