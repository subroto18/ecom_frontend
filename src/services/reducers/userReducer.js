import {
    user_request,
    user_request_success,
    user_request_failed,
    post_user_request,
    post_user_request_success, post_user_request_failed, user_logout, update_user_role, profile_update
} from '../types'

const initialState = {
    userLoading: false,
    userData:[],
    userErrMsg:"",
    passwordNotMatch: false,
    name:"",
    phone: "",
    birthday: new Date(),
    gender:  'male',
    email: "",
    avatar: "",
    role: "",
    index: "",
    emailVerified: undefined,
    shippingMethod: "",
    shippingFee: 0,
    walletActivation: 0,

    activePaymentGateway: "",
    loginErrorMessage:"",
    banUser:0
};


const siteDataReducer  = (state = initialState, action) => {
    switch(action.type){
        case user_request:
            return {
                ...state,
                userLoading:true
            }

        case user_request_success:
            return {
                ...state,
                userLoading:false,
                userData:action.payload,
                passwordNotMatch: action.passwordNotMatch,
                isAuthorized: action.isAuthorized,
                name: action.name,
                phone: action.phone,
                birthday:action.birthday,
                gender: action.gender,
                email: action.email,
                avatar: action.avatar,
                role: action.role,
                index: action.index,
                emailVerified: action.emailVerified,
                shippingMethod: action.shippingMethod,
                shippingFee: action.shippingFee,
                wishlistItem: action.wishlistItem,
                walletActivation: action.walletActivation,
                couponActivation: action.couponActivation,
                activePaymentGateway: action.activePaymentGateway,
            }
        case user_request_failed:
            return {
                ...state,
                userLoading:false,
                userData:[],
                userErrMsg:action.payload,
                isAuthorized: action.isAuthorized
            }
        case user_logout:
            return {
                ...state,
                isAuthorized: action.isAuthorized
            }

        case post_user_request:
            return {
                ...state,
                userLoading:true,
            }
        case post_user_request_success :
            return {
                ...state,
                passwordNotMatch:action.passwordNotMatch,
                userLoading:action.userLoading,
                isAuthorized:action.isAuthorized,
                banUser:action.banUser,
                loginErrorMessage:action.loginErrorMessage
            }

        case post_user_request_failed :
            return {
                ...state,
                passwordNotMatch:action.passwordNotMatch,
                userLoading:action.userLoading,
                isAuthorized:action.isAuthorized,
                banUser:action.banUser,
                loginErrorMessage:action.loginErrorMessage

            }

        case update_user_role:{
            return {
                ...state,
                role: action.role
            }
        }

        case profile_update:{
            return {
                ...state,
                name: action.name,
                birthday: action.birthday,
                gender: action.gender,
                avatar: action.avatar,
            }
        }

        default:
            return state;
    }
}




export default siteDataReducer;