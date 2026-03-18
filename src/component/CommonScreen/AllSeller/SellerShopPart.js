import React, {PureComponent, Fragment} from 'react';
import ContentLoader from "react-content-loader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import NotFound from "../NotFound";
import Photo from "../Image/Photo";
import MobileProduct from "../../Mobile/MobileProductCard/MobileProduct";
import ProductCard from "../../Desktop/ProductCard/ProductCard";
import {connect} from "react-redux";
import Api from "../../../ClientApi/Api";
import Reviews from "../Reviews/Reviews";

class SellerShopPart extends PureComponent {

    constructor() {
        super();
        this.state = {
            loading: true,
            AllProduct: [],
            featured: [],
            newArrival: [],
            rating: 0,
            avatar: null,
            banner: null,
            facebook_link: "",
            instagram_link: "",
            twitter_link: "",
            shopName: "",
            shopFound: true,
            metaTitle: "",
            metaDescription: "",
            metaPhoto: ""
        }
    }


    componentDidMount() {

        const data = {
            shop: window.location.pathname.split("/")[2]
        }

        Api().post('getSpecificSeller', data).then(res => {
            this.setState({
                shopName: res.data.shopName,
                AllProduct: res.data.all_product,
                featured: res.data.featured,
                newArrival: res.data.new_arrival,
                rating: res.data.review,
                avatar: res.data.avatar,
                banner: res.data.banner,
                facebook_link: res.data.facebook_link,
                instagram_link: res.data.instagram_link,
                twitter_link: res.data.twitter_link,
                youtube_link: res.data.youtube_link,
                loading: false,
                shopFound: res.data.shopFound,
                metaTitle: res.data.metaTitle,
                metaDescription: res.data.metaDescription,
                metaPhoto: res.data.metaPhoto
            })

            let data = {
                metaTitle: res.data.metaTitle,
                metaDescription: res.data.metaDescription,
                metaPhoto: res.data.metaPhoto
            }
            this.props.seoMarkup(data);

        }).catch(error => {
        })


    }


    render() {
        let rating = this.state.rating;
        let banner = this.state.banner;
        let avatar = this.state.avatar;
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100"/>
            </ContentLoader>
        );
        const mobileLoader = <div className="mobile-pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>


        return (
            <Fragment>
                {this.props.mobile ?
                    <Fragment>
                        {this.state.loading ?
                            <Fragment>{mobileLoader}</Fragment> :
                            <Fragment>
                                {this.state.shopFound === false ?
                                    <NotFound/> :
                                    <Fragment>
                                        <section key={1} id="sellerShop">
                                            <Container>
                                                <div className="shopStoreDiv">
                                                    <Row className="store-row">
                                                        <Col lg={12} md={12} sm={12} xs={12}>
                                                            {banner !== null ?
                                                                <Photo
                                                                    src={`${this.props.backendApi}${banner}`}
                                                                    blurDataURL="/shopBanner.webp"
                                                                    class="store-cover"
                                                                />
                                                                :
                                                                <Photo
                                                                    src="/shopBanner.webp"
                                                                    blurDataURL="/shopBanner.webp"
                                                                    class="store-cover"
                                                                />

                                                            }
                                                        </Col>
                                                        <Col lg={12} md={12} sm={12} xs={12}
                                                             className="store-logo-block">
                                                            <div className="storeLogoDiv">
                                                                {avatar !== null ?
                                                                    <Photo
                                                                        src={`${this.props.backendApi}${avatar}`}
                                                                        blurDataURL="/user.png"
                                                                        class="store-logo"
                                                                    />
                                                                    :
                                                                    <Photo
                                                                        src="/blank.jpg"
                                                                        blurDataURL="/user.png"
                                                                        class="store-logo"
                                                                    />
                                                                }
                                                            </div>
                                                        </Col>
                                                        <Col lg={12} md={12} sm={12} xs={12}>
                                                            {this.state.loading ?
                                                                <Fragment>
                                                                    <h4 className="store-name">
                                                                        <MyLoader/>
                                                                    </h4>
                                                                </Fragment> :
                                                                <h4 className="store-name">{this.state.shopName}</h4>
                                                            }
                                                            {this.state.loading ?
                                                                <Fragment>
                                                                    <div className="rating shop-rating">
                                                                        <i className="fas fa-star nullReview"/>
                                                                        <i className="fas fa-star nullReview"/>
                                                                        <i className="fas fa-star nullReview"/>
                                                                        <i className="fas fa-star nullReview"/>
                                                                        <i className="fas fa-star nullReview"/>
                                                                    </div>
                                                                </Fragment> :
                                                                <Fragment>
                                                                    <Reviews value={rating}/>
                                                                </Fragment>
                                                            }
                                                        </Col>
                                                        <Col lg={12} md={12} sm={12} xs={12} className="store-socials">
                                                            <div className="d-flex justify-content-end">
                                                                <i className="fab fa-facebook-f store-social-icons mr-2"/>
                                                                <i className="fab fa-twitter store-social-icons mr-2"/>
                                                                <i className="fab fa-instagram store-social-icons mr-2"/>
                                                                <i className="fab fa-youtube store-social-icons"/>
                                                            </div>
                                                        </Col>
                                                        <Col lg={12} md={12} sm={12} xs={12}>
                                                            <hr/>
                                                        </Col>
                                                        <Col lg={12} md={12} sm={12} xs={12}>
                                                            <Tab.Container defaultActiveKey="first">
                                                                <Row>
                                                                    <Col lg={12} md={12} sm={12} xs={12}>
                                                                        <Nav variant="pills"
                                                                             className="justify-content-center">
                                                                            <Nav.Item>
                                                                                <Nav.Link
                                                                                    className="store-profile-options storeHome"
                                                                                    eventKey="first"
                                                                                >
                                                                                    Store Home
                                                                                </Nav.Link>
                                                                            </Nav.Item>
                                                                            <Nav.Item>
                                                                                <Nav.Link
                                                                                    className="store-profile-options AllProduct"
                                                                                    eventKey="third"
                                                                                >
                                                                                    All Product
                                                                                </Nav.Link>
                                                                            </Nav.Item>
                                                                        </Nav>
                                                                    </Col>
                                                                    <Col lg={12} md={12} sm={12} xs={12}
                                                                         className="mt-5 productSection">
                                                                        <Tab.Content>
                                                                            <Tab.Pane eventKey="first">
                                                                                <Container>
                                                                                    <Row>
                                                                                        <Col lg={12} md={12} sm={12}
                                                                                             xs={12}>
                                                                                            <h4 className="store-titles">
                                                                                                <span>Featured Products</span>
                                                                                            </h4>
                                                                                            <hr className="store-hr"/>
                                                                                            {this.props.mobile ?
                                                                                                <MobileProduct
                                                                                                    data={this.state.AllProduct}
                                                                                                    loading={this.state.loading}/> :
                                                                                                <ProductCard
                                                                                                    data={this.state.AllProduct}
                                                                                                    loading={this.state.loading}/>
                                                                                            }
                                                                                        </Col>
                                                                                        <Col lg={12} md={12} sm={12}
                                                                                             xs={12}
                                                                                             className="mt-5">
                                                                                            <h4 className="store-titles">
                                                                                                <span>New Arrivals</span>
                                                                                            </h4>
                                                                                            <hr className="store-hr"/>
                                                                                            {this.props.mobile ?
                                                                                                <MobileProduct
                                                                                                    data={this.state.AllProduct}
                                                                                                    loading={this.state.loading}/> :
                                                                                                <ProductCard
                                                                                                    data={this.state.AllProduct}
                                                                                                    loading={this.state.loading}/>
                                                                                            }
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Container>
                                                                            </Tab.Pane>
                                                                            <Tab.Pane eventKey="second">
                                                                                <Container>
                                                                                    <Row>
                                                                                        <Col lg={12} md={12} sm={12}
                                                                                             xs={12}>
                                                                                            <h4 className="store-titles">
                                                                                                <span>Top Selling</span>
                                                                                            </h4>
                                                                                            <hr className="store-hr"/>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Container>
                                                                            </Tab.Pane>
                                                                            <Tab.Pane eventKey="third">
                                                                                <Container>
                                                                                    <Row>
                                                                                        <Col lg={12} md={12} sm={12}
                                                                                             xs={12}>
                                                                                            <h4 className="store-titles">
                                                                                                <span>All Products</span>
                                                                                            </h4>
                                                                                            <hr className="store-hr"/>
                                                                                            {this.props.mobile ?
                                                                                                <MobileProduct
                                                                                                    data={this.state.AllProduct}
                                                                                                    loading={this.state.loading}/> :
                                                                                                <ProductCard
                                                                                                    data={this.state.AllProduct}
                                                                                                    loading={this.state.loading}/>
                                                                                            }
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Container>
                                                                            </Tab.Pane>
                                                                        </Tab.Content>
                                                                    </Col>
                                                                </Row>
                                                            </Tab.Container>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Container>
                                        </section>
                                    </Fragment>
                                }
                            </Fragment>
                        }
                    </Fragment> :
                    <Fragment>
                        <Fragment>
                            {this.state.shopFound !== true ?
                                <NotFound/> :
                                <section key={2} id="sellerShop">
                                    <Container className="pt-5">
                                        <div className="shopStoreDiv">
                                            <Row className="store-row">
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                    {banner !== null ?
                                                        <Photo
                                                            src={`${this.props.backendApi}${banner}`}
                                                            blurDataURL="/shopBanner.webp"
                                                            class="store-cover"
                                                        />
                                                        :
                                                        <Photo
                                                            src="/shopBanner.webp"
                                                            blurDataURL="/shopBanner.webp"
                                                            class="store-cover"
                                                        />

                                                    }
                                                </Col>
                                                <Col lg={3} md={3} sm={6} xs={12} className="store-logo-block">
                                                    <div className="storeLogoDiv">
                                                        {avatar !== null ?
                                                            <Photo
                                                                src={`${this.props.backendApi}${avatar}`}
                                                                blurDataURL="/user.png"
                                                                class="store-logo"
                                                            />
                                                            :
                                                            <Photo
                                                                src="/user.png"
                                                                blurDataURL="/user.png"
                                                                class="store-logo"
                                                            />
                                                        }
                                                    </div>
                                                </Col>
                                                <Col lg={3} md={3} sm={6} xs={12} className="p-3">
                                                    {this.state.loading ?
                                                        <Fragment>
                                                            <h4 className="store-name">
                                                                <MyLoader/>
                                                            </h4>
                                                        </Fragment> :
                                                        <h4 className="store-name">{this.state.shopName}</h4>
                                                    }
                                                    {this.state.loading ?
                                                        <Fragment>
                                                            <div className="rating">
                                                                <i className="fas fa-star nullReview"/>
                                                                <i className="fas fa-star nullReview"/>
                                                                <i className="fas fa-star nullReview"/>
                                                                <i className="fas fa-star nullReview"/>
                                                                <i className="fas fa-star nullReview"/>
                                                            </div>
                                                        </Fragment> :
                                                        <Fragment>
                                                            <Reviews value={rating}/>
                                                        </Fragment>
                                                    }
                                                </Col>
                                                <Col lg={6} md={6} sm={12} xs={12} className="store-socials">
                                                    <div className="d-flex justify-content-end">
                                                        <a href={this.state.facebook_link} target="_blank">
                                                            <i className="fab fa-facebook-f store-social-icons mr-2"/>
                                                        </a>
                                                        <a href={this.state.twitter_link} target="_blank">
                                                            <i className="fab fa-twitter store-social-icons mr-2"/>
                                                        </a>
                                                        <a href={this.state.instagram_link} target="_blank">
                                                            <i className="fab fa-instagram store-social-icons mr-2"/>
                                                        </a>
                                                        <a href={this.state.youtube_link} target="_blank">
                                                            <i className="fab fa-youtube store-social-icons"/>
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                    <hr/>
                                                </Col>
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                    <Tab.Container defaultActiveKey="first">
                                                        <Row>
                                                            <Col lg={12} md={12} sm={12} xs={12}>
                                                                <Nav variant="pills" className="justify-content-center">
                                                                    <Nav.Item>
                                                                        <Nav.Link
                                                                            className="store-profile-options storeHome"
                                                                            eventKey="first"
                                                                        >
                                                                            Store Home
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link
                                                                            className="store-profile-options AllProduct"
                                                                            eventKey="third"
                                                                        >
                                                                            All Product
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                </Nav>
                                                            </Col>
                                                            <Col lg={12} md={12} sm={12} xs={12}
                                                                 className="mt-5 productSection">
                                                                <Tab.Content>
                                                                    <Tab.Pane eventKey="first">
                                                                        <Container>
                                                                            <Row>
                                                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                                                    <h4 className="store-titles">
                                                                                        <span>Featured Products</span>
                                                                                    </h4>
                                                                                    <hr className="store-hr"/>
                                                                                    {this.props.mobile ?
                                                                                        <MobileProduct
                                                                                            data={this.state.AllProduct}
                                                                                            loading={this.state.loading}/> :
                                                                                        <ProductCard
                                                                                            data={this.state.AllProduct}
                                                                                            loading={this.state.loading}/>
                                                                                    }
                                                                                </Col>
                                                                                <Col lg={12} md={12} sm={12} xs={12}
                                                                                     className="mt-5">
                                                                                    <h4 className="store-titles">
                                                                                        <span>New Arrivals</span>
                                                                                    </h4>
                                                                                    <hr className="store-hr"/>
                                                                                    {this.props.mobile ?
                                                                                        <MobileProduct
                                                                                            data={this.state.AllProduct}
                                                                                            loading={this.state.loading}/>
                                                                                        :
                                                                                        <ProductCard
                                                                                            data={this.state.AllProduct}
                                                                                            loading={this.state.loading}/>
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </Container>
                                                                    </Tab.Pane>
                                                                    <Tab.Pane eventKey="second">
                                                                        <Container>
                                                                            <Row>
                                                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                                                    <h4 className="store-titles">
                                                                                        <span>Top Selling</span>
                                                                                    </h4>
                                                                                    <hr className="store-hr"/>
                                                                                </Col>
                                                                            </Row>
                                                                        </Container>
                                                                    </Tab.Pane>
                                                                    <Tab.Pane eventKey="third">
                                                                        <Container>
                                                                            <Row>
                                                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                                                    <h4 className="store-titles">
                                                                                        <span>All Products</span>
                                                                                    </h4>
                                                                                    <hr className="store-hr"/>
                                                                                    {this.props.mobile ?
                                                                                        <MobileProduct
                                                                                            data={this.state.AllProduct}
                                                                                            loading={this.state.loading}/>
                                                                                        :
                                                                                        <ProductCard
                                                                                            data={this.state.AllProduct}
                                                                                            loading={this.state.loading}/>
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </Container>
                                                                    </Tab.Pane>
                                                                </Tab.Content>
                                                            </Col>
                                                        </Row>
                                                    </Tab.Container>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Container>
                                </section>
                            }
                        </Fragment>
                    </Fragment>
                }
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(SellerShopPart);