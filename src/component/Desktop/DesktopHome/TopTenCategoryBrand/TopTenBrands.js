 import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Api from "../../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
 import VisibilitySensor from "react-visibility-sensor";
 import {topTenBrands} from "../../../../services/actions/brandAction";
 import {connect} from "react-redux";
 import Link from "next/link";
 import Photo from "../../../CommonScreen/Image/Photo";
class TopTenBrands extends PureComponent {

    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.topTenBrandsApi!==true){
                Api().get('topTenBrands').then(res=>{
                    this.props.topTenBrands(res.data);
                })
            }
        }
    }

    render() {
        let data = this.props.topTenBrandsData;
        let loading =  this.props.topTenBrandsLoading;
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const preloader  = <Fragment>
                                { Array.apply(null, { length: 10 }).map((e, i) => (
                                    <Col key={i} xl={4} lg={4}>
                                        <Card className="brand-card">
                                            <Card.Body className="brandsBody">
                                                <div className="d-flex">
                                                    <div className="brandIng">
                                                        <MyLoader/>
                                                    </div>
                                                    <div className="brandName d-flex justify-content-center align-items-center">
                                                        <p className="brandTitle">Brand name</p>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                }
        </Fragment>
        const brands = data.map((pd,i)=>{
            return  <Col key={i} xl={4} lg={4} md={4}>
                <Link href={{pathname: '/product/brand/'+pd.slug}}>
                    <Card className="brand-card">
                        <Card.Body className="brandsBody">
                            <div className="d-flex">
                                <div className="brandIng">

                                    <Photo
                                        src={pd.logo!==null?`${this.props.backendApi}${pd.logo}`: "/blank.jpg"}
                                        blurDataURL={pd.logo!==null?`${this.props.backendApi}${pd.logo}`:"/blank.jpg"}
                                        class=""
                                    />

                                </div>
                                <div className="brandName d-flex justify-content-center align-items-center">
                                    <p className="brandTitle">{pd.name}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        })

        if(loading){
            return <Fragment>
                <VisibilitySensor onChange={this.onVisible}>
                    <div className="div">
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <div className="TitleDiv">
                                    <span className="productCategory title">Top {data.length > 0 ? data.length : 10} Categories</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {preloader}
                        </Row>
                    </div>
                </VisibilitySensor>
            </Fragment>
        }else if(brands.length>0){
            return <VisibilitySensor onChange={this.onVisible}>
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
                        {loading ?
                            <Fragment>{preloader}</Fragment>
                            :
                            <Fragment> {brands}</Fragment>
                        }
                    </Row>
                </div>
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

 export default connect(mapStateToProps, mapDispatchToProps)(TopTenBrands);
