import React, {PureComponent} from 'react';
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import {flashDeal} from "../../../services/actions/flashdealAction"
import ProductCard from "../ProductCard/ProductCard";
import Router from "next/router";
class FlashSale extends PureComponent {
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
        this.onCompleteTimer = this.onCompleteTimer.bind(this)
    }
    componentDidMount() {

        try{
            Api().get('getFlashDeal').then(res=>{
                if(res.data!==0){
                    if(res.data!==undefined){
                        this.props.flashDeal(res.data);
                    }
                }
            });
        }catch(error){

        }


    }



    onCompleteTimer(){
        let id = this.state.id;
        const data = {
            id:id
        }

        Api().post('flashdealTimeut',data).then(res=>{
        }).catch(res=>{
        })
         this.setState({
             data:[],
             expire:true
         })
    }

    render() {
        let countdown =   this.props.flashDealCountdown;

        const renderer = ({days, hours, minutes, seconds, completed}) => {
            if (completed) {
                Router.push('/')
            } else {
                return <div>
                    <span className="days timeBox">{days}</span>
                    <span className="hours timeBox">{hours}</span>
                    <span className="minutes timeBox">{minutes}</span>
                    <span className="seconds timeBox">{seconds}</span>
                </div>;
            }
        };
        if(this.state.expire){
            Router.push('/')
        }else{
            return (
                    <ProductCard sliderProduct={true} triggerParentUpdate={this.onCompleteTimer} flashDeal={true} countdown={countdown} renderer={renderer} title="Flash Sale" link={this.props.flashdealFeatured>1 ? `/product/flash-sale-product` :  '/product/flash-sale-product/'+this.props.flashDealSlug} loading={this.props.flashDealLoading} data={this.props.flashDealData} />
            )
        }
    }
}






const mapDispatchToProps = {
    flashDeal
};

function mapStateToProps(state) {
    const flashApi = state.flashdealReducer.flashApi;
    const flashDealCountdown = state.flashdealReducer.flashDealCountdown;
    const flashdealFeatured = state.starterReducer.flashdealFeatured;
    const flashDealSlug = state.flashdealReducer.flashDealSlug;
    const flashDealLoading = state.flashdealReducer.flashDealLoading;
    const flashDealData = state.flashdealReducer.flashDealData
    return {
        flashApi,
        flashDealCountdown,
        flashdealFeatured,
        flashDealSlug,
        flashDealLoading,
        flashDealData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);

