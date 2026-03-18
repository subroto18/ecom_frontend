import {
    brand_sorting,
    clear_search_data, clear_sorting_data, data_sorting, filter_drawer,
    filter_product_request,
    filter_product_request_failed,
    filter_product_request_success, price_sorting, seller_sorting, variation_sorting
} from "../types";
import Api from "../../ClientApi/Api";

export const productSearch = (searchProduct) => {

    return async (dispatch) => {
        dispatch({
            type: filter_product_request,
            searchFilterLoading: true,
            searchData: searchProduct.search
        })

        try {
            await Api().post('getSearchProduct', searchProduct).then(res => {
                dispatch({
                    type: filter_product_request_success,
                    brands: res.data.brands,
                    shops: res.data.sellers,
                    maxPrice: res.data.maxPrice,
                    minPrice: res.data.minPrice,
                    searchVariation: res.data.variation,
                    searchProduct: res.data.product,
                    searchFilterLoading: false
                })

            }).catch(error => {
                dispatch({
                    type: filter_product_request_failed,
                    searchFilterLoading: false,
                    searchData: ""
                })
            });

        } catch (error) {
            dispatch({
                type: filter_product_request_failed,
                searchFilterLoading: false,
                searchData: ""
            })
        }

    }
}

export const searchFilter = (getSearchProduct) => {

    return async (dispatch) => {

        try {

            const data = {
                product: getSearchProduct
            }

            Api().post('getSearchProduct').then(res => {
            }).catch(error => {
            });

        } catch (error) {

        }

    }
}

export const searchProductFetch = (searchProduct) => {

    return async (dispatch) => {

        try {
            dispatch({
                type: filter_product_request,
                searchFilterLoading: true,
                searchData: searchProduct.search
            })


            Api().post('getSearchProduct', searchProduct).then(res => {

                dispatch({
                    type: filter_product_request_success,
                    brands: res.data.brands,
                    shops: res.data.sellers,
                    maxPrice: res.data.maxPrice,
                    minPrice: res.data.minPrice,
                    searchVariation: res.data.variation,
                    searchProduct: res.data.product,
                    searchFilterLoading: false
                })

            }).catch(error => {
                dispatch({
                    type: filter_product_request_failed,
                    searchFilterLoading: false,
                    searchData: ""
                })
            });


        } catch (error) {
            dispatch({
                type: filter_product_request_failed,
                searchFilterLoading: false,
                searchData: ""
            })
        }


    }
}


// clear all search attribute

export const clearSearchSort = () => {

    return async (dispatch) => {

        dispatch({
            type: clear_search_data,
            variationSorting: [],
            priceSortingRange: {min: 0, max: 0},
            sellerSorting: "",
            brandSorting: "",
            dataSorting: "",
            clearSortingData: true
        })


    }
}


export const searchProductSort = (data) => {

    return async (dispatch) => {

        dispatch({
            type: clear_sorting_data,
            clearSortingData: false
        })

        if (data.variation) {
            dispatch({
                type: variation_sorting,
                variationSorting: data.variation
            })

        }

        if (data.priceRange) {
            dispatch({
                type: price_sorting,
                priceSortingRange: data.priceRange
            })
        }

        if (data.seller) {
            if (data.seller === true) {
                dispatch({
                    type: seller_sorting,
                    sellerSorting: ""
                })

            } else {
                dispatch({
                    type: seller_sorting,
                    sellerSorting: data.seller
                })

            }

        }

        if (data.brand) {
            if (data.brand == true) {

                dispatch({
                    type: brand_sorting,
                    brandSorting: ""
                })

            } else {
                dispatch({
                    type: brand_sorting,
                    brandSorting: data.brand
                })
            }

        }

        if (data.dataSorting) {

            if (data.dataSorting === true) {
                dispatch({
                    type: data_sorting,
                    dataSorting: ""
                })

            } else {
                dispatch({
                    type: data_sorting,
                    dataSorting: data.dataSorting
                })

            }
        }


    }
}

export const openFilterDrawer = () => {

    console.log('open drawer');
    return async (dispatch) => {
        dispatch({
            type: filter_drawer,
            filterDrawer: 'active'
        })

    }
}

export const closeFilterDrawer = () => {

    return async (dispatch) => {
        dispatch({
            type: filter_drawer,
            filterDrawer: ''
        })

    }
}


// onSearchProductSort(data)
// {
//
//     this.setState({
//         clearSortingData: false
//     })
//
//     if (data.variation) {
//         this.setState({
//             variationSorting: data.variation
//         })
//     }
//
//     if (data.priceRange) {
//         this.setState({
//             priceSortingRange: data.priceRange
//         })
//     }
//
//     if (data.seller) {
//         if (data.seller === true) {
//             this.setState({
//                 sellerSorting: ""
//             })
//         } else {
//             this.setState({
//                 sellerSorting: data.seller
//             })
//         }
//
//     }
//
//     if (data.brand) {
//         if (data.brand == true) {
//             this.setState({
//                 brandSorting: ""
//             })
//         } else {
//             this.setState({
//                 brandSorting: data.brand
//             })
//         }
//
//     }
//
//     if (data.dataSorting) {
//
//         if (data.dataSorting === true) {
//             this.setState({
//                 dataSorting: ""
//             })
//         } else {
//             this.setState({
//                 dataSorting: data.dataSorting
//             })
//         }
//     }
//
//
// }
//

// // fetch category search product
// onSearchMenuProductFetch(searchProduct)
// {
//     this.setState({
//         searchFilterLoading: true, urlSearchValue: searchProduct.category
//     })
//
//     const data = {
//         search: searchProduct.category,
//         maxPrice: searchProduct.maxPrice,
//         minPrice: searchProduct.minPrice,
//         sort: searchProduct.sort,
//         seller: searchProduct.seller,
//         brand: searchProduct.brand,
//         variation: searchProduct.variation
//
//     }
//
//
//     Api().post('getSearchCatProduct', data).then(res => {
//
//
//         this.setState({
//             brands: res.data.brands,
//             shops: res.data.sellers,
//             maxPrice: res.data.maxPrice,
//             minPrice: res.data.minPrice,
//             searchVariation: res.data.variation,
//             searchProduct: res.data.product,
//             searchFilterLoading: false
//         })
//     }).catch(error => {
//     });
//
// }
//
//
// // all search sorting


//
// // on change price range for sort product
// onPriceRangeChange(value)
// {
//     this.setState({
//         sortPriceRange: value
//     })
// }
