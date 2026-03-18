import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Select from "react-select";
import SimpleReactValidator from 'simple-react-validator';
import {MDBDataTable} from "mdbreact";
import Api from "../../../../../ClientApi/Api";
import {alert, onCurrencyFormat} from "../../../../../services/common";
import {sendEmail} from "../../../../../services/actions/commonAction";
import {refreshNotification} from "../../../../../services/actions/notificationAction";
import {connect} from "react-redux";
import CommonOrderIdPart from "../CommonReturn/CommonOrderIdPart";
import CommonUpperPart from "../CommonReturn/CommonUpperPart";
import OrderSummary from "../../../CheckoutDetails/OrderSummary";

class ReplaceRequestPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state  = {
            data:[],
            loading:true,
            detailsDataLoading:false,
            replaceDetailsData:[],
            deliveryStatus:"",
            modal:false,
            id:"",
            checkbox:false,
        }
        this.onDetails = this.onDetails.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onDeliveryStatusChange = this.onDeliveryStatusChange.bind(this)
        this.onCheckBoxMarked = this.onCheckBoxMarked.bind(this)
        this.onMarked = this.onMarked.bind(this)
        this.onPostDeliveryData = this.onPostDeliveryData.bind(this)
    }
    componentDidMount() {
        Api().get('getAllSellerReplaceOrders').then(res=>{
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
        Api().post('getReplaceDetails',data).then(res=>{
            this.setState({
                detailsDataLoading:false,
                replaceDetailsData:res.data,
                deliveryStatus:res.data[0].status,
                id:id,
            })
        })
    }
    handleClose(){
        this.setState({
            modal:false,
            returnStatus:"",
            cancellationReason:""
        })
    }
    onDeliveryStatusChange(data){
        if(this.state.deliveryStatus!==data.value){
            if(data.value==="Cancelled"){

                if(window.confirm('Once you set delivery status as cancelled, you can not change it later!')){
                    this.onPostDeliveryData(data);
                }

            }else if(data.value==="Delivered"){

                if(window.confirm('Once you set delivery status as delivered, you can not change it later!')){
                    this.onPostDeliveryData(data);
                }

            }else{
                if(this.state.deliveryStatus!==data.value){

                    if(window.confirm('Do you want to update the delivery status!')){
                        this.onPostDeliveryData(data);
                    }

                }
            }
        }
    }
    onPostDeliveryData(data){
        let status   =  {
            orderId : this.state.id,
            deliveryStatus: data.value,
        }
        Api().post('changeReplaceDeliveryStatus',status).then(res=>{
            if(res.data===1){
                this.componentDidMount()
                alert('success','Delivery status has been changed!');
                this.props.sendEmail();
                this.handleClose();
            }
        }).catch(error=>{
        })
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
                'type':'replace-request'
            }
            Api().post('markedAsSeen',data).then(res=>{
                if(res.data==1){
                    this.componentDidMount();
                    this.setState({
                        checkbox:false
                    })
                }
                this.props.refreshNotification('replaceRequest');
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
                        pro.status==="Cancelled" ?
                            <div className="badge badge-danger">{pro.status}</div>
                            :
                            <div className="badge badge-success">{pro.status}</div>
                    }</div>,
                    action: <Button onClick={()=>this.onDetails(pro.index)}  className="actionBtn" ><i title="show details" className="fas fa-eye  actionBtnIcon"/></Button>
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
                    label: 'Status',
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
        const DeliveryStatus = [
            { value: 'Pending', label: 'Pending' },
            { value: 'Confirmed', label: 'Confirmed' },
            { value: 'Picked up', label: 'Picked up' },
            { value: 'On the way', label: 'On the way' },
            { value: 'Delivered', label: 'Delivered' },
            { value: 'Cancelled', label: 'Cancelled' },
        ];
        return (
            <Fragment>
                <Row>
                    <Col lg={12}>
                        <div className="card">
                            <div className="card-body">
                                <Row className="mb-3 px-3">
                                    {this.state.loading === true ?
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
                <Modal size="lg" className='responsiveModal orderResponsiveModal'  scrollable={true}  centered show={this.state.modal} onHide={this.handleClose}>
                    <Modal.Header className="d-flex justify-content-between">
                        <Modal.Title className='modalHeading'>Replace details </Modal.Title>
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
                                {this.state.replaceDetailsData.map(pd=>{
                                    return   <div className="order-details">
                                        <CommonOrderIdPart type="replace" data={pd}/>
                                        {pd.productManageByAdmin!==1 &&
                                            <div className="order-card">
                                                <Row className="mb-5">
                                                    <Col lg={4}>
                                                    </Col>
                                                    <Col lg={4}>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="form-group">
                                                            <label >Delivery status</label>
                                                            {pd.status==="Cancelled" ?
                                                                <Select
                                                                    isDisabled={true}
                                                                    options={DeliveryStatus}
                                                                    value = {
                                                                        DeliveryStatus.filter(option =>
                                                                            option.value === this.state.deliveryStatus)
                                                                    }
                                                                />:pd.status==="Delivered" ?
                                                                    <Select
                                                                        isDisabled={true}
                                                                        options={DeliveryStatus}
                                                                        value = {
                                                                            DeliveryStatus.filter(option =>
                                                                                option.value === this.state.deliveryStatus)
                                                                        }
                                                                    />:
                                                                    <Select
                                                                        onChange={this.onDeliveryStatusChange}
                                                                        options={DeliveryStatus}
                                                                        value = {
                                                                            DeliveryStatus.filter(option =>
                                                                                option.value === this.state.deliveryStatus)
                                                                        }
                                                                    />
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        }
                                        <CommonUpperPart data={pd}/>
                                        <Row>
                                            <Col lg={6}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div className="cart-summery">
                                                                <h6>Replace Reason</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>{pd.replace_reason}</p>
                                                                </Fragment>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div className="shippingDiv">
                                                                <h6>Replace additional Reason</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>
                                                                        {pd.replace_additional_reason}
                                                                    </p>
                                                                </Fragment>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div className="billingDiv">
                                                                <h6>Return  type</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>
                                                                        {pd.return_type}
                                                                    </p>
                                                                </Fragment>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div className="billingDiv">
                                                                <h6>Return address</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>
                                                                        {pd.return_address.map(address=>{
                                                                            return  <Fragment>
                                                                                <p>{address.zone_name}</p>
                                                                                <p>{address.Name}</p>
                                                                                <p>{address.address}</p>
                                                                                <p>{address.phone}</p>
                                                                            </Fragment>
                                                                        })}
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
                                                    {pd.status==="Cancelled" &&
                                                        <Col lg={12}>
                                                            <div className="order-card">
                                                                <div className="cart-summery">
                                                                    <h4>Cancellation Reason</h4>
                                                                    <hr/>
                                                                    <div className="">
                                                                        <p>{pd.cancellation_reason}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
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
    sendEmail,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplaceRequestPart);