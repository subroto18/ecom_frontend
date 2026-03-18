import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import dynamic from "next/dynamic"
const OurServices = dynamic(() => import("./OurServices"))
const Newslatter = dynamic(() => import("../DesktopHome/Newslatter"))
const FooterDesktop = dynamic(() => import("./FooterDesktop"))
const CartVariationModal = dynamic(() => import("../../CommonScreen/Modal/CartVariationModal"))
const CartSuccessModal = dynamic(() => import("../../CommonScreen/Modal/CartSuccessModal"))


class DesktopFooterPart extends PureComponent {
    render() {
        return (
            <Fragment>
                <OurServices/>
                <Newslatter/>
                <FooterDesktop />
                <CartVariationModal/>
                <CartSuccessModal/>
            </Fragment>
        );
    }
}





function mapStateToProps(state) {
     const messengerChat = state.starterReducer.messengerChat;
    return {
        messengerChat
    };
}


export default connect(mapStateToProps)(DesktopFooterPart);
