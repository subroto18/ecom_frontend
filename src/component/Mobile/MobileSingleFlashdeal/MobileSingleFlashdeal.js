import React, {PureComponent, Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import Countdown from 'react-countdown';
import MobileTopBack from "../MobileCommon/MobileTopBack";
import MobileProduct from "../MobileProductCard/MobileProduct";
import Photo from "../../CommonScreen/Image/Photo";
import Router from "next/router";
import {connect} from "react-redux";
import Link from "next/link";

class MobileSingleFlashDeal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            expire: false
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
                    loading: false,
                    data: res.data
                })
            }
        }).catch(res => {
        })
    }

    onCompleteTimer() {
        let id = this.state.id;
        const data = {
            id: id
        }
        Api().post('flashdealTimeut', data).then(res => {
        }).catch(res => {
        })
        this.setState({
            data: [],
            expire: true
        })
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


        const loader = <div className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>


        let data = this.state.data;
        let loading = this.state.loading;

        if (loading) {
            return <Fragment>
                <MobileTopBack title="Flash sale"/>
                <Fragment>{loader}</Fragment>
            </Fragment>
        } else {
            if (data.length > 0) {
                return <Fragment>
                    {data.map(pd => {
                        return <Fragment>
                            <MobileTopBack title={pd.title}/>
                            <section id="flashSaleSingle">
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
                                            <MobileProduct
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
                        </Fragment>
                    })}
                </Fragment>
            } else {
                Router.push("/")
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

export default connect(mapStateToProps)(MobileSingleFlashDeal);