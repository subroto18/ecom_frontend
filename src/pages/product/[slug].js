import React, {Fragment} from 'react';
import Api from "../../ClientApi/Api";
import Preloader from "../../component/Loader/Preloader";
import SingleProduct from "../../component/Desktop/SingleProduct/SingleProduct";
import MobileSingleProduct from "../../component/Mobile/MobileSingleProduct/MobileSingleProduct";
import {starter} from "../../services/actions/starterAction";
import {getSingleProduct} from "../../services/actions/productAction";
import {connect} from "react-redux";

class ProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: ""
        }
    }

    componentDidMount() {
        this.props.starter();
        let url = window.location.pathname.split("/")[2];
        this.setState({
            slug: url
        })
        this.props.getSingleProduct(url);

    }


    render() {

        if (this.props.isAuthorized === undefined) {
            return <Fragment>
                <Preloader/>
            </Fragment>
        } else {
            return <Fragment>
                <div className="desktop">
                    <SingleProduct link={this.state.slug}/>
                </div>
                <div className="mobileApp">
                    <MobileSingleProduct link={this.state.slug}/>
                </div>
            </Fragment>
        }
    }

}


ProductPage.getInitialProps = async (context) => {
    const {slug} = context.query;
    const seoData = {
        page: 'product',
        slug: slug
    }
    try {
        const response = await Api().post('/seo-meta-data', seoData);
        const data = await response.data;
        return {data}
    } catch (e) {
        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: ''
        }
        return {data}
    }
}


const mapDispatchToProps = {
    starter,
    getSingleProduct
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;

    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);