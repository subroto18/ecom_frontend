import React, {PureComponent, Fragment} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Countdown from "react-countdown";
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import VisibilitySensor from "react-visibility-sensor";
import {flashDeal} from "../../../services/actions/flashdealAction";
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../services/common";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";
import Router from "next/router";
class MobileFashSale extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cartVariationModal: false,
            cartSuccessModel: true,
            countdown: 80000,
            loading: false,
            data: [],
            id: '',
            expire: false
        }
        this.onCompleteTimer = this.onCompleteTimer.bind(this)
    }

    onVisible = (isVisible) => {
        if(this.props.flashApi!==true){
            if(isVisible){
                Api().get('getFlashDeal').then(res=>{
                    if(res.data!==0){
                        if(res.data!==undefined){
                            this.props.flashDeal(res.data);
                        }
                    }
                });
            }

        }
    }

    onCompleteTimer() {
        let id = this.state.id;
        const data = {
            id: id
        }
        Api().post('flashdealTimeut', data).then(res => {
        }).catch(res => {
        })
        this.setState({
            data: [],
            expire: true
        })
    }
    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        let loading = this.props.flashDealLoading;
        let MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100"/>
            </ContentLoader>
        );
        let preloader = <Fragment>
            <Row className="rsadjust">
                {Array.apply(null, {length: 10}).map((e, i) => (
                    <Col className="csadjust flashdeal" sm={3} xs={6}>
                        <Card className="product-card mfdcp">
                            <div className="cardImgDiv  d-flex justify-content-center align-items-center">
                                <MyLoader/>
                            </div>
                            <Card.Text>
                                <div className="mobile-card-price-details mfdcdetails">
                                    {symbolFormat === 1 ?
                                        <Fragment>
                                            <p className="regularPrice mfdp">{onCurrencyFormat(0)}{defaultCurrency} </p>
                                        </Fragment> :
                                        <Fragment>
                                        <span
                                            className="regularPrice mfdp">{defaultCurrency}{onCurrencyFormat(0)} </span>
                                        </Fragment>
                                    }
                                </div>
                            </Card.Text>
                        </Card>
                    </Col>
                ))
                }
            </Row>
        </Fragment>
        let flashSale = this.props.flashDealData.map((pd, i) => {
            return <Col className="csadjust flashdeal" sm={3} xs={6} key={i}>
                <Link href={`product/${pd.slug}`} className="flashSaleLink">
                    <Card className="product-card mfdcp">
                        <div className="cardImgDiv  d-flex justify-content-center align-items-center">
                            <Photo
                                src={`${this.props.backendApi}${pd.product_image}`}
                                blurDataURL="/blank.jpg"
                                class=""
                            />

                            {pd.discount_price !== undefined &&
                                <Fragment>
                                    {pd.discount_type === "flat" ?
                                        <div className="price-off-div">
                                            <p className="mobile-price-off">-{pd.off}%</p>
                                            <div className="arrow-left"/>
                                        </div> :
                                        <div className="price-off-div">
                                            <p className="mobile-price-off">-{pd.off}%</p>
                                            <div className="arrow-left"/>
                                        </div>
                                    }
                                </Fragment>
                            }
                        </div>
                        <Card.Text>
                            <div className="mobile-card-price-details      mobile-card-details mffcdetails">
                                {pd.discount_price !== undefined ?
                                    <Fragment>
                                        {symbolFormat === 1 ?
                                            <Fragment>
                                                <p className="discountPrice singlePrice mfdp">{onCurrencyFormat(pd.discount_price)}{defaultCurrency} </p>
                                                <p className="regularPrice mfdp">
                                                    <del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del>
                                                </p>
                                            </Fragment> :
                                            <Fragment>
                                                <span
                                                    className="discountPrice singlePrice mfdp">{defaultCurrency}{onCurrencyFormat(pd.discount_price)} </span>
                                                <span className="regularPrice mfdp"><del>{defaultCurrency}{onCurrencyFormat(pd.product_price)} </del></span>
                                            </Fragment>
                                        }
                                    </Fragment> :
                                    <Fragment>
                                        {symbolFormat === 1 ?
                                            <Fragment>
                                                <p className="regularPrice singlePrice mfdp">{onCurrencyFormat(pd.product_price)}{defaultCurrency} </p>
                                            </Fragment> :
                                            <Fragment>
                                                <p className="regularPrice singlePrice mfdp">{defaultCurrency}{onCurrencyFormat(pd.product_price)} </p>
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </div>
                        </Card.Text>
                    </Card>
                </Link>
            </Col>
        })
        // Renderer callback with condition
        const renderer = ({days, hours, minutes, seconds, completed}) => {
            if (completed) {
                // Render a completed state
               Router.push("/")
            } else {
                // Render a countdown
                return <div>
                    <span className="days timeBox">{days}</span>
                    <span className="hours timeBox">{hours}</span>
                    <span className="minutes timeBox">{minutes}</span>
                    <span className="seconds timeBox">{seconds}</span>
                </div>;
            }
        };
        let countdown = this.props.flashDealCountdown;
        if (this.state.expire) {
             Router.push("/")
        } else {
            return (
                <Fragment>
                    <VisibilitySensor  onChange={this.onVisible}>
                        <section id="mobile-flash-sale">
                            <Container>
                                <div className="div">
                                    <Row>
                                        <Col className="d-flex justify-content-between mfdt-div">
                                            <div className="TitleDiv d-flex">
                                                <div>
                                                    <span className="productCategory title">Flash Sale</span>
                                                </div>
                                                <div className="countDown">
                                              <span id="clockDiv" className="megaClock">
                                              <Countdown onComplete={this.onCompleteTimer} date={Date.now() + countdown}
                                                         renderer={renderer}/>
                                        </span>
                                                </div>
                                            </div>
                                            <div className="show-more-div">
                                                <Link href={this.props.flashdealFeatured>1 ? `/product/flash-sale-product` :  '/product/flash-sale-product/'+this.props.flashDealSlug} loading={this.props.flashDealLoading} className="btn">Show More</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    {loading ?
                                        <div className="Slider loader mfddiv">
                                            <Fragment>
                                                {preloader}
                                            </Fragment>
                                        </div> :
                                        <div className="Slider mfddiv">
                                            <Row className="rsadjust">
                                                {flashSale}
                                            </Row>
                                        </div>
                                    }
                                </div>
                            </Container>
                        </section>
                    </VisibilitySensor>
                </Fragment>
            );
        }
    }
}


const mapDispatchToProps = {
    flashDeal
};

function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    const flashApi = state.flashdealReducer.flashApi;
    const flashDealCountdown = state.flashdealReducer.flashDealCountdown;
    const flashdealFeatured = state.starterReducer.flashdealFeatured;
    const flashDealSlug = state.flashdealReducer.flashDealSlug;
    const flashDealLoading = state.flashdealReducer.flashDealLoading;
    const flashDealData = state.flashdealReducer.flashDealData;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat
    return {
        backendApi,
        flashApi,
        flashDealCountdown,
        flashdealFeatured,
        flashDealSlug,
        flashDealLoading,
        flashDealData,
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileFashSale);
