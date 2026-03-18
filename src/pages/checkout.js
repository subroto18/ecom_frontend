import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import Checkout from "../component/Desktop/Checkout/Checkout";
import MobileCheckout from "../component/Mobile/MobileCheckout/MobileCheckout";
import Router from "next/router";
import Preloader from "../component/Loader/Preloader";
import Api from "../ClientApi/Api";


class checkout extends PureComponent {


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
        }else if(!this.props.checkoutProductExist){
            Router.push("/")
        }
        else {
            return (
                <Fragment>
                    <div className="desktop">
                     <Checkout/>
                    </div>
                    <div className="mobileApp">
                        <MobileCheckout/>
                    </div>
                </Fragment>
            );

        }

    }

}


checkout.getInitialProps = async () => {

    const seoData = {
        page: "checkout",
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
            title: "Checkout | " + res.meta_title
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
    const checkoutProductExist = state.productReducer.checkoutProductExist;
    return {
        isAuthorized,
        checkoutProductExist
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkout);





