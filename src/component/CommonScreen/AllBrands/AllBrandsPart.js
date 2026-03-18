import React, {PureComponent,Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContentLoader from "react-content-loader";
import Api from "../../../ClientApi/Api";
import Photo from "../Image/Photo";
import {connect} from "react-redux";

class AllBrandsPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        Api().get('getAllBrands').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch(error=>{})
    }

    render() {
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
        );
        const loader =  <Row>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
            <Col lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">
                    <MyLoader/>
                </div>
            </Col>
        </Row>

        const mobileLoader =  <div  className="mobile-pre-loader">
                                <div className="loader-spinner">
                                    <div className="spinner-border text-muted"/>
                                </div>
                              </div>

        const brand = this.state.data.map((pd,i)=>{
            return  <Col key={i} lg={2} md={2} sm={4} xs={4} className="text-center p-3">
                <div className="brand-img">

                    <Photo
                        src={pd.brandIcon!=null?`${this.props.backendApi}${pd.brandIcon}`: "/blank.jpg"}
                        blurDataURL="/blank.jpg"
                        class="img-fluid"
                    />

                </div>
            </Col>
        });


        return (
            <Fragment>
                <section id="allBrands">
                    <Container className="py-5">
                        <div className="div">
                            {this.props.mobile?
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className="white-bg">
                                        {this.state.loading ?
                                            <Fragment>
                                                {mobileLoader}
                                            </Fragment> :
                                            <Row>
                                                {brand}
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                                        <div>
                                            <div className="allBrand TitleDiv">
                                                <div >
                                                    <span className="allBrand title ">All Brand</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12} className="white-bg">
                                        {this.state.loading ?
                                            <Fragment>
                                                {loader}
                                            </Fragment> :
                                            <Row>
                                                {brand}
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                            }
                        </div>
                    </Container>
                </section>
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(AllBrandsPart);
