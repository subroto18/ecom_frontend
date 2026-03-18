import {stripe_modal} from "../types";

const initialState = {
    stripeModal:false
};

const stripeReducer  = (state = initialState, action) => {
    switch(action.type){
        case stripe_modal:
            return {
                ...state,
                stripeModal: action.stripeModal
            }
        default:
            return state;
    }
}

export default stripeReducer;