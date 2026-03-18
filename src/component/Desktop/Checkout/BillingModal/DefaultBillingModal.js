import React, {PureComponent, Fragment} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import Api from "../../../../ClientApi/Api";
import {alert} from "../../../../services/common";
import {
    shippingBillingAddress,
    billingModalHide
} from "../../../../services/actions/shippingBillingPickupAction";
import {connect} from "react-redux";

class DefaultBillingModal extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            selectIndex: '',
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        Api().get('getShippingAddress').then(res => {
            let data = res.data;
            if (data.length > 0) {
                data.map((pd, i) => {
                    if (pd.defaultBilling === 1) {
                        this.setState({
                            selectIndex: i
                        })
                    }
                })
            }
            this.setState({
                data: res.data,
                loading: false
            })
        }).catch(error => {
        })
    }

    handleChange(e, i) {
        this.setState({
            defaultShipping: true,
            selectIndex: i
        })
    }

    onSubmit() {
        let index = this.state.selectIndex;
        if (index !== "") {
            const data = {
                index: index
            }
            Api().post('changeDefaultBilling', data).then(res => {
                if (res.data !== 0) {

                    alert('success', 'Default billing  address has been set!')
                    this.props.shippingBillingAddress(res.data);
                    this.props.billingModalHide();
                }
            }).catch(error => {
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Fragment>{this.state.loading ?
                    <Fragment>
                        <div className="card-body desktop-cwc-body">
                            <div className="loader-spinner">
                                <div className="spinner-border text-muted"/>
                            </div>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <div className="white-bg ">
                            <Table className="userAddressTable" hover>
                                <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Region</th>
                                    <th>#</th>
                                    <th>Option</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((pd, i) => {
                                    return <tr>
                                        <td>{pd.name}</td>
                                        <td><Badge variant="danger">{pd.shippingPlace}</Badge> {pd.address}</td>
                                        <td>{pd.region}-{pd.city}-{pd.area}</td>
                                        <td>
                                            {pd.defaultShipping == 1 && <span>Default Shipping Address</span>}
                                            {(pd.defaultShipping == 1 && pd.defaultBilling == 1) && <br/>}
                                            {pd.defaultBilling == 1 && <span>Default billing Address</span>}
                                        </td>
                                        <td>
                                            <RadioGroup aria-label="shipping" name="shipping"
                                                        onChange={(e) => this.handleChange(e, i)}>
                                                <FormControlLabel label="" checked={i === this.state.selectIndex}
                                                                  control={<Radio/>}/>
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
    shippingBillingAddress,
    billingModalHide
};


export default connect(null, mapDispatchToProps)(DefaultBillingModal);
