import React, {PureComponent, Fragment} from 'react';
import Api from "../../ClientApi/Api";
import Preloader from "../../component/Loader/Preloader";
import Router from "next/router";
import Confirm from "../../component/Desktop/ConfirmOrder/Confirm";
import MobileConfirm from "../../component/Mobile/MobileConfirmOrder/MobileConfirm";
import {starter} from "../../services/actions/starterAction";
import {invoice} from "../../services/actions/confirmOrderAction";
import {connect} from "react-redux";

class orderConfirm extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.starter();
        this.props.invoice([]);
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
                        <Confirm/>
                    </div>
                    <div className="mobileApp">
                        <MobileConfirm/>
                    </div>
                </Fragment>
            );

        }

    }

}

orderConfirm.getInitialProps = async () => {

    const seoData = {
        page: "confirm-order",
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
            title: "Order Details | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Order Details'
        }
        return {data}
    }

}


const mapDispatchToProps = {
    starter,
    invoice,
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(orderConfirm);


