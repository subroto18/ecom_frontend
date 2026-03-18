import {banner_one, banner_three, banner_two} from '../types'
const initialState = {
    bannerTwoData: [],
    bannerTwoLoading: true,
    bannerTwoApi: false,

    bannerThreeApi:false,
    bannerThreeData:[],
    bannerThreeLoading: true,

    bigBannerData:[],
    bigBannerLoading:true,
    bigBannerApi:false


};

const bannerReducer  = (state = initialState, action) => {
    switch(action.type){
        case banner_two:
            return {
                ...state,
                bannerTwoData:action.bannerTwoData,
                bannerTwoLoading:action.bannerTwoLoading
            }

        case banner_three:
            return {
                ...state,
                bannerThreeData:action.bannerThreeData,
                bannerThreeLoading: action.bannerThreeLoading,
                bannerThreeApi: action.bannerThreeApi
            }
        case banner_one:
            return {
                ...state,
                bigBannerData:action.bigBannerData,
                bigBannerLoading: action.bigBannerLoading,
                bigBannerApi: action.bigBannerApi
            }





        default:
            return state;
    }
}

export default bannerReducer;