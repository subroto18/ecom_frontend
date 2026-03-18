import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import Api from "../ClientApi/Api";
import dynamic from "next/dynamic";

const EditUserProfile = dynamic(() => import('../component/Desktop/Profile/User/MyProfile/EditUserProfile'), {
    ssr: false,
})
const MobileUserEditProfile = dynamic(() => import('../component/Mobile/Profile/User/MobileUserEditProfile'), {
    ssr: false,
})

class EditProfile extends PureComponent {

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
            return (
                <Fragment>
                    <div className="desktop">
                        <UserDashboard>
                            <EditUserProfile/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileUserEditProfile/>
                    </div>
                </Fragment>
            );
        }

    }
}


EditProfile.getInitialProps = async () => {
    const seoData = {
        page: "edit-profile",
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
            title: "Edit profile | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: 'Edit profile',
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

