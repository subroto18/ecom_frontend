import {login_modal, login_notification_reset, mega_menu, top_progress_bar} from '../types'
const initialState = {
    loginModal: false,
    progress:0,
    cookie:null,
    megaMenuData: [],
    megaMenuLoading: true,
};

const common  = (state = initialState, action) => {
    switch(action.type){
        case login_modal:
            return {
                ...state,
                loginModal:action.payload
            }

        case top_progress_bar:{
            return {
                ...state,
                progress:action.payload
            }
        }
        case login_notification_reset:{
            return {
                ...state,
                banUser: action.banUser,
                passwordNotMatch:action.passwordNotMatch

            }
        }
        case mega_menu:{
            return {
                ...state,
                megaMenuData: action.megaMenuData,
                megaMenuLoading: action.megaMenuLoading,

            }
        }

        default:
            return state;
    }
}

export default common;