import Api from "../../ClientApi/Api";
import {
    get_wallet_recharge_info_request,
    get_wallet_recharge_info_request_failed,
    get_wallet_recharge_info_request_success
} from "../types";


export const  getWalletData  =   () => {
    return async (dispatch) => {

        try{
            dispatch({
                type:get_wallet_recharge_info_request,
                walletDataLoading: true,
            })

            Api().get('getWalletRechargeInfo').then(res => {
                dispatch({
                    type:get_wallet_recharge_info_request_success,
                    walletDataLoading: false,
                    walletData: res.data
                })

            }).catch(error => {
                dispatch({
                    type:get_wallet_recharge_info_request_failed,
                    walletDataLoading: false,
                    walletData: []
                })
            })
        }catch (error){
            dispatch({
                type:get_wallet_recharge_info_request_failed,
                walletDataLoading: false,
                walletData: []
            })
        }

    }
}


