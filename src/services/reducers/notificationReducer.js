import {
    new_order_notification,
    new_product_review_notification, new_refund_product_request_notification,
    new_replace_product_request_notification, new_return_product_request_notification,
    notification_data
} from '../types'
const initialState = {
    returnRequest: 0,
    replaceRequest: 0,
    refundRequest: 0,
    productReview: 0,
    newOrder: 0,

};

const notificationReducer  = (state = initialState, action) => {
    switch(action.type){
        case notification_data:
            return {
                ...state,
                returnRequest: action.returnRequest,
                replaceRequest: action.replaceRequest,
                refundRequest: action.refundRequest,
                productReview: action.productReview,
                newOrder: action.newOrder
            }
        case new_order_notification:
            return {
                ...state,
                newOrder: action.newOrder,
            }
        case new_product_review_notification:
            return {
                ...state,
                productReview: action.productReview,
            }
        case new_replace_product_request_notification:
            return {
                ...state,
                replaceRequest: action.replaceRequest,
            }
        case new_refund_product_request_notification:
            return {
                ...state,
                refundRequest: action.refundRequest,
            }
        case new_return_product_request_notification:
            return {
                ...state,
                returnRequest: action.returnRequest,
            }

        default:
            return state;
    }
}

export default notificationReducer;