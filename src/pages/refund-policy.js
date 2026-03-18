import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import DesktopRefundPolicy from "../component/Desktop/Common/DesktopRefundPolicy";
import MobileRefundPolicy from "../component/Mobile/MobileCommon/MobileRefundPolicy";
import Api from "../ClientApi/Api";
import Preloader from "../component/Loader/Preloader";

class RefundPolicy extends PureComponent {

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
                        <DesktopRefundPolicy/>
                    </div>
                    <div className="mobileApp">
                        <MobileRefundPolicy/>
                    </div>
                </Fragment>
            );

        }

    }
}


RefundPolicy.getInitialProps = async () => {

    const seoData = {
        page: "refund-policy",
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
            title: "Refund Policy | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: 'Refund Policy',
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

export default connect(mapStateToProps, mapDispatchToProps)(RefundPolicy);


