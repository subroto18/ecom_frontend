import React, {PureComponent,Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
class CopyRight extends PureComponent {
    componentDidMount() {
        let year = new Date();
        document.getElementById('year').innerHTML = year.getFullYear();
    }
    render() {
        return (
            <Fragment>
                <Container fluid={true} className="all-rights text-center">
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <p><i className="fal fa-copyright "></i> 2012 -<span id="year"></span> HeyShop.net</p>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}
export default CopyRight;
