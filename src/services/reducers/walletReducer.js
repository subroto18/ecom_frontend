import {
    get_wallet_recharge_info_request,
    get_wallet_recharge_info_request_failed,
    get_wallet_recharge_info_request_success,
    wallet_activation, wallet_amount_for_online_payment
} from "../types";

const initialState = {
    walletActivation:0,
    walletData: [],
    walletDataLoading: false,
    walletAmountForOnlinePay: 0,
};

const walletReducer  = (state = initialState, action) => {
    switch(action.type){
        case wallet_activation:
            return {
                ...state,
                walletActivation:action.walletActivation,
            }

        case get_wallet_recharge_info_request:
            return {
                ...state,
                walletDataLoading:action.walletDataLoading,
            }

        case get_wallet_recharge_info_request_success:
            return {
                ...state,
                walletDataLoading:action.walletDataLoading,
                walletData:action.walletData,
            }

        case get_wallet_recharge_info_request_failed:
            return {
                ...state,
                walletDataLoading:action.walletDataLoading,
                walletData:action.walletData,
            }

        case wallet_amount_for_online_payment:
            return {
                ...state,
                walletAmountForOnlinePay:action.walletAmountForOnlinePay
            }


        default:
            return state;
    }
}

export default walletReducer;