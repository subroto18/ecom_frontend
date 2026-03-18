import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import ContentLoader from "react-content-loader";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Swal from "sweetalert2";
class ProductFromFeatured extends PureComponent {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.onHideVariationModal = this.onHideVariationModal.bind(this);
        this.onHideSuccessModal = this.onHideSuccessModal.bind(this);
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
    setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    onHideVariationModal(){
        this.setState({
            cartVariationModal: false,
            cartSuccessModel:false
        })
    }
    onHideSuccessModal(){
        this.setState({
            cartSuccessModel:true
        })
    }
    onCompare(index){
        this.context.onAddCompareProduct(index);
    }
    onWishList(index){
        if(this.context.isAuthorized){
            this.context.onAddWishlistProduct(index);
        }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'DesktopLogin first',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    onCart(index){
        if(this.context.isAuthorized){
            let data = this.state.data;
            data.map(pd=>{
                if(pd.index===index){
                    this.context.onCartVariationShow(index);
                }
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'DesktopLogin first',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    onClickLink(slug){
        this.context.onSingleProductPage(slug);
        let url =  window.location.href;
        let index =  url.split('/');
        if(index.indexOf('product')!==-1){
            this.props.history.push(`${slug}`);
        }else{
            this.props.history.push(`${'product/'+slug}`);
        }
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
        const productCatTitle = {
            width:this.state.titleWidth
        }
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        let allProduct  = this.props.data.map((pd,i)=>{
            return <Card className="product-card" key={i}>
                <div className="cardImgDiv  d-flex justify-content-center align-items-center">
                    <LazyLoadImage
                        placeholderSrc={process.env.PUBLIC_URL + "/heyshop.png"}
                        className="cardImg img-fluid"
                        variant="top"
                        src={`${this.context.backendApi}${pd.product_image}`}
                        width="200"
                        height="100"
                    />
                </div>
                <Card.Body>
                    <Card.Title><Link to={`product/`+pd.slug}  className="productTitle" >{pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." :  pd.product_name}</Link></Card.Title>
                    <Card.Text>
                        <div className="priceDiv">
                            {pd.product_discount!==undefined  ?
                                <Fragment>
                                    <span className="discountPrice">${pd.product_discount}</span>
                                    <span className="regularPrice ml-3 mr-3"><del>${pd.product_price}</del></span>
                                </Fragment> :
                                <Fragment>
                                    <span className="regularPrice singlePrice ml-3 mr-3">${pd.product_price}</span>
                                </Fragment>
                            }
                
                        </div>
                        {pd.review===0 ?
                            <div className="rating">
                                <i className="fas fa-star cartProductEmptyReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                            </div> :
                            pd.review===1 ?
                                <div className="rating">
                                    <i className="fas fa-star cartProductReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                </div> :
                                pd.review===2 ?
                                    <div className="rating">
                                        <i className="fas fa-star cartProductReview"/>
                                        <i className="fas fa-star cartProductReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                    </div> :
                                    pd.review===3 ?
                                        <div className="rating">
                                            <i className="fas fa-star cartProductReview"/>
                                            <i className="fas fa-star cartProductReview"/>
                                            <i className="fas fa-star cartProductReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                        </div> :
                                        pd.review===4 ?
                                            <div className="rating">
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                            </div> :
                                            <div className="rating">
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                            </div>
                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex">
                    <Link onClick={()=>this.onWishList(pd.index)}   className="card-icons leftCornerCardIcon"><i className="far fa-heart"/></Link>
                    <Link onClick={()=>this.onCompare(pd.index)}  className="card-icons"><i className="far fa-sync-alt"/></Link>
                    <Link onClick={()=>this.onCart(pd.index)} className="card-icons rightCornerCardIcon"><i className="far fa-shopping-cart "/></Link>
                </Card.Footer>
            </Card>
        })
        let product  = this.props.data.map((pd,i)=>{
            return   <Col key={i} lg={2}>
                <Card className="product-card" >
                    <div className="cardImgDiv  d-flex justify-content-center align-items-center">
                        <LazyLoadImage
                            placeholderSrc={process.env.PUBLIC_URL + "/heyshop.png"}
                            className="cardImg img-fluid"
                            variant="top"
                            src={`${this.context.backendApi}${pd.product_image}`}
                            width="200"
                            height="100"
                        />
                    </div>
                    <Card.Body>
                        <Card.Title><Link to={`product/`+pd.slug}  className="productTitle" >{pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." :  pd.product_name}</Link></Card.Title>
                        <Card.Text>
                            <div className="priceDiv">
                                {pd.product_discount!==undefined  ?
                                    <Fragment>
                                        <span className="discountPrice">${pd.product_discount}</span>
                                        <span className="regularPrice ml-3 mr-3"><del>${pd.product_price}</del></span>
                                    </Fragment> :
                                    <Fragment>
                                        <span className="regularPrice singlePrice ml-3 mr-3">${pd.product_price}</span>
                                    </Fragment>
                                }
                        
                            </div>
                            {pd.review===0 ?
                                <div className="rating">
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                </div> :
                                pd.review===1 ?
                                    <div className="rating">
                                        <i className="fas fa-star cartProductReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                    </div> :
                                    pd.review===2 ?
                                        <div className="rating">
                                            <i className="fas fa-star cartProductReview"/>
                                            <i className="fas fa-star cartProductReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                        </div> :
                                        pd.review===3 ?
                                            <div className="rating">
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                            </div> :
                                            pd.review===4 ?
                                                <div className="rating">
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductEmptyReview"/>
                                                </div> :
                                                <div className="rating">
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                </div>
                            }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex">
                        <Link onClick={()=>this.onWishList(pd.index)}   className="card-icons leftCornerCardIcon"><i className="far fa-heart"/></Link>
                        <Link onClick={()=>this.onCompare(pd.index)}  className="card-icons"><i className="far fa-sync-alt"/></Link>
                        <Link onClick={()=>this.onCart(pd.index)} className="card-icons rightCornerCardIcon"><i className="far fa-shopping-cart "/></Link>
                    </Card.Footer>
                </Card>
            </Col>
        })
        const placeholder = (
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
        );
        return (
            <Fragment>
                <section id="CategoryProduct" className="pt-5">
                    <Container>
                        <div className="div">
                            <Row>
                                <Col className="d-flex justify-content-between">
                                    <div className="TitleDiv">
                                        <span className="productCategory title">{this.props.title}</span>
                                    </div>
                                    <div>
                                        <Link to="/product/flash-sale-product" className="btn">Show More</Link>
                                    </div>
                                </Col>
                            </Row>
                            {this.props.loading ?
                                <Fragment>
                                    {placeholder}
                                </Fragment>
                                :
                                <Fragment>
                                    {this.props.data.length < 6 ?
                                        <Fragment>
                                            <Row>
                                                {product}
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
                                                        {allProduct}
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
            </Fragment>
        );
    }
}
export default ProductFromFeatured;
