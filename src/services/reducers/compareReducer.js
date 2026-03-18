import {
    add_compare_product_request,
    add_compare_product_request_failed,
    add_compare_product_request_success,
    compare_product_request,
    compare_product_request_failed,
    compare_product_request_success,
    del_compare_product_request,
    del_compare_product_request_failed,
    del_compare_product_request_success
} from "../types";

const initialState = {
    compareProductId: [],
    compareProductLoadingStatus: true,
    compareProduct:[],
    compareItem:0
};

const compareReducer  = (state = initialState, action) => {
    switch(action.type){

        case add_compare_product_request:{
            return {
                ...state,
                compareProductId: action.compareProductId,
                compareProductLoadingStatus:action.compareProductLoadingStatus,
                compareItem:action.compareItem
            }
        }

        case add_compare_product_request_success:{
            return {
                ...state,
                compareProduct: action.compareProduct,
                compareProductLoadingStatus:action.compareProductLoadingStatus,
                compareProductId:action.compareProductId

            }
        }
        case add_compare_product_request_failed:{
            return {
                ...state,
                compareProduct: action.compareProduct,
                compareProductLoadingStatus:action.compareProductLoadingStatus

            }
        }


        case compare_product_request:{
            return {
                ...state,
                compareProductLoadingStatus:action.compareProductLoadingStatus

            }
        }
        case compare_product_request_success:{
            return {
                ...state,
                compareProduct: action.compareProduct,
                compareProductLoadingStatus:action.compareProductLoadingStatus,
                compareProductId:action.compareProductId
            }
        }
        case compare_product_request_failed:{
            return {
                ...state,
                compareProduct: action.compareProduct,
                compareProductLoadingStatus:action.compareProductLoadingStatus

            }
        }

        case del_compare_product_request:{
            return {
                ...state,
                compareProductId: action.compareProductId,
                compareProductLoadingStatus:action.compareProductLoadingStatus
            }
        }

        case del_compare_product_request_success:{
            return {
                ...state,
                compareProduct: action.compareProduct,
                compareProductLoadingStatus:action.compareProductLoadingStatus

            }
        }

        case del_compare_product_request_failed:{
            return {
                ...state,
                compareProduct: action.compareProduct,
                compareProductLoadingStatus:action.compareProductLoadingStatus

            }
        }




        default:
            return state;
    }
}

export default compareReducer;