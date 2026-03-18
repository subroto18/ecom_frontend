import {online_payment_for} from "../types";

const initialState = {
    onlinePaymentFor: "",
};


const onlinePaymentReducer  = (state = initialState, action) => {
    switch(action.type){

        case  online_payment_for: {
            return {
                ...state,
                onlinePaymentFor: action.onlinePaymentFor
            }
        }
        default:
         return state;

    }
}

export default onlinePaymentReducer;