import {order_data} from '../types'
const initialState = {
    orderData: []
};

const checkoutReducer  = (state = initialState, action) => {
    switch(action.type){
        case order_data:
            return {
                ...state,
                orderData: action.orderData,
            }

        default:
            return state;
    }
}

export default checkoutReducer;