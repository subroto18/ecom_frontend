import React, {PureComponent, Fragment} from 'react';
import {starter} from "../../services/actions/starterAction";
import {connect} from "react-redux";
import Preloader from "../../component/Loader/Preloader";
import AllTrendingProduct from "../../component/Desktop/TrendingProduct/AllTrendingProduct";
import MobileAllTrendingProduct from "../../component/Mobile/MobileTrending/MobileAllTrendingProduct";
import Api from "../../ClientApi/Api";

class TrendingProduct extends PureComponent {

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
        else{
            return (
                <Fragment>
                    <div className="desktop">
                        <AllTrendingProduct/>
                    </div>
                    <div className="mobileApp">
                       <MobileAllTrendingProduct/>
                    </div>
                </Fragment>
            );

        }

    }
}

TrendingProduct.getInitialProps = async () => {

    const seoData = {
        page: "trending-product",
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
            title: "Trending Products | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'Trending Products'
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

export default connect(mapStateToProps, mapDispatchToProps)(TrendingProduct);


