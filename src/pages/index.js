import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { starter } from "../services/actions/starterAction";
import Api from "../ClientApi/Api";
import Preloader from "../component/Loader/Preloader";
import Home from "../component/Desktop/DesktopHome/Home";
import MobileHome from "../component/Mobile/MobileHome/MobileHome";

class Index extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.starter()
    }

    render() {
        return <Fragment>
            {this.props.isAuthorized === undefined ?
                <Fragment>
                    <Preloader />
                </Fragment> :
                <Fragment>
                    <div className="desktop">
                         <Home/>
                    </div>
                    <div className="mobileApp">
                        <MobileHome />
                    </div>
                </Fragment>
            }
        </Fragment>
    }
}


Index.getInitialProps = async () => {

    const seoData = {
        page: "home",
        slug: "/"
    }

    try {
        const response = await Api().post('/seo-meta-data', seoData);
        const data = await response.data;
        return { data }
    } catch (e) {

        const data = {
            meta_title: '',
            meta_description: '',
            meta_keyword: '',
            meta_photo: '',
            meta_url: '',
            title: ''
        }

        return { data }
    }

}

const mapDispatchToProps = {
    starter
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const baseApi = state.starterReducer.baseApi;
    const backendApi = state.starterReducer.backendApi;
    return {
        isAuthorized,
        baseApi,
        backendApi
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Index);






