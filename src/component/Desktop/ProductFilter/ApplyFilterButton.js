import React, {PureComponent,Fragment} from 'react';
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {clearSearchSort, closeFilterDrawer, searchProductFetch} from "../../../services/actions/filterAction";
import Router from "next/router";
class ApplyFilterButton extends PureComponent {
    constructor() {
        super();
        this.state = {
            allData :[]
        }
        this.onHandleUrl = this.onHandleUrl.bind(this)
        this.onClear = this.onClear.bind(this)
    }


    onHandleUrl(){
            let urlSearchValue =  "";
            if(window.location.href.split( '/' )[4]==="category"){
                urlSearchValue =   window.location.href.split( '/' )[5];
                urlSearchValue = urlSearchValue.split('&')[0];
                const urlVariationArray = this.props.variationSorting;
                const urlMaxPrice = this.props.priceSortingRange.max;
                const urlMinPrice = this.props.priceSortingRange.min;
                const urlSort  = this.props.dataSorting;
                const urlSeller = this.props.sellerSorting;
                const urlBrands = this.props.brandSorting;
                let urlVariation = "";
                let variationMix="";
                urlVariationArray.map(pd=>{
                    urlVariation += "&" + pd.variation + "=";
                    pd.attribute.map(tr=>{
                        urlVariation +=  tr + "+";
                        variationMix += tr +" ";
                    })
                    urlVariation =  urlVariation.substring(0, urlVariation.length - 1)
                })
                variationMix =  variationMix.substring(0, variationMix.length - 1)
                let url = "";
                if(urlVariation!==""){
                    url +=urlVariation
                }
                if(urlMinPrice!==0){
                    url += "&minPrice=" + urlMinPrice
                }
                if(urlMaxPrice!==0){
                    url += "&maxPrice=" + urlMaxPrice
                }
                if(urlSort!==""){
                    url += "&sort=" + urlSort
                }
                if(urlSeller!==""){
                    url += "&seller=" + urlSeller
                }
                if(urlBrands!==""){
                    url += "&brand=" + urlBrands
                }
                let searchUrl = "/product/category/"+urlSearchValue+url
                Router.push(searchUrl);
                const data = {
                    category:urlSearchValue,
                    maxPrice:urlMaxPrice,
                    minPrice:urlMinPrice,
                    sort:urlSort,
                    seller:urlSeller,
                    brand:urlBrands,
                    variation:variationMix,
                }
                this.props.searchProductFetch(data);
            }else if(window.location.href.split( '/' )[4]==="brand") {
                urlSearchValue =   window.location.href.split( '/' )[5];
                urlSearchValue = urlSearchValue.split('&')[0];
                const urlVariationArray = this.props.variationSorting;
                const urlMaxPrice = this.props.priceSortingRange.max;
                const urlMinPrice = this.props.priceSortingRange.min;
                const urlSort  = this.props.dataSorting;
                const urlSeller = this.props.sellerSorting;
                const urlBrands = this.props.brandSorting;
                let urlVariation = "";
                let variationMix="";
                urlVariationArray.map(pd=>{
                    urlVariation += "&" + pd.variation + "=";
                    pd.attribute.map(tr=>{
                        urlVariation +=  tr + "+";
                        variationMix += tr +" ";
                    })
                    urlVariation =  urlVariation.substring(0, urlVariation.length - 1)
                })
                variationMix =  variationMix.substring(0, variationMix.length - 1)
                let url = "";
                if(urlVariation!==""){
                    url +=urlVariation
                }
                if(urlMinPrice!==""){
                    url += "&minPrice=" + urlMinPrice
                }
                if(urlMaxPrice!==""){
                    url += "&maxPrice=" + urlMaxPrice
                }
                if(urlSort!==""){
                    url += "&sort=" + urlSort
                }
                if(urlSeller!==""){
                    url += "&seller=" + urlSeller
                }
                if(urlBrands!==""){
                    url += "&brand=" + urlBrands
                }
                let searchUrl = "/product/brand/"+urlSearchValue+url
                Router.push(searchUrl)
                const data = {
                    brands:urlSearchValue,
                    maxPrice:urlMaxPrice,
                    minPrice:urlMinPrice,
                    sort:urlSort,
                    seller:urlSeller,
                    brand:urlBrands,
                    variation:variationMix,
                }
                this.props.searchProductFetch(data);
            }else{

                const urlParams = new URLSearchParams(window.location.search);
                urlSearchValue = urlParams.get('q');
                const urlVariationArray = this.props.variationSorting;
                const urlMaxPrice = this.props.priceSortingRange.max;
                const urlMinPrice = this.props.priceSortingRange.min;
                const urlSort  = this.props.dataSorting;
                const urlSeller = this.props.sellerSorting;
                const urlBrands = this.props.brandSorting;
                let urlVariation = "";
                let variationMix="";
                urlVariationArray.map(pd=>{
                    urlVariation += "&" + pd.variation + "=";
                    pd.attribute.map(tr=>{
                        urlVariation +=  tr + "+";
                        variationMix += tr +" ";
                    })
                    urlVariation =  urlVariation.substring(0, urlVariation.length - 1)
                })
                variationMix =  variationMix.substring(0, variationMix.length - 1)
                let url = "";
                if(urlVariation!==""){
                    url +=urlVariation
                }
                if(urlMinPrice!==0){
                    url += "&minPrice=" + urlMinPrice
                }
                if(urlMaxPrice!==0){
                    url += "&maxPrice=" + urlMaxPrice
                }
                if(urlSort!==""){
                    url += "&sort=" + urlSort
                }
                if(urlSeller!==""){
                    url += "&seller=" + urlSeller
                }
                if(urlBrands!==""){
                    url += "&brand=" + urlBrands
                }
                let searchUrl = "/products/search?q="+urlSearchValue+url
                Router.push(searchUrl);
                const data = {
                    search:urlSearchValue,
                    maxPrice:urlMaxPrice,
                    minPrice:urlMinPrice,
                    sort:urlSort,
                    seller:urlSeller,
                    brand:urlBrands,
                    variation:variationMix
                }
                this.props.searchProductFetch(data);
            }
            this.props.closeFilterDrawer();
    }
    onClear(){
        if(window.location.href.split( '/' )[4]==="category"){
            let   urlSearchValue =   window.location.href.split( '/' )[5];
                  urlSearchValue = urlSearchValue.split('&')[0];
            const data = {
                category:urlSearchValue,
            }
            let searchUrl = "/product/category/"+urlSearchValue
            Router.push(searchUrl);
            this.props.clearSearchSort();
            this.props.searchProductFetch(data);
        }else if(window.location.href.split( '/' )[4]==="brand") {
            let   urlSearchValue =   window.location.href.split( '/' )[5];
            urlSearchValue = urlSearchValue.split('&')[0];
            let searchUrl = "/product/brand/"+urlSearchValue
            Router.push(searchUrl);
            const data = {
                brands:urlSearchValue,
            }
            this.props.searchProductFetch(data);
        }else{
            const urlParams = new URLSearchParams(window.location.search);
            const search = urlParams.get('q');
            let searchUrl = "/products/search?q="+search
            Router.push(searchUrl)
            this.props.clearSearchSort();
            const data = {
                search:search,
            }
            this.props.searchProductFetch(data);
        }
    }

    render() {
             return (
                 <Fragment>
                     <div className="d-flex justify-content-end mb-4">
                         <Button onClick={this.onClear}  className=" text-right mr-2 filter-btn">Reset Filter <i className="fas fa-sync"/></Button>
                         <Button onClick={this.onHandleUrl}   className=" text-right filter-btn">Apply Filter <i className="fas fa-sort-alt"/></Button>
                     </div>
                 </Fragment>
             );
    }
}


const mapDispatchToProps = {
    clearSearchSort,
    searchProductFetch,
    closeFilterDrawer
};
function mapStateToProps(state) {
    const variationSorting = state.filterReducer.variationSorting;
    const priceSortingRange = state.filterReducer.priceSortingRange;
    const dataSorting = state.filterReducer.dataSorting;
    const sellerSorting = state.filterReducer.sellerSorting;
    const brandSorting = state.filterReducer.brandSorting;
    return {
        variationSorting,
        priceSortingRange,
        dataSorting,
        sellerSorting,
        brandSorting
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ApplyFilterButton);


