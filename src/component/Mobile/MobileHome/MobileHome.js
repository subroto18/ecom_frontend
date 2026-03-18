import React, {PureComponent, Fragment} from 'react';
import {productCategory, productCategoryShow} from "../../../services/actions/categoryAction";
import {connect} from "react-redux";
import NavMobileTop from "../MobileCommon/NavMobileTop";
import MobileSlider from "./MobileSlider";
import MobileOurService from "./MobileOurService";
import NavMobileBottom from "../MobileCommon/NavMobileBottom";
import MobileTodaysDeal from "./MobileTodaysDeal";
import dynamic from "next/dynamic";
import MobileFashSale from "./MobileFashSale";

const MobileNewArrival = dynamic(() => import('./MobileNewArrival'), {
    ssr: false,
})

const OnePartBanner = dynamic(() => import('../../CommonScreen/Banner/OnePartBanner'), {
    ssr: false,
})
const ShopByCategories = dynamic(() => import('./ShopByCategories'), {
    ssr: false,
})
const ShopByBrands = dynamic(
    () => import('./ShopByBrands'), {
    ssr: false,
})
const MobileBestSeller = dynamic(() => import('./MobileBestSeller'), {
    ssr: false,
})
const ThreePartBanner = dynamic(() => import('../../CommonScreen/Banner/ThreePartBanners'), {
    ssr: false,
})
const MobileFeaturedProduct = dynamic(() => import('./MobileFeaturedProduct'), {
    ssr: false,
})
const MobileTrendingProduct = dynamic(() => import('./MobileTrendingProduct'), {
    ssr: false,
})

const MobileTopRated = dynamic(() => import('./MobileTopRated'), {
    ssr: false,
})
const FourPartBanner = dynamic(() => import('../../CommonScreen/Banner/FourPartBanner'), {
    ssr: false,
})

const MobileProductFromCategory = dynamic(() => import('./MobileProductFromCategory'), {
    ssr: false,
})

class MobileHome extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavMobileTop/>
                <MobileSlider/>
                <MobileOurService/>
                {this.props.todaysDeal > 0 &&
                    <MobileTodaysDeal/>
                }
                {this.props.flashdealFeatured > 0 &&
                    <MobileFashSale/>
                }
                {this.props.bannerOne === 1 &&
                    <OnePartBanner/>
                }

                {this.props.topTenCategory === 1 &&
                    <ShopByCategories/>
                }

                {this.props.topTenBrands === 1 &&
                    <ShopByBrands/>
                }

                {this.props.vendor!==0 &&
                    <MobileBestSeller/>
                }

                {this.props.bannerTwo===1 &&
                  <ThreePartBanner/>
                }
                <MobileNewArrival/>

                 {this.props.featured!=="" &&
                    <MobileFeaturedProduct/>
                }

                {this.props.trending!=="" &&
                    <MobileTrendingProduct/>
                 }

                 {this.props.topRated!=="" &&
                      <MobileTopRated/>
                 }

                {this.props.bannerThree===1 &&
                   <FourPartBanner/>
                }

                {this.props.categoryProductLoading ?
                    <Fragment>
                        {this.props.showCategory !== undefined &&
                        <Fragment>
                            {this.props.showCategory.map(pd => {
                                return <MobileProductFromCategory loading={this.props.categoryProductLoading}  product={[]} category={pd.label.replace("————","").replace("——","") }/>
                            })}
                        </Fragment>
                        }
                    </Fragment> :
                    <Fragment>
                        {this.props.categoryProductData.map((pd,index)=>{
                           return <Fragment>
                                {pd.product.length>0 &&
                                     <MobileProductFromCategory key={index} slug={`product/category/`+pd.slug} loading={this.props.categoryProductLoading}  product={pd.product} category={pd.category.replace("————","").replace("——","") }/>
                                }

                            </Fragment>

                        })}
                    </Fragment>
                }
                <NavMobileBottom/>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    productCategory,
    productCategoryShow
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
    const flashdealFeatured = state.starterReducer.flashdealFeatured;
    const topTenCategory = state.starterReducer.topTenCategory;
    const topTenBrands = state.starterReducer.topTenBrands;
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
        topTenCategory,
        topTenBrands
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileHome);


