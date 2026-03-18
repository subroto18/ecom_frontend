import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DesktopHeaderPart from "../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../Common/DesktopFooterPart";
import ProfileSideBar from "../Common/ProfileSideBar";

class SellerDashBoard extends PureComponent {
    render() {
        return (
      <Fragment>
        <DesktopHeaderPart/>
        <section id="sellerProfile">
          <Container className="py-5 p-0">
              <Row>
                <Col xl={3} lg={3} md={4} sm={2} xs={2} className="seller-dashboard-menu white-bg">
                 <ProfileSideBar/>
              </Col>
                <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                  {this.props.children}
              </Col>
            </Row>
          </Container>
        </section>
       <DesktopFooterPart/>
      </Fragment>
    );
  }
}
export default SellerDashBoard;
