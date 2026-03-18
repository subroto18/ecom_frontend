import React, {PureComponent, Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import VisibilitySensor from "react-visibility-sensor";
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import {bannerThree} from "../../../services/actions/bannerAction"
import Photo from "../Image/Photo";

class ThreePartBanner extends PureComponent {

    constructor(props) {
        super(props);
    }

    onVisible = (isVisible) => {
        if (isVisible) {
            Api().get('bannerTwo').then(res => {
                this.props.bannerThree(res.data);
            })

        }
    }

    render() {
        let data = this.props.bannerTwoData;
        let loading = this.props.bannerTwoLoading;
        let banner = data.map(pd => {
            return <Col xl={4} lg={4}>
                <div className="banner">
                    <Photo
                        src={pd !== null ? this.props.backendApi + pd : "/blank.jpg"}
                        blurDataURL="/blank.jpg"
                        class=""
                    />
                </div>
            </Col>
        })
        const preloader = <Fragment>
            {Array.apply(null, {length: 3}).map((e, i) => (
                <Col key={i} xl={4} lg={4}>
                    <div className="banner ">
                        <Photo
                            src="/blank.jpg"
                            blurDataURL="/blank.jpg"
                            class="bannerThreeImg"
                        />

                    </div>
                </Col>
            ))
            }


        </Fragment>
        return (
            <Fragment>
                <VisibilitySensor onChange={this.onVisible}>
                    <section id="shortBanner" className="py-4">
                        <Container>
                            <Row className="bannerRow threePartBannerRow">
                                {loading ?
                                    <Fragment>{preloader}</Fragment> :
                                    <Fragment>
                                        {data.length === 1 ?
                                            <Fragment>
                                                {banner}
                                                <Col key={1} xl={4} lg={4}>
                                                    <div className="banner ">
                                                        <Photo
                                                            src="/blank.jpg"
                                                            blurDataURL="/blank.jpg"
                                                            class="bannerThreeImg"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col key={2} xl={4} lg={4}>
                                                    <div className="banner ">
                                                        <Photo
                                                            src="/blank.jpg"
                                                            blurDataURL="/blank.jpg"
                                                            class="bannerThreeImg"
                                                        />
                                                    </div>
                                                </Col>
                                            </Fragment> : data.length === 2 ? <Fragment>
                                                    {banner}
                                                    <Photo
                                                        src="/blank.jpg"
                                                        blurDataURL="/blank.jpg"
                                                        class="bannerThreeImg"
                                                    />
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
    bannerThree
};

function mapStateToProps(state) {
    const bannerTwoData = state.bannerReducer.bannerTwoData;
    const bannerTwoLoading = state.bannerReducer.bannerTwoLoading;
    const backendApi = state.starterReducer.backendApi

    return {
        bannerTwoData,
        bannerTwoLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreePartBanner);

