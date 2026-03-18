import React, {PureComponent, Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import Router from "next/router";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import ProductCard from "../ProductCard/ProductCard";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import Photo from "../../CommonScreen/Image/Photo";
import {connect} from "react-redux";

class SingleFlashDeal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, data: [], expire: false
        }
    }

    componentDidMount() {
        window.scroll(0, 0)
        const data = {
            slug: window.location.pathname.split("/")[3]
        }
        Api().post('getSpecificFlashDeal', data).then(res => {
            if (data !== undefined) {
                this.setState({
                    loading: false, data: res.data
                })
            }
        }).catch(res => {
        })
    }

    onCompleteTimer() {
        Router.push("/")
    }

    render() {

        const Completionist = () => <span>Sorry! Time is over</span>;
        const renderer = ({days, hours, minutes, seconds, completed}) => {
            if (completed) {
                return <Completionist/>;
            } else {
                return <div>
                    <span className="days timeBox">{days}</span>
                    <span className="hours timeBox">{hours}</span>
                    <span className="minutes timeBox">{minutes}</span>
                    <span className="seconds timeBox">{seconds}</span>
                </div>;
            }
        };


        const MyLoader = () => (<ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100"/>
            </ContentLoader>);
        let data = this.state.data;
        let loading = this.state.loading;

        if (loading) {
            return <Fragment>
                <DesktopHeaderPart/>
                <section id="flashSaleSingle">
                    <Container>
                        <Row className="megaFlashSaleRow">
                            <Col lg={12} md={12} sm={12} xs={12} className="p-0">
                                <div className="flashSaleImageDiv">
                                    <Fragment>
                                        <div className="flashSaleImageDiv loader-thumbnail">
                                            <MyLoader/>
                                        </div>
                                    </Fragment>
                                </div>
                            </Col>

                            <Col lg={12} md={12} sm={12} xs={12} className="flashSaleDiv">
                                <ProductCard
                                    sliderProduct={true}
                                    loading={true}
                                    data={[]}/>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <DesktopFooterPart/>
            </Fragment>
        } else {
            if (data.length > 0) {
                return <Fragment>
                    <DesktopHeaderPart/>
                    {data.map(pd => {
                        return <section id="flashSaleSingle">
                            <Container>
                                <Row className="megaFlashSaleRow">
                                    <Col lg={12} md={12} sm={12} xs={12} className="p-0">
                                        <div className="flashSaleImageDiv">
                                            <Fragment>
                                                <Photo
                                                    src={`${this.props.backendApi}${pd.banner}`}
                                                    blurDataURL="/emptyBanner.png"
                                                    class="flashSaleBanner img-fluid"
                                                />

                                            </Fragment>
                                        </div>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12} className="flashSaleDiv">
                                        <ProductCard
                                            sliderProduct={true}
                                            triggerParentUpdate={this.onCompleteTimer}
                                            flashDeal={true}
                                            countdown={pd.flashdeal_time}
                                            renderer={renderer}
                                            title={pd.title}
                                            loading={false}
                                            data={pd.product}/>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    })}
                </Fragment>
            } else {
                Router.push("/");
            }
        }
    }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(SingleFlashDeal);


