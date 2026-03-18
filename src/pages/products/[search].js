import React, {PureComponent, Fragment} from 'react';
import {starter} from "../../services/actions/starterAction";
import {connect} from "react-redux";
import {clearSearchSort, searchProductFetch} from "../../services/actions/filterAction";
import Preloader from "../../component/Loader/Preloader";
import ProductSearch from "../../component/Desktop/ProductFilter/ProductSearch";
import MobileProductSearch from "../../component/Mobile/MobileProductFilter/MobileProductSearch";
import Api from "../../ClientApi/Api";

class SearchPage extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            url: ""
        }
    }


    componentDidMount() {
        this.props.starter();
        this.props.clearSearchSort();
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get('q');

        this.props.searchProductFetch(search);
        this.setState({
            url: search
        })

    }

    render() {

        if (this.props.isAuthorized === undefined) {
            return <Fragment>
                <Preloader/>
            </Fragment>
        } else {
            return (
                <Fragment>
                    <div className="desktop">
                        <ProductSearch slug={this.state.url} pageName={this.state.url}/>
                    </div>
                    <div className="mobileApp">
                        <MobileProductSearch/>
                    </div>
                </Fragment>
            );

        }


    }
}


SearchPage.getInitialProps = async () => {

    const seoData = {
        page: "search-product",
        slug: "/"
    }
    try {
        const response = await Api().post('/seo-meta-data', seoData);
        const res = await response.data;
        const data = {
            meta_title: res.meta_title,
            meta_description: res.meta_description,
            meta_keyword: res.meta_keyword,
            meta_photo: res.meta_photo,
            meta_url: res.meta_url,
            title: "Search Product | " + res.meta_title
        }
        return {data}

    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Search Product'
        }

        return {data}
    }

}


const mapDispatchToProps = {
    starter,
    clearSearchSort,
    searchProductFetch
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);


