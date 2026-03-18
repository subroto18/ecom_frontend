import React, {Component, Fragment} from 'react';
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import SellerDashBoard from "../component/Desktop/Profile/Seller/SellerDashBoard";
import SellerDigitalProduct from "../component/Desktop/Profile/Seller/SellerProduct/SellerDigitalProduct";
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import MobileSellerDigitalProduct from "../component/Mobile/Profile/Seller/MobileSellerDigitalProduct";
import Api from "../ClientApi/Api";

class SellerDigitalProductPage extends Component {

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
        } else if (this.props.isAuthorized === false) {
            Router.push("/")
        } else {
            if (this.props.role === 2) {
                return (
                    <Fragment>
                        <div className="desktop">
                            <SellerDashBoard>
                                <SellerDigitalProduct/>
                            </SellerDashBoard>
                        </div>
                        <div className="mobileApp">
                            <MobileSellerDigitalProduct/>
                        </div>
                    </Fragment>
                );
            } else {
                Router.push("/dashboard")
            }

        }

    }
}


SellerDigitalProductPage.getInitialProps = async () => {

    const seoData = {
        page: "seller-digital-products",
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
            title: "Seller Digital Product | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: 'Seller Digital Product',
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
    starter
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const role = state.userReducer.role

    return {
        isAuthorized,
        role
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerDigitalProductPage);


