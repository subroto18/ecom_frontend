import {
    add_cart_product_request,
    cart_variation_reset, checkout_product_request, checkout_product_request_failed, checkout_product_request_success,
    de_select_product,
    get_specific_product_failed,
    get_specific_product_request,
    get_specific_product_success,
    hide_success_modal,
    new_arrival_product, selected_checkout_product,
    single_product_request,
    single_product_request_failed,
    single_product_request_success,
    update_available_product,
    update_not_available_product,
    update_product_id,
    update_product_img,
    update_product_quantity, update_product_variation,
    update_product_variation_discount_price, update_product_variation_mix,
    update_variation_price,
    update_variation_sku,
    update_variation_stock
} from "../types";

const initialState = {
    singleProductLoadingStatus: true,
    singleProductSlug: "",
    specificProduct: [],
    variationCartStatus: false,
    successCartStatus: false,
    variationCartLoadingStatus: true,
    selectedProductId: "",
    variationPrice: null,
    variationDiscountPrice: null,
    variationStock: "",
    variationImage: "",
    imageSrc: "",
    variationSku: "",
    cartBtn: false,
    notAvailable: false,
    quantity: 1,
    selectedVariation: "",
    addCartProductInfo: [],
    newArrivalData:[],
    newArrivalApi:false,
    checkoutProductExist: false,
    singleCheckoutProductLoading: true,
    checkoutProcessing: false,
    selectedProductShop: "",
    checkoutProduct:[],
    shippingDays:0,
    singleProductData:[],
    newArrivalLoading:true,
    selectedVariationMix:null
};

const productReducer  = (state = initialState, action) => {
    switch(action.type){
        case single_product_request:
            return {
                ...state,
                singleProductLoadingStatus:action.singleProductLoadingStatus,
                singleProductSlug:action.singleProductSlug
            }

        case single_product_request_success:{
            return {
                ...state,
                singleProductData: action.singleProductData,
                singleProductLoadingStatus: action.singleProductLoadingStatus,
                metaTitle:action.metaTitle,
                metaDescription:action.metaDescription,
                metaKeyword:action.metaKeyword,
                metaPhoto:action.metaTitle
            }
        }
        case single_product_request_failed:{
            return {
                ...state,
                singleProductLoadingStatus: false,
                singleProductSlug: "",

            }
        }

        case cart_variation_reset: {
            return {
                ...state,
                variationCartStatus: action.variationCartStatus,
                specificProduct: action.specificProduct,
                variationCartLoadingStatus: action.variationCartLoadingStatus,
                variationStock: action.variationStock,
                variationImage: action.variationImage,
                imageSrc: action.imageSrc,
                variationSku: action.variationSku,
                cartBtn: action.cartBtn,
                notAvailable: action.notAvailable,
                quantity: action.quantity,
                selectedVariation: action.selectedVariation,
                selectedVariationMix: action.selectedVariationMix
            }
        }

        case new_arrival_product : {
            return {
                ...state,
                newArrivalData:action.newArrivalData,
                newArrivalLoading:action.newArrivalLoading,
                newArrivalApi:action.newArrivalApi
            }
        }

        case hide_success_modal : {
            return {
                ...state,
                successCartStatus: action.successCartStatus,
            }
        }

        case get_specific_product_request : {
            return {
                ...state,
                variationCartStatus: action.variationCartStatus,
                cartBtn: action.cartBtn,
                quantity: action.quantity,
            }
        }
        case get_specific_product_success : {
            return {
                ...state,
                specificProduct: action.specificProduct,
                variationCartLoadingStatus: action.variationCartLoadingStatus,
            }
        }
        case get_specific_product_failed : {
            return {
                ...state,
                specificProduct: action.specificProduct,
                variationCartLoadingStatus: action.variationCartLoadingStatus,
            }
        }
        case de_select_product : {
            return {
                ...state,
                specificProduct: action.specificProduct,
                selectedVariation: action.selectedVariation,
                variationStock: action.variationStock,
                variation: action.variation,
                variationImage: action.variationImage,
                imageSrc: action.imageSrc,
                variationSku: action.variationSku,
                cartBtn: action.cartBtn,
                notAvailable: action.notAvailable,
                quantity: action.quantity,
                variationDiscountPrice: action.variationDiscountPrice,
            }
        }

        case update_product_id : {
            return {
                ...state,
                selectedProductId: action.selectedProductId,
            }
        }
        case update_product_quantity : {
            return {
                ...state,
                quantity: action.quantity,
            }
        }
        case update_not_available_product : {
            return {
                ...state,
                notAvailable: action.notAvailable,
                cartBtn: action.cartBtn,
            }
        }
        case update_available_product : {
            return {
                ...state,
                notAvailable: action.notAvailable,
                cartBtn: action.cartBtn,
            }
        }
        case update_product_img : {
            return {
                ...state,
                imageSrc: action.imageSrc
            }
        }
        case update_product_variation : {
            return {
                ...state,
                selectedVariation: action.selectedVariation
            }
        }
        case update_product_variation_discount_price : {
            return {
                ...state,
                variationDiscountPrice:action.variationDiscountPrice
            }
        }
        case update_variation_price : {
            return {
                ...state,
                variationPrice: action.variationPrice
            }
        }
        case update_variation_sku : {
            return {
                ...state,
                variationSku: action.variationSku
            }
        }
        case update_product_variation_mix : {
            return {
                ...state,
                selectedVariationMix: action.selectedVariationMix
            }
        }

        case update_variation_stock : {
            return {
                ...state,
                variationStock: action.variationStock
            }
        }
        case add_cart_product_request : {
            return {
                ...state,
                variationCartStatus: action.variationCartStatus,
                checkoutProductExist:action.checkoutProductExist,
                cartUpdate: action.cartUpdate
            }
        }


        case checkout_product_request : {
            return {
                ...state,
                singleCheckoutProductLoading: action.singleCheckoutProductLoading,
                checkoutProcessing: action.checkoutProcessing,
                variationCartLoadingStatus: action.variationCartLoadingStatus,
                checkoutProductExist: action.checkoutProductExist,
                variationCartStatus: action.variationCartStatus,
            }
        }

        case checkout_product_request_success : {
            return {
                ...state,
                checkoutProduct:action.checkoutProduct,
                selectedProductShop: action.selectedProductShop,
                shippingDays: action.shippingDays,
                singleCheckoutProductLoading: action.singleCheckoutProductLoading
            }
        }
        case checkout_product_request_failed : {
            return {
                ...state,
                checkoutProduct: action.checkoutProduct,
                selectedProductShop: action.selectedProductShop,
                shippingDays:action.shippingDays,
                singleCheckoutProductLoading: action.singleCheckoutProductLoading
            }
        }
        case selected_checkout_product : {
            return {
                ...state,
                checkoutProduct: action.checkoutProduct,
                selectedProductShop: action.selectedProductShop,
                shippingDays: action.shippingDays,
                singleCheckoutProductLoading: action.singleCheckoutProductLoading,
                checkoutProductExist: action.checkoutProductExist,
            }
        }


        default:
            return state;
    }
}

export default productReducer;