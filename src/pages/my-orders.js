import React, {PureComponent, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import {Router} from "next/router";
import Preloader from "../component/Loader/Preloader";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import UserOrder from "../component/Desktop/Profile/User/MyOrders/UserOrder";
import MobileUserOrder from "../component/Mobile/Profile/User/MobileUserOrder";
import Api from "../ClientApi/Api";


class MyOrders extends PureComponent {

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
                            <UserOrder/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileUserOrder/>
                    </div>
                </Fragment>
            );
        }

    }
}

MyOrders.getInitialProps = async () => {

    const seoData = {
        page: "my-orders",
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
            title: "My order | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: 'My order',
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

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);

