import {best_seller} from '../types'
const initialState = {
    seller: [],
    sellerLoading: true,
    sellerApi: false,
};

const sellerReducer  = (state = initialState, action) => {
    switch(action.type){
        case best_seller:
            return {
                ...state,
                seller:action.seller,
                sellerLoading:action.sellerLoading,
                sellerApi:action.sellerApi

            }

        default:
            return state;
    }
}

export default sellerReducer;