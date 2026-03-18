import React, {PureComponent, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DesktopHeaderPart from "../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../Common/DesktopFooterPart";
import SellerRegistrationPart from "../../../CommonScreen/Registration/SellerRegistrationPart";
import Photo from "../../../CommonScreen/Image/Photo";
class SellerRegistration extends PureComponent {

    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <section id="sellerRegistration">
                    <Container className='sellerContainer p-5'>
                        <Row>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Photo
                                    src="/login.png"
                                    blurDataURL="/login.png"
                                    class=""
                                    className="empty"
                                />
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} className="register-input-group">
                                <SellerRegistrationPart/>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}

export default SellerRegistration;
