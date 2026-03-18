import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction";
import MobilePayment from "../component/Mobile/MobilePayment/MobilePayment";
import Payment from "../component/Desktop/Payment/Payment";
import Router from "next/router";
import Preloader from "../component/Loader/Preloader";
import Api from "../ClientApi/Api";

class payment extends PureComponent {

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
                        <Payment/>
                    </div>
                    <div className="mobileApp">
                        <MobilePayment/>
                    </div>
                </Fragment>
            );

        }

    }
}

payment.getInitialProps = async () => {

    const seoData = {
        page: "payment",
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
            title: "Payment | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: 'Payment',
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

export default connect(mapStateToProps, mapDispatchToProps)(payment);

