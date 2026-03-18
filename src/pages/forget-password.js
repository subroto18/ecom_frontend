import React, {PureComponent, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import ForgetPassword from "../component/Desktop/Profile/User/MyProfile/ForgetPassword";
import MobileForgetPassword from "../component/Mobile/Profile/User/MobileForgetPassword";
import Api from "../ClientApi/Api";

class UserForgetPasswordPage extends PureComponent {

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
        else if(this.props.isAuthorized===true){
             Router.push("/")
        }
        else{
            return (
                <Fragment>
                    <div className="desktop">
                        <ForgetPassword/>
                    </div>
                    <div className="mobileApp">
                        <MobileForgetPassword/>
                    </div>
                </Fragment>
            );

        }

    }
}

UserForgetPasswordPage.getInitialProps = async () => {

    const seoData = {
        page: "forget-password",
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
            title: "Forget Password | " + res.meta_title
        }
        return {data}

    } catch (e) {

        const data = {
            meta_title: 'Forget Password',
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

export default connect(mapStateToProps, mapDispatchToProps)(UserForgetPasswordPage);
