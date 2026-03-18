import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import VisibilitySensor from "react-visibility-sensor";
import {topTenCategories} from "../../../services/actions/categoryAction";
import {connect} from "react-redux";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";
class ShopByCategories extends PureComponent {

    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.topTenCategoriesApi!==true){
                Api().get('topTenCategories').then(res=>{
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
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
        );
        const preloader  = <Fragment>
            { Array.apply(null, { length: 8 }).map((e, i) => (
                <Col sm={3} xs={3}   className="csadjust">
                    <Card className="product-card categoryProductCard">
                        <div className="cardImgDiv mobile-category  d-flex justify-content-center align-items-center">
                            <MyLoader/>
                        </div>
                    </Card>
                </Col>
              ))
            }
        </Fragment>

        const category = data.map((pd,i)=>{
            return <Col sm={3} xs={3} key={i}  className="csadjust">
                        <Link  href={{pathname: '/product/category/'+pd.slug,}}>
                        <Card className="product-card categoryProductCard">
                            <div className="cardImgDiv mobile-category  d-flex justify-content-center align-items-center">

                                <Photo
                                    src={pd.logo!==null?`${this.props.backendApi}${pd.logo}`:"/blank.jpg"}
                                    blurDataURL="/blank.jpg"
                                    class="mobile-category-img"
                                    className="empty"
                                />

                            </div>
                        </Card>
                        <div className="card-body mobile-cb-card-div">
                            <p className="pcb-name ">{ pd.name.length > 7 ?pd.name.replace("————","").replace("——","").substring(0, 7) + "..." :  pd.name.replace("————","").replace("——","")  }</p>
                        </div>
                        </Link>
                    </Col>
        })

        if (loading) {
            return <Fragment>
                      <VisibilitySensor onChange={this.onVisible}>
                          <section id="shopByCategories">
                              <Container>
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
                                          <Fragment>{preloader}</Fragment>
                                      </Row>
                                  </div>
                              </Container>
                          </section>
                      </VisibilitySensor>
                  </Fragment>
         } else if (category.length > 0) {
            return  <VisibilitySensor  onChange={this.onVisible}>
                <section id="shopByCategories">
                    <Container>
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
                                <Fragment> {category}</Fragment>
                            </Row>
                        </div>
                    </Container>
                </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopByCategories);
