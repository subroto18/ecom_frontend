import React, {PureComponent, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import DownloadableProducts from "../component/Desktop/Profile/User/MyDownloads/DownloadableProducts";
import MobileDownloadableProducts from "../component/Mobile/Profile/User/MobileDownloadableProducts";
import Api from "../ClientApi/Api";

class MyDownloads extends PureComponent {

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
        } else if (this.context.isAuthorized === false) {
            Router.push("/")
        } else {
            return (
                <Fragment>
                    <div className="desktop">
                        <UserDashboard>
                            <DownloadableProducts/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileDownloadableProducts/>
                    </div>
                </Fragment>
            );
        }

    }
}

MyDownloads.getInitialProps = async () => {

    const seoData = {
        page: "my-download",
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
            title: "My Download | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'My Download'
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

export default connect(mapStateToProps, mapDispatchToProps)(MyDownloads);