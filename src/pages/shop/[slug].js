import React, {PureComponent, Fragment} from 'react';
import {starter} from "../../services/actions/starterAction";
import {seoMarkup} from "../../services/actions/commonAction";
import {connect} from "react-redux";
import Preloader from "../../component/Loader/Preloader";
import SellerShop from "../../component/Desktop/Seller/SellerShop";
import MobileSellerShop from "../../component/Mobile/MobileSeller/MobileSellerShop";
import Api from "../../ClientApi/Api";

class ShopPage extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.starter();
    }


    render() {
        return <Fragment>
            {this.props.isAuthorized === undefined ?
                <Fragment>
                    <Preloader/>
                </Fragment> :
                <Fragment>
                    <div className="desktop">
                        <SellerShop/>
                    </div>
                    <div className="mobileApp">
                        <MobileSellerShop/>
                    </div>
                </Fragment>
            }
        </Fragment>
    }
}

ShopPage.getInitialProps = async (context) => {

    const {slug} = context.query;

    const seoData = {
        page: 'shop',
        slug: slug
    }
    try {
        const response = await Api().post('/seo-meta-data', seoData);
        const data = await response.data;
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
    seoMarkup
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const seoMarkup = state.starterReducer.seoMarkup;
    return {
        isAuthorized,
        seoMarkup
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);


