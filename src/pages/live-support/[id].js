import React, {PureComponent, Fragment} from 'react';
import {starter} from "../../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../../component/Loader/Preloader";
import Router from "next/router";
import UserDashboard from "../../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import LiveSupport from "../../component/Desktop/Profile/User/MyTickets/LiveSupport";
import MobileLiveSupport from "../../component/Mobile/Profile/User/MobileLiveSupport";
import Api from "../../ClientApi/Api";

class LiveSupportPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
    }

    componentDidMount() {

        let id = window.location.pathname.split("/")[2];
        this.setState({
            token: id
        })

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
                            <LiveSupport token={this.state.token}/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileLiveSupport token={this.state.token}/>
                    </div>
                </Fragment>
            );
        }

    }
}

LiveSupportPage.getInitialProps = async () => {

    const seoData = {
        page: "live-support",
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
            title: "Live Support | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Live Support'
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

export default connect(mapStateToProps, mapDispatchToProps)(LiveSupportPage)

