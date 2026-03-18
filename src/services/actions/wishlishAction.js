import Api from "../../ClientApi/Api";
import {get_wishlist_product, wishlist_request, wishlist_request_failed, wishlist_request_success} from "../types";
import {startLoading, stopLoading,alert} from "../common";

export const  addWishlistProduct  =   (e) => {
    return async (dispatch) => {
        const data = {
            id: e
        }
        startLoading();

        try{
            await Api().post('addWishlistProduct', data).then(res => {
                if (res.status === 200) {
                    if (res.data === 1) {
                        dispatch(getWishlist());
                        stopLoading();
                        alert('success','Item has been added to wishlist!')
                    } else if (res.data === 2) {
                        stopLoading();
                        alert('warning','This item has been already added!')
                    }
                }
            }).catch(error => {
                stopLoading();
            })

        }catch (error) {
            startLoading()
        }

    }
}

export const  getWishlist  =  () => {
    return async (dispatch) => {
        try{
            await Api().get('getWishlist').then(res => {
                dispatch({
                    type:get_wishlist_product,
                    wishlistItem:res.data
                })

            }).catch(error => {})
        }catch (error) {

        }


    }
}

export const  getWishlistProduct  =  (data = null) => {

    return async (dispatch) => {

        if (data != "") {
            dispatch({
                type:wishlist_request,
                wishlistProductLoadingStatus: true
            })
        }

        try{
           await Api().get('getWishlistProduct').then((response, i) => {

               dispatch({
                   type:wishlist_request_success,
                   wishlistProduct: response.data,
                   wishlistProductLoadingStatus: false
               })

               dispatch(getWishlist)
            }).catch(error => {
               dispatch({
                   type:wishlist_request_failed,
                   wishlistProduct: [],
                   wishlistProductLoadingStatus: false
               })


            })
        }catch (error) {
            dispatch({
                type:wishlist_request_failed,
                wishlistProduct: [],
                wishlistProductLoadingStatus: false
            })
        }

    }


}

export const  delWishlistProduct  =  (e) => {

    return async (dispatch) => {

        try{
            const data = {
                id: e
            }
            startLoading()

          await  Api().post('delWishlistProduct', data).then(res => {

                if (res.data === 1) {
                    stopLoading()
                    alert('success',"Item has been deleted!");
                }
              dispatch(getWishlistProduct({data:true}))

            }).catch(error => {
                stopLoading()
            })


        }catch (error) {

        }

    }


}

