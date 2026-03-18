import React, {PureComponent, Fragment} from 'react';
import AuthContext from "../../../Auth/Auth";
import Badge from "react-bootstrap/Badge";
import {Link, withRouter} from "react-router-dom";
import Api from "../../../ClientApi/Api";
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
const MobileTopBack = React.lazy(() => import("../MobileCommon/MobileTopBack"));
class MobileShipping extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[]
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        Api().get('getShippingAddress').then(res=>{
            this.setState({
                data:res.data
            })
        }).catch(error=>{
        })
    }
    onChange(i){
        this.props.history.push("/edit-address/"+i);
    }
    handleChange(e,i){
        this.setState({
            defaultShipping:true
        })
        const data = {
            index :  i
        }
        Api().post('changeDefaultShipping',data).then(res=>{
            if(res.data==1){
                this.componentDidMount()
                this.context.onShippingBillingAddress();
            }
        }).catch(error=>{})
        // when change shipping then reset pickup zone
        const pickupData = {
            clear:true
        }
        this.context.onPickupPoint(pickupData);
    }
    static contextType = AuthContext;
    render() {
        const mobileLoader =  <div  className="mobile-pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <MobileTopBack title="Select Shipping Address"/>
                <Fragment>{this.context.shippingBillingLoadingStatus ?
                    <Fragment>
                        {mobileLoader}
                    </Fragment> :
                    <Fragment>
                        <div className="shipping">
                            <Link to="/add-shipping">
                                <div className="addCheckoutAddressMobile">
                                    <i className="far fa-plus"/> Add Your Address
                                </div>
                            </Link>
                            <Fragment>
                                {this.state.data.map((pd,i)=>{
                                    return <div className="checkoutShippingAddress">
                                        <div className="shippingAddressInitial">
                                            <div>
                                                <i className="far fa-map-marker-alt checkoutIcons"></i>{" "}
                                                <span className="checkoutAddressName">{pd.name}</span>
                                            </div>
                                            <RadioGroup aria-label="shipping" name="shipping"   onChange={(e)=>this.handleChange(e,i)}>
                                                <FormControlLabel checked={pd.defaultShipping} control={<Radio />}  />
                                            </RadioGroup>
                                        </div>
                                        <div>
                                            <i className="far fa-phone checkoutIcons"/>{" "}
                                            <span className="checkoutPhone">{pd.phone}</span>
                                        </div>
                                        <div className="checkoutFullAddress">
                                  <span>
                                    <Badge variant="danger">{pd.shippingPlace}</Badge>{pd.address},{pd.region}-{pd.city}-{pd.area}
                                  </span>
                                        </div>
                                        {pd.defaultShipping==1 &&   <div className="default-shipping">
                                            <p>DEFAULT SHIPPING ADDRESS</p>
                                        </div> }
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
export default withRouter(MobileShipping);
