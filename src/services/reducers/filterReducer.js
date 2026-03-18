import {
    brand_sorting,
    clear_search_data, clear_sorting_data, data_sorting, filter_drawer,
    filter_product_request, filter_product_request_failed,
    filter_product_request_success, price_sorting, seller_sorting, variation_sorting
} from "../types";

const initialState = {
    brands: [],
    shops: [],
    maxPrice: 0,
    minPrice: 0,
    searchVariation: [],
    searchProduct: [],
    searchProductLoading: true,
    searchFilterLoading: true,
    urlVariation: "",
    urlBrands: "",
    urlSeller: "",
    urlSort: "",
    urlMaxPrice: "",
    urlMinPrice: "",
    urlSearchValue: "",
    urlCatSearchValue: "",
    urlVariationArray: [],
    sortPriceRange: [500, 1000],
    variationSorting: [],
    priceSortingRange: { min: 0, max: 0 },
    sellerSorting: "",
    brandSorting: "",
    dataSorting: "",
    clearSortingData: false,
    searchData: "",
    filterDrawer: '',
};

const filterReducer  = (state = initialState, action) => {
    switch(action.type){
        case filter_product_request:
            return {
                ...state,
                searchFilterLoading:action.searchFilterLoading,
                searchData:action.searchData
            }

        case filter_product_request_success:{
            return {
                ...state,
                brands: action.brands,
                shops: action.shops,
                maxPrice: action.maxPrice,
                minPrice: action.minPrice,
                searchVariation:action.searchVariation,
                searchProduct:action.searchProduct,
                searchFilterLoading: action.searchFilterLoading
            }
        }
        case filter_product_request_failed:{
            return {
                ...state,
                searchFilterLoading:action.searchFilterLoading,
                searchData:action.searchData

            }
        }
        case clear_search_data:{
            return {
                ...state,
                variationSorting: [],
                priceSortingRange: { min: 0, max: 0 },
                sellerSorting: "",
                brandSorting: "",
                dataSorting: "",
                clearSortingData: true

            }
        }
        case clear_sorting_data:{
            return {
                ...state,
                clearSortingData: action.clearSortingData,
            }
        }
        case variation_sorting:{
            return {
                ...state,
                variationSorting: action.variationSorting,
            }
        }
        case price_sorting:{
            return {
                ...state,
                priceSortingRange: action.priceSortingRange,
            }
        }
        case seller_sorting:{
            return {
                ...state,
                sellerSorting: action.sellerSorting,
            }
        }
        case brand_sorting:{
            return {
                ...state,
                brandSorting: action.brandSorting,
            }
        }
        case data_sorting:{
            return {
                ...state,
                dataSorting: action.dataSorting,
            }
        }

        case filter_drawer:{
            return {
                ...state,
                filterDrawer: action.filterDrawer,
            }
        }



        default:
            return state;
    }
}

export default filterReducer;