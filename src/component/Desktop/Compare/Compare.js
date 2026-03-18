import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PopupLogin from "../Profile/PopupLogin";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import ComparePart from "../../CommonScreen/Compare/ComparePart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import CartVariationModal from "../../CommonScreen/Modal/CartVariationModal";
import CartSuccessModal from "../../CommonScreen/Modal/CartSuccessModal";
class Compare extends PureComponent {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <Fragment>
                    <section id="compare" className="pt-5">
                        <Container>
                                <Fragment>
                                    <div className="div">
                                        <Row>
                                            <Col className="justify-content-between">
                                                <div className="TitleDiv">
                                                    <span className="productCategory title">Compare</span>
                                                </div>
                                                <Fragment>
                                                    <ComparePart/>
                                                </Fragment>
                                            </Col>
                                        </Row>
                                    </div>
                                </Fragment>
                        </Container>
                    </section>
                </Fragment>
                <DesktopFooterPart/>
                <CartVariationModal/>
                <CartSuccessModal/>
                <PopupLogin/>
            </Fragment>
        );
    }
}
export default Compare;