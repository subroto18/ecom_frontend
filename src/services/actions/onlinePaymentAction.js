import {online_payment_for, seller_package_id_for_online_payment, wallet_amount_for_online_payment} from "../types";

export const onlinePayData = (data) => {
    return async (dispatch) => {

        if (data.onlinePaymentFor !== undefined) {
            dispatch({
                type: online_payment_for,
                onlinePaymentFor: data.onlinePaymentFor
            })
        }

        if (data.sellerPackageIdForOnlinePay !== undefined) {

            dispatch({
                type: seller_package_id_for_online_payment,
                sellerPackageIdForOnlinePay: data.sellerPackageIdForOnlinePay
            })

        }

        if (data.walletAmountForOnlinePay !== undefined) {
            dispatch({
                type: wallet_amount_for_online_payment,
                walletAmountForOnlinePay: data.walletAmountForOnlinePay
            })

        }

    }
}

