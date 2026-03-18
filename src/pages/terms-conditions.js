import React, {PureComponent, Fragment} from 'react';
import DesktopTermsCondition from "../component/Desktop/Common/DesktopTermsCondition";
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import Preloader from "../component/Loader/Preloader";
import MobileTermsCondition from "../component/Mobile/MobileCommon/MobileTermsCondition";
import Api from "../ClientApi/Api";
class TermsConditions extends PureComponent {

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
                        <DesktopTermsCondition/>
                    </div>
                    <div className="mobileApp">
                        <MobileTermsCondition/>
                    </div>
                </Fragment>
            );

        }

    }
}


TermsConditions.getInitialProps = async () => {

    const seoData = {
        page: "terms-condition",
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
            title: "Terms & Condition | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Terms & Condition'
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


export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);



