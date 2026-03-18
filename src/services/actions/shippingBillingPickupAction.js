import {
    billing_modal, pickup_point_data, pickup_point_data_clear,
    pickup_point_modal, shipping_billing_address_not_same,
    shipping_billing_address_same,
    shipping_billing_loading_status,
    shipping_modal
} from "../types";

export const  shippingModalShow  =   () => {
    return async (dispatch) => {
        dispatch({
            type:shipping_modal,
            shippingModal: true
        })
    }
}

export const  shippingModalHide  =   () => {
    return async (dispatch) => {
        dispatch({
            type:shipping_modal,
            shippingModal: false
        })
    }
}

export const  billingModalShow  =   () => {
    return async (dispatch) => {
        dispatch({
            type:billing_modal,
            billingModal: true
        })
    }
}
export const  billingModalHide  =   () => {
    return async (dispatch) => {
        dispatch({
            type:billing_modal,
            billingModal: false
        })
    }
}

export const  pickUpModalShow  =   () => {
    return async (dispatch) => {
        dispatch({
            type:pickup_point_modal,
            pickupPointModal: true
        })
    }
}


export const  pickUpModalHide  =   () => {
    return async (dispatch) => {
        dispatch({
            type:pickup_point_modal,
            pickupPointModal: false
        })
    }
}


export const  shippingBillingAddress  =   (res) => {
    return async (dispatch) => {

        dispatch({
            type:shipping_billing_loading_status,
            shippingBillingLoadingStatus: true
        })


        if (res.match) {

            dispatch({
                type:shipping_billing_address_same,
                shippingName: res.shippingName,
                shippingPlace: res.shippingPlace,
                shippingAddress: res.shippingAddress,
                shippingEmail: res.email,
                shippingPhone: res.phone,
                pickupPoint: res.pickupPoint,
                match: true,
                shippingBillingLoadingStatus: false,
            })


        } else {

            dispatch({
                type:shipping_billing_address_not_same,
                shippingName: res.shippingName,
                shippingPlace: res.shippingPlace,
                shippingAddress: res.shippingAddress,
                shippingEmail: res.email,
                shippingPhone: res.phone,
                billingName: res.billingName,
                billingPlace: res.billingPlace,
                billingAddress: res.billingAddress,
                pickupPoint: res.pickupPoint,
                match: false,
                shippingBillingLoadingStatus: false,

            })

        }

    }
}


export const  pickupPoint  =   (data) => {
    return async (dispatch) => {

        if (data.clear) {

            dispatch({
                type:pickup_point_data_clear,
                pickupPointData: []
            })


            pickUpModalHide()

        } else {

            dispatch({
                type:pickup_point_data,
                pickupPointData: data
            })

            pickUpModalHide()
        }

    }
}



