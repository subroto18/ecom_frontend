import React, { Fragment, Component} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {delWishlistProduct} from "../../../../../services/actions/wishlishAction";
import {cartVariationShow} from "../../../../../services/actions/productAction";
import Link from "next/link";
import Photo from "../../../Image/Photo";
import Reviews from "../../../Reviews/Reviews";
class UserWishlistPart extends Component {
    constructor(props) {
        super(props);
    }

    onDelete(e){
        if(window.confirm('Are you sure you want to delete this item?')){
            this.props.delWishlistProduct(e);
        }

    }
    onAddCart(index){
        this.props.cartVariationShow(index);
    }

    render() {

        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                {this.props.wishlistProductLoadingStatus==true ?
                    <Fragment>
                        <div className="">
                            {loader}
                        </div>
                    </Fragment>:
                    <Fragment>
                        {this.props.wishlistProduct.length>0 ?
                            <Fragment>
                                <Row className="profileRow">
                                    {this.props.wishlistProduct.length>0 ?
                                        <Fragment>
                                            {this.props.wishlistProduct.map((pd,i)=>{
                                                return   <Col key={i} xl={3} lg={3} md={4} sm={4} xs={6} className="mb-2 wishlistCol">
                                                    <Card className="wishlist-card product-card">
                                                        <Link href={"/product/"+pd.slug}>
                                                            <div className="text-center">
                                                              <div className="cardImg">
                                                                  <Photo
                                                                      src={`${this.props.backendApi}${pd.product_image}`}
                                                                      blurDataURL="/blank.jpg"
                                                                      class="img-fluid"
                                                                      className="empty"
                                                                  />
                                                              </div>
                                                            </div>
                                                            <Card.Body>
                                                                <Card.Title>{  pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." :  pd.product_name}</Card.Title>
                                                                <Card.Text>
                                                                    <div>
                                                                        {pd.product_discount!==undefined  ?
                                                                            <Fragment>
                                                                                <span className="discountPrice">${pd.product_discount}</span>
                                                                                <span className="regularPrice ml-3 mr-3"><del>${pd.product_price}</del></span>
                                                                            </Fragment> :
                                                                            <Fragment>
                                                                                <span className="regularPrice ml-3 mr-3">${pd.product_price}</span>
                                                                            </Fragment>
                                                                        }

                                                                    </div>
                                                                    <Fragment>
                                                                        <Reviews value={pd.review} />
                                                                    </Fragment>
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Link>
                                                        <Card.Footer className="d-flex wishlist-card-footer-div">
                                                            <Button onClick={()=>this.onDelete(pd.index)}  className="wishlist-card-icons wci1"><i className="far fa-trash"></i></Button>
                                                            <Button onClick={()=>this.onAddCart(pd.index)} className="wishlist-card-icons watc">Add to cart</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                            })}
                                        </Fragment>:
                                        <Fragment>
                                            <div className="EmptyDiv py-5">
                                                <p>Your Wishlist cart is empty</p>
                                            </div>
                                        </Fragment>
                                    }
                                </Row>
                            </Fragment>
                            :
                            <Fragment>
                                <div className="emptyPage">
                                    <div className="py-5">
                                        <div className="text-center pageContent">
                                            <h2 className='text-muted iconSize'><i className="far fa-heart"/></h2>
                                            <h6 className='text-muted'>There is no wishlist product  yet</h6>
                                            <Link href="/"><div className='btn btn-outline-warning text-uppercase'>Continue Shopping</div></Link>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </Fragment>
                }
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    delWishlistProduct,
    cartVariationShow
};


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    const wishlistProductLoadingStatus = state.wishlistReducer.wishlistProductLoadingStatus;
    const wishlistProduct = state.wishlistReducer.wishlistProduct;

    return {
        backendApi,
        wishlistProductLoadingStatus,
        wishlistProduct
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UserWishlistPart);
