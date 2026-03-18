import React, {PureComponent, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Slider from "react-slick";
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import Reviews from "../../CommonScreen/Reviews/Reviews";
import VisibilitySensor from "react-visibility-sensor";
import {bestSeller} from "../../../services/actions/sellerAction";
import {connect} from "react-redux";
import Photo from "../../CommonScreen/Image/Photo";
import Link from "next/link";

class MobileBestSeller extends PureComponent {
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
            if (this.props.sellerApi !== true) {
                Api().get('getBestSeller').then(res => {
                    this.props.bestSeller(res.data);
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
        let data = this.props.seller;
        let loading = this.props.sellerLoading;
        const settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        initialSlide: 3
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                }
            ]
        };
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
            </ContentLoader>
        );

        const placeholder = (
            <Row className="rsadjust">
                {Array.apply(null, {length: 2}).map((e, i) => (
                    <Col key={i} sm={4} xs={6} className="csadjust">
                        <div className="our-shop loader m">
                            <Card className="product-card mbsellerdiv">
                                <div
                                    className="cardImgDiv mobile-shop  d-flex justify-content-center align-items-center">
                                    <MyLoader/>
                                </div>
                                <Card.Body>
                                    <Card.Text>
                                        <div className="rating loading">
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                                <div className="shopBtnDiv">
                                    <Button disabled to="/seller-shop" className="btn shopBtn">Shop details</Button>
                                </div>
                            </Card>
                        </div>
                    </Col>
                ))
                }
            </Row>
        );

        const placeholder2 = (
            <Row className="rsadjust">
                {Array.apply(null, {length: 4}).map((e, i) => (
                    <Col key={i} sm={4} xs={6} className="csadjust">
                        <div className="our-shop loader">
                            <Card className="product-card mbsellerdiv">
                                <div
                                    className="cardImgDiv mobile-shop  d-flex justify-content-center align-items-center">
                                    <MyLoader/>
                                </div>
                                <Card.Body>
                                    <Card.Text>
                                        <div className="rating loading">
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                                <div className="shopBtnDiv">
                                    <Button disabled to="/seller-shop" className="btn shopBtn">Shop details</Button>
                                </div>
                            </Card>
                        </div>
                    </Col>
                ))
                }

            </Row>
        );

        let shop = data.map((pd, i) => {
            return <Col key={i} sm={4} xs={6} className="csadjust">
                <div className="our-shop loader">
                    <Card className="product-card mbsellerdiv">
                        {pd.avatar != null ?
                            <Photo
                                src={`${this.props.backendApi}${pd.avatar}`}
                                blurDataURL="/blank.jpg"
                                class=""
                                className="empty"
                            />
                            :
                            <Photo
                                src="/blank.jpg"
                                blurDataURL="/blank.jpg"
                                class=""
                                className="empty"
                            />
                        }
                        <Card.Body>
                            <Card.Title><span className="ShopName">{pd.name}</span></Card.Title>
                            <Fragment>
                                <Reviews value={pd.rating}/>
                            </Fragment>
                        </Card.Body>
                        <div className="shopBtnDiv">
                            <Link href={`shop/` + pd.slug} className="btn shopBtn">Shop details</Link>
                        </div>
                    </Card>
                </div>
            </Col>
        })
        let allShop = data.map((pd, i) => {
            return <div key={i} className="csadjust">
                <div className="our-shop loader">
                    <Card className="product-card mbsellerdiv">
                        <div className="mobile-best-seller-img-div">
                            {pd.avatar != null ?

                                <Photo
                                    src={`${this.props.backendApi}${pd.avatar}`}
                                    blurDataURL="/blank.jpg"
                                    class=""
                                    className="empty"
                                />

                                :
                                <Photo
                                    src="/blank.jpg"
                                    blurDataURL="/blank.jpg"
                                    class=""
                                    className="empty"
                                />
                            }
                        </div>
                        <Card.Body>
                            <Card.Title><span className="ShopName">{pd.name}</span></Card.Title>
                            <Fragment>
                                <Reviews value={pd.rating}/>
                            </Fragment>
                        </Card.Body>
                        <div className="shopBtnDiv">
                            <Link href={`shop/` + pd.slug} className="btn shopBtn">Shop details</Link>
                        </div>
                    </Card>
                </div>
            </div>
        })
        return (
            <Fragment>
                <VisibilitySensor onChange={this.onVisible}>
                    <section id="mobile-best-seller">
                        <Container>
                            <div className="div">
                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv">
                                            <span className="productCategory title">Our best Seller</span>
                                        </div>
                                        <div>
                                            <Link href="/all-seller" className="btn">Show More</Link>
                                        </div>
                                    </Col>
                                </Row>
                                {loading ?
                                    <Fragment>
                                        {this.state.width > 575 ?
                                            <Fragment>{placeholder2}</Fragment> :
                                            <Fragment>{placeholder}</Fragment>
                                        }
                                    </Fragment>
                                    :
                                    <Fragment>
                                        {data.length < 3 ?
                                            <Fragment>
                                                <Row className="rsadjust">
                                                    {shop}
                                                </Row>
                                            </Fragment> :
                                            <Fragment>
                                                <div className="Slider">
                                                    <Fragment>
                                                        <Slider ref={c => (this.slider = c)}  {...settings}>
                                                            {allShop}
                                                        </Slider>
                                                    </Fragment>
                                                </div>
                                            </Fragment>
                                        }
                                    </Fragment>
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
    bestSeller
};

function mapStateToProps(state) {
    const sellerApi = state.sellerReducer.sellerApi;
    const seller = state.sellerReducer.seller;
    const sellerLoading = state.sellerReducer.sellerLoading;
    const backendApi = state.starterReducer.backendApi

    return {
        sellerApi,
        seller,
        sellerLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileBestSeller);
