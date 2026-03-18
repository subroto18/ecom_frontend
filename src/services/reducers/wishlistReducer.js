import {
    get_wishlist_items_when_login,
    get_wishlist_product,
    wishlist_request, wishlist_request_failed,
    wishlist_request_success
} from "../types";

const initialState = {
    wishlistItem: 0,
    wishlistProductLoadingStatus: true,
    wishlistProduct:[]
};

const wishlistReducer  = (state = initialState, action) => {
    switch(action.type){

        case get_wishlist_product:
            return {
                ...state,
                wishlistItem:action.wishlistItem
            }
        case get_wishlist_items_when_login:
            return {
                ...state,
                wishlistItem:action.wishlistItem
            }
        case wishlist_request:
            return {
                ...state,
                wishlistProductLoadingStatus:action.wishlistProductLoadingStatus
            }
        case wishlist_request_success:
            return {
                ...state,
                wishlistProduct:action.wishlistProduct,
                wishlistProductLoadingStatus:action.wishlistProductLoadingStatus,
            }
        case wishlist_request_failed:
            return {
                ...state,
                wishlistProduct:action.wishlistProduct,
                wishlistProductLoadingStatus:action.wishlistProductLoadingStatus,
            }

        default:
            return state;
    }
}

export default wishlistReducer;