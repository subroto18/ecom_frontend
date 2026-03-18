import React, {Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import DesktopLogin from "../component/Desktop/Profile/DesktopLogin";
import MobileLogin from "../component/Mobile/Profile/MobileLogin";
import Api from "../ClientApi/Api";
import Router from "next/router";

class Login extends React.PureComponent {

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
        } else if (this.props.isAuthorized !== true) {
            return <Fragment>
                    <div className="desktop">
                        <DesktopLogin/>
                    </div>
                    <div className="mobileApp">
                        <MobileLogin/>
                    </div>
            </Fragment>
        } else {
            Router.push("/");
        }

    }
}

Login.getInitialProps = async () => {
    const seoData = {
        page: "login",
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
            title: "Login | " + res.meta_title
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

