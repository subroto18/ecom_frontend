import {
    details_del_cart_product,
    get_cart_item,
    get_cart_product_request,
    get_cart_product_request_success
} from "../types";
import Api from "../../ClientApi/Api";
import {startLoading, stopLoading,alert} from "../common";

export const  getCartItem  =   () => {

    return async (dispatch) => {
       await Api().get('getCartItem').then(res => {
           dispatch({
               type:get_cart_item,
               cartItem: res.data
           })
        }).catch(error=>{
           dispatch({
               type:get_cart_item,
               cartItem: 0
           })
       })


    }
}


export const  getCartProductDetails  =   (data = null) => {

    return async (dispatch) => {
        if (data === null) {
            dispatch({
                type:get_cart_product_request,
                cartProductLoadingStatus: true
            })

        }


       await Api().get('getCartProduct').then(res => {
           dispatch({
               type:get_cart_product_request_success,
               cartProductLoadingStatus: false,
               cartProductDetails: res.data,
           })

        })

        dispatch(getCartItem());

    }
}


export const  detailsDelCartProduct  =   (product) => {

    return async (dispatch) => {

        dispatch({
            type:details_del_cart_product,
            cartProductLoadingStatus: true
        })

        startLoading()
        try{
           await Api().post('delCartDetailsProduct', product).then(res => {
                if (res.data === 1) {
                    stopLoading()
                    alert('success','Item deleted!')
                    dispatch(getCartProductDetails({ cartUpdate: true }))
                }else{
                    stopLoading()
                }

            }).catch(error => {
                stopLoading()
            })
        }catch (e) {
            stopLoading()

        }

    }
}


