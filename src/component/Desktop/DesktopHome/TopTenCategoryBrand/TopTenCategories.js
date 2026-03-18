import React, {Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Api from "../../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import VisibilitySensor from "react-visibility-sensor";
import Link from "next/link";
import Photo from "../../../CommonScreen/Image/Photo";
import {topTenCategories} from "../../../../services/actions/categoryAction";
import {connect} from "react-redux";

class TopTenCategories extends React.PureComponent {


    onVisible = (isVisible) => {
        if (isVisible) {
            if (this.props.topTenCategoriesApi !== true) {
                Api().get('topTenCategories').then(res => {
                    this.props.topTenCategories(res.data);
                })
            }
        }
    }

    render() {
        let data = this.props.topTenCategoriesData;
        let loading = this.props.topTenCategoriesLoading;
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100"/>
            </ContentLoader>
        );
        const preloader = <Fragment>
            {Array.apply(null, {length: 10}).map((e, i) => (
                <Col key={i} xl={4} lg={4}>
                    <Card className="brand-card">
                        <Card.Body className="brandsBody">
                            <div className="d-flex">
                                <div className="brandIng">
                                    <MyLoader/>
                                </div>
                                <div className="brandName d-flex justify-content-center align-items-center">
                                    <p className="brandTitle">Category name</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))
            }
        </Fragment>

        const category = data.map(pd => {
            return <Col xl={4} lg={4}>
                <Link
                    href={{
                        pathname: '/product/category/' + pd.slug,
                    }}
                >
                    <Card className="brand-card">
                        <Card.Body className="brandsBody">
                            <div className="d-flex">
                                <div className="brandIng">
                                    <Photo
                                        src={pd.logo !== null ? `${this.props.backendApi}${pd.logo}` : "/blank.jpg"}
                                        blurDataURL={pd.logo !== null ? `${this.props.backendApi}${pd.logo}` : "/blank.jpg"}
                                        class=""

                                    />
                                </div>
                                <div className="brandName d-flex justify-content-center align-items-center">
                                    <p className="brandTitle">{pd.name.replace("————", "").replace("——", "")}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        })


        if (loading) {
            return <Fragment>
                <VisibilitySensor onChange={this.onVisible}>
                    <div className="div">
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <div className="TitleDiv">
                                    <span
                                        className="productCategory title">Top {data.length > 0 ? data.length : 10} Categories</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {preloader}
                        </Row>
                    </div>
                </VisibilitySensor>
            </Fragment>
        } else if (category.length > 0) {
            return <VisibilitySensor onChange={this.onVisible}>
                <div className="div">
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <div className="TitleDiv">
                                    <span
                                        className="productCategory title">Top {data.length > 0 ? data.length : 10} Categories</span>
                            </div>
                            <div>
                                <Link href="/product/all-categories/" className="btn">Show More</Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {loading ?
                            <Fragment>{preloader}</Fragment>
                            :
                            <Fragment> {category}</Fragment>
                        }
                    </Row>
                </div>
            </VisibilitySensor>
        } else {
            return <Fragment/>
        }

    }
}


const mapDispatchToProps = {
    topTenCategories
};

function mapStateToProps(state) {
    const topTenCategoriesApi = state.categoryReducer.topTenCategoriesApi;
    const topTenCategoriesData = state.categoryReducer.topTenCategoriesData;
    const topTenCategoriesLoading = state.categoryReducer.topTenCategoriesLoading;
    const backendApi = state.starterReducer.backendApi;

    return {
        topTenCategoriesApi,
        topTenCategoriesData,
        topTenCategoriesLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTenCategories);

