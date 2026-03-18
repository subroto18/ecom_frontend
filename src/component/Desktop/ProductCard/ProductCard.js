import React, { PureComponent, Fragment } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import Countdown from "react-countdown";
import { addCompareProduct } from "../../../services/actions/compareAction";
import { connect } from "react-redux";
import Router from "next/router";
import { addWishlistProduct } from "../../../services/actions/wishlishAction";
import { popupLoginOpen } from "../../../services/actions/commonAction";
import {
  cartVariationShow,
  getSingleProduct,
} from "../../../services/actions/productAction";
import { onCurrencyFormat } from "../../../services/common";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";
import Reviews from "../../CommonScreen/Reviews/Reviews";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loader: [],
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  onCompare(index) {
    if (this.props.emailVerified === false) {
      Router.push("/dashboard");
    } else {
      this.props.addCompareProduct(index);
    }
  }

  onWishList(index) {
    if (this.props.emailVerified === false) {
      Router.push("/dashboard");
    } else {
      if (this.props.isAuthorized) {
        this.props.addWishlistProduct(index);
      } else {
        this.props.popupLoginOpen();
      }
    }
  }

  onCart(index) {
    if (this.props.emailVerified === false) {
      Router.push("/dashboard");
    } else {
      if (this.props.isAuthorized) {
        this.props.cartVariationShow(index);
      } else {
        this.props.popupLoginOpen();
      }
    }
  }

  onCompleteTimer() {
    this.props.triggerParentUpdate();
  }

  onGetProduct(link) {
    Router.push(`/product/${link}`);
    this.props.getSingleProduct(link);
  }

  render() {
    const loader = (
      <div className="pre-loader">
        <div className="loader-spinner">
          <div className="spinner-border text-muted" />
        </div>
      </div>
    );

    let defaultCurrency = this.props.defaultCurrency;
    let symbolFormat = this.props.currencySymbolFormat;
    let loading = this.props.loading;
    let data = this.props.data;
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
            dots: false,
          },
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const MyLoader = () => (
      <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
      </ContentLoader>
    );

    const placeholderForSlider = (
      <Row>
        <CardGroup>
          {Array.apply(null, { length: 4 }).map((e, i) => (
            <Col lg={2} md={3}>
              <Card className="product-card">
                <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
                  <MyLoader />
                </div>
                <Card.Body>
                  <Card.Text>
                    <div className="priceDiv">
                      <span className="regularPrice singlePrice ml-3 mr-3" />
                    </div>
                    <div className="rating loading">
                      <i className="fas fa-star cartProductEmptyReview" />
                      <i className="fas fa-star cartProductEmptyReview" />
                      <i className="fas fa-star cartProductEmptyReview" />
                      <i className="fas fa-star cartProductEmptyReview" />
                      <i className="fas fa-star cartProductEmptyReview" />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </CardGroup>
      </Row>
    );

    const placeholder = (
      <Row>
        {Array.apply(null, { length: 6 }).map((e, i) => (
          <Col lg={2} md={3}>
            <Card className="product-card">
              <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
                <MyLoader />
              </div>
              <Card.Body>
                <Card.Text>
                  <div className="priceDiv">
                    <span className="regularPrice singlePrice ml-3 mr-3" />
                  </div>
                  <div className="rating loading">
                    <i className="fas fa-star cartProductEmptyReview" />
                    <i className="fas fa-star cartProductEmptyReview" />
                    <i className="fas fa-star cartProductEmptyReview" />
                    <i className="fas fa-star cartProductEmptyReview" />
                    <i className="fas fa-star cartProductEmptyReview" />
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );

    let sliderProduct = data.map((pd, i) => {
      return (
        <Card className="product-card" key={i}>
          <div onClick={() => this.onGetProduct(pd.slug)}>
            <div className="cardImgDiv">
              <div className="next-image-div cardImg">
                <Photo
                  src={
                    pd.product_image !== null
                      ? `${this.props.backendApi}${pd.product_image}`
                      : "/blank.jpg"
                  }
                  blurDataURL="/blank.jpg"
                  class=""
                />
              </div>
            </div>
            <Card.Body className="product-info-div">
              <Card.Title>
                <p className="productTitle">
                  {pd.product_name.length > 30
                    ? pd.product_name.substring(0, 30) + "..."
                    : pd.product_name}
                </p>
              </Card.Title>
              <Card.Text>
                <div className="priceDiv">
                  {symbolFormat === 1 ? (
                    <Fragment>
                      {pd.discount_price !== undefined ? (
                        <Fragment>
                          <p className="discountPrice">
                            {onCurrencyFormat(pd.discount_price)}
                            {defaultCurrency}
                          </p>
                          <p className="regularPrice ml-3 mr-3">
                            <del>
                              {onCurrencyFormat(pd.product_price)}
                              {defaultCurrency}
                            </del>
                          </p>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <p className="regularPrice singlePrice ml-3 mr-3">
                            {onCurrencyFormat(pd.product_price)}
                            {defaultCurrency}
                          </p>
                        </Fragment>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {pd.discount_price !== undefined ? (
                        <Fragment>
                          <span className="discountPrice">
                            {defaultCurrency}
                            {onCurrencyFormat(pd.discount_price)}
                          </span>
                          <span className="regularPrice ml-3 mr-3">
                            <del>
                              {defaultCurrency}
                              {onCurrencyFormat(pd.product_price)}
                            </del>
                          </span>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <span className="regularPrice singlePrice ml-3 mr-3">
                            {defaultCurrency}
                            {onCurrencyFormat(pd.product_price)}
                          </span>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </div>
                <Reviews value={pd.review} />
              </Card.Text>
            </Card.Body>
          </div>
          <Card.Footer>
            <p
              onClick={() => this.onWishList(pd.index)}
              id={`wishlist-${pd.index}`}
              className="card-icons  pci1"
            >
              <i className="far fa-heart" />
            </p>
            <p
              onClick={() => this.onCompare(pd.index)}
              className="card-icons pci2"
            >
              <i className="far fa-sync-alt" />
            </p>
            <p
              onClick={() => this.onCart(pd.index)}
              className="card-icons pci3"
            >
              <i className="far fa-shopping-cart " />
            </p>
          </Card.Footer>
        </Card>
      );
    });
    // if product quantity is less than 6 for slider

    let productForSlider = data.map((pd, i) => {
      return (
        <Col key={i} xl={2} md={3} sm={4} xs={6} className="column-lg-5">
          <Card className="product-card" key={i}>
            <div onClick={() => this.onGetProduct(pd.slug)}>
              <div className="cardImgDiv">
                <div className="next-image-div cardImg">
                  <Photo
                    src={
                      pd.product_image !== null
                        ? `${this.props.backendApi}${pd.product_image}`
                        : "/blank.jpg"
                    }
                    blurDataURL="/blank.jpg"
                    class=""
                  />
                </div>
              </div>
              <Card.Body className="product-info-div">
                <Card.Title>
                  <p className="productTitle">
                    {pd.product_name.length > 30
                      ? pd.product_name.substring(0, 30) + "..."
                      : pd.product_name}
                  </p>
                </Card.Title>
                <Card.Text>
                  <div className="priceDiv">
                    {symbolFormat === 1 ? (
                      <Fragment>
                        {pd.discount_price !== undefined ? (
                          <Fragment>
                            <p className="discountPrice">
                              {onCurrencyFormat(pd.discount_price)}
                              {defaultCurrency}
                            </p>
                            <p className="regularPrice ml-3 mr-3">
                              <del>
                                {onCurrencyFormat(pd.product_price)}
                                {defaultCurrency}
                              </del>
                            </p>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <p className="regularPrice singlePrice ml-3 mr-3">
                              {onCurrencyFormat(pd.product_price)}
                              {defaultCurrency}
                            </p>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {pd.discount_price !== undefined ? (
                          <Fragment>
                            <span className="discountPrice">
                              {defaultCurrency}
                              {onCurrencyFormat(pd.discount_price)}
                            </span>
                            <span className="regularPrice ml-3 mr-3">
                              <del>
                                {defaultCurrency}
                                {onCurrencyFormat(pd.product_price)}
                              </del>
                            </span>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <span className="regularPrice singlePrice ml-3 mr-3">
                              {defaultCurrency}
                              {onCurrencyFormat(pd.product_price)}
                            </span>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </div>
                  <Reviews value={pd.review} />
                </Card.Text>
              </Card.Body>
            </div>
            <Card.Footer>
              <p
                onClick={() => this.onWishList(pd.index)}
                id={`wishlist-${pd.index}`}
                className="card-icons  pci1"
              >
                <i className="far fa-heart" />
              </p>
              <p
                onClick={() => this.onCompare(pd.index)}
                className="card-icons pci2"
              >
                <i className="far fa-sync-alt" />
              </p>
              <p
                onClick={() => this.onCart(pd.index)}
                className="card-icons pci3"
              >
                <i className="far fa-shopping-cart " />
              </p>
            </Card.Footer>
          </Card>
        </Col>
      );
    });

    // if product quantity is less than 6 for slider
    let searchProduct = data.map((pd, i) => {
      return (
        <Col key={i} xl={3} lg={3} md={4} sm={4} xs={4}>
          <Card className="product-card" key={i}>
            <div onClick={() => this.onGetProduct(pd.slug)}>
              <div className="cardImgDiv">
                <div className="next-image-div cardImg">
                  <Photo
                    src={
                      pd.product_image !== null
                        ? `${this.props.backendApi}${pd.product_image}`
                        : "/blank.jpg"
                    }
                    blurDataURL="/blank.jpg"
                    class=""
                  />
                </div>
              </div>
              <Card.Body className="product-info-div">
                <Card.Title>
                  <p className="productTitle">
                    {pd.product_name.length > 30
                      ? pd.product_name.substring(0, 30) + "..."
                      : pd.product_name}
                  </p>
                </Card.Title>
                <Card.Text>
                  <div className="priceDiv">
                    {symbolFormat === 1 ? (
                      <Fragment>
                        {pd.discount_price !== undefined ? (
                          <Fragment>
                            <p className="discountPrice">
                              {onCurrencyFormat(pd.discount_price)}
                              {defaultCurrency}
                            </p>
                            <p className="regularPrice ml-3 mr-3">
                              <del>
                                {onCurrencyFormat(pd.product_price)}
                                {defaultCurrency}
                              </del>
                            </p>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <p className="regularPrice singlePrice ml-3 mr-3">
                              {onCurrencyFormat(pd.product_price)}
                              {defaultCurrency}
                            </p>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {pd.discount_price !== undefined ? (
                          <Fragment>
                            <span className="discountPrice">
                              {defaultCurrency}
                              {onCurrencyFormat(pd.discount_price)}
                            </span>
                            <span className="regularPrice ml-3 mr-3">
                              <del>
                                {defaultCurrency}
                                {onCurrencyFormat(pd.product_price)}
                              </del>
                            </span>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <span className="regularPrice singlePrice ml-3 mr-3">
                              {defaultCurrency}
                              {onCurrencyFormat(pd.product_price)}
                            </span>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </div>
                  <Reviews value={pd.review} />
                </Card.Text>
              </Card.Body>
            </div>
            <Card.Footer>
              <p
                onClick={() => this.onWishList(pd.index)}
                id={`wishlist-${pd.index}`}
                className="card-icons  pci1"
              >
                <i className="far fa-heart" />
              </p>
              <p
                onClick={() => this.onCompare(pd.index)}
                className="card-icons pci2"
              >
                <i className="far fa-sync-alt" />
              </p>
              <p
                onClick={() => this.onCart(pd.index)}
                className="card-icons pci3"
              >
                <i className="far fa-shopping-cart " />
              </p>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
    // if product quantity is less than
    let product = data.map((pd, i) => {
      return (
        <Col key={i} xl={2} lg={2} md={3} sm={4} xs={6}>
          <Card className="product-card" key={i}>
            <div onClick={() => this.onGetProduct(pd.slug)}>
              <div className="cardImgDiv  ">
                <div className="next-image-div cardImg">
                  <Photo
                    src={
                      pd.product_image !== null
                        ? `${this.props.backendApi}${pd.product_image}`
                        : "/blank.jpg"
                    }
                    blurDataURL={
                      pd.product_image !== null
                        ? `${this.props.backendApi}${pd.product_image}`
                        : "/blank.jpg"
                    }
                    class=""
                  />
                </div>
              </div>
              <Card.Body className="product-info-div">
                <Card.Title>
                  <p className="productTitle">
                    {pd.product_name.length > 20
                      ? pd.product_name.substring(0, 20) + "..."
                      : pd.product_name}
                  </p>
                </Card.Title>
                <Card.Text>
                  <div className="priceDiv">
                    {symbolFormat === 1 ? (
                      <Fragment>
                        {pd.discount_price !== undefined ? (
                          <Fragment>
                            <p className="discountPrice">
                              {onCurrencyFormat(pd.discount_price)}
                              {defaultCurrency}
                            </p>
                            <p className="regularPrice ml-3 mr-3">
                              <del>
                                {onCurrencyFormat(pd.product_price)}
                                {defaultCurrency}
                              </del>
                            </p>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <p className="regularPrice singlePrice ml-3 mr-3">
                              {onCurrencyFormat(pd.product_price)}
                              {defaultCurrency}
                            </p>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {pd.discount_price !== undefined ? (
                          <Fragment>
                            <span className="discountPrice">
                              {defaultCurrency}
                              {onCurrencyFormat(pd.discount_price)}
                            </span>
                            <span className="regularPrice ml-3 mr-3">
                              <del>
                                {defaultCurrency}
                                {onCurrencyFormat(pd.product_price)}
                              </del>
                            </span>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <span className="regularPrice singlePrice ml-3 mr-3">
                              {defaultCurrency}
                              {onCurrencyFormat(pd.product_price)}
                            </span>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </div>
                  <Reviews value={pd.review} />
                </Card.Text>
              </Card.Body>
            </div>
            <Card.Footer>
              <p
                onClick={() => this.onWishList(pd.index)}
                id={`wishlist-${pd.index}`}
                className="card-icons  pci1"
              >
                <i className="far fa-heart" />
              </p>
              <p
                onClick={() => this.onCompare(pd.index)}
                className="card-icons pci2"
              >
                <i className="far fa-sync-alt" />
              </p>
              <p
                onClick={() => this.onCart(pd.index)}
                className="card-icons pci3"
              >
                <i className="far fa-shopping-cart " />
              </p>
            </Card.Footer>
          </Card>
        </Col>
      );
    });

    if (this.props.searchProduct) {
      return (
        <Fragment>
          {loading ? (
            <Fragment>{loader}</Fragment>
          ) : (
            <Fragment>
              <Row>{searchProduct}</Row>
            </Fragment>
          )}
        </Fragment>
      );
    }

    if (this.props.sliderProduct) {
      return (
        <Fragment>
          <section className="pt-4">
            <Container>
              <div className="div">
                <Row>
                  <Col className="d-flex justify-content-between">
                    <div className="TitleDiv">
                      <h1 className="productCategory title">
                        {this.props.title}
                      </h1>
                    </div>
                    {this.props.loading !== true && (
                      <Fragment>
                        {this.props.flashDeal && (
                          <div className="countDown">
                            <span id="clockDiv" className="megaClock">
                              <Countdown
                                onComplete={this.onCompleteTimer}
                                date={Date.now() + this.props.countdown}
                                renderer={this.props.renderer}
                              />
                            </span>
                          </div>
                        )}
                      </Fragment>
                    )}
                    <div>
                      {this.props.link != undefined && (
                        <Link
                          href={{ pathname: `${this.props.link}` }}
                          className="btn"
                        >
                          Show All
                        </Link>
                      )}
                    </div>
                  </Col>
                </Row>

                {loading ? (
                  <Fragment>{placeholder}</Fragment>
                ) : (
                  <Fragment>
                    {data.length <= 6 ? (
                      <Fragment>
                        <Row>{productForSlider}</Row>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="Slider">
                          <Button
                            className="sliderLeftArrow sliderArrow"
                            onClick={this.previous}
                          >
                            <i className="far fa-chevron-left" />
                          </Button>
                          <Button
                            className="sliderRightArrow sliderArrow"
                            onClick={this.next}
                          >
                            <i className="far fa-chevron-right" />
                          </Button>
                          <Fragment>
                            <Slider
                              ref={(c) => (this.slider = c)}
                              {...settings}
                            >
                              {sliderProduct}
                            </Slider>
                          </Fragment>
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
            </Container>
          </section>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {loading ? (
            <Fragment>{placeholderForSlider}</Fragment>
          ) : (
            <Fragment>
              <Row>{product}</Row>
            </Fragment>
          )}
        </Fragment>
      );
    }
  }
}

const mapDispatchToProps = {
  addCompareProduct,
  popupLoginOpen,
  addWishlistProduct,
  cartVariationShow,
  getSingleProduct,
};

function mapStateToProps(state) {
  const emailVerified = state.userReducer.emailVerified;
  const isAuthorized = state.userReducer.isAuthorized;
  const defaultCurrency = state.starterReducer.defaultCurrency;
  const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
  const backendApi = state.starterReducer.backendApi;

  return {
    emailVerified,
    isAuthorized,
    defaultCurrency,
    currencySymbolFormat,
    backendApi,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
