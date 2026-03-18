import React, {PureComponent, Fragment} from "react";
import 'react-toastify/dist/ReactToastify.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import LoginPart from "../../CommonScreen/Login/LoginPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import Photo from "../../CommonScreen/Image/Photo";

class DesktopLogin extends PureComponent {
    render() {
        return <Fragment>
                  <DesktopHeaderPart/>
                     <Container className="p-5 my-5">
                       <Row className="loginRow">
                        <Col lg={6} md={6} sm={6} xs={6} className="p-3">
                            <Photo
                                src="/login.png"
                                blurDataURL="/login.png"
                                class=""
                                className="empty"
                            />
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12} className="login-input-group p-3 ">
                            <LoginPart/>
                        </Col>
                    </Row>
                    </Container>
                  <DesktopFooterPart/>
               </Fragment>
    }
}
export default DesktopLogin;
