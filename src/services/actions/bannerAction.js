
import {banner_one, banner_three, banner_two} from "../types";
export const  bannerThree  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:banner_two,
            bannerTwoData: data,
            bannerTwoLoading: false,
            bannerTwoApi: true
        })
    }
}


export const  bannerFour  =   (data) => {

    return async (dispatch) => {
        dispatch({
            type:banner_three,
            bannerThreeData: data,
            bannerThreeLoading: false,
            bannerThreeApi: true
        })
    }
}


export const  bigBanner  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:banner_one,
            bigBannerData: data,
            bigBannerLoading: false,
            bigBannerApi: true
        })
    }
}
