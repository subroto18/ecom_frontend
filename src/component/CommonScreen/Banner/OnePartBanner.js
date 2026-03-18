import React, {PureComponent, Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Api from "../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import {connect} from "react-redux";
import {bigBanner} from "../../../services/actions/bannerAction"
import Photo from "../Image/Photo";
class OnePartBanner extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true
        }
    }

    onVisible = (isVisible) => {
        if(isVisible){
            if(this.props.bigBannerApi!==true){
                  Api().get('bigBanner').then(res=>{
                    this.props.bigBanner(res.data);
                })
            }
        }
    }


    render() {
        let data = this.props.bigBannerData;
        let loading =  this.props.bigBannerLoading;
        let banner =  data.map((pd,index)=>{
           return <Col key={index} xl={12} lg={12}>
                <div className="fullBanner">
                    <Photo
                        src={pd!=null?this.props.backendApi+pd: "/emptyBanner.png"}
                        blurDataURL="/emptyBanner.png"
                        class="big-banner"
                    />
                </div>
            </Col>
        })
        const preloader = <Fragment>
            <Col xl={12} lg={12}>
                <div className="fullBanner">
                    <Photo
                        src="/emptyBanner.png"
                        blurDataURL="/emptyBanner.png"
                        class="big-banner"
                    />
                </div>
            </Col>
        </Fragment>
        return (
            <Fragment>
                <VisibilitySensor  onChange={this.onVisible}>
                    <section id="banner" className="pt-4">
                        <Container>
                            <Row className="bannerRow fullBannerRow">
                                {loading ?
                                    <Fragment>{preloader}</Fragment> :
                                    <Fragment> {banner}</Fragment>
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
    bigBanner
};

function mapStateToProps(state) {
    const bigBannerApi = state.bannerReducer.bigBannerApi;
    const bigBannerData = state.bannerReducer.bigBannerData;
    const bigBannerLoading = state.bannerReducer.bigBannerLoading
    const backendApi = state.starterReducer.backendApi
    return {
        bigBannerApi,
        bigBannerData,
        bigBannerLoading,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnePartBanner);


