import React, {PureComponent,Fragment} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import Api from "../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import {connect} from "react-redux";
import {hotDeal} from "../../../services/actions/dealAction";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";
import {onCurrencyFormat} from "../../../services/common";

class ResponsiveDesktopDealOfTheDay extends PureComponent {


    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.hotDealApi!==true){
                Api().get('todaysHotDeal').then(res=>{
                    this.props.hotDeal(res.data);
                })
            }
        }
    }


    render() {

        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        var settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        }
        let MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        let preloader =  <Fragment>
                               <Row>
                                   <Col md={3}>
                                       <Card className="dealCard" border="primary">
                                           <Card.Body className="dealCardBody">
                                               <MyLoader/>
                                           </Card.Body>
                                       </Card>
                                   </Col>
                                   <Col md={3}>
                                       <Card className="dealCard" border="primary">
                                           <Card.Body className="dealCardBody">
                                               <MyLoader/>
                                           </Card.Body>
                                       </Card>
                                   </Col>
                                   <Col md={3}>
                                       <Card className="dealCard" border="primary">
                                           <Card.Body className="dealCardBody">
                                               <MyLoader/>
                                           </Card.Body>
                                       </Card>
                                   </Col>
                                   <Col md={3}>
                                       <Card className="dealCard" border="primary">
                                           <Card.Body className="dealCardBody">
                                               <MyLoader/>
                                           </Card.Body>
                                       </Card>
                                   </Col>
                               </Row>
                        </Fragment>
        let data = this.props.hotDealData.map((pd,i)=>{
            return  <div key={i}>
                <Link href={`product/${pd.slug}`} className="dealLink"  >
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
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        })
        let hotdealData = this.props.hotDealData.map((pd,i)=>{
            return  <Col md={4} key={i}>
                       <Link href={`product/${pd.slug}`} className="dealLink"  >
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
                                                    <span className="discountPrice">{onCurrencyFormat(pd.product_discount_price)}{defaultCurrency}</span><br/>
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
                                                    <span className="discountPrice">{defaultCurrency}{onCurrencyFormat(pd.product_discount_price)}</span><br/>
                                                    <span className="regularPrice"><del>{defaultCurrency}{onCurrencyFormat(pd.product_price)}</del></span>
                                                </Fragment> :
                                                <Fragment>
                                                    <span className="regularPrice singlePrice dealP singlePriceText">{defaultCurrency}{onCurrencyFormat(pd.product_price)}</span>
                                                </Fragment>
                                            }
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        })
        return (
            <Fragment>
                <VisibilitySensor  onChange={this.onVisible}>
                    <div className="todayMobileDealDiv">
                        <div className="div">
                            <Row>
                                <Col>
                                    <div className="dealTitleDiv">
                                        <h2 className="deal-title">Today's <span className="hotDeal">HOT</span> deals</h2>
                                    </div>
                                </Col>
                            </Row>
                            <div className="todayDealSliderDiv">
                                {this.props.hotDealLoading?
                                    <Fragment>{preloader}</Fragment>:
                                    data.length>4 ?
                                        <Slider horizontal={true} {...settings}>
                                            {data}
                                        </Slider>:
                                        <Fragment>
                                            <Row>
                                                {hotdealData}
                                            </Row>
                                        </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </VisibilitySensor>

            </Fragment>
        );
    }
}






const mapDispatchToProps = {
    hotDeal
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

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDesktopDealOfTheDay);




