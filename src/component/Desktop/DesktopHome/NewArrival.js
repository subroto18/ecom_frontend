import React, {Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import {newArrival} from "../../../services/actions/productAction"
import ProductCard from "../ProductCard/ProductCard";
class NewArrival extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try{
            Api().get('newArrival').then(res => {
                this.props.newArrival(res.data);
            })
        }catch(error){

        }

    }

    render() {
        return (
            <Fragment>
                    <ProductCard sliderProduct={true} title="New arrival" link={`/product/new-arrival`} loading={this.props.newArrivalLoading} data={this.props.newArrivalData} />
            </Fragment>

        );
    }
}



const mapDispatchToProps = {
    newArrival
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const newArrivalData = state.productReducer.newArrivalData;
    const newArrivalLoading = state.productReducer.newArrivalLoading;
    return {
        isAuthorized,
        newArrivalData,
        newArrivalLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArrival);




