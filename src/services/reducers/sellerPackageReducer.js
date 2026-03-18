import {seller_package_id_for_online_payment} from "../types";

const initialState = {
    sellerPackageIdForOnlinePay: 0
};

const sellerPackageReducer  = (state = initialState, action) => {
    switch(action.type){
        case seller_package_id_for_online_payment:
            return {
                ...state,
                sellerPackageIdForOnlinePay: action.sellerPackageIdForOnlinePay
            }

        default:
            return state;
    }
}

export default sellerPackageReducer;