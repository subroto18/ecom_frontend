import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import UserRegistration from "../../component/Desktop/Profile/User/MyRegistration/UserRegistration";
import {starter} from "../../services/actions/starterAction";
import Router from "next/router";
import Preloader from "../../component/Loader/Preloader";
import Api from "../../ClientApi/Api";
import MobileUserRegistration from "../../component/Mobile/Profile/MobileUserRegistration";

class Registration extends PureComponent {

    componentDidMount() {
        this.props.starter();
    }

    render() {

        if (this.props.isAuthorized === undefined) {
            return <Fragment>
                <Preloader/>
            </Fragment>
        } else if (this.props.isAuthorized === true) {
            Router.push("/");
        } else {
            return (
                <Fragment>
                    <Fragment>
                        <div className="desktop">
                            <UserRegistration/>
                        </div>
                        <div className="mobileApp">
                            <MobileUserRegistration/>
                        </div>
                    </Fragment>

                </Fragment>
            );

        }

    }
}


Registration.getInitialProps = async () => {
    const seoData = {
        page: "registration",
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
            title: "Registration | " + res.meta_title
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
