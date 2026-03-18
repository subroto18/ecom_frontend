import {product_category, show_category_product, top_ten_categories} from '../types'
const initialState = {
    categoryProductData: [],
    categoryProductLoading: true,
    categoryApi: false,
    topTenCategoriesData:[],
    topTenCategoriesLoading:true,
    topTenCategoriesApi:false
};

const categoryReducer  = (state = initialState, action) => {
    switch(action.type){
        case product_category:
            return {
                ...state,
                categoryProductData: action.categoryProductData,
                categoryProductLoading: action.categoryProductLoading,
                categoryApi: action.categoryApi
            }
        case top_ten_categories:{
            return {
                ...state,
                topTenCategoriesData: action.topTenCategoriesData,
                topTenCategoriesLoading: action.topTenCategoriesLoading,
                topTenCategoriesApi: action.topTenCategoriesApi
            }
        }
        case show_category_product:{
            return {
                ...state,
                categoryProductData: action.categoryProductData,
                categoryProductLoading: action.categoryProductLoading,
                categoryApi: action.categoryApi
            }
        }


        default:
            return state;
    }
}

export default categoryReducer;