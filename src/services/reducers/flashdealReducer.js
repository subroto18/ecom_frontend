import {all_flash_deal, flash_deal} from "../types";

const initialState = {
    flashApi:false,
    flashDealLoading: true,
    flashDealData:[],
    flashDealCountdown: 80000,
    flashDealId: "",
    flashDealSlug: "",
    allFlashDealLoading: true,
    allFlashApi: false,
    allFlashDealData: [],
};

const flashdealReducer  = (state = initialState, action) => {
    switch(action.type){
        case flash_deal:
            return {
                ...state,
                flashDealLoading: action.flashDealLoading,
                flashDealData:action.flashDealData,
                flashDealCountdown:action.flashDealCountdown,
                flashDealId: action.flashdealId,
                flashApi: action.flashApi,
                flashDealSlug: action.flashDealSlug
            }
        case all_flash_deal:
            return {
                ...state,
                allFlashDealLoading: action.allFlashDealLoading,
                allFlashApi: action.allFlashApi,
                allFlashDealData: action.allFlashDealData

            }


        default:
            return state;
    }
}

export default flashdealReducer;