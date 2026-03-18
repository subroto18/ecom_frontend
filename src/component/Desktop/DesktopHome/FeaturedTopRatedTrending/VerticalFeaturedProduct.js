import React, {Fragment, PureComponent} from 'react';
import VisibilitySensor from "react-visibility-sensor";
import Api from "../../../../ClientApi/Api";
import {connect} from "react-redux";
import {featuredProduct} from "../../../../services/actions/featuredAction";
import ProductCard from "../../ProductCard/ProductCard";
class VerticalFeaturedProduct extends PureComponent {

    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.featuredApi!==true){
                Api().get('getFeaturedProduct').then(res=>{
                    this.props.featuredProduct(res.data);
                }).catch(error=>{});
            }
        }
    }

    render() {
            return (
                <Fragment>
                    <VisibilitySensor  onChange={this.onVisible}>
                        <Fragment>
                                <ProductCard sliderProduct={true} title="Featured Product" loading={this.props.featuredLoading} data={this.props.featuredData} />
                        </Fragment>

                    </VisibilitySensor>
                </Fragment>

            );
        }
}


const mapDispatchToProps = {
    featuredProduct
};

function mapStateToProps(state) {
    const featuredLoading = state.featuredReducer.featuredLoading;
    const featuredData = state.featuredReducer.featuredData;

    return {
        featuredLoading,
        featuredData
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalFeaturedProduct);





