import React, {PureComponent,Fragment} from 'react';
import {Card} from "react-bootstrap";
import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import Reviews from "../../CommonScreen/Reviews/Reviews";
import {connect} from "react-redux";
import Link from "next/link";
import {onCurrencyFormat} from "../../../services/common";
import Photo from "../../CommonScreen/Image/Photo";
class DealOfTheDay extends PureComponent {
    constructor() {
        super();
        this.state = {
            width:768
        }
    }
    handleScroll = e => {
        let width = window.innerWidth;
        this.setState({
            width:width
        })
    }
    render() {

        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        let settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            vertical:true
        }
        let MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        let preloader =  <Fragment>
            { Array.apply(null, { length: 3 }).map((e, i) => (
                <Card key={i} className="dealCard" border="primary">
                    <Card.Body className="dealCardBody">
                        <div className="d-flex">
                            <div className="dealImg preloadDealImg">
                                <MyLoader/>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))
            }
        </Fragment>

        let data = this.props.hotDealData.map((pd,i)=>{
            return  <div key={i}>
                        <Link href={{pathname:`product/${pd.slug}`}} className="dealLink">
                            <Card className="dealCard" border="primary">
                                <Card.Body className="dealCardBody">
                                    <div className="d-flex">
                                        <div className="dealImg">
                                            <Photo
                                                src={pd.product_image!==null?`${this.props.backendApi}${pd.product_image}`:"/blank.jpg"}
                                                blurDataURL={pd.product_image!==null?`${this.props.backendApi}${pd.product_image}`:"/blank.jpg"}
                                                class=""
                                            />

                                        </div>
                                        <div className="dealPrice">
                                            {symbolFormat===1 ?
                                                <Fragment>
                                                    {pd.discount_price!==undefined  ?
                                                        <Fragment className="dealPriceText">
                                                            <span className="discountPrice">{onCurrencyFormat(pd.discount_price)}{defaultCurrency}</span><br/>
                                                            <span className="regularPrice"><del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del></span>
                                                        </Fragment> :
                                                        <Fragment>
                                                            <span className="regularPrice singlePrice dealP singlePriceText">{onCurrencyFormat(pd.product_price)}{defaultCurrency}</span>
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                                  :
                                                <Fragment>
                                                    {pd.discount_price!==undefined  ?
                                                        <Fragment>
                                                            <span className="discountPrice">{defaultCurrency}{onCurrencyFormat(pd.discount_price)}</span><br/>
                                                            <span className="regularPrice"><del>{defaultCurrency}{onCurrencyFormat(pd.product_price)}</del></span>
                                                        </Fragment> :
                                                        <Fragment>
                                                            <span className="regularPrice singlePrice dealP singlePriceText">{defaultCurrency}{onCurrencyFormat(pd.product_price)}</span>
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                            }
                                            <div className="rating">
                                                <Reviews value={pd.review}/>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
        })

        return (
            <Fragment>
                 <div className="todayDealDiv">
                     <div className="dealTitleDiv">
                         <h1 className="deal-title">Today's <span className="hotDeal">HOT</span> deals</h1>
                     </div>
                     <div className="allDeals">
                         {this.props.hotDealLoading?
                             <Fragment>{preloader}</Fragment>:
                                data.length>3 ?
                                 <Slider horizontal={true} {...settings}>
                                     {data}
                                 </Slider>:
                                    <Fragment>
                                        {data.length>0 &&
                                          <Fragment>
                                              {data}
                                          </Fragment>
                                        }

                                    </Fragment>
                         }
                     </div>
                 </div>
            </Fragment>
        );
    }
}





const mapDispatchToProps = {

};

function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat
    const hotDealData = state.dealReducer.hotDealData;
    const hotDealLoading = state.dealReducer.hotDealLoading;
    const backendApi = state.starterReducer.backendApi
    return {
        defaultCurrency,
        currencySymbolFormat,
        hotDealData,
        hotDealLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DealOfTheDay);
