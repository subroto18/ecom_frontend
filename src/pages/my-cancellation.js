import React, {PureComponent, Fragment} from 'react';
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import UserCancellations from "../component/Desktop/Profile/User/MyCancellations/UserCancellations";
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import MobileUserCancellations from "../component/Mobile/Profile/User/MobileUserCancellations";
import Api from "../ClientApi/Api";


class MyCancellation extends PureComponent {

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
                            <UserCancellations/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileUserCancellations/>
                    </div>
                </Fragment>
            );
        }

    }
}


MyCancellation.getInitialProps = async () => {

    const seoData = {
        page: "my-cancellation",
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
            title: "My Cancellation | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: 'My Cancellation',
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

export default connect(mapStateToProps, mapDispatchToProps)(MyCancellation);
