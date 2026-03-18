import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {connect} from "react-redux";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";

class NavMobileBottom extends PureComponent {

    render() {
        return (
            <Fragment>
                <section id="navigationBar">
                        <div className="mobile-nav">
                            <Container>
                            <Row className="w-100 mobile-nav">
                                <Col className="navCol mobileFooterMenu">
                                    <div className="wishlist text-center mobile-nav-icon-div">
                                        {this.props.isAuthorized ?
                                            <Link className="nav-bar-mobile-link active"  href="/wishlist"><i className="far fa-heart mobile-nav-icon"/> <sup className="nav-home-sup"><span className="bIcon">{this.props.wishlistItem}</span></sup>
                                                <span className="mobile-category-nav-title">Wishlist</span>
                                            </Link>:
                                            <Link className="nav-bar-mobile-link active"  href="/login"><i className="far fa-heart mobile-nav-icon"/> <sup className="nav-home-sup"><span className="bIcon">{0}</span></sup>
                                                <span className="mobile-category-nav-title">Wishlist</span>
                                            </Link>
                                        }
                                    </div>
                                </Col>
                                <Col className="navCol mobileFooterMenu">
                                    <div className="categories text-center mobile-nav-icon-div">
                                        <Link className="nav-bar-mobile-link active"  href="/product/all-categories"><i className="far fa-list mobile-nav-icon"/>
                                            <span className="mobile-category-nav-title">Category</span>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className="navCol mobileFooterMenu">
                                    <div className="mobile-icon">
                                        <Link href='/'  >
                                            <div className="mobile-icon-div">
                                                <Photo
                                                    src="/home.png"
                                                    blurDataURL="/home.png"
                                                    class="nav-icon"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className="navCol mobileFooterMenu">
                                    <div className="cart text-center mobile-nav-icon-div">
                                        {this.props.isAuthorized ?
                                            <Link  className="nav-bar-mobile-link active"  href="/cart" ><i className="far fa-cart-plus mobile-nav-icon"/> <sup className="nav-home-sup"><span className="bIcon">{this.props.cartItem}</span></sup>
                                                <span className="mobile-category-nav-title">Cart</span>
                                            </Link>:
                                            <Link  className="nav-bar-mobile-link active"  href="/login" ><i className="far fa-cart-plus mobile-nav-icon"/> <sup className="nav-home-sup"><span className="bIcon">0</span></sup>
                                                <span className="mobile-category-nav-title">Cart</span>
                                            </Link>
                                        }
                                    </div>
                                </Col>
                                <Col className="navCol mobileFooterMenu">
                                    <div className="account text-center mobile-nav-icon-div">
                                        {this.props.isAuthorized ?
                                            <Link className="nav-bar-mobile-link active" href="/dashboard"><i
                                                className="far fa-user-circle mobile-nav-icon"/>
                                                <span className="mobile-category-nav-title">Profile</span>
                                            </Link> :
                                            <Link className="nav-bar-mobile-link active" href="/login"><i
                                                className="far fa-user-circle mobile-nav-icon"/>
                                                <span className="mobile-category-nav-title">Profile</span>
                                            </Link>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            </Container>
                        </div>
                </section>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
   const isAuthorized = state.starterReducer.isAuthorized;
   const wishlistItem = state.wishlistReducer.wishlistItem;
   const cartItem = state.cartReducer.cartItem;
    return {
        isAuthorized,
        wishlistItem,
        cartItem
    };
}





export default connect(mapStateToProps)(NavMobileBottom);

