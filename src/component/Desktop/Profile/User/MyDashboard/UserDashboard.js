import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DesktopHeaderPart from "../../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../../Common/DesktopFooterPart";
import ProfileSideBar from "../../Common/ProfileSideBar";
class UserDashboard extends PureComponent {
    render() {
            return (
                <Fragment>
                    <DesktopHeaderPart/>
                    <Container className="pt-5 pb-5">
                        <Row className="dashboard-row">
                                <Fragment>
                                    <Col xl={3} lg={3} md={4}  className="accountInfoDivCol">
                                        <ProfileSideBar/>
                                    </Col>
                                    <Col xl={9} lg={9} md={8}>
                                        {this.props.children}
                                    </Col>
                                </Fragment>
                        </Row>
                    </Container>
                     <DesktopFooterPart/>
                </Fragment>
            );
    }
}
export default UserDashboard;