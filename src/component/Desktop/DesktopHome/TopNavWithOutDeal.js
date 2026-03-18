import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MegaMenu from "./MegaMenu";
import HomeSlider from "./HomeSlider";
class TopNavWithOutDeal extends PureComponent {
    render() {
        return (
            <Fragment>
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <MegaMenu/>
                            </Col>
                            <Col lg={9}>
                                <HomeSlider/>
                            </Col>
                        </Row>
                    </Container>
            </Fragment>
        );
    }
}
export default TopNavWithOutDeal;