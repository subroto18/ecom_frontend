import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import Preloader from "../../../component/Loader/Preloader";
import ProductSearch from "../../../component/Desktop/ProductFilter/ProductSearch";
import {starter} from "../../../services/actions/starterAction";
import {clearSearchSort, searchProductFetch} from "../../../services/actions/filterAction";
import MobileProductSearch from "../../../component/Mobile/MobileProductFilter/MobileProductSearch";
import Api from "../../../ClientApi/Api";

class CategorySearchPage extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            url: "",
            pageName: ""
        }
    }


    componentDidMount() {
        this.props.starter();
        this.props.clearSearchSort();
        let url = window.location.href.split('/')[5];
        let pageName = window.location.href.split('/')[4];

        this.props.searchProductFetch(url);
        this.setState({
            url: url,
            pageName: pageName
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
                        <ProductSearch slug={this.state.url} pageName={this.state.pageName}/>
                    </div>
                    <div className="mobileApp">
                        <MobileProductSearch/>
                    </div>

                </Fragment>
            );

        }


    }
}


CategorySearchPage.getInitialProps = async () => {

    const seoData = {
        page: "category-search",
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
            title: "Category Search | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Category Search'
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

export default connect(mapStateToProps, mapDispatchToProps)(CategorySearchPage);


