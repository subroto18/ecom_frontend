import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import VisibilitySensor from "react-visibility-sensor";
import {connect} from "react-redux";
import {hotDeal} from "../../../services/actions/dealAction"
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";
import {onCurrencyFormat} from "../../../services/common";

class MobileTodaysDeal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 768
        }
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {

        let width = window.innerWidth;
        this.setState({
            width: width
        })
    }


    onVisible = (isVisible) => {
        if (isVisible) {
            if (this.props.hotDealApi !== true) {
                Api().get('todaysHotDeal').then(res => {
                    this.props.hotDeal(res.data);
                })
            }
        }
    }

    handleScroll = () => {
        let width = window.innerWidth;
        this.setState({
            width: width
        })
    }

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        window.addEventListener('resize', this.handleScroll);
        let MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100"/>
            </ContentLoader>
        );
        let preloader3 = <Fragment>
            <Row className="mobileTodaysDealRow">
                {Array.apply(null, {length: 3}).map((e, i) => (
                    <Col key={i} sm={3} xs={4} className="mtdc">
                        <Card className="product-card todayDealCard">
                            <div className="cardImgDiv  d-flex justify-content-center align-items-center ">
                                <MyLoader/>
                            </div>
                        </Card>
                    </Col>
                ))
                }
            </Row>
        </Fragment>
        let preloader4 = <Fragment>
            <Row className="mobileTodaysDealRow">
                {Array.apply(null, {length: 4}).map((e, i) => (
                    <Col key={i} xs={3} sm={3} className="mtdc">
                        <Card className="product-card todayDealCard">
                            <div className="cardImgDiv  d-flex justify-content-center align-items-center ">
                                <MyLoader/>
                            </div>
                        </Card>
                    </Col>
                ))
                }
            </Row>
        </Fragment>
        let hotDealData = this.props.hotDealData.map((pd, i) => {
            return <Col xs={4} sm={4} key={i} className="mtdc">
                <Link href={`product/${pd.slug}`} className="dealLink">
                    <Card className="product-card todayDealCard">
                        <div className="mtdc-div">
                            <Photo
                                src={pd.product_image !== null ? `${this.props.backendApi}${pd.product_image}` : "/blank.jpg"}
                                blurDataURL={pd.product_image !== null ? `${this.props.backendApi}${pd.product_image}` : "/blank.jpg"}
                                class=""
                                className="empty"

                            />

                            {pd.product_discount !== undefined &&
                                <div className="priceOffDiv">
                                    <p className="offPrice">-{pd.off}%</p>
                                </div>
                            }
                        </div>
                        <div className="mtdpopacity">
                            <div className="mobile-todaysdeal-price-details">
                                {pd.discount_price !== undefined ?
                                    <Fragment>
                                        {symbolFormat === 1 ?
                                            <Fragment>
                                                <span
                                                    className="discountPrice mtdp">{onCurrencyFormat(pd.discount_price)}{defaultCurrency} </span>
                                                <span className="regularPrice mtrp">
                                                <del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del>
                                            </span>
                                            </Fragment> :
                                            <Fragment>
                                                <span
                                                    className="discountPrice mtdp">{defaultCurrency}{onCurrencyFormat(pd.discount_price)} </span>
                                                <span className="regularPrice mtrp">
                                                <del>{defaultCurrency}{onCurrencyFormat(pd.product_price)} </del>
                                            </span>
                                            </Fragment>
                                        }
                                    </Fragment> :
                                    <Fragment>
                                        {symbolFormat === 1 ?
                                            <Fragment>
                                                <span
                                                    className="regularPrice  mtrp">{onCurrencyFormat(pd.product_price)}{defaultCurrency} </span>
                                            </Fragment> :
                                            <Fragment>
                                                <span
                                                    className="regularPrice mtrp">{defaultCurrency}{onCurrencyFormat(pd.product_price)} </span>
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </Card>
                </Link>
            </Col>
        })
        return (
            <Fragment>
                <VisibilitySensor onChange={this.onVisible}>
                    <section id="todays-deal-mobile">
                        <Container>
                            <div className="div">
                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv mtdptitle">
                                        <span className="productCategory title">Today's <span
                                            className="hotDeal">HOT</span> deal</span>
                                        </div>
                                    </Col>
                                </Row>
                                {this.props.hotDealLoading ?
                                    <Fragment>
                                        <div className="Slider">
                                            {this.state.width > 575 ?
                                                <Fragment>{preloader4}</Fragment> :
                                                <Fragment>{preloader3}</Fragment>
                                            }
                                        </div>
                                    </Fragment>
                                    :
                                    <div className="mobile-hot-deal">
                                        <div className="row mtdrow">
                                            {hotDealData}
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileTodaysDeal);
