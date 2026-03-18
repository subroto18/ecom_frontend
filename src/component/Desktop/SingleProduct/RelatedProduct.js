import React, {PureComponent, Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
class RelatedProduct extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        let link = this.props.singleProductSlug;
        const data = {
            link:link
        }
        Api().post('getRelatedProduct',data).then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch(error=>{})
    }
    render() {
        return (
                <Fragment>
                    <div className="relatedProduct">
                        <ProductCard sliderProduct={true} title="Related product" loading={this.state.loading} data={this.state.data} />
                    </div>
                </Fragment>
        );
    }
}



function mapStateToProps(state) {
    const singleProductSlug = state.productReducer.singleProductSlug;
    return {
        singleProductSlug
    };
}

export default connect(mapStateToProps)(RelatedProduct);
