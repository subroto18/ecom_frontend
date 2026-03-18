import Api from "../../ClientApi/Api";
import {
    hot_deal_request, hot_deal_request_failed, hot_deal_request_success
} from "../types";


export const  hotDeal  =  () => {

    return async (dispatch) => {
        dispatch({
            type:hot_deal_request,
            hotDealLoading:true,

        })

        try{
            await   Api().get('todaysHotDeal').then(res => {
                dispatch({
                    type:hot_deal_request_success,
                    hotDealLoading:false,
                    hotDealData:res.data,
                    hotDealApi:true
                })

            })

        }catch(error){
            dispatch({
                type:hot_deal_request_failed,
                hotDealLoading:false,
                hotDealData:[]
            })
        }

    }
}

