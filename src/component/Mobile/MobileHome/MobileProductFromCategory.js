import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from "next/link";
import dynamic from "next/dynamic";
const MobileProduct = dynamic(() => import('../MobileProductCard/MobileProduct'), {
    ssr: false,
})

class MobileProductFromCategory extends PureComponent {
    componentDidMount() {
        this.setState({
            data:this.props.product
        })
    }

    render() {
        return (
            <Fragment>
                <section className="py-4">
                    <Container>
                        <div className="div">
                            <Row >
                                <Col className="d-flex justify-content-between">
                                    <div className="TitleDiv">
                                        <span className="productCategory title">{this.props.category}</span>
                                    </div>
                                    <div>
                                        <Link href={this.props.slug} className="btn">Show More</Link>
                                    </div>
                                </Col>
                            </Row>
                            <MobileProduct data={this.props.product} loading={false}  />
                        </div>
                    </Container>
                </section>
            </Fragment>
        );
    }
}
export default MobileProductFromCategory;