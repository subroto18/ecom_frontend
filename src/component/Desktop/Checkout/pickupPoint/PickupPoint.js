import React, {PureComponent, Fragment} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import Api from "../../../../ClientApi/Api";
import {connect} from "react-redux";
import {alert} from "../../../../services/common";
import {pickupPoint} from "../../../../services/actions/shippingBillingPickupAction";

class PickupPoint extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            selectedData:"",
            loading:true,
            check:-1
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
            check:i,
            selectedData:data
        })
    }
    onSubmit(){
        let data = this.state.selectedData;
        if(data!==""){
            alert('Pickup point address has been set!');
            this.props.pickupPoint(data);
        }
    }

    render() {
        return (
            <Fragment>
                <Fragment>{this.state.loading ?
                    <Fragment>
                        <div  className="card-body desktop-cwc-body">
                            <div className="loader-spinner">
                                <div className="spinner-border text-muted"/>
                            </div>
                        </div>
                    </Fragment>:
                    <Fragment>
                        <div className="white-bg ">
                            <Table className="userAddressTable table-responsive-xl table-responsive-lg table-responsive-md table-responsive-sm table-responsive" hover>
                                <thead>
                                <tr>
                                    <th>Zone Name</th>
                                    <th>Address</th>
                                    <th>Region</th>
                                    <th>Manager Name</th>
                                    <th>Phone number</th>
                                    <th>Manager Email</th>
                                    <th>Option</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((pd,i)=>{
                                    return <tr>
                                        <td>{pd.name}</td>
                                        <td><Badge variant="danger">Zone address</Badge> {pd.address}</td>
                                        <td>{pd.region}</td>
                                        <td>{pd.manager_name}</td>
                                        <td>{pd.manager_number}</td>
                                        <td>{pd.manager_email}</td>
                                        <td>
                                            <RadioGroup   onChange={(e)=>this.handleChange(pd,i,e)}>
                                                <FormControlLabel label="" checked={i===this.state.check} control={<Radio />}  />
                                            </RadioGroup>
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </Table>
                             <Button onClick={this.onSubmit} className="float-right">Submit</Button>
                        </div>
                    </Fragment>
                }</Fragment>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    pickupPoint
};



export default connect(null, mapDispatchToProps)(PickupPoint);
