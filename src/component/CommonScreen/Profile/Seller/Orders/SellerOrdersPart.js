import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Select from "react-select";
import {MDBDataTable} from "mdbreact";
import Api from "../../../../../ClientApi/Api";
import {alert, onCurrencyFormat} from "../../../../../services/common";
import {refreshNotification} from "../../../../../services/actions/notificationAction";
import Photo from "../../../Image/Photo";
import {connect} from "react-redux";

class SellerOrdersPart extends PureComponent {
    constructor() {
        super();
        this.state  = {
            data:[],
            orderDetailsData:[],
            loading:true,
            productDetailsModal:false,
            detailsDataLoading:false,
            deliveryStatus:"",
            paymentStatus:"",
            orderId:"",
            checkbox:false,
        }
        this.onShowDetails = this.onShowDetails.bind(this)
        this.onHideProductDetails = this.onHideProductDetails.bind(this)
        this.onDeliveryStatusChange  = this.onDeliveryStatusChange.bind(this)
        this.onPaymentStatusChange = this.onPaymentStatusChange.bind(this)
        this.onSearchByDeliveryStatus = this.onSearchByDeliveryStatus.bind(this)
        this.onSearchByDate = this.onSearchByDate.bind(this)
        this.onCheckBoxMarked = this.onCheckBoxMarked.bind(this)
        this.onMarked = this.onMarked.bind(this)
    }
    componentDidMount() {
        Api().get('getAllSellerOrder').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        })
    }
    onShowDetails(id){
        this.setState({
            detailsDataLoading:true,
            productDetailsModal:true,
        })
        const data = {
            id:id
        }
        Api().post('getSellerOrderDetails',data).then(res=>{
            this.setState({
                detailsDataLoading:false,
                orderDetailsData:res.data,
                paymentStatus:res.data[0].payment_status,
                deliveryStatus:res.data[0].delivery_status,
                orderId:id
            })
        })
    }
    onHideProductDetails(){
        this.setState({
            productDetailsModal:false
        })
    }
    handlePrint(e){
        console.log(e);
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
            orderId : this.state.orderId,
            deliveryStatus: data.value
        }
        this.setState({
            detailsDataLoading:true,
        })
        Api().post('changeDeliveryStatus',status).then(res=>{
            if(res.data===1){
                alert('success','Delivery status has been changed!');
                this.onShowDetails(this.state.orderId);
                this.componentDidMount();
            }
        }).catch(error=>{
        })
    }
    onPaymentStatusChange(data){
        if(this.state.paymentStatus!==data.value){
            if(window.confirm("Do you want to mark payment as Paid?")){
                let status   =  {
                    orderId : this.state.orderId,
                    paymentStatus: data.value
                }
                this.setState({
                    detailsDataLoading:true,
                })
                Api().post('changePaymentStatus',status).then(res=>{
                    if(res.data===1){
                        alert('success','Payment status has been changed!');
                        this.onShowDetails(this.state.orderId);
                        this.componentDidMount();
                    }
                }).catch(error=>{
                })
            }

        }
    }

    onSearchByDeliveryStatus(data=null){
        if(data===null){
            const status = {
                deliveryStatus:null
            }
            Api().post('orderSearchByDeliveryStatus',status).then(res=>{
                this.setState({
                    data:res.data
                })
            }).catch(error=>{
            })
        }else{
            const status = {
                deliveryStatus:data.value
            }
            Api().post('orderSearchByDeliveryStatus',status).then(res=>{
                this.setState({
                    data:res.data
                })
            }).catch(error=>{
            })
        }
    }
    onSearchByDate(data){
        if(data==null){
            const value = {
                date:null
            }
            Api().post('orderSearchByDate',value).then(res=>{
                this.setState({
                    data:res.data
                })
            }).catch(error=>{
            })
        }else{
            const value = {
                date:data.value
            }
            Api().post('orderSearchByDate',value).then(res=>{
                this.setState({
                    data:res.data
                })
            }).catch(error=>{
            })
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
              'type':'new-order'
          }
          Api().post('markedAsSeen',data).then(res=>{
              if(res.data==1){
                  this.componentDidMount();
                  this.setState({
                      checkbox:false
                  })
              }
              this.props.refreshNotification('newOrder');
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
        const DeliveryStatus = [
            { value: 'Pending', label: 'Pending' },
            { value: 'Confirmed', label: 'Confirmed' },
            { value: 'Picked up', label: 'Picked up' },
            { value: 'On the way', label: 'On the way' },
            { value: 'Delivered', label: 'Delivered' },
            { value: 'Cancelled', label: 'Cancelled' },
        ];
        const date = [
            { value: 'todays', label: 'Todays' },
            { value: 'last-7-days', label: 'Last 7 days' },
            { value: 'last-15-days', label: 'Last 15 days' },
            { value: 'last-30-days', label: 'last 30 days' },
        ];
        const paymentStatus = [
            { value: 'Paid', label: 'Paid' },
            { value: 'Unpaid', label: 'Unpaid' },
        ];
        let data = this.state.data;
        let product = [];
        if(data.length>0){
            data.map((pro,index)=>{
                let notification = pro.notification;
                product.push({
                    serial: `${index+1}`,
                    orderId: <Fragment>
                               <p>{pro.orderId} <span>{notification===1?   <span className="seller-new-notification">New</span>:<></>}</span></p>
                             </Fragment>,
                    amount:<Fragment>
                        {
                            currencySymbolFormat===1 ?
                                <span>{onCurrencyFormat(pro.amount)}{defaultCurrency}</span>:
                                <span>{defaultCurrency}{onCurrencyFormat(pro.amount)}</span>
                        }
                    </Fragment> ,
                    delivery_status: `${pro.delivery_status}` ,
                    payment_status: `${pro.payment_status}`,
                    action:   <Fragment>
                        <Button onClick={()=>this.onShowDetails(pro.index)}  className="actionBtn" ><i title="show details" className="fas fa-eye  actionBtnIcon"/></Button>
                        <Button onClick={()=>this.handlePrint(pro.index)}  className="actionBtn" ><i title="Download" className="fas fa-download  actionBtnIcon"/></Button>
                    </Fragment>
                });
            })
        }
        let  product_details = {
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
                    label: 'Total Amount',
                    field: 'amount',
                    width: 100,
                },
                {
                    label: 'Delivery Status',
                    field: 'delivery_status',
                    width: 100,
                },
                {
                    label: 'Payment status',
                    field: 'payment_status',
                    sort: 'disabled',
                    width: 100,
                },
                {
                    label: 'Actions',
                    field: 'action',
                    sort: 'disabled',
                    width: 100,
                },
            ],
            rows: product,
        }
        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
               <Row className="mb-5 py-3">
                                    <Col lg={4} md={6} sm={12} xs={12} className="sortInput sortByStatus">
                                        <Select
                                            className="inputTextSize"
                                            placeholder="Sort by Delivery status"
                                            options={DeliveryStatus}
                                            isClearable
                                            onChange={this.onSearchByDeliveryStatus}
                                        />
                                    </Col>
                                    <Col lg={4} md={6} sm={12} xs={12} className="sortInput sortByDate">
                                        <Select
                                            className="inputTextSize"
                                            placeholder="Sort by Date"
                                            options={date}
                                            isClearable
                                            onChange={this.onSearchByDate}
                                        />
                                    </Col>
                                   <Col lg={4} md={6} sm={12} xs={12} className="sortInput sortByDate">
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
                                        <div className='sellerTableSize table-responsive-sm table-responsive-md table-responsive-lg'>
                                            <MDBDataTable
                                                striped
                                                bordered
                                                hover
                                                data={product_details}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                <Modal  size="lg" className='responsiveModal orderResponsiveModal'  scrollable={true}  centered show={this.state.productDetailsModal} onHide={this.onHideProductDetails}>
                    <Modal.Header className="d-flex justify-content-between">
                        <Modal.Title className='modalHeading'>Order details </Modal.Title>
                        <i onClick={this.onHideProductDetails} className="fa fa-times"/>
                    </Modal.Header>
                    <Modal.Body className='modalBody'>
                        {this.state.detailsDataLoading ?
                            <Fragment>
                                <div className="loader-spinner-div">
                                    {loader}
                                </div>
                            </Fragment>:
                            <Fragment>
                                {this.state.orderDetailsData.map(pd=>{
                                    return  <div className="order-details">
                                                <div className="order-card">
                                                    <div className="d-flex justify-content-between">
                                                        <div >
                                                            <p className="order-text"> <span className="mr-2">{("Order id")}</span><span className="orderId">{pd.order_id}</span></p>
                                                            <p className="order-text"> <span>{("Placed On")} {pd.order_data} </span></p>
                                                        </div>
                                                        <div>
                                                            <p className="order-text">
                                                                <span className="mr-2">{("order")}</span>
                                                                {pd.delivery_status==="Pending" ?
                                                                    <span className="order-status-btn badge-default">{pd.delivery_status}</span>:
                                                                    pd.delivery_status==="Delivered" ?
                                                                        <span className="order-status-btn badge-success">{pd.delivery_status}</span>:
                                                                        pd.delivery_status==="Cancelled" ?
                                                                            <span className="order-status-btn badge-danger">{pd.delivery_status}</span>  :
                                                                            <span className="order-status-btn badge-info">{pd.delivery_status}</span>
                                                                }
                                                            </p>
                                                            <p className="order-text"> <span className="mr-2">{("total")}</span><span className="order-total">
                                                                {
                                                                    currencySymbolFormat===1 ?
                                                                        <span>{onCurrencyFormat(pd.total)}{defaultCurrency}</span>:
                                                                        <span>{defaultCurrency}{onCurrencyFormat(pd.total)}</span>
                                                                }
                                                            </span></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {pd.productManageByAdmin!==1 &&
                                                    <div className="order-card">
                                                        <Row>
                                                            <Col lg={4}>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <div className="form-group">
                                                                    <label >{("Delivery status")}</label>
                                                                    {pd.delivery_status==="Cancelled" ?
                                                                        <Select
                                                                            isDisabled={true}
                                                                            options={DeliveryStatus}
                                                                            value = {
                                                                                DeliveryStatus.filter(option =>
                                                                                    option.value === this.state.deliveryStatus)
                                                                            }
                                                                        />:pd.delivery_status==="Delivered" ?
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
                                                            <Col lg={4}>
                                                                <div className="form-group">
                                                                    <label >{("Payment")} {("status")}</label>
                                                                    {pd.payment_status === "Paid" ?
                                                                        <Select
                                                                            isDisabled={true}
                                                                            options={paymentStatus}
                                                                            value={
                                                                                paymentStatus.filter(option =>
                                                                                    option.value === this.state.paymentStatus)
                                                                            }
                                                                        /> :
                                                                        <Select
                                                                            onChange={this.onPaymentStatusChange}
                                                                            options={paymentStatus}
                                                                            value={
                                                                                paymentStatus.filter(option =>
                                                                                    option.value === this.state.paymentStatus)
                                                                            }
                                                                        />
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                }
                                                <div className="order-card">
                                                    <p><i className="fas fa-box-open"/> {("Package")}</p>
                                                    <p>Sold by <span className="shop-name">{pd.shop_name}</span></p>
                                                    <hr/>
                                                    <div className="table-responsive-sm">
                                                        <table className="table">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">{("Photo")}</th>
                                                                <th scope="col">{("Title")}</th>
                                                                <th scope="col">{("Status")}</th>
                                                                <th scope="col">{("Unit price")}</th>
                                                                <th scope="col">{("Qty")}</th>
                                                                <th scope="col">{("Total")}</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {pd.product_info.map((pi,index)=>{
                                                                return  <tr key={index}>
                                                                    <th scope="row">{index+1}</th>
                                                                    <td>
                                                                        <Photo
                                                                            src={this.props.backendApi+pi.product_thumbnail}
                                                                            blurDataURL="/blank.jpg"
                                                                            class="thumbnailImage modalOrderImg"
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                        <p>{pi.product_name}</p>
                                                                        <p className="text-muted">
                                                                            {pi.product_variation != null &&
                                                                                <Fragment>{
                                                                                    pi.product_variation.map((variation, i) => {
                                                                                        return <Fragment
                                                                                            className="text-left mb-1"><span
                                                                                            className="variation">{(Object.keys(variation))}: </span>
                                                                                            <span
                                                                                                className="variation">{(Object.values(variation))}</span></Fragment>
                                                                                    })
                                                                                }
                                                                                </Fragment>
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td>
                                                                        {pi.product_status==="active" ?
                                                                            <span className="badge-success">{("Active")}</span>
                                                                            :
                                                                            <span className="badge-danger">{("Cancel")}</span>
                                                                        }
                                                                    </td>
                                                                    <td>{
                                                                        pi.product_price!==pi.discount_price ?
                                                                            <Fragment>
                                                                                {currencySymbolFormat===1 ?
                                                                                    <span > {onCurrencyFormat(pi.discount_price)}{defaultCurrency}  <del>{onCurrencyFormat(pi.product_price)}{defaultCurrency}</del> </span>
                                                                                    :
                                                                                    <span >{defaultCurrency}{onCurrencyFormat(pi.discount_price)}  <del>{defaultCurrency}{onCurrencyFormat(pi.product_price)}</del> </span>
                                                                                }
                                                                            </Fragment>
                                                                            :
                                                                            <Fragment>
                                                                                {currencySymbolFormat===1 ?
                                                                                    <span>{onCurrencyFormat(pi.product_price)}{defaultCurrency}</span>
                                                                                    :
                                                                                    <span>{defaultCurrency}{onCurrencyFormat(pi.product_price)}</span>
                                                                                }
                                                                            </Fragment>
                                                                    }</td>
                                                                    <td>{pi.product_qnt}</td>
                                                                    <td>{
                                                                        pi.product_price!==pi.discount_price ?
                                                                            <Fragment>
                                                                                {currencySymbolFormat===1 ?
                                                                                    <span >{onCurrencyFormat(pi.discount_price * pi.product_qnt)}{defaultCurrency}</span> :
                                                                                    <span >{defaultCurrency}{onCurrencyFormat(pi.discount_price * pi.product_qnt)}</span>
                                                                                }
                                                                            </Fragment>
                                                                            :
                                                                            <Fragment>
                                                                                {currencySymbolFormat===1 ?
                                                                                    <span>{onCurrencyFormat(pi.product_price * pi.product_qnt)}{defaultCurrency}</span>
                                                                                    :
                                                                                    <span>{defaultCurrency}{onCurrencyFormat(pi.product_price * pi.product_qnt)}</span>
                                                                                }
                                                                            </Fragment>
                                                                    }</td>
                                                                </tr>
                                                            })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <Row>
                                                    <Col lg={6}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="order-card">
                                                                    <div className="cart-summery">
                                                                        <h6>{("Customer Info")}</h6>
                                                                        <hr/>
                                                                        <Fragment>
                                                                            {pd.customer_info.map(ci=>{
                                                                                return  <Fragment>
                                                                                    <p>{("name")}: {ci.name}</p>
                                                                                    <p>{("email")}: {ci.email}</p>
                                                                                    <p>{("number")}: {ci.phone}</p>
                                                                                </Fragment>
                                                                            })}
                                                                        </Fragment>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            {pd.pickup_point!==null ?
                                                                <Fragment>
                                                                    <Col lg={12}>
                                                                        <div className="order-card">
                                                                            <div className="shippingDiv">
                                                                                <h6>{("Shipping Address")}</h6>
                                                                                <hr/>
                                                                                <Fragment>
                                                                                    <p><span className="badge badge-info">Pickup point address</span> {pd.pickup_point}</p>
                                                                                </Fragment>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Fragment>:
                                                                <Fragment>
                                                                    <Col lg={12}>
                                                                        <div className="order-card">
                                                                            <div className="shippingDiv">
                                                                                <h6>{("Shipping Address")}</h6>
                                                                                <hr/>
                                                                                <Fragment>
                                                                                    {pd.shipping_address.map(shipping=>{
                                                                                        return <Fragment>
                                                                                            <p>{shipping.name}</p>
                                                                                            <p><Badge variant="danger mr-2">{shipping.delivery_place}</Badge>{ shipping.address} , {shipping.region}</p>
                                                                                            <p>{shipping.phone}</p>
                                                                                        </Fragment>
                                                                                    })}
                                                                                </Fragment>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <div className="order-card">
                                                                            <div className="billingDiv">
                                                                                <h6>{("Billing Address")}</h6>
                                                                                <hr/>
                                                                                <Fragment>
                                                                                    {pd.billing_address.map(billing=>{
                                                                                        return <Fragment>
                                                                                            <p>{billing.name}</p>
                                                                                            <p><Badge variant="danger mr-2">{billing.delivery_place}</Badge>{ billing.address} , {billing.region}</p>
                                                                                            <p>{billing.phone}</p>
                                                                                        </Fragment>
                                                                                    })}
                                                                                </Fragment>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Fragment>
                                                            }
                                                        </Row>
                                                    </Col>


                                                    <Col lg={6}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="order-card">
                                                                    <div className="cart-summery">
                                                                        <h4>{("Order Summary")}</h4>
                                                                        <div className="d-flex justify-content-between">
                                                                            <p className="cart-summery-subtitle text-muted">{("Subtotal")}</p>
                                                                            <p className="cart-summery-subtitle-price"><span>
                                                                                  <Fragment>{
                                                                                      currencySymbolFormat===1 ?
                                                                                          <Fragment>
                                                                                              {onCurrencyFormat(pd.sub_total)}{defaultCurrency}
                                                                                          </Fragment>:
                                                                                          <Fragment>
                                                                                              {defaultCurrency}{onCurrencyFormat(pd.sub_total)}
                                                                                          </Fragment>
                                                                                  }</Fragment>
                                                                            </span></p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <p className="cart-summery-subtitle text-muted">{("Shipping fee")}</p>
                                                                            <p className="cart-summery-subtitle-price"><span>
                                                                                <Fragment>{
                                                                                    currencySymbolFormat===1 ?
                                                                                        <Fragment>
                                                                                            {onCurrencyFormat(pd.shipping_fee)}{defaultCurrency}
                                                                                        </Fragment>:
                                                                                        <Fragment>
                                                                                            {defaultCurrency}{onCurrencyFormat(pd.shipping_fee)}
                                                                                        </Fragment>
                                                                                }</Fragment>
                                                                            </span></p>
                                                                        </div>
                                                                        {pd.discount!==0 &&
                                                                            <div className="d-flex justify-content-between">
                                                                                <p className="cart-summery-subtitle text-muted">{("Discount")}</p>
                                                                                <p className="cart-summery-subtitle-price"><span>{pd.discount}%</span></p>
                                                                            </div>
                                                                        }
                                                                        {pd.tax!==null  &&
                                                                            <Fragment>
                                                                                {pd.tax.map(vat=>{
                                                                                    return   <div className="d-flex justify-content-between">
                                                                                        <p className="cart-summery-subtitle text-muted">{vat.name}({vat.type})</p>
                                                                                        <p className="cart-summery-subtitle-price"><span>{vat.price}%</span></p>
                                                                                    </div>
                                                                                })}
                                                                            </Fragment>
                                                                        }
                                                                        {pd.coupon!==null &&
                                                                            <Fragment>
                                                                                {pd.coupon.map(voucher=>{
                                                                                    return <div className="d-flex justify-content-between">
                                                                                        <p className="cart-summery-subtitle text-muted">{("Coupon discount")}({voucher.voucher_discount_type})</p>
                                                                                        <p className="cart-summery-subtitle-price"><span>{voucher.voucher_discount}%</span></p>
                                                                                    </div>
                                                                                })}
                                                                            </Fragment>
                                                                        }
                                                                        <hr/>
                                                                        <div className="d-flex justify-content-between ">
                                                                            <p className="oTotalLabel">{("Total")}</p>
                                                                            <p className="oTotalValue">
                                                                                <span>
                                                                                      <Fragment>{
                                                                                          currencySymbolFormat===1 ?
                                                                                              <Fragment>
                                                                                                  {onCurrencyFormat(pd.total)}{defaultCurrency}
                                                                                              </Fragment>:
                                                                                              <Fragment>
                                                                                                  {defaultCurrency}{onCurrencyFormat(pd.total)}
                                                                                              </Fragment>
                                                                                      }</Fragment>
                                                                               </span>
                                                                            </p>
                                                                        </div>
                                                                        <p className="order-payment-method">{("Payment method")} <span className="order-payment-method-name">
                                                                            {pd.payment_method==="COD" ?
                                                                                <span>{("Cash on Delivery")}</span>:
                                                                                <span>{pd.payment_method}</span>
                                                                            }
                                                                        </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Col>
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
    const backendApi = state.userReducer.backendApi;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    return {
        backendApi,
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerOrdersPart);

