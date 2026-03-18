import React, {PureComponent, Fragment} from 'react';
import {starter} from "../../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../../component/Loader/Preloader";
import AllBrands from "../../component/Desktop/DesktopHome/TopTenCategoryBrand/AllBrands";
import MobileAllBrands from "../../component/Mobile/MobileHome/MobileAllBrands";
import Api from "../../ClientApi/Api";

class AllBrandsPage extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.starter();
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
                        <AllBrands/>
                    </div>
                    <div className="mobileApp">
                        <MobileAllBrands/>
                    </div>
                </Fragment>
            );

        }

    }
}


AllBrandsPage.getInitialProps = async () => {

    const seoData = {
        page: "all-brands",
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
            title: "All Brands | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'All Brands'
        }
        return {data}
    }

}

const mapDispatchToProps = {
    starter
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBrandsPage);



