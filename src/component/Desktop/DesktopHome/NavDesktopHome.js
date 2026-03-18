import React, { Fragment, Component } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Link from "next/link";
import Api from "../../../ClientApi/Api";
import { connect } from "react-redux";
import Search from "../Common/Search";
import { startLoading } from "../../../services/common";
import { logout } from "../../../services/actions/userAction";
import Photo from "../../CommonScreen/Image/Photo";
class NavDesktopHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "mainNav",
      cartItem: 1,
      compareItem: 1,
      wishlistItem: 1,
      value: "",
      suggestions: [],
      name: "",
      progress: 0,
      logo: "",
    };
    this.onLogout = this.onLogout.bind(this);
    this.onPageLoadProgress = this.onPageLoadProgress.bind(this);
  }

  fixedTop = () => {
    if (window.scrollY > 30) {
      this.setState({
        header: "mainNav sticky-top",
      });
    } else {
      this.setState({
        header: "mainNav",
      });
    }
  };
  onPageLoadProgress(e) {
    this.setState({
      progress: e,
    });
  }

  onLogout() {
    startLoading();

    Api()
      .get("logout")
      .then((res) => {
        this.props.logout();
      })
      .catch((error) => {});
  }

  render() {
    if (this.props.stickyHeader === 1) {
      window.addEventListener("scroll", this.fixedTop);
    }
    const compare = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        compare
      </Tooltip>
    );
    const wishlist = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        wishlist
      </Tooltip>
    );
    const cart = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        cart
      </Tooltip>
    );
    const profile = (props) => (
      <Tooltip id=" " {...props}>
        profile
      </Tooltip>
    );

    console.log(
      this.props.backendApi,
      this.props.logo,
      "this.props.backendApi",
    );

    return (
      <Fragment>
        <header className={this.state.header}>
          <Container>
            <nav className="navbar">
              <Row className="w-100 navbarRow">
                <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Link href="/" className="navbar-brand-logo">
                    <div className="logoImgDiv">
                      {this.props.logo == undefined ? (
                        <Fragment>
                          <Photo
                            src="/logo.png"
                            blurDataURL="/logo.png"
                            class="logo"
                          />
                        </Fragment>
                      ) : (
                        <Fragment>
                          {this.props.logo == null ? (
                            <Photo
                              src="/logo.png"
                              blurDataURL="/logo.png"
                              class="logo"
                            />
                          ) : (
                            <Photo
                              src={this.props.backendApi + this.props.logo}
                              blurDataURL="/logo.png"
                              class="logo"
                            />
                          )}
                        </Fragment>
                      )}
                    </div>
                  </Link>
                </Col>
                <Col xl={7} lg={7} md={7} sm={12} xs={12}>
                  <Search />
                </Col>
                <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                  <ul className="cart-function d-flex justify-content-center align-items-center">
                    <li className="compare-nav-item">
                      <Link
                        href="/compare"
                        title="Compare"
                        className="cartIcon"
                      >
                        <i className="far fa-sync-alt faCartIcon" />{" "}
                        <sup>
                          <span className="badge text-white bg-danger">
                            {this.props.compareProductId.length}
                          </span>
                        </sup>
                      </Link>
                    </li>
                    <li className="wishlist-nav-item">
                      {this.props.isAuthorized ? (
                        <>
                          <Link
                            title="Wishlish"
                            href="/wishlist"
                            className="cartIcon"
                          >
                            <i className="far fa-heart faCartIcon" />{" "}
                            <sup>
                              <span className="badge text-white bg-danger">
                                {this.props.wishlistItem}
                              </span>
                            </sup>
                          </Link>
                        </>
                      ) : (
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={wishlist()}
                        >
                          <Link href="/login">
                            <i className="far fa-heart faCartIcon" />
                          </Link>
                        </OverlayTrigger>
                      )}
                    </li>
                    <li className="cart-nav-item">
                      {this.props.isAuthorized ? (
                        <Link title="Cart" href="/cart" className="cartIcon">
                          <i className="far fa-cart-plus faCartIcon"></i>{" "}
                          <sup>
                            <span className="badge text-white bg-danger">
                              {this.props.cartItem}
                            </span>
                          </sup>
                        </Link>
                      ) : (
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={cart()}
                        >
                          <Link href="/login">
                            <i className="far fa-cart-plus faCartIcon" />
                          </Link>
                        </OverlayTrigger>
                      )}
                    </li>
                    {this.props.isAuthorized ? (
                      <>
                        {["bottom"].map((placement) => (
                          <OverlayTrigger
                            trigger="click"
                            key={placement}
                            placement={placement}
                            overlay={
                              <Popover id={`popover-positioned-${placement}`}>
                                <Popover.Content>
                                  <ul className="popoverUl">
                                    <li>
                                      <Link
                                        className="accountLink"
                                        href="/dashboard"
                                      >
                                        <i className="far fa-user mr-2"></i> My
                                        Account{" "}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        href=""
                                        onClick={this.onLogout}
                                        className="accountLink"
                                      >
                                        <i className="far fa-sign-out-alt mr-2"></i>{" "}
                                        LogOut{" "}
                                      </Link>
                                    </li>
                                  </ul>
                                </Popover.Content>
                              </Popover>
                            }
                          >
                            <Button variant="loginBtn">
                              <i className="far fa-user-circle faCartIcon"></i>
                            </Button>
                          </OverlayTrigger>
                        ))}
                      </>
                    ) : (
                      <li>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={profile}
                        >
                          <Link href="/login">
                            <i className="far fa-user-circle faCartIcon"></i>
                          </Link>
                        </OverlayTrigger>
                      </li>
                    )}
                  </ul>
                </Col>
              </Row>
            </nav>
          </Container>
        </header>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

function mapStateToProps(state) {
  const logo = state.starterReducer.logo;
  const backendApi = state.starterReducer.backendApi;
  const compareProductId = state.compareReducer.compareProductId;
  const isAuthorized = state.userReducer.isAuthorized;
  const wishlistItem = state.wishlistReducer.wishlistItem;
  const cartItem = state.cartReducer.cartItem;
  const stickyHeader = state.starterReducer.stickyHeader;
  const compareItem = state.compareReducer.compareItem;

  return {
    logo,
    backendApi,
    compareProductId,
    isAuthorized,
    wishlistItem,
    cartItem,
    stickyHeader,
    compareItem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDesktopHome);
