import React, {PureComponent, Fragment} from 'react';
import Router from "next/router";
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction"
import Preloader from "../component/Loader/Preloader";
import {selectedCheckoutProduct} from "../services/actions/productAction";
import {getCartProductDetails} from "../services/actions/cartAction";
import Cart from "../component/Desktop/Cart/Cart";
import MobileCart from "../component/Mobile/MobileCart/MobileCart";
import Api from "../ClientApi/Api";

class CartPage extends PureComponent {

    componentDidMount() {
        this.props.starter();
        this.props.selectedCheckoutProduct([], "", 0);
        this.props.getCartProductDetails();
    }

    render() {

        if (this.props.isAuthorized === undefined) {
            return <Fragment>
                <Preloader/>
            </Fragment>
        } else if (this.props.isAuthorized === false) {
            Router.push("/login")
        } else {
            return (
                <Fragment>
                    <div className="desktop">
                        <Cart/>
                    </div>
                    <div className="mobileApp">
                        <MobileCart/>
                    </div>
                </Fragment>
            );

        }


    }
}

CartPage.getInitialProps = async () => {

    const seoData = {
        page: "cart",
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
            title: "Cart | " + res.meta_title
        }
        return {data}
    } catch (e) {
        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Cart'
        }

        return {data}
    }

}


const mapDispatchToProps = {
    starter,
    selectedCheckoutProduct,
    getCartProductDetails
};

function mapStateToProps(state) {

    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);


