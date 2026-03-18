import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import Router from "next/router";
import {allFlashDeal} from "../../../services/actions/flashdealAction";
import {connect} from "react-redux";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import ProductCard from "../ProductCard/ProductCard";
import Photo from "../../CommonScreen/Image/Photo";
import NotFound from "../../CommonScreen/NotFound";

class FlashSaleAllProduct extends PureComponent {
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
            this.props.allFlashDeal(res.data);
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
        let data = this.props.allFlashDealData;
        let loading = this.props.allFlashDealLoading;


        return (
            <Fragment>
                <DesktopHeaderPart/>
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
                                        <ProductCard
                                            sliderProduct={true}
                                            flashDeal={true}
                                            countdown={1000000}
                                            renderer={renderer}
                                            loading={true}
                                            data={[]} />
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </Fragment> :data.length>0 ?
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
                                            </Col>
                                            <Col lg={12} md={12} sm={12} xs={12} className="flashSaleDiv">
                                                <ProductCard
                                                    sliderProduct={true}
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
                <DesktopFooterPart/>
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

    return {
        allFlashDealData,
        allFlashDealLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashSaleAllProduct);



