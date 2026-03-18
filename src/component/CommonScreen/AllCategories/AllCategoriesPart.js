import React, {PureComponent, Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from "react-redux";
import {megaMenu} from "../../../services/actions/commonAction";
import Link from "next/link";
class AllCategoriesPart extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {
        window.scroll(0,0)
        if(this.props.megaMenuApi!==true){
            Api().get('getCategories').then(res=>{
                this.props.megaMenu(res.data);
            })
        }
    }

    render() {
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const catLoader =   <Row className="allCatRow">
            <Col lg={12} md={12} sm={12} xs={12}>
                <div className="cat-div">
                    <div className="category-loader-title"/>
                    <hr className="all-cat-hr"/>
                    <Row className="pr-3 pl-3">
                        <Col lg={4} md={4} sm={6} xs={6} className="p-3">
                            <MyLoader/>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={6} className="p-3">
                            <MyLoader/>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={6} className="p-3">
                            <MyLoader/>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={6} className="p-3">
                            <MyLoader/>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={6} className="p-3">
                            <MyLoader/>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={6} className="p-3">
                            <MyLoader/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        const category  =  this.props.megaMenuData.map((pd,i)=>{
            return    <Row className="allCatRow" key={i}>
                <Col lg={12} md={12}>
                    <div className="cat-div">
                        <h5 className="all-cat-title p-3">
                            <Link
                                href={{
                                    pathname: '/product/category/'+pd.slug,
                                }}
                            >{pd.cat}
                            </Link>
                        </h5>
                        <hr className="all-cat-hr"/>
                        <Row className="pr-3 pl-3">
                            {pd.subCat.map(sub=>{
                                return   <Fragment>
                                    <Col lg={3} md={3} sm={6} xs={6} className="p-3">
                                        <h6 className="allCat subCatTitle">
                                            <Link
                                                href={{
                                                    pathname: '/product/category/'+sub.slug,
                                                }}
                                            > {sub.subCat}
                                            </Link>
                                        </h6>
                                        <ul className="all-cat-ul">
                                            {pd.subSubCat.map(subSubCat=> {
                                                return <Fragment>
                                                    {sub.subCat == subSubCat.subCat &&
                                                        <Fragment>
                                                            <li>
                                                                <Link href={{pathname: '/product/category/'+subSubCat.slug,}} className="subCatLink"> {subSubCat.subSubCat}</Link>
                                                            </li>
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                            })}
                                        </ul>
                                    </Col>
                                </Fragment>
                            })}
                        </Row>
                    </div>
                </Col>
            </Row>
        })
        return (
            <Fragment>
                <section id="allCat">
                    <Container className="pt-4">
                        <Row className="allCatTitleRow">
                            <Col className="d-flex justify-content-between">
                                <div>
                                    <div className="allCat TitleDiv">
                                        <div>
                                            <span  className="allCat title">All Categories</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {this.props.megaMenuLoading ?
                            <Fragment>
                                {catLoader}
                            </Fragment>:
                            <Fragment>
                                {category}
                            </Fragment>
                        }
                    </Container>
                </section>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    megaMenu
};

function mapStateToProps(state) {
    const megaMenuLoading = state.commonReducer.megaMenuLoading;
    const megaMenuData = state.commonReducer.megaMenuData;
    const megaMenuApi = state.commonReducer.megaMenuApi;
    return {
        megaMenuLoading,
        megaMenuApi,
        megaMenuData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategoriesPart);




