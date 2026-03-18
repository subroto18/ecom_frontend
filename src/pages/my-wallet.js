import React, {PureComponent, Fragment} from 'react';
import Preloader from "../component/Loader/Preloader";
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import Router from "next/router";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import Api from "../ClientApi/Api";
import dynamic from "next/dynamic";

const UserWallet = dynamic(() => import('../component/Desktop/Profile/User/MyWallets/UserWallet'), {
    ssr: false,
})
const MobileUserWallet = dynamic(() => import('../component/Mobile/Profile/User/MobileUserWallet'), {
    ssr: false,
})

class MyWallet extends PureComponent {


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
                            <UserWallet/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileUserWallet/>
                    </div>
                </Fragment>
            );
        }

    }
}

MyWallet.getInitialProps = async () => {

    const seoData = {
        page: "my-wallet",
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
            title: "My Wallet | " + res.meta_title
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

export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);




