import React, {PureComponent, Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Api from "../../../ClientApi/Api";
import 'react-placeholder/lib/reactPlaceholder.css';
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import ProductCard from "../ProductCard/ProductCard";
class AllTopRatedProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            loading:true,
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        Api().get('getAllTopRatedProduct').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        })
    }
    render() {
        return (
                <Fragment>
                    <DesktopHeaderPart/>
                    <section id="newArrival" className="pt-5">
                        <Container>
                            <div className="div">
                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv">
                                            <span className="productCategory title">Top Rated Product</span>
                                        </div>
                                    </Col>
                                </Row>
                                <ProductCard sliderProduct={false} data={this.state.data} loading={this.state.loading}/>
                            </div>
                        </Container>
                    </section>
                    <DesktopFooterPart/>
                </Fragment>
        );
    }
}
export default AllTopRatedProduct;
