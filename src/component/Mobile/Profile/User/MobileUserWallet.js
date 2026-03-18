import React, {Fragment, PureComponent} from 'react'
import Container from 'react-bootstrap/Container';
import {connect} from "react-redux";
import Router from "next/router";
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import UserWalletPart from "../../../CommonScreen/Profile/User/MyWallets/UserWalletPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileUserWallet extends PureComponent {
  render() {
    if(this.props.walletActivation!==0){
        return (
            <Fragment>
                <MobileTopBack title="My Wallet"/>
                 <Container className='mobileContainer'>
                    <UserWalletPart/>
                </Container>
                <NavMobileBottom/>
            </Fragment>
        );
    }else{
        Router.push('/dashboard')
    }
  }
}

function mapStateToProps(state) {
    const walletActivation = state.walletReducer.walletActivation;
    return {
        walletActivation
    };
}

export default connect(mapStateToProps)(MobileUserWallet);





