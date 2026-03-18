import React, {PureComponent,Fragment} from 'react';
import Link from "next/link";
import {connect} from "react-redux";
import {setCookie} from "../../../services/actions/commonAction"
import Photo from "../../CommonScreen/Image/Photo";

class TopBanner extends PureComponent {
    constructor() {
        super();
        this.state = {
            className:'topBanner-section'
        }
        this.onDel = this.onDel.bind(this)
    }
    onDel() {
        this.setState({
            className:'d-none'
        })
        this.props.setCookie('topBar',1,1);
    }
    render() {

        const backendApi = this.props.backendApi;
        const bannerLink = this.props.bannerLink;
        const bannerStatus = this.props.bannerStatus;
        const banner = this.props.banner;


        return (
            <Fragment>
                {parseInt(bannerStatus)===1 &&
                    <div className={this.state.className}>
                        {bannerLink!=null ?
                            <Fragment>
                                <Link href={{ pathname: bannerLink }}>
                                    <Photo
                                        src={backendApi+banner}
                                        blurDataURL={backendApi+banner}
                                        class=""
                                    />
                                </Link>
                            </Fragment>:
                            <Fragment>
                                <Photo
                                    src={backendApi+banner}
                                    blurDataURL={backendApi+banner}
                                    class=""
                                />
                            </Fragment>
                        }
                        <i onClick={this.onDel} className="fad fa-times topBannerCancel"/>
                    </div>
                }
            </Fragment>
        );
    }
}





const mapDispatchToProps = {
    setCookie
};

function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    const bannerLink = state.starterReducer.bannerLink;
    const bannerStatus = state.starterReducer.bannerStatus;
    const banner = state.starterReducer.banner;

    return {
        backendApi,
        bannerLink,
        bannerStatus,
        banner
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(TopBanner);
