import {hot_deal_request, hot_deal_request_failed, hot_deal_request_success} from "../types";

const initialState = {
    hotDealData: [],
    hotDealLoading: true,
    hotDealApi:false,
};

const dealReducer  = (state = initialState, action) => {
    switch(action.type){
        case hot_deal_request:
            return {
                ...state,
                hotDealLoading:action.hotDealLoading
            }
        case hot_deal_request_success:
            return {
                ...state,
                hotDealLoading:action.hotDealLoading,
                hotDealData:action.hotDealData,
                hotDealApi:action.hotDealApi
            }

        case hot_deal_request_failed:
            return {
                ...state,
                hotDealLoading:action.hotDealLoading,
                hotDealData:action.hotDealData
            }


        default:
            return state;
    }
}

export default dealReducer;