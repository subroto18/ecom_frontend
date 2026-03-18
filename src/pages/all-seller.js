import React, {PureComponent, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import AllSeller from "../component/Desktop/Seller/AllSeller";
import MobileAllSeller from "../component/Mobile/MobileSeller/MobileAllSeller";
import Api from "../ClientApi/Api";

class SellerShopPage extends PureComponent {

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
                        <AllSeller/>
                    </div>
                    <div className="mobileApp">
                        <MobileAllSeller/>
                    </div>
                </Fragment>
            );

        }

    }
}


SellerShopPage.getInitialProps = async () => {

    const seoData = {
        page: "seller-shop",
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
            title: "All Sellers | " + res.meta_title
        }
        return {data}


    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'All Sellers'
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

export default connect(mapStateToProps, mapDispatchToProps)(SellerShopPage);


