import {selected_media, selected_media_limit, show_media_file} from "../types";


export const  showMediaFile  =  (e) => {

    return async (dispatch) => {

        dispatch({
            type:show_media_file,
            media_type:e.type,
            media:e.showFile

        })



    }
}


export const  selectedMedia  =  (data) => {

    return async (dispatch) => {

        dispatch({
            type:selected_media,
            media_type:data.type,
            media_id:data.photoId

        })

    }
}


export const  mediaLimit  =  (data) => {

    return async (dispatch) => {

        dispatch({
            type:selected_media_limit,
            media_type:data.type,
            media_limit:data.limit


        })

    }
}


