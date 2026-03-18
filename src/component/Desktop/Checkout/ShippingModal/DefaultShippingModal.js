import React, {PureComponent, Fragment} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Api from "../../../../ClientApi/Api";
import {connect} from "react-redux";
import {
    pickupPoint,
    shippingBillingAddress,
    shippingModalHide
} from "../../../../services/actions/shippingBillingPickupAction";

import {alert} from "../../../../services/common";

class DefaultShippingModal extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            selectedData:'',
            loading:true,
            selectIndex:''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        window.scroll(0, 0);
        Api().get('getShippingAddress').then(res=>{
            let data = res.data;
            if(data.length>0){
                data.map((pd,i)=>{
                    if(pd.defaultShipping===1){
                        this.setState({
                            selectIndex:i
                        })
                    }
                })
            }
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
            selectIndex:i
        })
    }
    onSubmit(){
        let index = this.state.selectIndex;
        if(index!==""){
            const data = {
                index :  index,
            }
            Api().post('changeDefaultShipping',data).then(res=>{
                if(res.data!==0){
                   alert('success','Default shipping  address has been set!')

                    this.props.shippingBillingAddress(res.data);
                    this.props.shippingModalHide();
                }
            }).catch(error=>{})
            const pickupData = {
                clear:true
            }
            this.props.pickupPoint(pickupData);
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.loading ?
                    <Fragment>
                        <div  className="card-body desktop-cwc-body">
                            <div className="loader-spinner">
                                <div className="spinner-border text-muted"/>
                            </div>
                        </div>
                    </Fragment>:
                    <Fragment>
                        <div className="white-bg table-responsive-xl table-responsive-lg table-responsive-md table-responsive-sm table-responsive">
                            <Table className="userAddressTableDefaultModal table-striped" hover>
                                <thead>
                                <tr>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Region</th>
                                    <th scope="col">#</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((pd,i)=>{
                                    return <tr>
                                        <td>{pd.name}</td>
                                        <td><Badge variant="danger">{pd.shippingPlace}</Badge> {pd.address}</td>
                                        <td>{pd.region}-{pd.city}-{pd.area}</td>
                                        <td>
                                            {pd.defaultShipping==1 && <span>Default Shipping Address</span> }
                                            {(pd.defaultShipping==1 && pd.defaultBilling==1 ) && <br/>}
                                            {pd.defaultBilling==1 && <span>Default billing Address</span>}
                                        </td>
                                        <td>
                                            <RadioGroup aria-label="shipping" name="shipping"   onChange={(e)=>this.handleChange(e,i)}>
                                                <FormControlLabel label="" checked={i===this.state.selectIndex} control={<Radio />}  />
                                            </RadioGroup>
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </Table>
                            <Button onClick={this.onSubmit} className="float-right">Submit</Button>
                        </div>
                    </Fragment>
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    pickupPoint,
    shippingBillingAddress,
    shippingModalHide
};



export default connect(null, mapDispatchToProps)(DefaultShippingModal);

