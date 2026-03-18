import React, {PureComponent,Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import dynamic from "next/dynamic"
import {connect} from "react-redux";
const MobileProduct = dynamic(() => import("../MobileProductCard/MobileProduct"));
class MobileRelatedProduct extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        let link = this.props.singleProductSlug;
        const data = {
            link:link
        }
        Api().post('getRelatedProduct',data).then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch(error=>{})
    }

    render() {
        return (
                <Fragment>
                    <section className="pb-5">
                            <div className="div relatedProductPart">
                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv">
                                            <span className="productCategory title">Related product</span>
                                        </div>
                                        <div>
                                        </div>
                                    </Col>
                                </Row>
                                <MobileProduct  loading={this.state.loading} data={this.state.data}  />
                            </div>
                    </section>
                </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const singleProductSlug = state.productReducer.singleProductSlug;
    return {
        singleProductSlug
    };
}

export default connect(mapStateToProps)(MobileRelatedProduct);

