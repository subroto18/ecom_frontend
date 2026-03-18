import {
    details_del_cart_product,
    details_del_cart_product_request,
    details_del_cart_product_request_failed,
    details_del_cart_product_request_success,
    get_cart_item,
    get_cart_items_when_login,
    get_cart_product_request,
    get_cart_product_request_success
} from '../types'
const initialState = {
    cartItem: 0,
    cartProductLoadingStatus: true,
    cartProductDetails: []
};

const cartReducer  = (state = initialState, action) => {
    switch(action.type){
        case get_cart_item:
            return {
                ...state,
                cartItem:action.cartItem
            }
        case get_cart_items_when_login:
            return {
                ...state,
                cartItem:action.cartItem
            }
        case get_cart_product_request:
            return {
                ...state,
                cartProductLoadingStatus:action.cartProductLoadingStatus
            }
        case get_cart_product_request_success:
            return {
                ...state,
                cartProductLoadingStatus:action.cartProductLoadingStatus,
                cartProductDetails:action.cartProductDetails
            }

        case details_del_cart_product:
            return {
                ...state,
                cartProductLoadingStatus:action.cartProductLoadingStatus,
            }

        default:
            return state;
    }
}

export default cartReducer;