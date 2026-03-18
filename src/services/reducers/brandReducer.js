import {top_ten_brands} from '../types'
const initialState = {
    topTenBrandsData: [],
    topTenBrandsLoading: true,
    topTenBrandsApi: false

};

const brandReducer  = (state = initialState, action) => {
    switch(action.type){
        case top_ten_brands:
            return {
                ...state,
                topTenBrandsData:action.topTenBrandsData,
                topTenBrandsLoading:action.topTenBrandsLoading,
                topTenBrandsApi:action.topTenBrandsApi
            }

        default:
            return state;
    }
}

export default brandReducer;