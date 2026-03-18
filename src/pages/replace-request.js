import React, {Component, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import SellerDashBoard from "../component/Desktop/Profile/Seller/SellerDashBoard";
import ReplaceRequest from "../component/Desktop/Profile/Seller/ReplaceRequest/ReplaceReqeust";
import MobileReplaceRequest from "../component/Mobile/Profile/Seller/MobileReplaceRequest";
import Api from "../ClientApi/Api";

class ReplaceRequestPage extends Component {
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
                                <ReplaceRequest/>
                            </SellerDashBoard>
                        </div>
                        <div className="mobileApp">
                            <MobileReplaceRequest/>
                        </div>
                    </Fragment>
                );
            } else {
                Router.push("/dashboard")
            }
        }
        ;
    }
}


ReplaceRequestPage.getInitialProps = async () => {

    const seoData = {
        page: "replace-request",
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
            title: "Replace Request | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: 'Replace Request',
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
    const role = state.userReducer.role;
    return {
        isAuthorized,
        role
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplaceRequestPage);

