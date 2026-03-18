import {
    cancel_voucher,
    change_voucher,
    get_coupon_activation,
    selected_checkout_product, selected_checkout_product_voucher,
    voucher_invalid,
    voucher_valid
} from "../types";

const initialState = {
    voucher: "",
    matchVoucher: false,
    invalidVoucher: false,
    totalCouponDiscount: 0,
    totalCouponDiscountPrice: 0,
    voucherDiscountType: "",
    couponActivation: 1,
};

const voucherReducer  = (state = initialState, action) => {
    switch(action.type){
        case voucher_invalid:
            return {
                ...state,
                invalidVoucher:action.invalidVoucher,
                matchVoucher:action.matchVoucher

            }
        case voucher_valid:
            return {
                ...state,
                invalidVoucher: false,
                matchVoucher: true,
                totalCouponDiscount: action.totalCouponDiscount,
                totalCouponDiscountPrice: action.totalCouponDiscountPrice,
                voucherDiscountType: action.voucherDiscountType

            }

        case change_voucher:
            return {
                ...state,
                voucher: action.voucher,
            }
        case cancel_voucher:
            return {
                ...state,
                voucher:action.voucher,
                matchVoucher: action.matchVoucher,
                invalidVoucher: action.invalidVoucher,
                totalCouponDiscount: action.totalCouponDiscount,
                totalCouponDiscountPrice: action.totalCouponDiscountPrice
            }

        case get_coupon_activation:
            return {
                ...state,
                couponActivation:action.couponActivation,
            }
        case selected_checkout_product_voucher:
            return {
                ...state,
                voucher: action.voucher,
                matchVoucher: action.action,
                invalidVoucher: action.invalidVoucher,
                totalCouponDiscount: action.totalCouponDiscount,
                totalCouponDiscountPrice: action.totalCouponDiscountPrice,
                voucherDiscountType: action.voucherDiscountType,
            }

        default:
            return state;
    }
}

export default voucherReducer;