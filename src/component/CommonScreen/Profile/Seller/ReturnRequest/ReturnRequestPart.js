import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import {MDBDataTable} from "mdbreact";
import Api from "../../../../../ClientApi/Api";
import { onCurrencyFormat} from "../../../../../services/common";
import {refreshNotification} from "../../../../../services/actions/notificationAction";
import {connect} from "react-redux";
import CommonOrderIdPart from "../CommonReturn/CommonOrderIdPart";
import CommonUpperPart from "../CommonReturn/CommonUpperPart";
import OrderSummary from "../../../CheckoutDetails/OrderSummary";
class ReturnRequestPart extends PureComponent {
    constructor() {
        super();
        this.state  = {
            data:[],
            loading:true,
            detailsDataLoading:false,
            returnDetailsData:[],
            modal:false,
            id:"",
            checkbox:false,
        }
        this.onDetails = this.onDetails.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onCheckBoxMarked = this.onCheckBoxMarked.bind(this)
        this.onMarked = this.onMarked.bind(this)
    }
    componentDidMount() {
        Api().get('getAllSellerReturns').then(res=>{
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
        Api().post('getReturnsDetails',data).then(res=>{
            this.setState({
                detailsDataLoading:false,
                returnDetailsData:res.data,
                orderId:id,
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
                'type':'return-request'
            }
            Api().post('markedAsSeen',data).then(res=>{
                if(res.data==1){
                    this.componentDidMount();
                    this.setState({
                        checkbox:false
                    })
                }
                this.props.refreshNotification('returnRequest');
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
                    productName: `${pro.product_name}`,
                    amount:     <div>
                        {currencySymbolFormat===1 ?
                            <span>{onCurrencyFormat(pro.product_price)}{defaultCurrency}</span>
                            :
                            <span>{defaultCurrency}{onCurrencyFormat(pro.product_price)}</span>
                        }
                    </div>  ,
                    status: <div>{
                        pro.status==="Received" ?
                            <div className="badge badge-success">{pro.status}</div>
                            :
                            <div className="badge badge-danger">{pro.status}</div>
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
                <Modal size="lg" className='responsiveModal orderResponsiveModal'  scrollable={true}  centered show={this.state.modal} onHide={this.handleClose}>
                    <Modal.Header className="d-flex justify-content-between">
                        <Modal.Title className='modalHeading'>Returns Details</Modal.Title>
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
                                {this.state.returnDetailsData.map(pd=>{
                                    return   <div className="order-details">
                                                <CommonOrderIdPart type="return" data={pd}/>
                                                <CommonUpperPart data={pd} />
                                                <Row>
                                            <Col lg={6}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div>
                                                                <h6>Return Reason</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>{pd.return_reason}</p>
                                                                </Fragment>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="order-card">
                                                            <div className="shippingDiv">
                                                                <h6>Return additional Reason</h6>
                                                                <hr/>
                                                                <Fragment>
                                                                    <p>
                                                                        {pd.return_additional_reason}
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
                                                    {pd.status==="Rejected" &&
                                                        <Col lg={12}>
                                                            <div className="order-card">
                                                                <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReturnRequestPart);