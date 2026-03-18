import React, {PureComponent,Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ContentLoader from "react-content-loader";
import Api from "../../../ClientApi/Api";
import Photo from "../Image/Photo";
import Link from "next/link";
import {connect} from "react-redux";
import Reviews from "../Reviews/Reviews";
class AllSellerPart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading:true
        }
    }
     componentDidMount() {

        this.renderPosts();
        window.scroll(0,0)

    }

    renderPosts = async () => {
        try {
            await Api().get('getAllSeller').then(res=>{
                this.setState({
                    data:res.data,
                    loading:false
                })
            })
        } catch (err) {

        }
    }


    render() {
        let data = this.state.data;
        let loading = this.state.loading;
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const placeholder = (
            <Row>

                { Array.apply(null, { length: 10 }).map((e, i) => (
                    <Col key={i} lg={2} md={3}  sm={4}  xs={6}>
                        <Card className="shop-card">
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
        const mobileLoader =  <div  className="mobile-pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>



        const sellerShop = data.map((pd,i) => <Col key={i} lg={2} md={3}  sm={4}  xs={6}>
           <Card className="shop-card">
                <div className="sellerImgDiv  d-flex justify-content-center align-items-center">
                    {pd.avatar!=null ?
                        <Photo
                            src={`${this.props.backendApi}${pd.avatar}`}
                            blurDataURL="/blank.jpg"
                            class="img-fluid seller-img"
                            className="empty"
                        />
                        :
                        <Photo
                            src="/blank.jpg"
                            blurDataURL="/blank.jpg"
                            class="cardImg img-fluid seller-img"
                            className="empty"
                        />
                    }
                </div>
                <Card.Body>
                    <Card.Title><span className="ShopName" >{pd.shopName}</span></Card.Title>
                    <Reviews value={pd.review}/>
                </Card.Body>
                <div className="shopBtnDiv">
                    <Link href={`shop/`+pd.shopSlug} className="btn shopBtn">Shop details</Link>
                </div>
            </Card>
           </Col>
        )



        return (
                <section id="BestSeller" className="pt-4">
                    <Container>
                        {this.props.mobile ?
                            <div className="div">
                                {loading ?
                                    <Fragment>
                                        {mobileLoader}
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <Row>
                                            {sellerShop}
                                        </Row>
                                    </Fragment>
                                }
                            </div>
                                     :
                            <div className="div">

                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv">
                                            <span className="productCategory title">All Seller</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Fragment>
                                    {loading ?
                                        <Fragment>
                                            {placeholder}
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <Row>
                                                    <Fragment>
                                                        {sellerShop}
                                                    </Fragment>
                                            </Row>
                                        </Fragment>
                                    }
                                </Fragment>


                            </div>
                        }
                    </Container>
                </section>
        );
    }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(AllSellerPart);


