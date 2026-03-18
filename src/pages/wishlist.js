import React, {PureComponent, Fragment} from 'react';
import {starter} from "../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import UserDashboard from "../component/Desktop/Profile/User/MyDashboard/UserDashboard";
import UserWishlist from "../component/Desktop/Profile/User/MyWishlist/UserWishlist";
import {getWishlistProduct} from "../services/actions/wishlishAction";
import MobileNewUserWishlist from "../component/Mobile/Profile/User/MobileNewUserWishlist";
import Api from "../ClientApi/Api";

class Wishlist extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.starter();
        this.props.getWishlistProduct();
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
                            <UserWishlist/>
                        </UserDashboard>
                    </div>
                    <div className="mobileApp">
                        <MobileNewUserWishlist/>
                    </div>
                </Fragment>
            );
        }

    }

}

Wishlist.getInitialProps = async () => {

    const seoData = {
        page: "wishlist",
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
            title: "Wishlist | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Wishlist'
        }

        return {data}
    }

}


const mapDispatchToProps = {
    starter,
    getWishlistProduct
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);

