
import {all_flash_deal, flash_deal} from "../types";

export const  flashDeal  =  (data) => {

    return async (dispatch) => {

        if (data !== 0) {
            if (data != undefined) {

                if (data.length > 0) {

                    dispatch({
                        type:flash_deal,
                        flashDealLoading: false,
                        flashDealData: data[0].product,
                        flashDealCountdown: data[0].flashdeal_time,
                        flashDealId: data[0].id,
                        flashApi: true,
                        flashDealSlug: data[0].slug
                    })
                }


            }


        }


    }
}



export const  allFlashDeal  =  (data) => {

    return async (dispatch) => {

        if (data !== 0) {
            if (data != undefined) {
                dispatch({
                    type:all_flash_deal,
                    allFlashDealLoading: false,
                    allFlashApi: true,
                    allFlashDealData: data
                })

            }


        }

    }
}

