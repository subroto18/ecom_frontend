import {
    new_order_notification,
    new_product_review_notification, new_refund_product_request_notification,
    new_replace_product_request_notification, new_return_product_request_notification,
    notification_data
} from "../types";

export const  notification  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type: notification_data,
            returnRequest: data.returnRequest,
            replaceRequest: data.replaceRequest,
            refundRequest: data.refundRequest,
            productReview: data.productReview,
            newOrder: data.newOrder
        })
    }
}

export const  refreshNotification  =   (data) => {
    return  (dispatch) => {

        if (data === "newOrder") {
            dispatch({
                type: new_order_notification,
                newOrder: 0
            })
        }

        if (data === "productReview") {

            dispatch({
                type: new_product_review_notification,
                productReview: 0
            })

        }

        if (data === "replaceRequest") {
            dispatch({
                type: new_replace_product_request_notification,
                replaceRequest: 0
            })

        }

        if (data === "refundRequest") {

            dispatch({
                type: new_refund_product_request_notification,
                refundRequest: 0
            })

        }

        if (data === "returnRequest") {
            dispatch({
                type: new_return_product_request_notification,
                returnRequest: 0
            })

        }


    }
}



