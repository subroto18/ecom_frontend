import {
    get_cookie,
    login_modal,
    login_notification_reset,
    mega_menu,
    send_email,
    set_cookie, set_seo_mark_up,
    top_progress_bar
} from '../types'
import Api from "../../ClientApi/Api";


export const  popupLoginOpen  =   () => {

    return async (dispatch) => {

        dispatch({
            type:login_modal,
            payload:true
        })
    }
}


export const  popupLoginHide  =   () => {

    return async (dispatch) => {

        dispatch({
            type:login_modal,
            payload:false
        })
    }
}



export const topProgressBar = (progress) => {
    return async (dispatch) => {
        dispatch({
            type:top_progress_bar,
            progress:progress
        })
    }
}

export const loginNotificationReset = () => {
    return async (dispatch) => {
        dispatch({
            type:login_notification_reset,
            banUser: 0,
            passwordNotMatch:false
        })
    }
}


export const getCookie = (name) => {
    let nameEQ = name + "=";


    let ca = document.cookie.split(';');


    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
        {

            let cookie =  parseInt(c.substring(nameEQ.length, c.length));

            return ({
                type:get_cookie,
                payload:cookie
            })

        }

    }

    return  (dispatch) => {
        dispatch({
            type:get_cookie,
            payload:null
        })
    }

}

export const  setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";

    return  (dispatch) => {
        dispatch({
            type:set_cookie,
            payload:null
        })
    }

}

export const sendEmail =  () => {
    Api().get('send-email').then(res=>{});
    return  (dispatch) => {
        dispatch({
            type:send_email,
            payload:true
        })
    }
    return (dispatch) => {
        dispatch({
            type:send_email,
            payload:true
        })
    }


}

export const megaMenu =  (data) => {

    return  (dispatch) => {
        dispatch({
            type:mega_menu,
            megaMenuData: data,
            megaMenuLoading: false,
            megaMenuApi: true
        })
    }
}

export const  seoMarkup  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:set_seo_mark_up,
            metaTitle:data.metaTitle,
            metaDescription: data.metaDescription ,
            metaKeyword: data.metaKeyword,
            metaPhoto:data.metaPhoto,
            metaUrl:data.metaUrl
        })
    }
}















