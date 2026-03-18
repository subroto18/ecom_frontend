import React, {Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import Api from "../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import {connect} from "react-redux";
import {bestSeller} from "../../../services/actions/sellerAction";
import Photo from "../../CommonScreen/Image/Photo";
import Reviews from "../../CommonScreen/Reviews/Reviews";
import Link from "next/link";


class BestSeller extends React.PureComponent {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideVariationModal = this.onHideVariationModal.bind(this);
        this.onHideSuccessModal = this.onHideSuccessModal.bind(this);
        this.state = {
            cartVariationModal: false,
            cartSuccessModel:true
        }
    }

    onVisible = (isVisible) => {
        
        if(isVisible){
            if(this.props.sellerApi!==true){
                Api().get('getBestSeller').then(res=>{
                    this.props.bestSeller(res.data);
                })
            }
        }
    }


    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    onHideVariationModal(e){
        this.setState({
            cartVariationModal: false,
            cartSuccessModel:false
        })
    }
    onHideSuccessModal(e){
        this.setState({
            cartSuccessModel:true
        })
    }
    onShowModal() {
        this.setState({
            cartVariationModal: true
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
            marginRight: 15,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const placeholder = (
            <Row>
                { Array.apply(null, { length: 6 }).map((e, i) => (
                    <Col key={i} lg={2} md={3} sm={4} xs={6}>
                        <Card className="shop-card product-card">
                            <div className="cardImgDiv  d-flex justify-content-center align-items-center">
                                <MyLoader/>
                            </div>
                            <Card.Body>
                                <Card.Text>
                                    <div className="priceDiv">
                                        <span className="regularPrice singlePrice ml-3 mr-3"/>
                                    </div>
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
                                <Button disabled  className="btn shopBtn">Shop details</Button>
                            </div>
                        </Card>
                    </Col>
                ))
                }
            </Row>
        );

        let allSeller  = data.map((pd,i)=>{
            return  <Card key={i} className="shop-card product-card">
                <div className="cardImgDiv  d-flex justify-content-center align-items-center">
                    {pd.avatar!=null ?
                        <Photo
                            src={`${this.props.backendApi}${pd.avatar}`}
                            blurDataURL={`${this.props.backendApi}${pd.avatar}`}
                            class="bestSellerPic"
                        />
                        :

                        <Photo
                            src="/blank.jpg"
                            blurDataURL="/blank.jpg"
                            class="bestSellerPic"
                        />

                    }
                </div>
                <Card.Body>
                    <Card.Title><span className="ShopName" >{pd.name}</span></Card.Title>
                     <Reviews value={pd.rating}/>
            </Card.Body>
                <div className="shopBtnDiv">
                    <Link href="/seller-shop" className="btn shopBtn">Shop details</Link>
                </div>
            </Card>
        })
        let seller  = data.map((pd,i)=>{
            return   <Col key={i} xxl={2} xl={2} lg={3} md={3} sm={4} xs={6}>
                        <Card className="shop-card product-card">
                    <div className="cardImgDiv  d-flex justify-content-center align-items-center">
                        {pd.avatar!=null ?
                            <Photo
                                src={`${this.props.backendApi}${pd.avatar}`}
                                blurDataURL={`${this.props.backendApi}${pd.avatar}`}
                                class="bestSellerPic"
                            />
                            :
                            <Photo
                                src="/blank.jpg"
                                blurDataURL="/blank.jpg"
                                class="bestSellerPic"
                            />
                        }
                    </div>
                    <Card.Body>
                        <Card.Title><span className="ShopName" >{pd.name}</span></Card.Title>
                        <Reviews value={pd.rating}/>
                    </Card.Body>
                    <div className="shopBtnDiv">
                        <Link href={`shop/`+pd.slug} className="btn shopBtn">Shop details</Link>
                    </div>
                </Card>
                     </Col>
        })
        return (
            <Fragment>

                <VisibilitySensor  onChange={this.onVisible}>

                    <Fragment>
                        {loading ?
                            <section id="BestSeller" className="pt-4">
                                <Container>
                                    <div className="div">
                                        <Row>
                                            <Col className="d-flex justify-content-between">
                                                <div className="TitleDiv">
                                                    <span className="productCategory title">Best Seller</span>
                                                </div>
                                                <div>
                                                    <Link href="/all-seller" className="btn">Show More</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Fragment>
                                            {placeholder}
                                        </Fragment>
                                    </div>
                                </Container>
                            </section> :data.length===0 ?
                                <Fragment/>
                                :
                                <section id="BestSeller" className="pt-4">
                                    <Container>
                                        <div className="div">
                                            <Row>
                                                <Col className="d-flex justify-content-between">
                                                    <div className="TitleDiv">
                                                        <span className="productCategory title">Best Seller</span>
                                                    </div>
                                                    <div>
                                                        <Link href="/all-seller" className="btn">Show More</Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {
                                                data.length < 6 ?
                                                    <Fragment>
                                                        <Row>
                                                            {seller}
                                                        </Row>
                                                    </Fragment> :
                                                    <Fragment>
                                                        <div className="Slider">
                                                            <Button className="sliderLeftArrow sliderArrow" onClick={this.previous}><i
                                                                className="far fa-chevron-left"/></Button>
                                                            <Button className="sliderRightArrow sliderArrow" onClick={this.next}><i
                                                                className="far fa-chevron-right"/></Button>
                                                            <Fragment>
                                                                <Slider  ref={c => (this.slider = c)}  {...settings}>
                                                                    {allSeller}
                                                                </Slider>
                                                            </Fragment>
                                                        </div>
                                                    </Fragment>
                                            }
                                        </div>
                                    </Container>
                                </section>
                        }
                    </Fragment>

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

export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);

