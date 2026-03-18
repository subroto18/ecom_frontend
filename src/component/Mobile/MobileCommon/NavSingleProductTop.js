import React, {PureComponent, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import Link from "next/link";
class NavSingleProductTop extends PureComponent {

    render() {
        return (
            <Fragment>
                <header className="mainNav">
                    <Container>
                        <nav  className="navbar d-flex justify-content-between">
                            <div className="nav-single-product-left-icon">
                                <Link  href="/" className="nav-singleProduct-icon-link"><i   className="far fa-arrow-left nav-singleProduct-icon"/></Link>
                            </div>
                            <div className="nav-single-product-right-icon-div">
                                {this.props.isAuthorized ?
                                <Link className="nav-singleProduct-icon-link cart" href="/cart">
                                    <i className="far fa-shopping-cart nav-singleProduct-icon"/>
                                    <sup className="nav-singleProduct-icon-link-sup-"><span className="badge text-white bg-danger">{this.props.cartItem}</span></sup>
                                </Link> :
                                    <Link className="nav-singleProduct-icon-link cart" href="/cart">
                                        <i className="far fa-shopping-cart nav-singleProduct-icon"/>
                                        <sup className="nav-singleProduct-icon-link-sup-"><span className="badge text-white bg-danger">0</span></sup>
                                    </Link>
                                }

                            </div>
                        </nav>
                    </Container>
                </header>
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const cartItem = state.cartReducer.cartItem;
    return {
        isAuthorized,
        cartItem
    };
}

export default connect(mapStateToProps)(NavSingleProductTop);

