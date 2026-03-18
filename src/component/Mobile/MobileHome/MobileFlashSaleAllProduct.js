import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import Countdown from 'react-countdown';
import {allFlashDeal} from "../../../services/actions/flashdealAction";
import {connect} from "react-redux";
import Router from "next/router";
import MobileTopBack from "../MobileCommon/MobileTopBack";
import MobileProduct from "../MobileProductCard/MobileProduct";
import Photo from "../../CommonScreen/Image/Photo";
import Link from "next/link";
import NotFound from "../../CommonScreen/NotFound";
class MobileFlashSaleAllProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cartVariationModal: false,
            cartSuccessModel:true,
            countdown:80000,
            loading:false,
            data:[],
            id:'',
            expire:false
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        Api().get('getAllFlashDeal').then(res=>{
            this.props.allFashdeal(res.data);
        }).catch(res=>{})
    }

    render() {

        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const renderer = ({ days,hours, minutes, seconds, completed }) => {
            if (completed) {
                Router.push("/")
            } else {
                return <div>
                    <span className="days timeBox">{days}</span>
                    <span className="hours timeBox">{hours}</span>
                    <span className="minutes timeBox">{minutes}</span>
                    <span className="seconds timeBox">{seconds}</span>
                </div>;
            }
        };
        let countdown =   this.props.flashDealCountdown;
        let data = this.props.allFlashDealData;
        let loading = this.props.allFlashDealLoading;


        let title = data.map(pd=>{
            return pd.title;
        })

        return (
            <Fragment>
                <MobileTopBack title={title}/>
                {loading ?
                    <Fragment>
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
                                        <MobileProduct
                                            sliderProduct={true}
                                            renderer={renderer}
                                            loading={true}
                                            data={[]} />
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </Fragment>
                    :data.length>0 ?
                        <Fragment>
                            {data.map(pd=>{
                                return       <section id="flashSaleSingle">
                                    <Container>
                                        <Row className="megaFlashSaleRow">
                                            <Col lg={12} md={12} sm={12} xs={12} className="p-0">
                                                <div className="flashSaleImageDiv">
                                                        <Fragment>

                                                            <Photo
                                                                src={`${this.props.backendApi}${pd.banner}`}
                                                                blurDataURL={`${this.props.backendApi}${pd.banner}`}
                                                                class="flashSaleBanner"
                                                            />

                                                        </Fragment>
                                                </div>
                                                <Row>
                                                 <Col className="d-flex justify-content-between">
                                                  <div className="TitleDiv d-flex">
                                                    <div>
                                                        <span className="productCategory title">Flash Sale</span>
                                                    </div>
                                                    <div className="countDown flashSaleCountDown">
                                                      <span id="clockDiv" className="megaClock">
                                                        <Countdown onComplete={this.onCompleteTimer} date={Date.now() + countdown} renderer={renderer} />
                                                      </span>
                                                    </div>
                                                 </div>
                                                 <div>
                                                     <Link href={`/product/flash-sale-product/`+pd.slug} className="btn">Show More</Link>
                                                 </div>
                                              </Col>
                                          </Row>
                                            </Col>
                                            <Col lg={12} md={12} sm={12} xs={12} className="flashSaleDiv">
                                                <MobileProduct
                                                    flashDeal={true}
                                                    countdown={pd.flashdeal_time}
                                                    renderer={renderer}
                                                    title={pd.title}
                                                    link={`/product/flash-sale-product/`+pd.slug}
                                                    loading={false}
                                                    data={pd.product} />
                                            </Col>
                                        </Row>
                                    </Container>
                                </section>
                            })}
                        </Fragment>:
                        <Fragment>
                             <NotFound/>
                        </Fragment>
                }
            </Fragment>
        );
    }
}



const mapDispatchToProps = {
    allFlashDeal
};

function mapStateToProps(state) {
    const allFlashDealData = state.flashdealReducer.allFlashDealData;
    const allFlashDealLoading = state.flashdealReducer.allFlashDealLoading;
    const backendApi = state.starterReducer.backendApi;
    const flashDealCountdown = state.flashdealReducer.flashDealCountdown

    return {
        flashDealCountdown,
        allFlashDealData,
        allFlashDealLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileFlashSaleAllProduct);


