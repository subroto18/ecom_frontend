import React, {PureComponent, Fragment} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DesktopHeaderPart from "../../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../../Common/DesktopFooterPart";
import Photo from "../../../../CommonScreen/Image/Photo";
import UserRegistrationPart from "../../../../CommonScreen/Registration/UserRegistrationPart";

class UserRegistration extends PureComponent {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                   <Container className="p-5 fullContainer">
                    <Row className="white-bg">
                        <Col lg={6} md={6} sm={12} xs={12} className="p-3">
                            <UserRegistrationPart/>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12} className="p-3">
                            <Photo
                                src="/login.png"
                                blurDataURL="/login.png"
                                class=""
                                className="empty"
                            />
                        </Col>
                    </Row>
                </Container>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}

export default UserRegistration;
