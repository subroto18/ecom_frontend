import {stripe_modal} from "../types";
export const  toggleStripeModal  =  (data) => {
    return async (dispatch) => {
        dispatch({
            type:stripe_modal,
            stripeModal: data
        })
    }
}
