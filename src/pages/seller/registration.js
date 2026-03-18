import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import Router from "next/router";
import SellerRegistration from "../../component/Desktop/Profile/Seller/SellerRegistration";
import MobileSellerRegistraion from "../../component/Mobile/Profile/MobileSellerRegistration";
import {starter} from "../../services/actions/starterAction";
import Preloader from "../../component/Loader/Preloader";
import Api from "../../ClientApi/Api";

class Registration extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.starter();
    }

    render() {


        if (this.props.isAuthorized == undefined) {
            return <Fragment>
                <Preloader/>
            </Fragment>
        } else if (this.props.vendor !== 1) {
            Router.push("/");
        } else if (this.props.isAuthorized == true) {
            if (this.props.role === 2) {
                Router.push("/");
            } else {
                return (
                    <Fragment>
                        <div className="desktop">
                            <SellerRegistration/>
                        </div>
                        <div className="mobileApp">
                            <MobileSellerRegistraion/>
                        </div>
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    <div className="desktop">
                        <SellerRegistration/>
                    </div>
                    <div className="mobileApp">
                        <MobileSellerRegistraion/>
                    </div>
                </Fragment>
            );

        }


    }
}

Registration.getInitialProps = async () => {
    const seoData = {
        page: "seller-registration",
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
            title: "Registration | " + res.meta_title
        }
        return {data}

    } catch (e) {
        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Registration'
        }
        return {data}
    }

}


const mapDispatchToProps = {
    starter
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const vendor = state.starterReducer.vendor;
    const role = state.userReducer.role;

    return {
        isAuthorized,
        vendor,
        role
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration);
