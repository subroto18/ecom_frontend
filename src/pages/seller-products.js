import React, {Component, Fragment} from 'react';
import Preloader from "../component/Loader/Preloader";
import Router from "next/router";
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction"
import SellerDashBoard from "../component/Desktop/Profile/Seller/SellerDashBoard";
import SellerProducts from "../component/Desktop/Profile/Seller/SellerProduct/SellerProducts";
import MobileSellerProducts from "../component/Mobile/Profile/Seller/MobileSellerProducts";
import Api from "../ClientApi/Api";

class SellerProductPage extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.starter();
    }

    render() {

        if(this.props.isAuthorized===undefined){
            return  <Preloader/>
        }
        else if(this.props.isAuthorized===false){
            Router.push("/")
        }
        else{

            if(this.props.role===2){
                return (
                    <Fragment>
                        <div className="desktop">
                                <SellerDashBoard>
                                    <SellerProducts/>
                                </SellerDashBoard>
                        </div>
                        <div className="mobileApp">
                            <MobileSellerProducts/>
                        </div>
                    </Fragment>
                );
            }else{
                Router.push("/dashboard")
            }


        }

    }
}


SellerProductPage.getInitialProps = async () => {

    const seoData = {
        page: "seller-product",
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
            title: "Seller Products | " + res.meta_title
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
    const role = state.userReducer.role
    return {
        isAuthorized,
        role
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProductPage);

