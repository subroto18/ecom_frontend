import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import Preloader from "../component/Loader/Preloader";
import Compare from "../component/Desktop/Compare/Compare";
import MobileCompare from "../component/Mobile/MobileCompare/MobileCompare";
import {starter} from "../services/actions/starterAction";
import Api from "../ClientApi/Api";

class ComparePage extends PureComponent {

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
                        <Compare/>
                    </div>
                    <div className="mobileApp">
                        <MobileCompare/>
                    </div>
                </Fragment>
            )

        }


    }

}

ComparePage.getInitialProps = async () => {

    const seoData = {
        page: "compare",
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
            title: "Compare | " + res.meta_title
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
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);


