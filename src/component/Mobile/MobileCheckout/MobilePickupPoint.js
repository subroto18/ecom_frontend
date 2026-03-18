import React, {PureComponent,Fragment} from 'react';
import {FormControlLabel,Radio,RadioGroup} from '@material-ui/core';
import Badge from "react-bootstrap/Badge";
import Api from "../../../ClientApi/Api";
import {pickupPoint} from "../../../services/actions/shippingBillingPickupAction";
import {connect} from "react-redux";
import Router from "next/router";
const MobileTopBack = React.lazy(() => import("../MobileCommon/MobileTopBack"));
class MobilePickupPoint extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true,
            check:-1
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        Api().get('getPickupPoint').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch(error=>{
        })
    }
    handleChange(data,i,e){
        this.setState({
            check:i
        })
        this.props.onPickupPoint(data);
        Router.push("/checkout");
    }

    render() {
        const mobileLoader =  <div  className="mobile-pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <MobileTopBack title="Select pickup point"/>
                <Fragment>{this.state.loading ?
                    <Fragment>
                        {mobileLoader}
                    </Fragment> :
                    <Fragment>
                        <div className="shipping">
                            <Fragment>
                                {this.state.data.map((pd,i)=>{
                                    return <div className="checkoutShippingAddress">
                                        <div className="shippingAddressInitial">
                                            <div>
                                                <i className="far fa-map-marker-alt checkoutIcons"/>{" "}
                                                <span className="checkoutAddressName">{pd.name}</span>
                                            </div>
                                            <RadioGroup   onChange={(e)=>this.handleChange(pd,i,e)}>
                                                <FormControlLabel checked={i===this.state.check} control={<Radio />}  />
                                            </RadioGroup>
                                        </div>
                                        <div>
                                            <i className="far fa-user checkoutIcons"/>{" "}
                                            <span className="checkoutPhone">{pd.manager_name}</span>
                                        </div>
                                        <div>
                                            <i className="far fa-phone checkoutIcons"/>{" "}
                                            <span className="checkoutPhone">{pd.manager_number}</span>
                                        </div>
                                        <div>
                                            <i className="far fa-envelope-open checkoutIcons"/>{" "}
                                            <span className="checkoutPhone">{pd.manager_email}</span>
                                        </div>
                                        <div className="checkoutFullAddress">
                                               <span>
                                                 <Badge variant="danger">Zone address</Badge> {pd.address},
                                                   { pd.region}
                                              </span>
                                        </div>
                                        <div></div>
                                    </div>
                                })}
                            </Fragment>
                        </div>
                    </Fragment>
                }
                </Fragment>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    pickupPoint
};


export default connect(null, mapDispatchToProps)(MobilePickupPoint);
