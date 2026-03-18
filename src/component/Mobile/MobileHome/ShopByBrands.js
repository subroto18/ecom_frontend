import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import VisibilitySensor from "react-visibility-sensor";
import {topTenBrands} from "../../../services/actions/brandAction";
import {connect} from "react-redux";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";

class ShopByBrands extends PureComponent {


    onVisible = (isVisible) => {
        if (isVisible) {
            if (this.props.topTenBrandsApi !== true) {
                Api().get('topTenBrands').then(res => {
                    this.props.topTenBrands(res.data);
                })
            }
        }
    }


    render() {
        let data = this.props.topTenBrandsData;
        let loading = this.props.topTenBrandsLoading;
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
            </ContentLoader>
        );
        const preloader = <Fragment>
                    {Array.apply(null, {length: 8}).map((e, i) => (
                        <Col key={1} sm={4} xs={4} className="csadjust">
                            <Card className="product-card">
                                <div className="cardImgDiv mobile-category  d-flex justify-content-center align-items-center">
                                    <MyLoader/>
                                </div>
                            </Card>
                        </Col>
                    ))
                    }
        </Fragment>

        const brands = data.map((pd, index) => {
            return <Col key={index} sm={4} xs={4} className="csadjust d-flex align-items-center">
                <Link href={{pathname: '/product/brand/' + pd.slug,}}>
                    <Card className="product-card">
                        <div className="cardImgDiv brandShopDiv">
                            <Photo
                                src={pd.logo !== null ? `${this.props.backendApi}${pd.logo}` : "/blank.jpg"}
                                blurDataURL={pd.logo !== null ? `${this.props.backendApi}${pd.logo}` : "/blank.jpg"}
                                class="brandShopPic"
                                className="empty"
                            />

                        </div>
                    </Card>
                    <div className="card-body mobile-cb-card-div">
                        <p className="pcb-name ">{pd.name}</p>
                    </div>
                </Link>
            </Col>
        })

        if(loading){
            return <Fragment>
                     <VisibilitySensor onChange={this.onVisible}>
                    <section id="shopByBrands">
                        <Container>
                            <div className="div">
                                <Row>
                                    <Col className="d-flex justify-content-between">
                                        <div className="TitleDiv">
                                    <span
                                        className="productCategory title">Top {data.length > 0 ? data.length : 10} Brands</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Fragment>{preloader}</Fragment>
                                </Row>
                            </div>
                        </Container>
                    </section>
                </VisibilitySensor>
                  </Fragment>
        }else if(brands.length>0){
            return   <VisibilitySensor onChange={this.onVisible}>
                <section id="shopByBrands">
                    <Container>
                        <div className="div">
                            <Row>
                                <Col className="d-flex justify-content-between">
                                    <div className="TitleDiv">
                                    <span
                                        className="productCategory title">Top {data.length > 0 ? data.length : 10} Brands</span>
                                    </div>
                                    <div>
                                        <Link href="/product/all-brands/" className="btn">Show More</Link>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Fragment> {brands}</Fragment>
                            </Row>
                        </div>
                    </Container>
                </section>
            </VisibilitySensor>
        }else{
            return <Fragment/>
        }

    }
}


const mapDispatchToProps = {
    topTenBrands
};

function mapStateToProps(state) {
    const topTenBrandsApi = state.brandReducer.topTenBrandsApi;
    const topTenBrandsData = state.brandReducer.topTenBrandsData;
    const backendApi = state.starterReducer.backendApi;
    return {
        topTenBrandsApi,
        backendApi,
        topTenBrandsData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopByBrands);
