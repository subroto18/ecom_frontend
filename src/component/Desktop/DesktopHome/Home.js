import React, {PureComponent, Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import {productCategory, productCategoryShow} from "../../../services/actions/categoryAction"
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import dynamic from 'next/dynamic'
import TopNavWithDeal from "./TopNavWithDeal";
import TopNavWithOutDeal from "./TopNavWithOutDeal";
import FlashSale from "./FlashSale";

const PopupLogin = dynamic(() => import('../Profile/PopupLogin'), {
    ssr: false,
})
const DesktopFooterPart = dynamic(() => import('../Common/DesktopFooterPart'), {
    ssr: false,
})
const NewArrival = dynamic(() => import('./NewArrival'), {
    ssr: false,
})
const ThreePartBanner = dynamic(() => import('../../CommonScreen/Banner/ThreePartBanners'), {
    ssr: false,
})
const FeaturedTopRatedTrending = dynamic(() => import('./FeaturedTopRatedTrending/FeaturedTopRated&Trending'), {
    ssr: false,
})
const VerticalFeaturedProduct = dynamic(() => import('./FeaturedTopRatedTrending/VerticalFeaturedProduct'), {
    ssr: false,
})
const VerticalTrendingProduct = dynamic(() => import('./FeaturedTopRatedTrending/VerticalTrendingProduct'), {
    ssr: false,
})
const VerticalTopRatedProduct = dynamic(() => import('./FeaturedTopRatedTrending/VerticalTopRatedProduct'), {
    ssr: false,
})
const OnePartBanner = dynamic(() => import('../../CommonScreen/Banner/OnePartBanner'), {
    ssr: false,
})
const ProductFromCategoryLoader = dynamic(() => import('./ProductFromCategoryLoader'), {
    ssr: false,
})
const ProductFromCategory = dynamic(() => import('./ProductFromCategory'), {
    ssr: false,
})
const FourPartBanner = dynamic(() => import('../../CommonScreen/Banner/FourPartBanner'), {
    ssr: false,
})
const TopTen = dynamic(() => import('./TopTenCategoryBrand/TopTen'), {
    ssr: false,
})
const BestSeller = dynamic(() => import('./BestSeller'), {
    ssr: false,
})

class Home extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: true,
            compareProductId: "",
            bestSellerLading: true,
            bestSeller: [],
            scrollY: 0,
            scrolling: false
        }
    }

    componentDidMount() {

        if (this.props.categoryApi !== true) {
            Api().get('showCategories').then(res => {
                this.props.productCategoryShow(res.data);
            })
        }

    }

    render() {

        return (
            <Fragment>
                <DesktopHeaderPart/>
                {this.props.todaysDeal > 0 ?
                    <TopNavWithDeal/> :
                    <TopNavWithOutDeal/>
                }
                <Fragment>
                    {this.props.flashdealFeatured > 0 &&
                        <FlashSale/>
                    }

                    <NewArrival/>

                    {parseInt(this.props.bannerTwo) === 1 &&
                        <ThreePartBanner/>
                    }

                    {parseInt(this.props.featuredTrendingTopRated) === 3 ?

                        <Fragment>
                            <FeaturedTopRatedTrending/>
                        </Fragment>
                        :
                        <Fragment>
                            {this.props.featured !== "" &&
                                <VerticalFeaturedProduct/>
                            }
                            {this.props.trending !== "" &&
                                <VerticalTrendingProduct/>
                            }
                            {this.props.topRated !== "" &&
                                <VerticalTopRatedProduct/>
                            }
                        </Fragment>
                    }

                    {parseInt(this.props.bannerOne) === 1 &&
                        <OnePartBanner/>
                    }
                    {this.props.categoryProductLoading ?
                        <Fragment>
                            {this.props.showCategory !== undefined &&
                                <Fragment>
                                    {this.props.showCategory.map(pd => {
                                        return <ProductFromCategoryLoader
                                            category={pd.label.replace("————", "").replace("——", "")}/>
                                    })}
                                </Fragment>
                            }
                        </Fragment> :
                        <Fragment>
                            {this.props.categoryProductData.map((pd, index) => {
                                if (pd.product.length > 0) {
                                    return <ProductFromCategory key={index} slug={`product/category/` + pd.slug}
                                                                product={pd.product}
                                                                category={pd.category.replace("————", "").replace("——", "")}/>
                                }
                            })}
                        </Fragment>
                    }
                    {parseInt(this.props.bannerThree) === 1 &&
                        <FourPartBanner/>
                    }
                    <TopTen/>
                    {this.props.vendor !== 0 &&
                        <BestSeller/>
                    }


                </Fragment>
                <PopupLogin/>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    productCategory,
    productCategoryShow,
};


function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const todaysDeal = state.starterReducer.todaysDeal;
    const bannerOne = state.starterReducer.bannerOne;
    const bannerTwo = state.starterReducer.bannerTwo;
    const bannerThree = state.starterReducer.bannerThree;
    const featuredTrendingTopRated = state.starterReducer.featuredTrendingTopRated;
    const featured = state.starterReducer.featured;
    const topRated = state.starterReducer.topRated;
    const trending = state.starterReducer.trending
    const vendor = state.userReducer.vendor;
    const categoryApi = state.categoryReducer.categoryApi;
    const categoryProductLoading = state.categoryReducer.categoryProductLoading;
    const showCategory = state.categoryReducer.showCategory;
    const categoryProductData = state.categoryReducer.categoryProductData;
    const flashdealFeatured = state.starterReducer.flashdealFeatured
    return {
        isAuthorized,
        todaysDeal,
        bannerOne,
        bannerTwo,
        bannerThree,
        featuredTrendingTopRated,
        featured,
        topRated,
        trending,
        vendor,
        categoryApi,
        categoryProductLoading,
        showCategory,
        categoryProductData,
        flashdealFeatured,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


