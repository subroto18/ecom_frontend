import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import Router from "next/router";
import Preloader from "../component/Loader/Preloader";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import DefaultBillingAddress from "../component/Desktop/Profile/User/MyAddress/DefaultBillingAddress";
import MobileDefaultBillingAddress from "../component/Mobile/Profile/User/MobileDefaultBillingAddress";
import {starter} from "../services/actions/starterAction"
import Api from "../ClientApi/Api";
class defaultBillingAddress extends PureComponent {
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
                            <DefaultBillingAddress/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileDefaultBillingAddress/>
                    </div>
                </Fragment>
            );
        }
    }
}


defaultBillingAddress.getInitialProps = async () => {

    const seoData = {
        page: "default-billing-address",
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
            title: "Billing address | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: 'Billing address',
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

export default connect(mapStateToProps, mapDispatchToProps)(defaultBillingAddress);



