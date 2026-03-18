import React, {PureComponent, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
class NavUserTop extends PureComponent {
    render() {
        return (
            <Fragment>
                <header className="mainNav">
                    <Container>
                        <nav  className="navbar d-flex justify-content-between">
                            <div className="nav-single-product-left-icon d-flex">
                                <Link  to="/" className="nav-singleProduct-icon-link"><i  onClick={this.onPreviousPage} className="far fa-arrow-left nav-singleProduct-icon"/></Link>
                                <p className="user-title">{this.props.title}</p>
                            </div>
                            <div className="nav-single-product-right-icon-div">
                                <Link className="nav-singleProduct-icon-link"> <i className="far fa-ellipsis-h nav-singleProduct-icon ml-3"/></Link>
                            </div>
                        </nav>
                    </Container>
                </header>
            </Fragment>
        );
    }
}
export default NavUserTop;