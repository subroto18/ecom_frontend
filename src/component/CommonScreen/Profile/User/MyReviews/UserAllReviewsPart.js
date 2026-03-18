import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Api from "../../../../../ClientApi/Api";
import ReactStars from "react-rating-stars-component";
import {connect} from "react-redux";
import Photo from "../../../Image/Photo";
import Link from "next/link";

class UserAllReviewsPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            loadingImage: false,
            productReview: 5,
            sellerReview: 5,
            productReviewDetail: "",
            sellerReviewDetail: "",
            loading: true,
            data: []
        }
    }

    componentDidMount() {
        Api().get('getAllReview').then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        }).catch()
    }

    render() {
        const loader = <div className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        let toBeReviewedProduct = this.state.data.toBeReviewedProduct;
        let reviewProduct = this.state.data.reviewProduct;
        return (
            <Fragment>
                {this.state.loading ?
                    <Fragment>{loader}</Fragment>
                    :
                    <Fragment>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col lg={12} md={12} className="white-bg mb-3">
                                    <Nav variant="pills">
                                        <Nav.Item>
                                            <Nav.Link className="profile-review-options" eventKey="first">To be reviewed
                                                ({toBeReviewedProduct.length})</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className="profile-review-options" eventKey="second">History
                                                ({reviewProduct.length})</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={12} md={12} className="p-lg-0">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            {toBeReviewedProduct.map(pd => {
                                                return <div className="review-div">
                                                    <Row>
                                                        <Col lg={8} md={8} sm={6} xs={12}>
                                                            <p className="purchased-on">Purchased
                                                                on {pd.purchase_date}</p>
                                                            <div className="d-flex">
                                                                <div>
                                                                    <Photo
                                                                        src={`${this.props.backendApi}${pd.product_thumbnail}`}
                                                                        blurDataURL="/blank.jpg"
                                                                        class="order-img"
                                                                    />
                                                                </div>
                                                                <div className='oder-cd'>
                                                                    <h6 className="mt-4 productName"> {pd.product_name}</h6>
                                                                    <p className="text-muted">
                                                                        {pd.product_variation != null &&
                                                                            <Fragment>{
                                                                                pd.product_variation.map((variant, i) => {
                                                                                    return <Fragment
                                                                                        className="text-left mb-1"><span
                                                                                        className="variation">{(Object.keys(variant))[0]}: </span>
                                                                                        <span
                                                                                            className="variation mr-1"> {(Object.values(variant))[0]}</span></Fragment>
                                                                                })
                                                                            }
                                                                            </Fragment>
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} md={4} sm={6} xs={12}
                                                             className="review-product-right-element">
                                                            <p className="review-seller-name mb-3">Sold by <Link
                                                                href=''>{pd.seller}</Link></p>
                                                            <Link
                                                                href={{pathname: `/my-review/orderId/${pd.orderId}/productIndex/${pd.product_index}/productId/${pd.productId}`}}
                                                                className="btn review-btn">Review</Link>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            })}
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            {reviewProduct.map(pd => {
                                                return <div className="review-div">
                                                    <Row>
                                                        <Col lg={7} md={4} sm={6} xs={12} >
                                                            <div key={1} className="review-part">
                                                                <h6 className='purchasedText'>Purchased
                                                                    on {pd.purchase_date}</h6>
                                                                <p className="text-muted mb-2">Your product rating &
                                                                    review:</p>
                                                                <Row className="mt-3">
                                                                    <Col lg={3} md={4} sm={6} xs={12}>
                                                                        {pd.product_thumbnail  ?
                                                                            <Photo
                                                                                src={`${this.props.backendApi}${pd.product_thumbnail}`}
                                                                                blurDataURL="/blank.jpg"
                                                                                class="order-img"

                                                                            /> :
                                                                            <Photo
                                                                                src="/blank.jpg"
                                                                                blurDataURL="/blank.jpg"
                                                                                class="order-img"

                                                                            />
                                                                        }
                                                                    </Col>
                                                                    <Col lg={6} md={4} sm={6} xs={12}
                                                                         className='oder-cd'>
                                                                        <h6 className='productReviewName alinement'>{pd.product_name}</h6>
                                                                        <p className="text-muted">
                                                                            {pd.product_variation != null &&
                                                                                <Fragment>{
                                                                                    pd.product_variation.map((variant, i) => {
                                                                                        return <Fragment
                                                                                            className="text-left mb-1"><span
                                                                                            className="variation">{(Object.keys(variant))[0]}: </span>
                                                                                            <span
                                                                                                className="variation mr-1"> {(Object.values(variant))[0]}</span></Fragment>
                                                                                    })
                                                                                }
                                                                                </Fragment>
                                                                            }
                                                                        </p>
                                                                        <ReactStars
                                                                            classNames="review reviewStar alinement"
                                                                            count={5}
                                                                            value={pd.product_review}
                                                                            size={24}
                                                                            activeColor="#ffd700"
                                                                        />
                                                                        {pd.product_review_description != null &&
                                                                            <div
                                                                                className="review-des-div reviewBox alinement">
                                                                                <p>{pd.product_review_description}</p>
                                                                            </div>
                                                                        }
                                                                        {pd.product_review_photos.length > 0 &&
                                                                            <Fragment>
                                                                                {pd.product_review_photos.map(photos => {
                                                                                    if (photos !== null) {
                                                                                        return <div
                                                                                            className="reviewImg">

                                                                                            <Photo
                                                                                                src={`${this.props.backendApi}${photos}`}
                                                                                                blurDataURL="/blank.jpg"
                                                                                                class="smImgSrc img-fluid"
                                                                                            />

                                                                                        </div>
                                                                                    }
                                                                                })}
                                                                            </Fragment>
                                                                        }
                                                                        <div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                        <Col lg={1} md={4} sm={6} xs={12} >
                                                            <div className="review-vertical-line">
                                                                <div className="rvl"/>
                                                            </div>
                                                        </Col>
                                                        <Col lg={3} md={4} sm={6} xs={12} >
                                                            <div className="review-part">
                                                                <h6>Sold by <span
                                                                    className="shop-name review-seller-name">{pd.seller}</span>
                                                                </h6>
                                                                <p className="text-muted mb-2">Your seller review:</p>
                                                                <ReactStars
                                                                    classNames="review"
                                                                    count={5}
                                                                    value={pd.seller_review}
                                                                    onChange={this.changeSellerRating}
                                                                    size={24}
                                                                    activeColor="#ffd700"
                                                                />
                                                                {pd.seller_review_description !== null &&
                                                                    <div className="review-des-div">
                                                                        <p>{pd.seller_review_description}</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            })}
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Fragment>
                }
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(UserAllReviewsPart);

