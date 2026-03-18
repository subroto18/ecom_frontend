import React, {Component, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import SellerDashBoard from "../component/Desktop/Profile/Seller/SellerDashBoard";
import RefundRequest from "../component/Desktop/Profile/Seller/RefundRequest/RefundRequest";
import MobileRefundRequest from "../component/Mobile/Profile/Seller/MobileRefundRequest";
import Api from "../ClientApi/Api";

class RefundRequestPage extends Component {

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
                                <RefundRequest/>
                            </SellerDashBoard>
                        </div>
                        <div className="mobileApp">
                            <MobileRefundRequest/>
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


RefundRequestPage.getInitialProps = async () => {

    const seoData = {
        page: "refund-request",
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
            title: "Refund Request | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: 'Refund Request',
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

export default connect(mapStateToProps, mapDispatchToProps)(RefundRequestPage);

