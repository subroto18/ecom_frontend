import React, {PureComponent, Fragment} from 'react';
import Slider from "react-slick";
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import Photo from "../../CommonScreen/Image/Photo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomeSlider extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            slider: [],
            loading: true
        }
    }

    componentDidMount() {

        try {
            Api().get('slider').then(res => {
                this.setState({
                    slider: res.data,
                    loading: false
                })
            })
        } catch (e) {

        }


    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
        }
        let slider = this.state.slider.map((pd, index) => {
            if (pd) {
                return <div key={index}>
                    <Photo
                        src={this.props.backendApi + pd}
                        blurDataURL="/slider.png"
                        class="slider-img"
                    />
                </div>
            } else {
               return <Photo
                            src="/slider.png"
                            blurDataURL="/slider.png"
                            class="slider-img"
                   />
            }
        })

        const preloader = <Fragment>
            <Photo
                src="/slider.png"
                blurDataURL="/slider.png"
                class="slider-img"
            />
        </Fragment>
        return (
            <Fragment>
                <div className="sliderDiv">
                    {this.state.loading ?
                        <Fragment>
                            {preloader}
                        </Fragment> :
                        <Slider horizontal={true} {...settings}>
                            {slider}
                        </Slider>
                    }
                </div>

            </Fragment>
        );
    }
}


const mapDispatchToProps = {};

function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider);

