import {product_category, show_category_product, top_ten_categories} from "../types";

export const  productCategory  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:product_category,
            categoryProductData: data,
            categoryProductLoading: false,
            categoryApi: true
        })
    }
}


export const  topTenCategories  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:top_ten_categories,
            topTenCategoriesData: data,
            topTenCategoriesLoading: false,
            topTenCategoriesApi: true
        })
    }
}

export const  productCategoryShow  =   (data) => {
    return async (dispatch) => {
        dispatch({
            type:show_category_product,
            categoryProductData: data,
            categoryProductLoading: false,
            categoryApi: true
        })
    }
}




