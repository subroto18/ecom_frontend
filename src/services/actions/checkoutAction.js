
import {order_data} from "../types";
import {getCartItem} from "./cartAction";
import {cancelVoucher} from "./voucherAction";

export const onOrderData = (data) => {

    return async (dispatch) => {
        dispatch({
            type: order_data,
            orderData: data
        })


    }

}

export const resetAllAfterOrder = () => {
    return async (dispatch) => {
        //call to cart function for update cart
        dispatch(getCartItem())

        const data = {
            totalCouponDiscount: 0, totalCouponDiscountPrice: 0, voucher: "", voucherDiscountType: ""
        }
        // set voucher to auth state
        dispatch(cancelVoucher(data))

    }

}

