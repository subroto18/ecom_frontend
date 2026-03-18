import {best_seller} from '../types'


export const  bestSeller  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type: best_seller,
            seller:data,
            sellerLoading:false,
            sellerApi:true
        })
    }
}



