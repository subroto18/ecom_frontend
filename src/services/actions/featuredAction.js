
import {featured_product} from "../types";

export const  featuredProduct  =  (data) => {

    return async (dispatch) => {
        dispatch({
            type:featured_product,
            featuredData:data,
            featuredLoading:false,
            featuredApi:true
        })
    }
}

