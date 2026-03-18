import { topRated_product} from "../types";
export const  topRatedProduct  =  (data) => {

    return async (dispatch) => {
        dispatch({
            type:topRated_product,
            topRatedData:data,
            topRatedLoading:false,
            topRatedApi:true
        })
    }
}