import {
    user_request,
    user_request_success,
    user_request_failed,
    post_user_request,
    post_user_request_success,
    post_user_request_failed,
    user_logout,
    update_user_role,
    get_wishlist_items_when_login,
    get_cart_items_when_login, get_coupon_activation, get_shipping_data_when_login, wallet_activation, profile_update
} from '../types'
import  Api from '../../ClientApi/Api'
import {popupLoginHide, topProgressBar} from "./commonAction";
import {stopLoading,alert} from "../common";
import {shippingBillingAddress} from "./shippingBillingPickupAction";


export const  user  =   () => {
    return async (dispatch) => {
        try{
            dispatch({
                type:user_request
            })
              await Api().get('user').then(res=>{
                if (res.status === 200) {
                    dispatch({
                        type:user_request_success,
                        payload:res.data,
                        passwordNotMatch: false,
                        isAuthorized: true,
                        name: res.data.name,
                        phone: res.data.phone,
                        birthday: new Date(res.data.dob),
                        gender: res.data.gender !== null ? res.data.gender : 'male',
                        email: res.data.email,
                        avatar: res.data.media_url,
                        role: res.data.role,
                        index: res.data.index,
                        emailVerified: res.data.verified,
                        activePaymentGateway: res.data.activatePaymentGateway,
                    })

                    dispatch({
                        type:get_shipping_data_when_login,
                        shippingMethod: res.data.shippingFee.type,
                        shippingFee: res.data.shippingFee.fee,
                    });


                    dispatch({
                        type:get_coupon_activation,
                        couponActivation: res.data.couponActivation,
                    });

                    dispatch({
                        type:get_wishlist_items_when_login,
                         wishlistItem: res.data.wishlistItem,
                    });

                    dispatch({
                         type:get_cart_items_when_login,
                         cartItem: res.data.cartItem,

                    });

                    dispatch({
                        type:wallet_activation,
                        walletActivation: res.data.walletActivation

                    });


                    dispatch(shippingBillingAddress(res.data.shippingBillingAddress))
                }
            });

        }catch(error){
            dispatch({
                type:user_request_failed,
                payload:error.message,
                isAuthorized:false
            })

        }
    }
}


export const login = (res) => {


        if (res.email !== undefined) {
            return async (dispatch) => {
                let data = {
                    password: res.password,
                    email: res.email,
                    remember_me: res.remember_me !== undefined ? res.remember_me : false
                }

                try{
                    dispatch({
                        type:post_user_request,
                    })

                    await Api().get('/sanctum/csrf-cookie').then(res => {
                        Api().post('login', data).then(res => {
                            if (res.data.status_code === 200) {

                                dispatch({
                                    type:post_user_request_success,
                                    passwordNotMatch:false,
                                    userLoading:false,
                                    isAuthorized:false,
                                    banUser:0,
                                    loginErrorMessage: "",
                                })

                                dispatch(user());
                                dispatch(popupLoginHide());
                                dispatch(topProgressBar(100));
                                alert('success','login successful!');



                            } else if (res.data.status_code === 403) {

                                dispatch({
                                    type:post_user_request_success,
                                    passwordNotMatch:true,
                                    banUser:1,
                                    isAuthorized:false,
                                    userLoading:false,
                                    loginErrorMessage: "",
                                })

                            } else {

                                dispatch({
                                    type:post_user_request_success,
                                    passwordNotMatch:true,
                                    banUser:0,
                                    isAuthorized:false,
                                    userLoading:false,
                                    loginErrorMessage: "",
                                })

                            }

                        }).catch(error => {
                            dispatch({
                                type:post_user_request_failed,
                                passwordNotMatch:true,
                                isAuthorized:false,
                                userLoading:false,
                                banUser:0,
                                loginErrorMessage: "",
                            })

                        })

                    })


                }catch (error){
                    dispatch({
                        type:post_user_request_failed,
                        passwordNotMatch:true,
                        isAuthorized:false,
                        userLoading:false,
                        banUser:0,
                        loginErrorMessage: "",
                    })
                }
            }
        }else{
            return async  (dispatch) => {
                let data = {
                    password: res.password,
                    phone: res.phone,
                    remember_me: res.remember_me != undefined ? res.remember_me : false
                }
                dispatch({
                    type:post_user_request,
                })
                try{
                    await Api().get('/sanctum/csrf-cookie').then(res => {
                        Api().post('login', data).then(res => {
                            if (res.data.status_code === 200) {

                                dispatch({
                                    type:post_user_request_success,
                                    passwordNotMatch:false,
                                    userLoading:false,
                                    isAuthorized:true,
                                    banUser:0
                                })

                                dispatch(user());
                                dispatch(popupLoginHide());
                                dispatch(topProgressBar(100));
                                alert('success','login successful!');


                            } else if (res.data.status_code === 403) {

                                dispatch({
                                    type:post_user_request_success,
                                    passwordNotMatch:true,
                                    banUser:1,
                                    isAuthorized:false,
                                    userLoading:false,
                                })

                            } else {

                                dispatch({
                                    type:post_user_request_success,
                                    passwordNotMatch:true,
                                    banUser:0,
                                    isAuthorized:false,
                                    userLoading:false,
                                })


                            }

                        }).catch(error => {
                            dispatch({
                                type:post_user_request_failed,
                                passwordNotMatch:true,
                                isAuthorized:false,
                                userLoading:false,
                                banUser:0
                            })
                        })

                    })
                }catch(error){
                    dispatch({
                        type:post_user_request_failed,
                        passwordNotMatch:true,
                        isAuthorized:false,
                        userLoading:false,
                        banUser:0
                    })
                }

            }
        }


}

export const logout = () => {
    return  (dispatch) => {
        dispatch({
            type:user_logout,
            isAuthorized:false
        })
        stopLoading()
        alert('success','Logout successful!');
    }

}


export const loginWithFacebook = (res) => {
    return async  (dispatch) => {
            let data = {
                email: res.email,
                avatar: res.avatar,
                name: res.name
            }

        dispatch({
            type:post_user_request,
        })
        try{
           await Api().get('/sanctum/csrf-cookie').then(res => {
                Api().post('login-with-facebook', data).then(res => {

                    if (res.data.status_code === 200) {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:false,
                            userLoading:false,
                            isAuthorized:true,
                            loginErrorMessage: "",
                            banUser:0
                        })

                        dispatch(user());
                        dispatch(popupLoginHide());
                        dispatch(topProgressBar(100));
                        alert('success','login successful!');



                    } else if (res.data.status_code === 403) {


                        this.setState({
                            passwordNotMatch: false,
                            banUser: 1,
                            isAuthorized: false,
                            loginLoading: false,
                            loginErrorMessage: ""
                        })
                    } else {
                        this.setState({
                            loginLoading: false,
                            passwordNotMatch: true,
                            banUser: 0,
                            loginErrorMessage: res.data,
                            isAuthorized: false
                        })
                    }

                }).catch(error => {
                    this.setState({
                        loginLoading: false,
                        passwordNotMatch: true,
                        banUser: 0,
                        loginErrorMessage: res.data,
                        isAuthorized: false
                    })
                })

            })

            await Api().get('/sanctum/csrf-cookie').then(res => {
                Api().post('login', data).then(res => {
                    if (res.data.status_code === 200) {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:false,
                            userLoading:false,
                            isAuthorized:true,
                            banUser:0
                        })



                        dispatch(user());
                        dispatch(popupLoginHide());
                        dispatch(topProgressBar(100));
                        alert('success','login successful!');

                    } else if (res.data.status_code === 403) {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:true,
                            banUser:1,
                            isAuthorized:false,
                            userLoading:false,
                            loginErrorMessage: ""
                        })

                    } else {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:true,
                            banUser:0,
                            isAuthorized:false,
                            userLoading:false,
                            loginErrorMessage: res.data,
                        })


                    }

                }).catch(error => {
                    dispatch({
                        type:post_user_request_failed,
                        passwordNotMatch:true,
                        isAuthorized:false,
                        userLoading:false,
                        banUser:0,
                        loginErrorMessage: res.data,
                    })
                })

            })
        }catch(error){
            dispatch({
                type:post_user_request_failed,
                passwordNotMatch:true,
                isAuthorized:false,
                userLoading:false,
                banUser:0,
                loginErrorMessage: res.data,
            })
        }

    }
}


export const loginWithGoogle = (res) => {
    return async  (dispatch) => {

        let data = {
            email: res.email,
            avatar: res.avatar,
            name: res.name
        }

        dispatch({
            type:post_user_request,
        })
        try{
            await Api().get('/sanctum/csrf-cookie').then(res => {
                Api().post('login-with-google', data).then(res => {

                    if (res.data.status_code === 200) {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:false,
                            userLoading:false,
                            isAuthorized:true,
                            loginErrorMessage: "",
                            banUser:0
                        })



                        dispatch(user());
                        dispatch(popupLoginHide());
                        dispatch(topProgressBar(100));
                        alert('success','login successful!');


                    } else if (res.data.status_code === 403) {


                        this.setState({
                            passwordNotMatch: false,
                            banUser: 1,
                            isAuthorized: false,
                            loginLoading: false,
                            loginErrorMessage: ""
                        })
                    } else {
                        this.setState({
                            loginLoading: false,
                            passwordNotMatch: true,
                            banUser: 0,
                            loginErrorMessage: res.data,
                            isAuthorized: false
                        })
                    }

                }).catch(error => {
                    this.setState({
                        loginLoading: false,
                        passwordNotMatch: true,
                        banUser: 0,
                        loginErrorMessage: res.data,
                        isAuthorized: false
                    })
                })

            })

            await Api().get('/sanctum/csrf-cookie').then(res => {
                Api().post('login', data).then(res => {
                    if (res.data.status_code === 200) {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:false,
                            userLoading:false,
                            isAuthorized:true,
                            banUser:0
                        })

                        dispatch(user());
                        dispatch(popupLoginHide());
                        dispatch(topProgressBar(100));
                        alert('success','login successful!');

                    } else if (res.data.status_code === 403) {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:true,
                            banUser:1,
                            isAuthorized:false,
                            userLoading:false,
                            loginErrorMessage: ""
                        })

                    } else {

                        dispatch({
                            type:post_user_request_success,
                            passwordNotMatch:true,
                            banUser:0,
                            isAuthorized:false,
                            userLoading:false,
                            loginErrorMessage: res.data,
                        })


                    }

                }).catch(error => {
                    dispatch({
                        type:post_user_request_failed,
                        passwordNotMatch:true,
                        isAuthorized:false,
                        userLoading:false,
                        banUser:0,
                        loginErrorMessage: res.data,
                    })
                })

            })
        }catch(error){
            dispatch({
                type:post_user_request_failed,
                passwordNotMatch:true,
                isAuthorized:false,
                userLoading:false,
                banUser:0,
                loginErrorMessage: res.data,
            })
        }

    }
}


export const updateUserRole = (res) => {
    return async  (dispatch) => {
        dispatch({
            type:update_user_role,
            role:2
        })
    }
}


export const profileUpdate = (data) => {
    return async  (dispatch) => {
        dispatch({
            type:profile_update,
            name: data.name,
            birthday: new Date(data.dob),
            gender: data.gender,
            avatar: data.avatar,
        })
    }
}






