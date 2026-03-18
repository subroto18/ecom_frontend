import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {getCookie, topProgressBar} from "../../../services/actions/commonAction";

import NavDesktopHome from "../DesktopHome/NavDesktopHome";

import dynamic from 'next/dynamic'

const TopBarProgress = dynamic(() => import('../../Loader/TopBarProgress'), {
    ssr: false,
})

const Cookie = dynamic(() => import('./Cookie'), {
    ssr: false,
})
const Popup = dynamic(() => import('./Popup'), {
    ssr: false,
})

const TopBar = dynamic(() => import('./TopBar'), {
    ssr: false,
})

const TopBanner = dynamic(() => import('./TopBanner'), {
    ssr: false,
})


class DesktopHeaderPart extends PureComponent {
    componentDidMount() {
        this.props.topProgressBar(100);
    }

    render() {
        let cookie = this.props.getCookie('cookie');
         let popup = this.props.getCookie('popup');
         let topBar = this.props.getCookie('topBar')

        return (
            <Fragment>
                <TopBarProgress/>
                {this.props.cookieStatus===1 &&
                    <Fragment>{
                        cookie===undefined &&
                        <Cookie/>
                    }</Fragment>
                }
                {this.props.popupStatus===1 &&
                    <Fragment>{
                        popup===undefined &&
                        <Popup/>
                    }</Fragment>
                }
                <Fragment>{
                    topBar===undefined &&
                    <TopBanner />
                }</Fragment>
                <TopBar />
                <NavDesktopHome  />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const cookieStatus = state.starterReducer.cookieStatus;
    const popupStatus = state.starterReducer.cookieStatus;
    return {
        cookieStatus,
        popupStatus
    };


}

const mapDispatchToProps = {
    getCookie,
    topProgressBar
};




export default connect(mapStateToProps, mapDispatchToProps)(DesktopHeaderPart);
