import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import {starter} from "../services/actions/starterAction"
import SellerPackage from "../component/Desktop/Profile/Seller/SellerPackage";
import MobileSellerPackage from "../component/Mobile/Profile/Seller/MobileSellerPackage";
import Api from "../ClientApi/Api";
class SellerPackagePage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.starter();
    }

    render() {

        if(this.props.isAuthorized===undefined){
            return <Fragment>
                     <Preloader/>
                   </Fragment>
        }
        else if(this.props.isAuthorized===false){
            Router.push("/")
        }
        else{
            if(this.props.vendor && this.props.role===2){
                return (
                    <Fragment>
                        <div className="desktop">
                            <SellerPackage/>
                        </div>
                        <div className="mobileApp">
                            <MobileSellerPackage/>
                        </div>
                    </Fragment>
                );
            }else{
                Router.push("/")
            }

        }

    }
}


SellerPackagePage.getInitialProps = async () => {

    const seoData = {
        page: "seller-package",
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
            title: "Seller Package | " + res.meta_title
        }
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
    starter
};

function mapStateToProps(state) {
    const vendor = state.starterReducer.vendor;
    const isAuthorized = state.userReducer.isAuthorized;
    const role = state.userReducer.role;
    return {
        vendor,
        isAuthorized,
        role
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerPackagePage);


