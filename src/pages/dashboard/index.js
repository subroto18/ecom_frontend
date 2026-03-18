import React, { Fragment, Component} from 'react';
import Preloader from "../../component/Loader/Preloader";
import Router from "next/router";
import {starter} from "../../services/actions/starterAction";
import {connect} from "react-redux";
import UserDashboard from "../../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import SellerDashBoard from "../../component/Desktop/Profile/Seller/SellerDashBoard";
import MobileUserDashboard from "../../component/Mobile/Profile/User/MobileUserDashboard";
import Api from "../../ClientApi/Api";
import dynamic from "next/dynamic";
const ManageSellerProfile = dynamic(() => import('../../component/Desktop/Profile/Seller/ManageSellerProfile'), {
    ssr: false,
})
const ManageUserProfile = dynamic(() => import('../../component/Desktop/Profile/User/MyProfile/ManageUserProfile'), {
    ssr: false,
})

class DashboardPage extends Component {


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
                    <Fragment>
                        <div className="desktop">
                            {this.props.role===2 ?
                                <Fragment>
                                    <SellerDashBoard>
                                        <ManageSellerProfile/>
                                    </SellerDashBoard>
                                </Fragment>
                                :
                                <UserDashboard>
                                    <ManageUserProfile/>
                                </UserDashboard>
                            }
                        </div>
                        <div className="mobileApp">
                            <MobileUserDashboard/>
                        </div>
                    </Fragment>
                </Fragment>
            );
        }

    }
}


DashboardPage.getInitialProps = async () => {

    const seoData = {
        page: "address",
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
            title: "Dashboard | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Dashboard'
        }
        return {data}
    }

}

const mapDispatchToProps = {
    starter
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const role = state.userReducer.role;
    return {
        isAuthorized,
        role
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);



