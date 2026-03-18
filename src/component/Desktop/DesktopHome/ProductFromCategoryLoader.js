import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ContentLoader from "react-content-loader";
import Link from "next/link";
class ProductFromCategoryLoader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cartVariationModal: false,
            cartSuccessModel:true,
            data:[],
            loading:true
        }
    }
    componentDidMount() {
        this.setState({
            data:this.props.product
        })
    }
    render() {
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        return (
            <Fragment>
                <section id="CategoryProduct" className="pt-5">
                    <Container>
                        <div className="div">
                            <Row>
                                <Col className="d-flex justify-content-between">
                                    <div className="TitleDiv">
                                        <span className="productCategory title">{this.props.category}</span>
                                    </div>
                                    <div>
                                        <Link href="" className="btn">Show More</Link>
                                    </div>
                                </Col>
                            </Row>
                            <div className="Slider">
                                <Button disabled className="sliderLeftArrow sliderArrow" onClick={this.previous}><i
                                    className="far fa-chevron-left"/></Button>
                                <Button disabled className="sliderRightArrow sliderArrow" onClick={this.next}><i
                                    className="far fa-chevron-right"/></Button>
                                    <Fragment>
                                        <Row>
                                            <Col lg={2}>
                                                <Card className="product-card">
                                                    <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
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
                                                    <Card.Footer className="d-flex">
                                                        <Button   className="card-icons leftCornerCardIcon loading-link btn"><i
                                                            className="far fa-heart"/></Button>
                                                        <Button   className="card-icons loading-link"><i className="far fa-sync-alt"/></Button>
                                                        <Button   className="card-icons rightCornerCardIcon loading-link"><i className="far fa-shopping-cart "/></Button>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card className="product-card">
                                                    <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
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
                                                    <Card.Footer className="d-flex">
                                                        <Button   className="card-icons leftCornerCardIcon loading-link btn"><i
                                                            className="far fa-heart"/></Button>
                                                        <Button   className="card-icons loading-link"><i className="far fa-sync-alt"/></Button>
                                                        <Button   className="card-icons rightCornerCardIcon loading-link"><i className="far fa-shopping-cart "/></Button>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card className="product-card">
                                                    <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
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
                                                    <Card.Footer className="d-flex">
                                                        <Button   className="card-icons leftCornerCardIcon loading-link btn"><i
                                                            className="far fa-heart"/></Button>
                                                        <Button   className="card-icons loading-link"><i className="far fa-sync-alt"/></Button>
                                                        <Button   className="card-icons rightCornerCardIcon loading-link"><i className="far fa-shopping-cart "/></Button>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card className="product-card">
                                                    <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
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
                                                    <Card.Footer className="d-flex">
                                                        <Button   className="card-icons leftCornerCardIcon loading-link btn"><i
                                                            className="far fa-heart"/></Button>
                                                        <Button   className="card-icons loading-link"><i className="far fa-sync-alt"/></Button>
                                                        <Button   className="card-icons rightCornerCardIcon loading-link"><i className="far fa-shopping-cart "/></Button>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card className="product-card">
                                                    <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
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
                                                    <Card.Footer className="d-flex">
                                                        <Button   className="card-icons leftCornerCardIcon loading-link btn"><i
                                                            className="far fa-heart"/></Button>
                                                        <Button   className="card-icons loading-link"><i className="far fa-sync-alt"/></Button>
                                                        <Button   className="card-icons rightCornerCardIcon loading-link"><i className="far fa-shopping-cart "/></Button>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card className="product-card">
                                                    <div className="cardEmptyImgDiv  d-flex justify-content-center align-items-center">
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
                                                    <Card.Footer className="d-flex">
                                                        <Button   className="card-icons leftCornerCardIcon loading-link btn"><i
                                                            className="far fa-heart"/></Button>
                                                        <Button   className="card-icons loading-link"><i className="far fa-sync-alt"/></Button>
                                                        <Button   className="card-icons rightCornerCardIcon loading-link"><i className="far fa-shopping-cart "/></Button>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Fragment>
                            </div>
                        </div>
                    </Container>
                </section>
            </Fragment>
        );
    }
}
export default ProductFromCategoryLoader;