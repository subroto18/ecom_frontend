import {topRated_product} from "../types";

const initialState = {
    topRatedApi:false,
    topRatedLoading:true,
    topRatedData:[]

};

const topRatedReducer  = (state = initialState, action) => {
    switch(action.type){
        case topRated_product:
            return {
                ...state,
                topRatedApi:action.topRatedApi,
                topRatedLoading:action.topRatedLoading,
                topRatedData:action.topRatedData
            }
        default:
            return state;
    }
}

export default topRatedReducer;