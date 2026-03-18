import {
    billing_modal, get_shipping_data_when_login, pickup_point_data, pickup_point_data_clear,
    pickup_point_modal, shipping_billing_address_not_same,
    shipping_billing_address_same,
    shipping_billing_loading_status,
    shipping_modal
} from "../types";

const initialState = {
    pickupPointData: [],
    shippingData: [],
    shippingModal:false,
    billingModal:false,
    pickupPointModal:false,
    shippingName: "",
    shippingPlace: "",
    shippingAddress: "",
    shippingEmail: "",
    shippingPhone: "",
    billingName: "",
    billingPlace: "",
    billingAddress: "",
    pickupPoint: 0,
    match: "",
    shippingBillingLoadingStatus: true,
    shippingMethod: "",
    shippingFee: 0,
};

const shippingBillingPickupReducer  = (state = initialState, action) => {
    switch(action.type){
        case shipping_modal:
            return {
                ...state,
                shippingModal:action.shippingModal
            }
        case billing_modal:
            return {
                ...state,
                billingModal:action.billingModal
            }
        case pickup_point_modal:
            return {
                ...state,
                pickupPointModal:action.pickupPointModal
            }

        case shipping_billing_loading_status:
            return {
                ...state,
                shippingBillingLoadingStatus:action.shippingBillingLoadingStatus
            }
        case shipping_billing_address_same:
            return {
                ...state,
                shippingName: action.shippingName,
                shippingPlace: action.shippingPlace,
                shippingAddress: action.shippingAddress,
                shippingEmail: action.shippingEmail,
                shippingPhone: action.shippingPhone,
                pickupPoint: action.pickupPoint,
                match: action.match,
                shippingBillingLoadingStatus: action.shippingBillingLoadingStatus,
            }

        case shipping_billing_address_not_same:
            return {
                ...state,
                shippingName: action.shippingName,
                shippingPlace: action.shippingPlace,
                shippingAddress: action.shippingAddress,
                shippingEmail: action.shippingEmail,
                shippingPhone: action.shippingPhone,
                billingName: action.billingName,
                billingPlace: action.billingPlace,
                billingAddress: action.billingAddress,
                pickupPoint: action.pickupPoint,
                match: action.match,
                shippingBillingLoadingStatus: action.shippingBillingLoadingStatus,
            }

        case pickup_point_data_clear:
            return {
                ...state,
                pickupPointData: action.pickupPointData,

            }
        case pickup_point_data:
            return {
                ...state,
                pickupPointData: action.pickupPointData,

            }
        case get_shipping_data_when_login:
            return {
                ...state,
                shippingMethod: action.shippingMethod,
                shippingFee: action.shippingFee,

            }


        default:
            return state;
    }
}

export default shippingBillingPickupReducer;