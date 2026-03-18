import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import Api from "../../ClientApi/Api";
import FlashSaleAllProduct from "../../component/Desktop/DesktopHome/FlashSaleAllProduct";
import MobileFlashSaleAllProduct from "../../component/Mobile/MobileHome/MobileFlashSaleAllProduct";
import {starter} from "../../services/actions/starterAction";
import Preloader from "../../component/Loader/Preloader";

class FlashSaleAllProductPage extends PureComponent {

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
        } else {
            return (
                <Fragment>
                    <div className="desktop">
                        <FlashSaleAllProduct/>
                    </div>
                    <div className="mobileApp">
                        <MobileFlashSaleAllProduct/>
                    </div>
                </Fragment>
            );

        }

    }
}

FlashSaleAllProductPage.getInitialProps = async () => {

    const seoData = {
        page: "flash-sale-product",
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
            title: "Flash Sale Product | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Flash Sale Product'
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

export default connect(mapStateToProps, mapDispatchToProps)(FlashSaleAllProductPage);

