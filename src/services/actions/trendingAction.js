
import {trending_product} from "../types";

export const  trendingProduct  =  (data) => {
    return async (dispatch) => {
        dispatch({
            type:trending_product,
            trendingData:data,
            trendingLoading:false,
            trendingApi:true
        })

    }
}

