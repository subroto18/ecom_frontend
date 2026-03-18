import React, {Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {connect} from "react-redux";
import dynamic from "next/dynamic"
const Category = dynamic(() => import("./Category"));
const Brands = dynamic(() => import("./Brands"));
const TopTenCategories = dynamic(() => import("./TopTenCategories"));
const TopTenBrands = dynamic(() => import("./TopTenBrands"));

class TopTen extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <section id="TopTen" className="pt-4">
                    <Container>
                        <div className="div TopTen">
                            <Row>
                                    <Fragment>
                                    {this.props.topTenCategory===1 &&  this.props.topTenBrands===1 &&
                                         <Fragment>
                                                 <Col xl={6} lg={6} md={6}>
                                                     <Category/>
                                                 </Col>
                                                <Col xl={6} lg={6} md={6}>
                                                     <Brands/>
                                                </Col>
                                           </Fragment>
                                    }
                                    {this.props.topTenCategory===1 &&  this.props.topTenBrands===0  &&
                                            <Col xl={12} lg={12}>
                                                <TopTenCategories/>
                                            </Col>
                                    }
                                    {this.props.topTenCategory===0 &&  this.props.topTenBrands===1  &&
                                        <Col xl={12} lg={12}>
                                            <TopTenBrands/>
                                        </Col>
                                    }
                                </Fragment>
                                    <Fragment>
                                        <Fragment>
                                            {this.props.topTenCategory===1 && this.props.topTenBrands===0 ?
                                                <Fragment>
                                                    <Fragment>
                                                        <Col xl={12} lg={12}>
                                                            <TopTenCategories/>
                                                        </Col>
                                                    </Fragment>
                                                </Fragment>
                                                   :
                                                this.props.topTenCategory===1 && this.props.topTenBrands===0 ?
                                                    <Fragment>
                                                        <Fragment>
                                                            <Col xl={12} lg={12}>
                                                                <TopTenBrands/>
                                                            </Col>
                                                         </Fragment>
                                                    </Fragment>
                                                      :
                                                    <Fragment>
                                                    </Fragment>
                                            }
                                        </Fragment>
                                    </Fragment>
                            </Row>
                        </div>
                    </Container>
                </section>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const topTenCategory = state.starterReducer.topTenCategory;
    const topTenBrands = state.starterReducer.topTenBrands;

    return {
        topTenCategory,
        topTenBrands
    };
}

export default connect(mapStateToProps)(TopTen);
