import {selected_media, selected_media_limit, show_media_file} from '../types'
const initialState = {


};

const mediaReducer  = (state = initialState, action) => {
    switch(action.type){
        case show_media_file:
            return {
                ...state,
                ['show_media_for_' + action.media_type]: action.media
            }
        case selected_media:
            return {
                ...state,
                ['selected_for_' + action.media_type]: action.media_id
            }

        case selected_media_limit:
            return {
                ...state,
                ['selected_limit_for_' + action.media_type]: action.media_limit
            }


        default:
            return state;
    }
}

export default mediaReducer;