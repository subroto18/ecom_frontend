import React, { PureComponent, Fragment } from "react";
import {connect} from "react-redux";
import Router from "next/router";
import UserWalletPart from "../../../../CommonScreen/Profile/User/MyWallets/UserWalletPart";
class UserWallet extends PureComponent {
    render() {
        if(this.props.walletActivation!==0){
            return (
                <Fragment>
                    <span className="profile title mb-4 myWallet">My wallet</span>
                    <Fragment>
                       <UserWalletPart/>
                    </Fragment>
                </Fragment>
            );
        }else{
           Router.push("/dashboard")
        }
    }
}




function mapStateToProps(state) {
    const walletActivation = state.walletReducer.walletActivation;
    return {
        walletActivation
    };
}

export default connect(mapStateToProps)(UserWallet);


