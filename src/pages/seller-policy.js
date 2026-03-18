import React, {PureComponent, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import DesktopSellerPolicy from "../component/Desktop/Common/DesktopSellerPolicy";
import MobileSellerPolicy from "../component/Mobile/MobileCommon/MobileSellerPolicy";
import Preloader from "../component/Loader/Preloader";
import Api from "../ClientApi/Api";

class SellerPolicy extends PureComponent {
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
                        <DesktopSellerPolicy/>
                    </div>
                    <div className="mobileApp">
                        <MobileSellerPolicy/>
                    </div>
                </Fragment>
            );

        }

    }
}

SellerPolicy.getInitialProps = async () => {

    const seoData = {
        page: "seller-policy",
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
            title: "Seller Policy | " + res.meta_title
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
    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerPolicy);

