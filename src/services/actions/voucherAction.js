import Api from "../../ClientApi/Api";
import {cancel_voucher, change_voucher, voucher_invalid, voucher_valid} from "../types";



export const  getVoucher  =   (voucherCode) => {
    return async (dispatch) => {


      await  Api().post('getVoucher', voucherCode).then(res => {

            if (res.data.voucherInvalid === true) {

                dispatch({
                    type:voucher_invalid,
                    invalidVoucher:true,
                    matchVoucher:false
                })

            } else {

                dispatch({
                    type:voucher_valid,
                    invalidVoucher: false,
                    matchVoucher: true,
                    totalCouponDiscount: res.data.totalCouponDiscount,
                    totalCouponDiscountPrice: res.data.totalCouponDiscountPrice,
                    voucherDiscountType: res.data.voucherDiscountType
                })


            }

        })

    }
}


export const  changeVoucher  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:change_voucher,
            voucher:data.voucher,

        })
    }
}

export const  cancelVoucher  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:cancel_voucher,
            voucher:"",
            matchVoucher: false,
            invalidVoucher: false,
            totalCouponDiscount: 0,
            totalCouponDiscountPrice: 0

        })
    }
}


