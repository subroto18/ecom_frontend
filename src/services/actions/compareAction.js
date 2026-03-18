
import {
    add_compare_product_request,
    add_compare_product_request_failed,
    add_compare_product_request_success,
    compare_product_request,
    compare_product_request_failed,
    compare_product_request_success,
    del_compare_product_request,
    del_compare_product_request_failed,
    del_compare_product_request_success,
} from '../types'
import Api from "../../ClientApi/Api";
import {startLoading, stopLoading,alert} from "../common";
import Store from "../store";
import store from "../store";


export const  addCompareProduct  =   (e) => {

    return async (dispatch) => {

        let productId =  store.getState().compareReducer.compareProductId;

        if (productId.indexOf(e) === -1) {

           startLoading();
            productId.splice(0, 0, e);
            localStorage.setItem('compare_data', productId);

            dispatch({
                type:add_compare_product_request,
                compareProductId:productId,
                compareProductLoadingStatus:true,
                compareItem:productId.length
            })

            const data ={
                compareProductId:productId,
                compareProductLoadingStatus:true,
                compareItem:productId.length
            }

            try{
                let data = {
                    id: productId
                }

                Api().post('getCompareProduct', data).then(res => {
                    dispatch({
                        type:add_compare_product_request_success,
                        compareProduct:res.data,
                        compareProductLoadingStatus:false,
                        compareProductId:productId,
                    })

                    stopLoading();
                    alert('success','Item has been added to compare!')

                }).catch(error => {

                    dispatch({
                        type:add_compare_product_request_failed,
                        compareProduct:[],
                        compareProductLoadingStatus:false
                    })

                    stopLoading();
                })

            }catch (error) {

                dispatch({
                    type:add_compare_product_request_failed,
                    compareProduct:[],
                    compareProductLoadingStatus:false
                })
                stopLoading();

            }

        } else {
            alert('warning','This item has been already added!')
        }


    }
}

export const compareProduct = () => {

    return async (dispatch) => {
        let compareData = localStorage.getItem('compare_data');

        if (compareData !== null) {
            let productId = compareData.split(',')

            let data = {
                id: productId
            }


            dispatch({
                type:compare_product_request,
                compareProductLoadingStatus:true,
            })


           await Api().post('getCompareProduct', data).then(res => {

              let productId = [];

              let compareProductId = Store.getState().compareReducer.compareProductId;

               if (res.data.length > 0) {
                   res.data.map(pd => {
                       productId.push(pd.index)
                   })
               }

               dispatch({
                   type:compare_product_request_success,
                   compareProductLoadingStatus:false,
                   compareProduct: res.data,
                   compareProductId:productId

               })


            }).catch(error => {

               dispatch({
                   type:compare_product_request_failed,
                   compareProductLoadingStatus:false,
                   compareProduct:[]
               })


            })
        } else {
            dispatch({
                type:compare_product_request_failed,
                compareProductLoadingStatus:false,
                compareProduct:[]
            })
        }
    }


}




export const deleteCompareProduct = (e) => {

    return async (dispatch) => {
        console.log(e,'delete compare product');
        let product =  store.getState().compareReducer.compareProductId;
        const index = product.indexOf(e);

        if (index > -1) {
            product.splice(index, 1);
            startLoading()
        }

        dispatch({
            type:del_compare_product_request,
            compareProductId:product,
            compareProductLoadingStatus:true
        })

        let data = {
            id: product
        }

        try{
            Api().post('getCompareProduct', data).then(res => {
                localStorage.setItem('compare_data', product);
                dispatch({
                    type:del_compare_product_request_success,
                    compareProduct: res.data,
                    compareProductLoadingStatus:false
                })
                stopLoading()
                alert('success','Item has been deleted!')

            }).catch(error => {

                dispatch({
                    type:del_compare_product_request_failed,
                    compareProduct: [],
                    compareProductLoadingStatus:false
                })

                stopLoading()
            })
        }catch (error){
            dispatch({
                type:del_compare_product_request_failed,
                compareProduct: [],
                compareProductLoadingStatus:false
            })
            stopLoading()
        }

    }


}




