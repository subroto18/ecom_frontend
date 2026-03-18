import React, {PureComponent,Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
class AvailableShop extends PureComponent {
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
   onTopUp = () => {
       this.props.triggerParentUpdate({});
   }
    render() {
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
        return (
            <Fragment>
                <Container>
                    <div className="div">
                        <Row>
                            <Col  className="d-flex justify-content-between">
                                <div className="TitleDiv">
                                    <span className="productCategory title">Available Shops</span>
                                </div>
                            </Col>
                        </Row>
                        <div className="Available-shop">
                            <Row>
                                <Col xl={3} lg={3} md={3}>
                                    <Card className="shop-card availableProduct-card-shop">
                                        <div className="cardImgDiv mobile-available-cardImgDiv  d-flex justify-content-center align-items-center">
                                            <Card.Img
                                                className="cardImg mobile-available-img"
                                                variant="top"
                                                src="https://demo.activeitzone.com/ecommerce/public/uploads/hop/logo/d4U7RtTXz0rlXlA8xXLgsWslhR4PxFUJAJsLJtZY.jpeg"
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title><a className="ShopName" href="#">Wear Dreams</a></Card.Title>
                                            <div className="rating">
                                                <i className="fas fa-star nullReview cartProductReview"></i>
                                                <i className="fas fa-star nullReview cartProductReview"></i>
                                                <i className="fas fa-star nullReview cartProductReview"></i>
                                                <i className="fas fa-star nullReview cartProductReview"></i>
                                                <i className="fad fa-star-half nullReview cartProductReview"></i>
                                            </div>
                                        </Card.Body>
                                        <div className="available-priceDiv">
                                            <span className="discountPrice">$400</span>
                                            <span className="regularPrice ml-2 mr-2">
                                                <del>$480</del>
                                                </span>
                                        </div>
                                        <div className="shopBtnDiv">
                                            <Link onClick={this.onTopUp} className="btn shopBtn mr-2">View Shop</Link>
                                            <Link onClick={this.onTopUp} className="btn shopBtn">View Product</Link>
                                        </div>
                                        <div className="p-stock-div">
                                            <span>Stock available</span>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </Fragment>
        );
    }
}
export default AvailableShop;