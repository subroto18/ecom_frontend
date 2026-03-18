import React, {PureComponent, Fragment} from 'react';
import Preloader from "../../component/Loader/Preloader";
import {starter} from "../../services/actions/starterAction";
import {connect} from "react-redux";
import NewArrivalAllProduct from "../../component/Desktop/NewArrival/NewArrivalAllProduct";
import MobileNewArrivalAllProduct from "../../component/Mobile/MobileNewArrival/MobileNewArrivalAllProduct";
import Api from "../../ClientApi/Api";


class NewArrival extends PureComponent {
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
                        <NewArrivalAllProduct/>
                    </div>
                    <div className="mobileApp">
                        <MobileNewArrivalAllProduct/>
                    </div>
                </Fragment>
            );

        }

    }

}


NewArrival.getInitialProps = async () => {

    const seoData = {
        page: "new-arrival",
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
            title: "New Arrival | " + res.meta_title
        }
        return {data}
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: 'New Arrival'
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

export default connect(mapStateToProps, mapDispatchToProps)(NewArrival);


