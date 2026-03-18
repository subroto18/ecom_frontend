import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import {MDBDataTable} from "mdbreact";
import Api from "../../../../../ClientApi/Api";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import SimpleReactValidator from 'simple-react-validator';
import {alert, onCurrencyFormat} from "../../../../../services/common";
import {refreshNotification} from "../../../../../services/actions/notificationAction";
import {connect} from "react-redux";
import CommonOrderIdPart from "../CommonReturn/CommonOrderIdPart";
import CommonUpperPart from "../CommonReturn/CommonUpperPart";
import OrderSummary from "../../../CheckoutDetails/OrderSummary";

class RefundRequestPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state  = {
            data:[],
            loading:true,
            detailsDataLoading:false,
            refundDetailsData:[],
            modal:false,
            deliveryStatus:"",
            paymentStatus:"",
            orderId:"",
            Approved:false,
            Rejected:false,
            approvedAmount:"",
            rejectedReason:"",
            shop_id:"",
        }
        this.onDetails = this.onDetails.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onPayoutStatusChange = this.onPayoutStatusChange.bind(this)
        this.onApprovedAmount = this.onApprovedAmount.bind(this)
        this.onApproved = this.onApproved.bind(this)
        this.onRejected = this.onRejected.bind(this)
        this.onRejectedReason = this.onRejectedReason.bind(this)
        this.onMarked = this.onMarked.bind(this)
    }
    componentDidMount() {
        Api().get('getAllSellerRefunds').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        })
    }
    onDetails(id){
        this.setState({
            detailsDataLoading:true,
            modal:true
        })
        const data = {
            id:id
        }
        Api().post('getRefundRequestDetails',data).then(res=>{
            this.setState({
                detailsDataLoading:false,
                refundDetailsData:res.data,
                orderId:id,
                shop_id:res.data[0].shop_id,
                approvedAmount:res.data[0].approved_amount
            })
        })
    }
    handleClose(){
        this.setState({
            modal:false,
            Approved:false,
            Rejected:false,
            approvedAmount:"",
            rejectedReason:""
        })
    }
    onApprovedAmount(e){
        this.setState({
            approvedAmount:e.target.value
        })
    }
    onRejectedReason(e){
        this.setState({
            rejectedReason:e.target.value
        })
    }
    onPayoutStatusChange(data){
        if(data==="Approved"){
            this.setState({
                Approved:true,
                Rejected:false
            })
        }else{
            this.setState({
                Rejected:true,
                Approved:false
            })
        }
    }
    onApproved(){
        if (this.validator.allValid()) {
            const data = {
                refundId:this.state.orderId,
                shop_id :this.state.shop_id,
                approvedAmount: this.state.approvedAmount
            }
            Api().post('postApprovedRefundRequest',data).then(res=>{
                if(res.data===1){
                    this.setState({
                        modal:false
                    })
                    alert('success','Refund has been Approved!');
                    this.componentDidMount();
                }else{
                }
            }).catch(error=>{
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    onRejected(){
        if (this.validator.allValid()) {
            const data = {
                refundId:this.state.orderId,
                rejectedReason: this.state.rejectedReason
            }
            Api().post('postRejectedRefundRequest',data).then(res=>{
                if(res.data===1){
                    this.setState({
                        modal:false
                    })
                    alert('Refund has been Rejected!');

                    this.componentDidMount();
                }else{
                }
            }).catch(error=>{
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    onCheckBoxMarked(){
        let value = this.state.checkbox;
        if(value){
            this.setState({
                checkbox:false
            })
        }else{
            this.setState({
                checkbox:true
            })
        }
    }
    onMarked(){
        let value = this.state.checkbox;
        this.setState({
            loadingMarkBtn:true
        })
        if(value){
            let data = {
                'type':'refund-request'
            }
            Api().post('markedAsSeen',data).then(res=>{
                if(res.data==1){
                    this.componentDidMount();
                    this.setState({
                        checkbox:false
                    })
                }
                this.props.notificationReducer('refundRequest');
                this.setState({
                    loadingMarkBtn:false
                })
            }).catch(error=>{
            });
        }
    }

    render() {

        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        let data = this.state.data;
        let row = [];
        if(data.length>0){
            data.map((pro,index)=>{
                let notification = pro.notification;
                row.push({
                    serial: `${index+1}`,
                    orderId: <p>{pro.order_id} <span>{notification===1?   <span className="seller-new-notification">New</span>:<></>}</span></p>,
                    productName:`${pro.product_name}` ,
                    amount: <div>
                        {currencySymbolFormat===1 ?
                            <span>{onCurrencyFormat(pro.product_price)}{defaultCurrency}</span>
                            :
                            <span>{defaultCurrency}{onCurrencyFormat(pro.product_price)}</span>
                        }
                    </div>  ,
                    status: <div>{
                        pro.seller_approval===0 && pro.seller_rejection===0 ?
                            <div className="badge badge-success">Pending</div>
                            :pro.seller_rejection===1 ?
                                <div className="badge badge-danger">Rejected</div>
                                :
                                pro.seller_approval==1 && pro.admin_approval===0 && pro.admin_rejection===0 ?
                                    <div className="badge badge-primary">Pending</div>:
                                    pro.admin_rejection===1 ?
                                        <div className="badge badge-danger">Rejected</div>
                                        :pro.seller_approval==1 && pro.admin_approval==1 ?
                                            <div className="badge badge-primary">Refunded</div>:
                                            <Fragment></Fragment>
                    }</div>,
                    action: <Button onClick={()=>this.onDetails(pro.index)}  className="actionBtn" ><i title="show details" className="fas fa-eye actionBtnIcon"/></Button>
                });
            })
        }
        let  Column = {
            columns: [
                {
                    label: '#',
                    field: 'serial',
                    width: 100,
                },
                {
                    label: 'Order Id',
                    field: 'orderId',
                    width: 100,
                },
                {
                    label: 'Product Name',
                    field: 'productName',
                    width: 100,
                },
                {
                    label: 'Total Amount',
                    field: 'amount',
                    width: 100,
                },
                {
                    label: 'Refund status',
                    field: 'status',
                    width: 100,
                },
                {
                    label: 'Actions',
                    field: 'action',
                    sort: 'disabled',
                    width: 100,
                },
            ],
            rows: row,
        }
        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <Row>
                    <Col lg={12}>
                        <div className="card">
                            <div className="card-body">
                                <Row className="mb-3 px-3">
                                    {this.state.loading ?
                                        <div className="loader-spinner-div">
                                            {loader}
                                        </div> :
                                        <Fragment>
                                            <Col lg={12} className="sortInput sortByDate">
                                                <div className="mark-seen-div">
                                                    <input checked={this.state.checkbox} onClick={(e)=>this.onCheckBoxMarked(e)} className="check-mark-checkbox" type="checkbox"/>
                                                    {this.state.checkbox==true ?
                                                        <Fragment>
                                                            {this.state.loadingMarkBtn ?
                                                                <Button className="float-right"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                                    Loading...
                                                                </Button>:
                                                                <Button onClick={this.onMarked}  className="check-mark-checkbox-btn">Mark as seen</Button>
                                                            }
                                                        </Fragment>
                                                        :
                                                        <Button disabled={true}  className="check-mark-checkbox-btn">Mark as seen</Button>
                                                    }
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className='sellerTableSize resSellerTable table-responsive-sm table-responsive-md table-responsive-lg'>
                                                    <MDBDataTable
                                                        striped
                                                        bordered
                                                        hover
                                                        data={Column}
                                                    />
                                                </div>
                                            </Col>
                                        </Fragment>
                                    }
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Modal size="xl | lg | sm" className='responsiveModal orderResponsiveModal'  scrollable={true}  centered show={this.state.modal} onHide={this.handleClose}>
                    <Modal.Header className="d-flex justify-content-between">
                        <Modal.Title className='modalHeading'>Refund Details</Modal.Title>
                        <i onClick={this.handleClose} className="fa fa-times"/>
                    </Modal.Header>
                    <Modal.Body className='modalBody'>
                        {this.state.detailsDataLoading ?
                            <Fragment>
                                <div className="loader-spinner-div">
                                    {loader}
                                </div>
                            </Fragment>:
                            <Fragment>
                                {this.state.refundDetailsData.map(pd=>{
                                    return   <div className="order-details">
                                        <CommonOrderIdPart type="refund" data={pd}/>
                                        <CommonUpperPart data={pd}/>
                                        <Row>
                                            <Col lg={6}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div className="cart-summery">
                                                                <h6>Refund Reason</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>{pd.refund_reason}</p>
                                                                </Fragment>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div className="shippingDiv">
                                                                <h6>Refund additional Reason</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>
                                                                        {pd.refund_additional_reason}
                                                                    </p>
                                                                </Fragment>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <OrderSummary data={pd}/>
                                                    </Col>
                                                    {pd.seller_approval===0 && pd.seller_rejection===0 &&
                                                        <Col lg={12}>
                                                            <div className="order-card">
                                                                <div className="cart-summery">
                                                                    <h4>Refund Acceptance Approval</h4>
                                                                    <hr/>
                                                                    <RadioGroup onChange={this.onPayoutStatusChange} horizontal>
                                                                        <RadioButton value="Approved">
                                                                            Approved
                                                                        </RadioButton>
                                                                        <RadioButton value="Rejected">
                                                                            Rejected
                                                                        </RadioButton>
                                                                    </RadioGroup>
                                                                    <div className="">
                                                                        {this.state.Approved &&
                                                                            <div className="form-group">
                                                                                <label>Approved Amount</label>
                                                                                <input value={this.state.approvedAmount}  onChange={(e)=>this.onApprovedAmount(e)} className="form-control"  placeholder="Enter Approve Amount"  />
                                                                                <div className="text-danger my-2"> {this.validator.message('approvedAmount', this.state.approvedAmount, 'required|currency')}</div>
                                                                                <Button onClick={this.onApproved} className="btn mt-2">Submit</Button>
                                                                            </div>
                                                                        }
                                                                        {this.state.Rejected &&
                                                                            <div className="form-group">
                                                                                <label>Rejected Reason</label>
                                                                                <textarea onChange={(e)=>this.onRejectedReason(e)} className="form-control"  rows="3"/>
                                                                                <div className="text-danger my-2"> {this.validator.message('variations_attribute', this.state.rejectedReason, 'required')}</div>
                                                                                <Button onClick={this.onRejected} className="btn mt-2">Submit</Button>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    }
                                                    {pd.seller_rejection===1 && pd.seller_rejection_reason!==null ?
                                                        <Col lg={12}>
                                                            <div className="order-card">
                                                                <div className="cart-summery">
                                                                    <Fragment>
                                                                        <h6>Rejected Reason</h6>
                                                                        <hr/>
                                                                        <p>{pd.seller_rejection_reason}</p>
                                                                        <hr/>
                                                                        <p className="mt-2">Rejected by <span className="badge badge-primary">{pd.shop_name}</span></p>
                                                                    </Fragment>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        :pd.seller_approval===1 && pd.admin_approval==0 && pd.admin_rejection==0?
                                                            <Col lg={12}>
                                                                <div className="order-card">
                                                                    <div className="cart-summery">
                                                                        <Fragment>
                                                                            <h6>Waiting for admin approval</h6>
                                                                        </Fragment>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            :pd.seller_approval==1 && pd.admin_approval===0 && pd.admin_rejection==1 ?
                                                                <Col lg={12}>
                                                                    <div className="order-card">
                                                                        <div className="cart-summery">
                                                                            <Fragment>
                                                                                <h6>Rejected Reason</h6>
                                                                                <hr/>
                                                                                <p>{pd.admin_rejection_reason}</p>
                                                                                <hr/>
                                                                                <p className="mt-2">Rejected by <span className="badge badge-primary">Admin</span></p>
                                                                            </Fragment>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                :pd.seller_approval==1 && pd.admin_approval===1 ?
                                                                    <Col lg={12}>
                                                                        <Fragment>
                                                                            <div className="alert alert-info">
                                                                                <p>Refund Approved</p>
                                                                                <p className="mx-2">Refunded Amount
                                                                                    {currencySymbolFormat===1 ?
                                                                                        <span>{onCurrencyFormat(pd.approved_amount)}{defaultCurrency}</span>
                                                                                        :
                                                                                        <span>{defaultCurrency}{onCurrencyFormat(pd.approved_amount)}</span>
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </Fragment>
                                                                    </Col>
                                                                    :
                                                                    <Fragment/>
                                                    }
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                })}
                            </Fragment>
                        }
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}


const mapDispatchToProps = {
    refreshNotification
};

function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    return {
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RefundRequestPart);