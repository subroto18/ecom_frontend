import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import {user} from "../services/actions/userAction";
import {Router} from "next/router";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import UserCoupon from "../component/Desktop/Profile/User/MyCoupons/UserCoupon";
import MobileUserCoupon from "../component/Mobile/Profile/User/MobileUserCoupon";
import Preloader from "../component/Loader/Preloader";
import Api from "../ClientApi/Api";

class MyCoupon extends PureComponent {
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
        else if(this.props.isAuthorized===false){
             Router.push("/")
        }
        else{
            return (
                <Fragment>
                    <div className="desktop">
                        <UserDashboard>
                            <UserCoupon />
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileUserCoupon/>
                    </div>
                </Fragment>
            );
        }

    }
}



MyCoupon.getInitialProps = async () => {

    const seoData = {
        page: "my-coupon",
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
            title: "My coupon | " + res.meta_title
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
    starter,
    user
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCoupon);