import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../../services/common";
import Photo from "../../../CommonScreen/Image/Photo";
import Link from "next/link";
import Reviews from "../../../CommonScreen/Reviews/Reviews";


class FeaturedTopRatedTrendingProductCard extends PureComponent {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }


    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    render() {
        let data  = this.props.data;
        let loading = this.props.loading;
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        const settings = {
            dots: false,
            infinite: false,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            marginRight:15,
        };
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const placeholder = (
            <Fragment>
                { Array.apply(null, { length: 4 }).map((e, i) => (
                    <p key={i} className="dealLink">
                        <Card className="product-card featured-trending-topRated-product-card">
                            <div className="d-flex">
                                <div className="cardImgDiv d-flex align-items-center">
                                    <MyLoader/>
                                </div>
                                <Card.Body className="d-flex justify-content-center align-items-center">
                                    <div>
                                        <Card.Text>
                                            <div>
                                                {symbolFormat===1 ?
                                                    <span className="regularPrice">{onCurrencyFormat(0)}{defaultCurrency}</span>
                                                    :
                                                    <span className="regularPrice">{defaultCurrency}{onCurrencyFormat(0)}</span>
                                                }
                                            </div>
                                            <div className="rating">
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                            </div>
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </p>
                ))
                }

            </Fragment>
        );
        // if product less than 4
        const product =   data.map((pd,i)=>{
                return   <Link key={i} className="dealLink" href={`product/${pd.slug}`} >
                    <Card className="product-card featured-trending-topRated-product-card">
                        <div className="d-flex">
                            <div className="cardImgDiv d-flex align-items-center">
                                <Photo
                                    src={`${this.props.backendApi}${pd.product_image}`}
                                    blurDataURL={`${this.props.backendApi}${pd.product_image}`}
                                    class=""
                                />

                            </div>
                            <Card.Body className="d-flex justify-content-center align-items-center">
                                <div>
                                    <Card.Title><span className="productTitle" > {  pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." :  pd.product_name} </span></Card.Title>
                                     <Card.Text>
                                          <Card.Text>
                                                 <div className="priceDiv">
                                                     {symbolFormat===1 ?
                                                         <Fragment>
                                                             {pd.discount_price!==undefined  ?
                                                                 <Fragment>
                                                                     <p className="discountPrice">{onCurrencyFormat(pd.discount_price)}{defaultCurrency}</p>
                                                                     <p className="regularPrice ml-3 mr-3"><del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del></p>
                                                                 </Fragment> :
                                                                 <Fragment>
                                                                     <p className="regularPrice singlePrice ml-3 mr-3">{onCurrencyFormat(pd.product_price)}{defaultCurrency}</p>
                                                                 </Fragment>
                                                             }
                                                         </Fragment> :
                                                         <Fragment>
                                                             {pd.discount_price!==undefined  ?
                                                                 <Fragment>
                                                                     <span className="discountPrice">{defaultCurrency}{onCurrencyFormat(pd.discount_price)}</span>
                                                                     <span className="regularPrice ml-3 mr-3"><del>{defaultCurrency}{onCurrencyFormat(pd.product_price)}</del></span>
                                                                 </Fragment> :
                                                                 <Fragment>
                                                                     <span className="regularPrice singlePrice ml-3 mr-3">{defaultCurrency}{onCurrencyFormat(pd.product_price)}</span>
                                                                 </Fragment>
                                                             }
                                                         </Fragment>
                                                     }
                                                     <Reviews value={pd.review}/>
                                                 </div>
                                             </Card.Text>
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                </Link>
        })
        // if product more than 4
        const allProduct =   data.map((pd,i)=>{
            return   <Link key={i} className="dealLink" href={`product/${pd.slug}`} >
                <Card className="product-card featured-trending-topRated-product-card">
                    <div className="d-flex">
                        <div className="cardImgDiv d-flex align-items-center">
                            <Photo
                                src={`${this.props.backendApi}${pd.product_image}`}
                                blurDataURL={`${this.props.backendApi}${pd.product_image}`}
                                class=""
                            />

                        </div>
                        <Card.Body className="d-flex justify-content-center align-items-center">
                            <div>
                                <Card.Title><span className="productTitle" > {  pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." :  pd.product_name} </span></Card.Title>
                                <Card.Text>
                                    <Card.Text>
                                        <div className="priceDiv">
                                            {symbolFormat===1 ?
                                                <Fragment>
                                                    {pd.discount_price!==undefined  ?
                                                        <Fragment>
                                                            <p className="discountPrice">{onCurrencyFormat(pd.discount_price)}{defaultCurrency}</p>
                                                            <p className="regularPrice ml-3 mr-3"><del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del></p>
                                                        </Fragment> :
                                                        <Fragment>
                                                            <p className="regularPrice singlePrice ml-3 mr-3">{onCurrencyFormat(pd.product_price)}{defaultCurrency}</p>
                                                        </Fragment>
                                                    }
                                                </Fragment> :
                                                <Fragment>
                                                    {pd.discount_price!==undefined  ?
                                                        <Fragment>
                                                            <span className="discountPrice">{defaultCurrency}{onCurrencyFormat(pd.discount_price)}</span>
                                                            <span className="regularPrice ml-3 mr-3"><del>{defaultCurrency}{onCurrencyFormat(pd.product_price)}</del></span>
                                                        </Fragment> :
                                                        <Fragment>
                                                            <span className="regularPrice singlePrice ml-3 mr-3">{defaultCurrency}{onCurrencyFormat(pd.product_price)}</span>
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                            }
                                            <Reviews value={pd.review}/>
                                        </div>
                                    </Card.Text>
                                </Card.Text>
                            </div>
                        </Card.Body>
                    </div>
                </Card>
            </Link>
        })
        return (
            <Fragment>
                   <div className="featured-trending-topRated">
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <div className="TitleDiv">
                                <span className="productCategory title">{this.props.title}</span>
                            </div>
                            <div>
                                <Link href={this.props.link} className="btn">Show More</Link>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        {loading ?
                            <Fragment>{placeholder}</Fragment>
                            :
                            <Fragment>{data.length <4 ?
                                <Fragment>
                                    {allProduct}
                                </Fragment>:
                                <Fragment>
                                    <Slider vertical={true} ref={c => (this.slider = c)}  {...settings}>
                                        {product}
                                    </Slider>
                                    <div className="arrowBtn m-auto">
                                        <Button  className="mr-3" onClick={this.previous}><i className="far fa-chevron-left"/></Button>
                                        <Button  className="" onClick={this.next} ><i className="far fa-chevron-right"/></Button>
                                    </div>
                                </Fragment>
                            }</Fragment>
                        }
                    </div>
                </div>

            </Fragment>
        );
    }
}




const mapDispatchToProps = {

};

function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat

    return {
        backendApi,
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedTopRatedTrendingProductCard);



