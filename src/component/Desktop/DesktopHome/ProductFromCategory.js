import React, {Fragment} from 'react';
import dynamic from "next/dynamic"
const ProductCard = dynamic(() => import("../ProductCard/ProductCard"));
class ProductFromCategory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cartVariationModal: false,
            cartSuccessModel:true,
            data:[],
            loading:true
        }
    }
    componentDidMount() {
        this.setState({
            data:this.props.product
        })
    }
    render() {
        return (
            <Fragment>
                <ProductCard sliderProduct={true} title={this.props.category} link={this.props.slug} loading={false} data={this.props.product} />
            </Fragment>
        );
    }
}
export default ProductFromCategory;