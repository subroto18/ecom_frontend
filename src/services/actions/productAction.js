import {
    add_cart_product_request,
    add_product_to_cart_coming_from_cart_page, add_product_to_cart_coming_from_product_page,
    cart_variation_reset,
    checkout_product_request,
    checkout_product_request_failed,
    checkout_product_request_success,
    de_select_product,
    get_specific_product_failed,
    get_specific_product_request,
    get_specific_product_success,
    hide_success_modal,
    new_arrival_product,
    selected_checkout_product, selected_checkout_product_voucher,
    single_product_request,
    single_product_request_failed,
    single_product_request_success,
    update_available_product,
    update_cart_btn,
    update_not_available_product,
    update_product_id,
    update_product_img,
    update_product_quantity,
    update_product_variation,
    update_product_variation_discount_price,
    update_product_variation_mix,
    update_variation_price,
    update_variation_sku,
    update_variation_stock
} from "../types";
import Api from "../../ClientApi/Api";
import {startLoading, stopLoading,alert} from "../common";
import {getCartProductDetails, getCartItem} from "./cartAction";


export const  getSingleProduct  =  (productSlug) => {
    return async (dispatch) => {
        dispatch({
            type:single_product_request,
            singleProductLoadingStatus:true,
            singleProductSlug:productSlug
        })
        try{

            const data = {
                link: productSlug
            }

            await Api().post('getProduct', data).then(res => {

                if (res.data.length > 0) {
                    dispatch({
                        type:single_product_request_success,
                        metaTitle: res.data[0].meta_title,
                        metaDescription: res.data[0].meta_description,
                        metaKeyword: res.data[0].meta_keyword,
                        metaPhoto: res.data[0].meta_image,
                        metaUrl:  "product/" + productSlug
                    })

                }

                dispatch({
                    type:single_product_request_success,
                    singleProductData:res.data,
                    singleProductLoadingStatus:false
                })
            }).catch(error => {
                dispatch({
                    type:single_product_request_failed,
                    singleProductLoadingStatus:false,
                    singleProductSlug:""
                })
            })


        }catch(error){
            dispatch({
                type:single_product_request_failed,
                singleProductLoadingStatus:false,
                singleProductSlug:""
            })
        }

    }
}

export const cartVariationReset = () => {
    return async (dispatch) => {
        dispatch({
            type: cart_variation_reset,
            variationCartStatus: false,
            specificProduct: [],
            variationCartLoadingStatus: true,
            variationStock: "",
            variationImage: "",
            imageSrc: "",
            variationSku: "",
            cartBtn: false,
            notAvailable: false,
            quantity: 1,
            selectedVariation: "",
            selectedVariationMix: []
        })
    }
}

export const hideSuccessModal = () => {
    return async (dispatch) => {
        dispatch({
            type: hide_success_modal,
            successCartStatus:false

        })
    }
}


export const newArrival = (data) => {
    return  (dispatch) => {
        dispatch({
            type: new_arrival_product,
            newArrivalData:data,
            newArrivalLoading:false,
            newArrivalApi:true
        })
    }
}


export const cartVariationShow = (e) => {
    return async (dispatch) => {
        dispatch({
            type: get_specific_product_request,
            variationCartStatus:true,
            cartBtn:false,
            quantity:1
        })
        startLoading();

        try{
            const data = {
                id: e
            }

            await Api().post('getSpecificProduct', data).then(res => {

                dispatch({
                    type: get_specific_product_success,
                    specificProduct:res.data,
                    variationCartLoadingStatus:false,
                })
                stopLoading();
            }).catch(error => {
                dispatch({
                    type: get_specific_product_failed,
                    specificProduct:[],
                    variationCartLoadingStatus:false,
                })
                stopLoading();
            })

        }catch (error) {

            dispatch({
                type: get_specific_product_failed,
                specificProduct:[],
                variationCartLoadingStatus:false,
            })
            stopLoading();
        }
    }
}

export const deSelectProduct = () => {
    return async (dispatch) => {
        dispatch({
            type: de_select_product,
            specificProduct: [],
            selectedVariation: "",
            variationStock: "",
            variation: null,
            variationImage: "",
            imageSrc: "",
            variationSku: "",
            cartBtn: false,
            notAvailable: false,
            quantity: 1,
            variationDiscountPrice: null,
        })

    }
}

export const updateProductState = (e) => {

    return async (dispatch) => {
        if (e.selectedProductId) {
            dispatch({
                type: update_product_id,
                selectedProductId: e.selectedProductId
            })
        }
        if (e.selectedVariationMix) {
            dispatch({
                type: update_product_variation_mix,
                selectedVariationMix: e.selectedVariationMix
            })
        }
        if (e.quantity) {
            dispatch({
                type: update_product_quantity,
                quantity: parseInt(e.quantity)
            })
        }
        if (e.notAvailable) {
            dispatch({
                type: update_not_available_product,
                notAvailable: e.notAvailable,
                cartBtn: e.cartBtn,
            })
        }
        if (e.notAvailable == false) {
            dispatch({
                type: update_available_product,
                notAvailable: false,
                cartBtn: true,
            })
        }

        if (e.cartBtn) {
            dispatch({
                type: update_cart_btn,
                cartBtn: true,
            })
        }
        if (e.imageSrc) {

            dispatch({
                type: update_product_img,
                imageSrc:  e.imageSrc,
            })
        }
        if (e.selectedVariation) {
            dispatch({
                type: update_product_variation,
                selectedVariation:  e.selectedVariation
            })
        }

        if (e.variationDiscountPrice) {

            dispatch({
                type: update_product_variation_discount_price,
                variationDiscountPrice: parseFloat(e.variationDiscountPrice)
            })

        }
        if (e.variationPrice) {
            dispatch({
                type: update_variation_price,
                 variationPrice: parseFloat(e.variationPrice)
            })
        }
        if (e.variationSku) {
            dispatch({
                type: update_variation_sku,
                variationSku:  e.variationSku
            })
        }
        if (e.variationStock !== undefined) {
            dispatch({
                type: update_variation_stock,
                variationStock:  e.variationStock
            })
        }




    }
}


export const addCartProduct = (e,cartUpdate=null) => {

    return async (dispatch) => {
        dispatch({
            type: add_cart_product_request,
            variationCartStatus: false,
            checkoutProductExist:true,
            cartUpdate: true
        })

        const data = {
            'id': e.id,
            'product_price': e.product_price,
            'discount_price': e.discount_price,
            'discount': e.discount,
            'variation': e.variation,
            'selectedVariation': e.selectedVariation,
            'image': e.image,
            'discount_type': e.discount_type,
            'sku': e.sku,
            'quantity': e.quantity,
            'product_name': e.product_name,
            'cartDetails': e.cartDetails,
            'cat_type': e.cat_type
        }

        startLoading();
          await Api().post('AddProductCart', data).then(res => {
            if (parseInt(res.data) === 1) {
                // comes from cart
                if (e.cartDetails) {

                    dispatch({
                        type: add_product_to_cart_coming_from_cart_page,
                        successCartStatus: false,
                        addCartProductInfo: data,
                        cartUpdate: false
                    })


                } else {

                    dispatch({
                        type: add_product_to_cart_coming_from_product_page,
                        successCartStatus: true,
                        addCartProductInfo: data,
                    })


                }
                stopLoading();
                dispatch(getCartItem());
                alert('success','Cart has been updated!');
                if (cartUpdate !== null) {
                    dispatch(getCartProductDetails(cartUpdate));
                    alert('success','Cart has been updated!');
                }

            }else{
                stopLoading();
                alert('warning','Something went wrong!');
            }


        }).catch(error => {
            stopLoading();
            alert('warning','Something went wrong!');
        })
    }


}


export const getCheckoutProduct = (e) => {

    return async (dispatch) => {
        dispatch({
            type: checkout_product_request,
            singleCheckoutProductLoading: true,
            checkoutProcessing: true,
            variationCartLoadingStatus: false,
            checkoutProductExist: true,
            variationCartStatus: false,
        })

        const data = {
            'id': e.id,
            'product_price': e.product_price,
            'discount_price': e.discount_price,
            'discount': e.discount,
            'variation': e.variation,
            'selectedVariation': e.selectedVariation,
            'image': e.image,
            'discount_type': e.discount_type,
            'sku': e.sku,
            'quantity': e.quantity,
            'product_name': e.product_name,
            'cartDetails': e.cartDetails
        }


      await  Api().post('getCheckoutProduct', data).then(res => {

          dispatch({
              type: checkout_product_request_success,
              checkoutProduct: res.data[0].cart_product,
              selectedProductShop: res.data[0].shop_name,
              shippingDays: res.data[0].shipping_days,
              singleCheckoutProductLoading: false
          })

        }).catch(error => {
          dispatch({
              type: checkout_product_request_failed,
              checkoutProduct: [],
              selectedProductShop: "",
              shippingDays:0,
              singleCheckoutProductLoading: false
          })
        })
    }


}



export const  selectedCheckoutProduct  =   (product, shopName, shippingDays) => {

    return async (dispatch) => {
        dispatch({
            type:selected_checkout_product,
            checkoutProduct: product.length>0?product:[],
            selectedProductShop: shopName,
            shippingDays: shippingDays,
            singleCheckoutProductLoading: false,
            checkoutProductExist: true
        })

        dispatch({
            type:selected_checkout_product_voucher,
            voucher: "",
            matchVoucher: false,
            invalidVoucher: false,
            totalCouponDiscount: 0,
            totalCouponDiscountPrice: 0,
            voucherDiscountType: "",
        })




    }
}

