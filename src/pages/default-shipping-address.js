import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import Router from "next/router";
import Preloader from "../component/Loader/Preloader";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import DefaultShippingAddress from "../component/Desktop/Profile/User/MyAddress/DefaultShippingAddress";
import MobileDefaultShippingAddress from "../component/Mobile/Profile/User/MobileDefaultShippingAddress";
import Api from "../ClientApi/Api";

class defaultShippingAddress extends PureComponent {

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
            Router.push("/");
        } else {
            return (
                <Fragment>
                    <div className="desktop">
                        <UserDashboard>
                            <DefaultShippingAddress/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileDefaultShippingAddress/>
                    </div>
                </Fragment>
            );
        }
    }
}

defaultShippingAddress.getInitialProps = async () => {

    const seoData = {
        page: "default-shipping-address",
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
            title: "Shipping address | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: 'Shipping address',
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
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(defaultShippingAddress);




