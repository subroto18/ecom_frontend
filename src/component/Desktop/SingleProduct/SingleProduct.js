import React, {PureComponent, Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ContentLoader from "react-content-loader";
import PopupLogin from "../Profile/PopupLogin";
import dynamic from "next/dynamic"
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../services/common";
import Link from "next/link";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import SingleProductCard from "../../CommonScreen/ProductCardDetails/SingleProductCard";
import Router from "next/router";
const CustomerReview = dynamic(() => import("./CustomerReview"));
const ProductSpecifications = dynamic(() => import("./ProductSpecifications"));
const RelatedProduct = dynamic(() => import("./RelatedProduct"));
const ProductVideo = dynamic(() => import("./ProductVideo"));
class SingleProduct extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [], loading: true, width: 768
        }
    }

    componentDidMount() {
        window.scroll(0, 0)
        let width = window.innerWidth;
        this.setState({
            width: width
        })
    }

    handleScroll = e => {
        let width = window.innerWidth;
        this.setState({
            width: width
        })
    }

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        const MyLoader = () => (<ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="300" height="300"/>
            </ContentLoader>);

        const singleProductCardLoader = (<Fragment>
                <section id="singleProductCard">
                    <Container>
                        <div className="singleProductCard">
                            <Row>
                                <Col xl={6} lg={6} className="singleBigProductImg">
                                    <div
                                        className="singleProductImgDiv d-flex justify-content-center d-flex justify-content-center ">
                                        <div className="mainImgDiv  loader">
                                            <MyLoader/>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6}>
                                    <div className="singleProductCardDetails">
                                        <h2 className="singleProductCardTitle mt-4">

                                        </h2>
                                        <Fragment>
                                            <div className="rating text-left">
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <span className="off">(0 reviews)</span>
                                            </div>
                                        </Fragment>
                                        <div className="sellerNameDiv">
                                        </div>
                                        <div className="regularPriceDiv">
                                            {symbolFormat === 1 ?
                                                <p className="text-left disabled"><span>Price : </span> <span
                                                    className="regularPrice singlePrice ml-2 mr-2">{onCurrencyFormat(0)}{defaultCurrency} </span><span
                                                    className="text-danger"><del>{onCurrencyFormat(0)}{defaultCurrency}</del></span>
                                                </p> : <p className="text-left disabled"><span>Price : </span> <span
                                                    className="regularPrice singlePrice ml-2 mr-2">{defaultCurrency}{onCurrencyFormat(0)} </span><span
                                                    className="text-danger"><del>{defaultCurrency}{onCurrencyFormat(0)}</del></span>
                                                </p>}
                                        </div>
                                        <Fragment>
                                            <div className="quantityDiv">
                                                <Button disabled className="btnMinus">-</Button>
                                                <span className="quantity disabled">1</span>
                                                <Button disabled className="btnPlus">+</Button>
                                            </div>
                                        </Fragment>
                                        <div className="availableProduct text-left">
                                            <span className="availableProductTitle "> 1 available in stock </span>
                                        </div>
                                        <div className="totalPriceDiv text-left">
                                            {symbolFormat === 1 ?
                                                <p><span className="disabled">Total Price : </span><span
                                                    className="regularPrice disabled">{onCurrencyFormat(0)}{defaultCurrency} </span>
                                                </p> : <p><span className="disabled">Total Price : </span><span
                                                    className="regularPrice disabled">{defaultCurrency}{onCurrencyFormat(0)}</span>
                                                </p>}
                                        </div>
                                        <div className="addCardProduct text-left disabled">
                                            <Button disabled={false} className="btn mr-3">Buy now<i
                                                className="fas fa-shopping-cart ml-2"/></Button>
                                            <Button disabled={false} className="btn mr-3">Add to Card <i
                                                className="fas fa-shopping-cart ml-2"/></Button>
                                        </div>
                                        <div className="compareProduct">
                                            <Link href="/" className="mr-3 wishList disabled">Add to wishList <i
                                                className="far fa-heart ml-1"/> </Link>
                                            <Link href="/" className="Compare disabled">Add to Compare <i
                                                className="far fa-sync-alt ml-1 "/> </Link>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>
                <section id="productDes">
                    <Container>
                        <div className="singleProductCardDes">
                            <Row>
                                <Col xl={8} lg={8}>
                                    <div className="productDes loader">
                                        <Tabs defaultActiveKey="Description" id="uncontrolled-tab-example">
                                            <Tab eventKey="Description" title="Description">
                                                <div className="loaderTab">
                                                    <MyLoader/>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="Video" title="Video">
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4}>
                                    <div className="productReviewRow w-100">
                                        <div className="productReview">
                                            <span className="productReviewTitle">Customer Reviews</span>
                                            <Col lg={12} xl={12} className="mb-3">
                                                <div className="totalReview">
                                                    <div className="d-flex justify-content-between align-items-end">
                                                        <h2 className="big-view"> 0.0<span>/5.0</span></h2>
                                                        <p className="text-view"> 0<span> ratings </span></p>
                                                    </div>
                                                    <div className="big-star">
                                                        <span className="icon disabled">
                                                            <i className="fas fa-star star"/>
                                                            <i className="fas fa-star star"/>
                                                            <i className="fas fa-star star"/>
                                                            <i className="fas fa-star star"/>
                                                            <i className="fas fa-star star"/>
                                                        </span>
                                                    </div>

                                                    <div className="progressReview disabled">
                                                        { Array.apply(null, { length: 5 }).map((e, i) => (
                                                            <div key={i} className="fiveStar disabled">
                                                                 <span className="star disabled">
                                                                    <i className="fas fa-star text-muted starMark"/>
                                                                    <i className="fas fa-star text-muted  starMark"/>
                                                                    <i className="fas fa-star text-muted  starMark"/>
                                                                    <i className="fas fa-star text-muted  starMark"/>
                                                                    <i className="fas fa-star text-muted  starMark"/>
                                                                </span>
                                                            </div>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                                <nav className="paginationReview" aria-label="Page navigation example">
                                                    <ul className="pagination disabled">
                                                        <li className="page-item"><Link href="/"
                                                                                        className="page-link">Previous</Link>
                                                        </li>
                                                        <li className="page-item active"><Link href="/"
                                                                                               className="page-link">1</Link>
                                                        </li>
                                                        <li className="page-item "><Link href="/"
                                                                                         className="page-link">2</Link>
                                                        </li>
                                                        <li className="page-item"><Link href="/"
                                                                                        className="page-link">3</Link>
                                                        </li>
                                                        <li className="page-item"><Link href="/"
                                                                                        className="page-link">Next</Link>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </Col>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>
            </Fragment>);

            if (this.props.singleProductLoadingStatus) {
                return <Fragment>
                    <DesktopHeaderPart/>
                    <Fragment>{singleProductCardLoader}</Fragment>
                    <DesktopFooterPart/>
                </Fragment>
            } else {
                if (this.props.singleProductData.length == 0) {
                    Router.push("/")
                } else {
                    return (<Fragment>
                            <DesktopHeaderPart/>
                            <Fragment>
                                <section id="singleProductCard">
                                    <Container>
                                        <div className="singleProductCard">
                                            <SingleProductCard url={this.props.link}
                                                               loading={this.props.singleProductLoadingStatus}
                                                               data={this.props.singleProductData} singlePage={true}/>
                                        </div>
                                    </Container>
                                </section>
                                <section id="productDes">
                                    <Container>
                                        <div className="singleProductCardDes">
                                            <Row>
                                                <Col xl={8} lg={8}>
                                                    <div className="productDes">
                                                        <Tabs defaultActiveKey="Description"
                                                              id="uncontrolled-tab-example">
                                                            <Tab eventKey="Description" title="Description">
                                                                <ProductSpecifications
                                                                    descriptionValue={this.props.singleProductData.length > 0 && this.props.singleProductData[0].description}/>
                                                            </Tab>
                                                            <Tab eventKey="Video" title="Video">
                                                                <ProductVideo
                                                                    vedio={(this.props.singleProductData.length > 0 && this.props.singleProductData !== undefined) && this.props.singleProductData[0].video_link}/>
                                                            </Tab>
                                                        </Tabs>
                                                    </div>
                                                </Col>
                                                <Col xl={4} lg={4}>
                                                    <CustomerReview
                                                        rating={(this.props.singleProductData.length > 0 && this.props.singleProductData !== undefined) && this.props.singleProductData[0].allRating}
                                                        totalReview={(this.props.singleProductData.length > 0 && this.props.singleProductData !== undefined) && this.props.singleProductData[0].review}/>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Container>
                                </section>
                                <PopupLogin/>
                            </Fragment>
                            <section id="relatedProduct">
                                <RelatedProduct/>
                            </section>
                            <DesktopFooterPart/>
                        </Fragment>);
                }
            }

    }
}


function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const symbolFormat = state.starterReducer.symbolFormat;
    const backendApi = state.starterReducer.backendApi;
    const singleProductLoadingStatus = state.productReducer.singleProductLoadingStatus;
    const singleProductData = state.productReducer.singleProductData;

    return {
        defaultCurrency, symbolFormat, backendApi, singleProductLoadingStatus, singleProductData
    };
}


export default connect(mapStateToProps)(SingleProduct);