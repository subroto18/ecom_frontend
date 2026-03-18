import React, {PureComponent, Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Api from "../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import {bannerFour} from "../../../services/actions/bannerAction"
import {connect} from "react-redux";
import Photo from "../Image/Photo";

class FourPartBanner extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
    }


    onVisible = (isVisible) => {
        if (isVisible) {

            Api().get('bannerThree').then(res => {
                this.props.bannerFour(res.data);
            })

        }
    }

    render() {

        let data = this.props.bannerThreeData;
        let loading = this.props.bannerThreeLoading;


        let banner = data.map(pd => {
            return <Col xl={3} lg={3} md={6} sm={6}>
                <div className="banner bannerImgButtom">
                    <Photo
                        src={pd !== null ? this.props.backendApi + pd : "/blank.jpg"}
                        blurDataURL="/blank.jpg"
                        class=""
                    />

                </div>
            </Col>
        })

        const preloader = <Fragment>
            {Array.apply(null, {length: 4}).map((e, i) => (
                <Col key={i} xl={3} lg={3} md={6} sm={6}>
                    <div className="banner bannerImgButtom">

                        <Photo
                            src="/blank.jpg"
                            blurDataURL="/blank.jpg"
                            class=""
                        />

                    </div>
                </Col>
            ))
            }

        </Fragment>


        return (

            <Fragment>

                <VisibilitySensor onChange={this.onVisible}>
                    <section id="shortBanner" className="pt-4">
                        <Container>
                            <Row className="bannerRow fourPartBannerRow">
                                {loading ?
                                    <Fragment>{preloader}</Fragment>
                                    :
                                    <Fragment>
                                        {data.length === 1 ?
                                            <Fragment>
                                                {banner}
                                                <Col xl={3} lg={3} md={6} sm={6}>
                                                    <div className="banner bannerImgButtom">
                                                        <Photo
                                                            src="/blank.jpg"
                                                            blurDataURL="/blank.jpg"
                                                            class=""
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xl={3} lg={3} md={6} sm={6}>
                                                    <div className="banner bannerImgButtom">
                                                        <Photo
                                                            src="/blank.jpg"
                                                            blurDataURL="/blank.jpg"
                                                            class=""
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xl={3} lg={3} md={6} sm={6}>
                                                    <div className="banner bannerImgButtom">
                                                        <Photo
                                                            src="/blank.jpg"
                                                            blurDataURL="/blank.jpg"
                                                            class=""
                                                        />
                                                    </div>
                                                </Col>
                                            </Fragment> : data.length === 2 ?
                                                <Fragment>
                                                    {banner}
                                                    <Col xl={3} lg={3} md={6} sm={6}>
                                                        <div className="banner bannerImgButtom">
                                                            <Photo
                                                                src="/blank.jpg"
                                                                blurDataURL="/blank.jpg"
                                                                class=""
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col xl={3} lg={3} md={6} sm={6}>
                                                        <div className="banner bannerImgButtom">
                                                            <Photo
                                                                src="/blank.jpg"
                                                                blurDataURL="/blank.jpg"
                                                                class=""
                                                            />
                                                        </div>
                                                    </Col>
                                                </Fragment> : data.length === 3 ?
                                                    <Fragment>
                                                        <Col xl={3} lg={3} md={6} sm={6}>
                                                            <div className="banner">
                                                                <Photo
                                                                    src="/blank.jpg"
                                                                    blurDataURL="/blank.jpg"
                                                                    class=""
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Fragment> :

                                                    <Fragment> {banner}</Fragment>
                                        }
                                    </Fragment>

                                }
                            </Row>
                        </Container>
                    </section>
                </VisibilitySensor>
            </Fragment>

        );
    }
}


const mapDispatchToProps = {
    bannerFour
};

function mapStateToProps(state) {
    const bannerThreeApi = state.bannerReducer.bannerThreeApi;
    const bannerThreeData = state.bannerReducer.bannerThreeData;
    const bannerThreeLoading = state.bannerReducer.bannerThreeLoading;
    const backendApi = state.starterReducer.backendApi;
    return {
        bannerThreeApi,
        bannerThreeData,
        bannerThreeLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FourPartBanner);


