import React, {PureComponent, Fragment} from 'react';
import Link from 'next/link';
import Button from "react-bootstrap/Button";
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import {DebounceInput} from "react-debounce-input";
import Router from 'next/router';

import {onCurrencyFormat} from "../../../services/common";
import {productSearch} from "../../../services/actions/filterAction";
import {getSingleProduct} from "../../../services/actions/productAction";
import Photo from "../../CommonScreen/Image/Photo";


class Search extends PureComponent {
    constructor() {
        super();
        this.state = {
            searchData: "",
            browserSearchData: [],
            displayHistory: false,
            productSearchData: [],
            popularSearchData: [],
            loading: true,
            bubbleLoading: false,
            displaySearch: false
        }

        this.onSearchContext = this.onSearchContext.bind(this)
        this.onResult = this.onResult.bind(this)
        this.onHistory = this.onHistory.bind(this)
        this.onHistorySearch = this.onHistorySearch.bind(this)
        this.onHistoryBlur = this.onHistoryBlur.bind(this)
        this.onPopularSearch = this.onPopularSearch.bind(this)
        this.onClickLink = this.onClickLink.bind(this)
        this.onHistoryHide = this.onHistoryHide.bind(this)
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (event.target.id == "logo") {
            let clear = {
                data: "clear"
            }
        }
        let search = event.target.getAttribute("search-data")
        if (search != "s") {
            this.setState({
                displayHistory: false
            })
        }
    }

    onSearchContext(e) {
        this.setState({
            displayHistory: false,
        })
        let getData = localStorage.getItem('search');
        this.setState({
            searchData: e.target.value
        })
        if (getData !== null && getData !== "") {
            let browserSearchData = [];
            let data = getData.split(",");
            if (data.length === 6) {
                data.pop();
            }
            if (data.indexOf(getData) === -1) {
                browserSearchData.push(getData);
                this.setState({
                    browserSearchData: data
                })
            } else {
                this.setState({
                    browserSearchData: data
                })
            }
        }
        if (e.target.value !== "") {
            const data = {
                searchData: e.target.value
            }
            this.setState({
                bubbleLoading: true
            })
            Api().post('search', data).then(res => {
                this.setState({
                    productSearchData: res.data.searchProduct,
                    popularSearchData: res.data.popularSearch,
                    loading: false,
                    bubbleLoading: false,
                    displaySearch: true
                })
            }).catch(error => {
            })
        } else {
            this.setState({
                productSearchData: [],
                popularSearchData: [],
                loading: true
            })
        }
    }

    onHistory() {
        if (this.state.searchData != "") {
            this.setState({
                displayHistory: false
            })
        } else {
            this.setState({
                displayHistory: this.state.displayHistory === true ? false : true
            })
        }
        let getData = localStorage.getItem('search');
        if (getData != null && getData != "") {
            let browserSearchData = [];
            let data = getData.split(",");
            browserSearchData.push(getData);
            this.setState({
                browserSearchData: data
            })
            this.setState({
                displaySearch: true
            })
        }
    }

    onResult() {
        if (this.state.searchData !== "") {
            let searchData = this.state.searchData;
            let browserSearchData = this.state.browserSearchData;
            if (browserSearchData.indexOf(searchData) === -1) {
                browserSearchData.push(this.state.searchData);
                browserSearchData.reverse();
                localStorage.setItem('search', browserSearchData)
            }
            let data = {
                search: searchData,
                pageLoad: false,
            }

            this.props.productSearch(data);
            this.setState({
                displaySearch: false,
            })


            Router.push({
                pathname: '/products/search',
                query: `q=${this.state.searchData}`
            })

        }
    }

    onHistoryHide() {
        this.setState({
            displayHistory: false
        })
    }

    onHistoryBlur() {
        this.setState({
            displayHistory: false
        })
    }

    onDelete(e) {
        let getData = localStorage.getItem('search');
        let data = getData.split(",");
        let index = data.indexOf(e);
        data.splice(index, 1);
        localStorage.setItem('search', data)
        this.setState({
            browserSearchData: data
        })
    }

    onClickLink(slug) {
        this.props.getSingleProduct(slug);
        this.setState({
            display: false,
            searchData: "",
        })
    }

    onHistorySearch(slug) {
        this.setState({
            displaySearch: false
        })

        Router.push({
            pathname: '/products/search',
            query: `q=${slug}`
        })

        this.setState({
            displayHistory: false,
            searchData: slug,
        })
        let data = {
            search: slug,
            pageLoad: false
        }

        this.props.productSearch(data);
    }

    onPopularSearch(slug) {
        window.scroll(0, 0)
        this.setState({
            displaySearch: false
        })

        Router.push({
            pathname: '/products/search',
            query: `q=${slug}`
        })

        this.setState({
            displayHistory: false,
            searchData: slug,
        })
        let data = {
            search: slug,
            pageLoad: false
        }

        this.props.productSearch(data);
    }

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat


        let loader = <Fragment>
                          <div className="float-left">
                              <span className="spinner-grow spinner-grow-sm ml-2" role="status" aria-hidden="true"/>
                              <span className="spinner-grow spinner-grow-sm ml-2" role="status" aria-hidden="true"/>
                              <span className="spinner-grow spinner-grow-sm ml-2" role="status" aria-hidden="true"/>
                          </div>
                    </Fragment>

        return (
            <Fragment ref={this.wrapperRef}>
                <div className="searchDiv">
                    <div className="d-flex searchArea">
                        <DebounceInput
                            id="search" value={this.state.searchData}
                            onClick={this.onHistory}
                            onChange={(e) => this.onSearchContext(e)}
                            className="form-control searchInput" type="text" placeholder="I am looking for..."
                            minLength={1}
                            debounceTimeout={300}
                        />
                        <Button onClick={this.onResult} className="searchBtn" type="submit"><i
                            className="far fa-search"/></Button>
                    </div>
                    {this.state.displayHistory &&
                        <div className="searchBox">
                            {this.state.browserSearchData.length > 0 &&
                                <div id="search-history-div" className="search-history-div">
                                    <p className="search-title-div">Your history</p>
                                    <ul className="navbar-nav">
                                        {this.state.browserSearchData.map((pd, i) => {
                                            return <Fragment>
                                                <div className="searchBtn searchHistory d-flex">
                                                    <Button search-data="s" id="searchBtn" key={i}
                                                            onClick={() => this.onHistorySearch(pd)}
                                                            className="search-bar-link text-muted d-flex justify-content-between btn searchBTN"><span
                                                        search-data="s">{pd}</span></Button>
                                                    <Button search-data="s" id="searchDelBtn"
                                                            className="search-bar-link text-muted d-flex justify-content-between btn search-del searchBTN"><span
                                                        search-data="s" className="S"><i search-data="s"
                                                                                         onClick={() => this.onDelete(pd)}
                                                                                         className="fas fa-trash S"/></span></Button>
                                                </div>
                                            </Fragment>
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    }
                    <Fragment>
                        {this.state.displaySearch &&
                            <Fragment>
                                {this.state.searchData !== "" &&
                                    <Fragment>
                                        {this.state.loading ?
                                            <Fragment>
                                                <div className="searchBox">
                                                    <div className="search-history-div">
                                                        <p className="search-title-div">Search product</p>
                                                        <div className="card-body desktop-cwc-body py-5">
                                                            <div className="loader-spinner">
                                                                <div className="spinner-border text-muted"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                            :
                                            <div className="searchBox">
                                                <Fragment>
                                                    <Fragment>
                                                        {this.state.popularSearchData.length > 0 &&
                                                            <Fragment>
                                                                <div className="popular-search-div">
                                                                    <p className="search-title-div"> {this.state.bubbleLoading && loader} Popular search</p>
                                                                    <ul className="navbar-nav">
                                                                        <Fragment>
                                                                            {this.state.popularSearchData.map((pd, i) => {
                                                                                return <Button key={i}
                                                                                               onClick={() => this.onPopularSearch(pd)}
                                                                                               className="search-bar-link text-muted d-flex justify-content-between"><span>{pd}</span>
                                                                                </Button>
                                                                            })}
                                                                        </Fragment>
                                                                    </ul>
                                                                </div>
                                                            </Fragment>
                                                        }
                                                    </Fragment>
                                                    <Fragment>
                                                        <Fragment>
                                                            {this.state.productSearchData.length > 0 ?
                                                                <div key={1} className="search-product-div">
                                                                    <p className="search-title-div"> {(this.state.popularSearchData.length == 0 && this.state.bubbleLoading) &&
                                                                        <div className="searchBox">
                                                                            <div className="search-history-div">
                                                                                <p className="search-title-div">Search
                                                                                    product</p>
                                                                                <div
                                                                                    className="card-body desktop-cwc-body py-5">
                                                                                    <div className="loader-spinner">
                                                                                        <div
                                                                                            className="spinner-border text-muted"/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>} Product</p>
                                                                    <ul className="navbar-nav">
                                                                        <Fragment>
                                                                            {this.state.productSearchData.map((pd, i) => {
                                                                                if (pd.discount_price !== undefined) {
                                                                                    return <Link key={i}
                                                                                                 href={{pathname: "/product/" + pd.slug}}
                                                                                                 from=""
                                                                                                 onClick={() => this.onClickLink(pd.slug)}
                                                                                                 className="search-bar-link text-muted">
                                                                                        <div className="d-flex">
                                                                                            <div className="search-img">

                                                                                                <Photo
                                                                                                    src={`${this.props.backendApi}` + pd.product_image}
                                                                                                    blurDataURL="/blank.jpg"
                                                                                                    class="cardImg img-fluid searchBoxImg"
                                                                                                />

                                                                                            </div>
                                                                                            <div>
                                                                                                <p className="cart-content-title searchTextTitle">{pd.title}</p>
                                                                                                <p className="cart-content-price">
                                                                                                    <span
                                                                                                        className="discountPrice">
                                                                                                        {
                                                                                                            currencySymbolFormat === 1 ?
                                                                                                                <span>{onCurrencyFormat(pd.discount_price)}{defaultCurrency}</span> :
                                                                                                                <span>{defaultCurrency}{onCurrencyFormat(pd.discount_price)}</span>
                                                                                                        }
                                                                                                    </span>
                                                                                                    <span
                                                                                                        className="regularPrice ml-3 mr-3"><del>
                                                                                                         {currencySymbolFormat === 1 ?
                                                                                                             <span>{onCurrencyFormat(pd.price)}{defaultCurrency}</span> :
                                                                                                             <span>{defaultCurrency}{onCurrencyFormat(pd.price)}</span>
                                                                                                         }
                                                                                                    </del></span>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Link>
                                                                                } else {
                                                                                    return <Link
                                                                                        onClick={() => this.onClickLink(pd.slug)}
                                                                                        href={{pathname: "/product/" + pd.slug}}
                                                                                        className="search-bar-link text-muted">
                                                                                        <div className="d-flex">
                                                                                            <div className="search-img">

                                                                                                <Photo
                                                                                                    src={`${this.props.backendApi}` + pd.product_image}
                                                                                                    blurDataURL="/blank.jpg"
                                                                                                    class="cardImg img-fluid searchBoxImg"
                                                                                                />

                                                                                            </div>
                                                                                            <div>
                                                                                                <p className="cart-content-title searchTextTitle">{pd.title}</p>
                                                                                                <p className="cart-content-price">
                                                                                                    <span
                                                                                                        className="regularPrice singlePrice searchTextPrice searchResultTextPrice ml-3 mr-3">
                                                                                                        {currencySymbolFormat === 1 ?
                                                                                                            <span>{onCurrencyFormat(pd.price)}{defaultCurrency}</span> :
                                                                                                            <span>{defaultCurrency}{onCurrencyFormat(pd.price)}</span>
                                                                                                        }
                                                                                                    </span>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Link>
                                                                                }
                                                                            })}
                                                                        </Fragment>
                                                                    </ul>
                                                                </div> :
                                                                <div key={2} className="search-product-div">
                                                                    <p className="search-title-div">Product</p>
                                                                    <ul className="navbar-nav">
                                                                        <div className="searchDivEmpty">
                                                                            <p className="text-muted text-center py-5">No
                                                                                product found</p>
                                                                        </div>
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </Fragment>
                                                    </Fragment>
                                                </Fragment>
                                            </div>
                                        }
                                    </Fragment>
                                }
                            </Fragment>
                        }
                    </Fragment>
                </div>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    productSearch,
    getSingleProduct
};

function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat
    const backendApi = state.starterReducer.backendApi;
    const siteColor = state.starterReducer.siteColor

    return {
        defaultCurrency,
        currencySymbolFormat,
        backendApi,
        siteColor
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);


