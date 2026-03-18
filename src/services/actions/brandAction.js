
import {top_ten_brands} from "../types";
export const  topTenBrands  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:top_ten_brands,
            topTenBrandsData: data,
            topTenBrandsLoading: false,
            topTenBrandsApi: true
        })
    }
}
