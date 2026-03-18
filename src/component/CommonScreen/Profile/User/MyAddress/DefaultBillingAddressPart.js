import React, { PureComponent, Fragment } from "react";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Api from "../../../../../ClientApi/Api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {alert} from "../../../../../services/common";
import {shippingBillingAddress} from "../../../../../services/actions/shippingBillingPickupAction";
import {connect} from "react-redux";

class DefaultBillingAddressPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        Api().get('getShippingAddress').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch(error=>{
        })
    }
    handleChange(e,i){
        this.setState({
            defaultShipping:true,
            loading:true
        })
        const data = {
            index :  i
        }
        Api().post('changeDefaultBilling',data).then(res=>{
            if(res.data!==0){
                alert('success','Default billing address has been set!')
                this.props.shippingBillingAddress(res.data);
                this.componentDidMount();
            }
        }).catch(error=>{
        })
    }
  render() {
    const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
    return (
        <Fragment>
        {this.state.loading ?
           <Fragment>
               <div className="loader-spinner-div">
                   {loader}
               </div>
           </Fragment>:
            <Fragment>
                {this.state.data.length>0 ?
                    <div className="white-bg table-responsive-sm table-responsive-md">
                        <Table className="userAddressTable" hover>
                            <thead>
                            <tr className="tableTextSize">
                                <th>Full Name</th>
                                <th>Address</th>
                                <th>Region</th>
                                <th>Phone</th>
                                <th>#</th>
                                <th>Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((pd,i)=>{
                                return <tr className="tableTextSize">
                                    <td>{pd.name}</td>
                                    <td><Badge variant="danger">{pd.shippingPlace}</Badge> {pd.address}</td>
                                    <td>{pd.region}-{pd.city}-{pd.area}</td>
                                    <td>{pd.phone}</td>
                                    <td>
                                        {pd.defaultShipping==1 && <span>Default Shipping Address</span> }
                                        {(pd.defaultShipping==1 && pd.defaultBilling==1 ) && <br/>}
                                        {pd.defaultBilling==1 && <span>Default billing Address</span>}
                                    </td>
                                    <td>
                                        <RadioGroup aria-label="shipping" name="shipping"   onChange={(e)=>this.handleChange(e,i)}>
                                            <FormControlLabel label="" checked={pd.defaultBilling} control={<Radio />}  />
                                        </RadioGroup>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>:
                    <div className="white-bg">
                        <p>You didn't setup billing address yet!</p>
                    </div>
                }
            </Fragment>
        }
    </Fragment>
    )
  }
}




const mapDispatchToProps = {
    shippingBillingAddress
};



export default connect(null, mapDispatchToProps)(DefaultBillingAddressPart);


