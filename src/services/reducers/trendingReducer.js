import { trending_product} from "../types";

const initialState = {
    trendingApi:false,
    trendingLoading:true,
    trendingData:[]
};

const trendingReducer  = (state = initialState, action) => {
    switch(action.type){
        case trending_product:
            return {
                ...state,
                trendingData:action.trendingData,
                trendingLoading:action.trendingLoading,
                trendingApi:action.trendingApi
            }
        default:
            return state;
    }
}

export default trendingReducer;