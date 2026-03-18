
import React, {PureComponent, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import DesktopReplacePolicy from "../component/Desktop/Common/DesktopReplacePolicy";
import MobileReplacePolicy from "../component/Mobile/MobileCommon/MobileReplacePolicy";
import Preloader from "../component/Loader/Preloader";
import Api from "../ClientApi/Api";
class ReplacePolicy extends PureComponent {

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
        else{
            return (
                <Fragment>
                    <div className="desktop">
                        <DesktopReplacePolicy/>
                    </div>
                    <div className="mobileApp">
                        <MobileReplacePolicy/>
                    </div>
                </Fragment>
            );

        }

    }
}


ReplacePolicy.getInitialProps = async () => {

    const seoData = {
        page: "replace-policy",
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
            title: "Replace Policy | " + res.meta_title
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplacePolicy);

