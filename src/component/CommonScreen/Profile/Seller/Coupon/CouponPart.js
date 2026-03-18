import React, {PureComponent, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Api from "../../../../../ClientApi/Api";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {MDBDataTable} from "mdbreact";
import ReactPlaceholder from "react-placeholder";
import Router from "next/router";
import {alert} from "../../../../../services/common";
import {connect} from "react-redux";

class CouponPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            data: [],
            detailsDataLoading: true,
            addCouponModal: false,
            code: "",
            amount: "",
            startDate: new Date(),
            endDate: new Date(),
            type: "on_product",
            discountType: "percentage",
            min_purchase_amount: 0,
            max_redeem_amount: 0,
            products: [],
            couponProducts: [],
            status: 1,
            id: "",
            update: false,
            loading: false
        }
        this.onEdit = this.onEdit.bind(this)
        this.onHideProductDetails = this.onHideProductDetails.bind(this)
        this.onAddCoupon = this.onAddCoupon.bind(this)
        this.onCloseAddCoupon = this.onCloseAddCoupon.bind(this)
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.onCouponTypeChange = this.onCouponTypeChange.bind(this);
        this.onCouponDiscountTypeChange = this.onCouponDiscountTypeChange.bind(this);
        this.onCouponCodeChange = this.onCouponCodeChange.bind(this);
        this.onCouponAmountChange = this.onCouponAmountChange.bind(this);
        this.onCouponMinPurchaseAmountChange = this.onCouponMinPurchaseAmountChange.bind(this);
        this.onCouponMaxRedeemAmountChange = this.onCouponMaxRedeemAmountChange.bind(this);
        this.onCouponProductsChange = this.onCouponProductsChange.bind(this);
        this.onCouponStatusChange = this.onCouponStatusChange.bind(this);
        this.onCouponSubmit = this.onCouponSubmit.bind(this);
        this.onCloseEditCoupon = this.onCloseEditCoupon.bind(this)
        this.onCouponUpdate = this.onCouponUpdate.bind(this)
    }
    componentDidMount() {
        Api().get('getSellerAllProduct').then(res => {
            this.setState({
                couponProducts: res.data,
                loading: true
            })
        })
        Api().get('getSellerCoupon').then(res => {
            this.setState({
                data: res.data
            })
        }).catch(error => {
        })
    }
    setStartDate(date) {
        this.setState({
            startDate: date,
            update: true
        });
    }
    setEndDate(date) {
        this.setState({endDate: date, update: true});
    }
    onCouponTypeChange(e) {
        this.setState({type: e.value, update: true})
    }
    onCouponDiscountTypeChange(e) {
        this.setState({discountType: e.value, update: true})
    }
    onCouponCodeChange(e) {
        this.setState({code: e.target.value, update: true});
    }
    onCouponMinPurchaseAmountChange(e) {
        this.setState({min_purchase_amount: e.target.value, update: true});
    }
    onCouponMaxRedeemAmountChange(e) {
        this.setState({max_redeem_amount: e.target.value, update: true});
    }
    onCouponAmountChange(e) {
        this.setState({amount: e.target.value, update: true});
    }
    onCouponProductsChange(e) {
        let productId = e.map(pd => pd.value);
        this.setState({products: productId, update: true});
    }
    onCouponStatusChange(e) {
        this.setState({status: e.value, update: true});
    }
    onCouponSubmit() {
        let type = this.state.type;
        let productId = this.state.products;
        let amount = this.state.amount;
        let discountType = this.state.discountType;
        let code = this.state.code
        let start_date = this.state.startDate;
        let end_date = this.state.endDate;
        let min_purchase = this.state.min_purchase_amount;
        let max_discount = this.state.max_redeem_amount;
        let status = this.state.status;
        if (type === "on_product") {
            if (this.validator.fieldValid('products') &&
                this.validator.fieldValid('code') &&
                this.validator.fieldValid('amount')) {
                this.setState({
                    loadingBtn: true
                })
                const data = {
                    'type': type,
                    'productId': productId,
                    'code': code,
                    'start_date': start_date,
                    'end_date': end_date,
                    'amount': amount,
                    'discount_type': discountType,
                    'status': status
                }
                Api().post('postSellerCoupon', data)
                    .then(response => {
                        if (response.data === 1) {
                            alert('success',' Coupon has been added successfully!');
                            this.componentDidMount()
                            this.setState({
                                data: [],
                                detailsDataLoading: false,
                                addCouponModal: false,
                                code: "",
                                amount: "",
                                startDate: new Date(),
                                endDate: new Date(),
                                type: "on_product",
                                discountType: "percentage",
                                min_purchase_amount: 0,
                                max_redeem_amount: 0,
                                products: [],
                                couponProducts: [],
                                status: 1,
                                update: false
                            })
                            this.setState({
                                loadingBtn: false
                            })
                        }
                    })
                    .catch(error => {
                    })
            } else {
                window.scroll(0, 0)
                this.validator.showMessageFor('products');
                this.validator.showMessageFor('code');
                this.validator.showMessageFor('amount');
                this.forceUpdate();
            }
        } else {
            if (
                this.validator.fieldValid('code') &&
                this.validator.fieldValid('amount') &&
                this.validator.fieldValid('min_purchase_amount') &&
                this.validator.fieldValid('max_redeem_amount')) {
                this.setState({
                    loadingBtn: true
                })
                const data = {
                    'type': type,
                    'productId': productId,
                    'code': code,
                    'start_date': start_date,
                    'end_date': end_date,
                    'amount': amount,
                    'discount_type': discountType,
                    'status': status,
                    'min_purchase': min_purchase,
                    'max_discount': max_discount,
                }
                Api().post('postSellerCoupon', data)
                    .then(response => {
                        alert('success',' Coupon has been added successfully!');

                        this.componentDidMount()
                        this.setState({
                            data: [],
                            detailsDataLoading: false,
                            addCouponModal: false,
                            code: "",
                            amount: "",
                            startDate: new Date(),
                            endDate: new Date(),
                            type: "on_product",
                            discountType: "percentage",
                            min_purchase_amount: 0,
                            max_redeem_amount: 0,
                            products: [],
                            couponProducts: [],
                            status: 1,
                            update: false,
                            loadingBtn: false
                        })
                    })
                    .catch(error => {
                    })
            } else {
                window.scroll(0, 0)
                this.validator.showMessageFor('code');
                this.validator.showMessageFor('amount');
                this.validator.showMessageFor('min_purchase_amount');
                this.validator.showMessageFor('max_redeem_amount');
                this.forceUpdate();
            }
        }
    }
    onEdit(id) {
        this.setState({
            detailsDataLoading: true,
            editModal: true,
            loading: false,
            id: id
        })
        const data = {
            id: id
        }
        Api().post('getEditCoupon', data).then(res => {
            this.setState({
                code: res.data.coupon,
                amount: res.data.amount,
                startDate: new Date(res.data.start_date),
                endDate: new Date(res.data.end_date),
                type: res.data.type,
                discountType: res.data.discount_type,
                min_purchase_amount: res.data.min_purchase,
                max_redeem_amount: res.data.max_discount,
                products: res.data.product,
                status: res.data.status,
                detailsDataLoading: false,
                loading: true
            })
        })
    }
    onHideProductDetails() {
        this.setState({
            productDetailsModal: false
        })
    }
    onAddCoupon() {
        this.setState({
            addCouponModal: true
        })
    }
    onCloseAddCoupon() {
        this.setState({
            addCouponModal: false
        })
    }
    onCloseEditCoupon() {
        this.setState({
            editModal: false,
            code: "",
            amount: "",
            startDate: new Date(),
            endDate: new Date(),
            type: "on_product",
            discountType: "percentage",
            min_purchase_amount: 0,
            max_redeem_amount: 0,
            products: [],
            status: 1
        })
    }
    onDelete(id) {
        const data = {
            id: id
        }

        if(window.confirm('Do you want to delete it?')){

            Api().post('deleteSellerCoupon', data).then(res => {
                if (res.data === 1) {
                    this.componentDidMount();
                    alert('success','Deleted successfully!');
                }
            })



        }

    }
    onCouponUpdate() {
        let type = this.state.type;
        let productId = this.state.products;
        let amount = this.state.amount;
        let discountType = this.state.discountType;
        let code = this.state.code
        let start_date = this.state.startDate;
        let end_date = this.state.endDate;
        let min_purchase = this.state.min_purchase_amount;
        let max_discount = this.state.max_redeem_amount;
        let status = this.state.status;
        let id = this.state.id;
        if (this.state.update) {
            if (type === "on_product") {
                if (this.validator.fieldValid('products') &&
                    this.validator.fieldValid('code') &&
                    this.validator.fieldValid('amount')) {
                    this.setState({
                        loadingBtn: true
                    })
                    const data = {
                        'type': type,
                        'productId': productId,
                        'code': code,
                        'start_date': start_date,
                        'end_date': end_date,
                        'amount': amount,
                        'discount_type': discountType,
                        'status': status,
                        'id': id
                    }
                    Api().post('updateSellerCoupon', data)
                        .then(response => {
                            if (response.data === 1) {

                                alert('success',' Coupon has been updated successfully!');


                                this.setState({
                                    detailsDataLoading: false,
                                    update: false,
                                    editModal: false
                                })
                                this.componentDidMount();
                            }
                            this.setState({
                                loadingBtn: false
                            })
                        })
                        .catch(error => {
                        })
                } else {
                    window.scroll(0, 0)
                    this.validator.showMessageFor('products');
                    this.validator.showMessageFor('code');
                    this.validator.showMessageFor('amount');
                    this.forceUpdate();
                }
            } else {
                if (
                    this.validator.fieldValid('code') &&
                    this.validator.fieldValid('amount') &&
                    this.validator.fieldValid('min_purchase_amount') &&
                    this.validator.fieldValid('max_redeem_amount')) {
                    this.setState({
                        loadingBtn: true
                    })
                    const data = {
                        'type': type,
                        'productId': productId,
                        'code': code,
                        'start_date': start_date,
                        'end_date': end_date,
                        'amount': amount,
                        'discount_type': discountType,
                        'status': status,
                        'min_purchase': min_purchase,
                        'max_discount': max_discount,
                        'id': id
                    }
                    Api().post('updateSellerCoupon', data)
                        .then(response => {

                            alert('success',' Coupon has been updated successfully!');


                            this.setState({
                                detailsDataLoading: false,
                                update: false,
                                editModal: false
                            })
                            this.setState({
                                loadingBtn: false
                            })
                        })
                        .catch(error => {
                        })
                } else {
                    window.scroll(0, 0)
                    this.validator.showMessageFor('code');
                    this.validator.showMessageFor('amount');
                    this.validator.showMessageFor('min_purchase_amount');
                    this.validator.showMessageFor('max_redeem_amount');
                    this.forceUpdate();
                }
            }
        } else {

            alert('info','Everything are up to date!');

        }
    }

    render() {


        let couponType = [
            {value: 'on_product', label: 'On product'},
            {value: 'on_total_purchase', label: 'On total purchase'}
        ];
        let discountType = [
            {value: 'flat', label: 'Flat'},
            {value: 'percentage', label: 'Percentage'}
        ];
        let couponStatus = [
            {value: 1, label: 'Active'},
            {value: 0, label: 'Inactive'}
        ];
        let couponProducts = this.state.couponProducts;
        let coupon_product_array = [];
        couponProducts.map(pd => {
            coupon_product_array.push(
                {
                    value: pd.index,
                    label: (<><Image src={this.props.backendApi + pd.product_thumbnail} className="mr-2 flag"/>
                        <span>{pd.product_name}</span></>)
                });
        })
        let selectedProducts = [];
        let selectedProductId = this.state.products;
        couponProducts.map(pd => {
            selectedProductId.map(pId => {
                if (pd.index == pId) {
                    selectedProducts.push(
                        {
                            value: pd.index,
                            label: (<><Image src={this.props.backendApi + pd.product_thumbnail} className="mr-2 flag"/> <span>{pd.product_name}</span></>)
                        });
                }
            });
        });
        let data = this.state.data;
        let row = [];
        if (data.length > 0) {
            data.map((pro, index) => {
                row.push({
                    serial: `${index + 1}`,
                    coupon: `${pro.coupon}`,
                    start_date: `${pro.start_date}`,
                    end_date: `${pro.end_date}`,
                    amount: `${pro.amount}`,
                    status: <>{pro.expired === 1 ?
                        <Fragment>
                            <span className="badge-danger">Expired</span>
                        </Fragment> :
                        <Fragment>
                            {pro.status === 1 ?
                                <span className="badge-success">Active</span> :
                                <span className="badge-danger">Deactive</span>
                            }
                        </Fragment>
                    }</>,
                    action: <div>
                        <Button onClick={() => this.onEdit(pro.index)} className="actionBtn"><i title="show details"
                                                                                                className="fas fa-edit actionBtnIcon"/></Button>
                        <Button onClick={() => this.onDelete(pro.index)} className="actionBtn"><i title="Delete"
                                                                                                  className="fas fa-trash actionBtnIcon"/></Button>
                    </div>
                });
            })
        }
        let column = {
            columns: [
                {
                    label: '#',
                    field: 'serial',
                    width: 100,
                },
                {
                    label: 'Coupon code',
                    field: 'coupon',
                    width: 100,
                },
                {
                    label: 'Start date',
                    field: 'start_date',
                    width: 100,
                },
                {
                    label: 'End date',
                    field: 'end_date',
                    width: 100,
                },
                {
                    label: 'Status',
                    field: 'status',
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
            rows: row,
        }
        const loader = <div className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>

        if (this.props.couponActivation !== 0) {
            return (
                <Fragment>
                    <Row>
                        <Container>
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <div className='addCouponBtn'>
                                    <Button onClick={this.onAddCoupon}>Add Coupon</Button>
                                </div>
                            </div>
                        </Container>
                        <Col lg={12}>
                            <div className="card">
                                <div className="card-body">
                                    <Row className="mb-3 px-3">
                                        <Col lg={12}>
                                            <div
                                                className='sellerTableSize resSellerTable table-responsive-sm table-responsive-md table-responsive-lg'>
                                                <MDBDataTable
                                                    striped
                                                    bordered
                                                    hover
                                                    data={column}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Modal key={1} size="xl | lg | sm" className='responsiveModal' scrollable={true} centered
                           show={this.state.addCouponModal} onHide={this.onCloseAddCoupon}>
                        <Modal.Header className="d-flex justify-content-between">
                            <Modal.Title>Add Coupon</Modal.Title>
                            <i onClick={this.onCloseAddCoupon} className="fa fa-times"/>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="text-left p-3">
                                <Form.Group controlId="couponAddCode">
                                    <Form.Label>Type <span className="requiredMark"
                                                           title="required">*</span></Form.Label>
                                    <Select
                                        className="inputTextSize"
                                        onChange={this.onCouponTypeChange}
                                        options={couponType}
                                        value={
                                            couponType.filter(option =>
                                                option.value === this.state.type)
                                        }
                                    />
                                    <div
                                        className="text-danger my-2">{this.validator.message('type', this.state.type, 'required')}</div>
                                </Form.Group>
                                {this.state.type !== "" &&
                                    <Fragment>
                                        {this.state.type === "on_product" &&
                                            <div id="onProductCoupon">
                                                <Form.Group controlId="couponProduct">
                                                    <Form.Label>Product <span className="requiredMark"
                                                                              title="required">*</span></Form.Label>
                                                    <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                                      color='#E0E0E0'>
                                                        <Select
                                                            className="inputTextSize"
                                                            value={selectedProducts}
                                                            onChange={this.onCouponProductsChange}
                                                            options={coupon_product_array}
                                                            isMulti
                                                        />
                                                        <div className="text-danger my-2">{this.validator.message('products', this.state.products, 'required')}</div>
                                                    </ReactPlaceholder>
                                                </Form.Group>
                                            </div>
                                        }
                                    </Fragment>
                                }
                                <Form.Group controlId="couponAddCode">
                                    <Form.Label>Coupon code <span className="requiredMark"
                                                                  title="required">*</span></Form.Label>
                                    <Form.Control className="inputTextSize inputBoxSize" type="text"
                                                  data-coupon-add="code" name="code" placeholder="Enter Coupon Code"
                                                  onChange={(e) => this.onCouponCodeChange(e)} value={this.state.code}/>
                                    <div className="text-danger my-2">{this.validator.message('code', this.state.code, 'required')}</div>
                                </Form.Group>
                                <Form.Group controlId="couponStartDate">
                                    <Form.Label className="hdLabelBold w-100">Start date <span className="requiredMark" title="required">*</span></Form.Label>
                                    <DatePicker className="form-control inputTextSize inputBoxSize"
                                                selected={this.state.startDate}
                                                onChange={(date) => this.setStartDate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={new Date()}
                                                isClearable
                                                placeholderText="Coupon start date"
                                                data-coupon-add="start_date"
                                                name="start_date"
                                                showMonthDropdown
                                                showYearDropdown
                                    />
                                    <div className="text-danger my-2">{this.validator.message('start_date', this.state.startDate, 'required')}</div>
                                </Form.Group>
                                <Form.Group controlId="couponEndDate">
                                    <Form.Label className="hdLabelBold w-100">End date <span className="requiredMark" title="required">*</span></Form.Label>
                                    <DatePicker className="form-control w-100 inputTextSize inputBoxSize"
                                                selected={this.state.endDate}
                                                onChange={(date) => this.setEndDate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={new Date()}
                                                isClearable
                                                placeholderText="Coupon expires date"
                                                data-coupon-add="end_date"
                                                name="end_date"
                                                showMonthDropdown
                                                showYearDropdown
                                    />
                                    <div className="text-danger my-2">{this.validator.message('end_date', this.state.endDate, 'required')}</div>
                                </Form.Group>
                                <Row>
                                    <Col lg={7}>
                                        <Form.Group controlId="couponAmount">
                                            <Form.Label>Amount <span className="requiredMark" title="required">*</span></Form.Label>
                                            <Form.Control className="inputTextSize inputBoxSize" type="text"
                                                          placeholder="Enter amount" name="amount"
                                                          onChange={(e) => this.onCouponAmountChange(e)}
                                                          value={this.state.amount}/>
                                            <div
                                                className="text-danger my-2">{this.validator.message('amount', this.state.amount, 'required|currency')}</div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={5}>
                                        <Form.Group controlId="couponAmount">
                                            <Form.Label>Discount type <span className="requiredMark"
                                                                            title="required">*</span></Form.Label>
                                            <Select
                                                className="inputTextSize"
                                                onChange={this.onCouponDiscountTypeChange}
                                                options={discountType}
                                                value={
                                                    discountType.filter(option =>
                                                        option.value === this.state.discountType)
                                                }
                                            />
                                            <div
                                                className="text-danger my-2">{this.validator.message('discount_type', this.state.discountType, 'required')}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {this.state.type !== "" &&
                                    <Fragment>
                                        {this.state.type !== "on_product" &&
                                            <Fragment>
                                                <div id="onPurchaseCoupon">
                                                    <Form.Group controlId="couponMinPurchaseAmount">
                                                        <Form.Label>Minimum purchase account <span
                                                            className="requiredMark"
                                                            title="required">*</span></Form.Label>
                                                        <Form.Control className="inputTextSize inputBoxSize" type="text"
                                                                      placeholder="Enter minimum amount"
                                                                      onChange={(e) => this.onCouponMinPurchaseAmountChange(e)}
                                                                      value={this.state.min_purchase_amount}/>
                                                        <div
                                                            className="text-danger my-2">{this.validator.message('min_purchase_amount', this.state.min_purchase_amount, 'required|currency')}</div>
                                                    </Form.Group>
                                                    <Form.Group controlId="couponMaxRedeemAmount">
                                                        <Form.Label>Max redeem amount<span className="requiredMark"
                                                                                           title="required">*</span></Form.Label>
                                                        <Form.Control className="inputTextSize inputBoxSize" type="text"
                                                                      placeholder="Enter max redeem amount"
                                                                      onChange={(e) => this.onCouponMaxRedeemAmountChange(e)}
                                                                      value={this.state.max_redeem_amount}/>
                                                        <div
                                                            className="text-danger my-2">{this.validator.message('max_redeem_amount', this.state.max_redeem_amount, 'required|currency')}</div>
                                                    </Form.Group>
                                                </div>
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                                <Form.Group controlId="couponProduct">
                                    <Form.Label>Status<span className="requiredMark"
                                                            title="required">*</span></Form.Label>
                                    <Select
                                        className="inputTextSize"
                                        onChange={this.onCouponStatusChange}
                                        options={couponStatus}
                                        value={
                                            couponStatus.filter(option =>
                                                option.value === this.state.status)
                                        }
                                    />
                                    <div
                                        className="text-danger my-2">{this.validator.message('status', this.state.status, 'required')}</div>
                                </Form.Group>
                                <Form.Group>
                                    {this.state.loadingBtn ?
                                        <Button disabled={true} className="float-right seller-coupon-btn"><span
                                            className="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"/>
                                            Loading...
                                        </Button>
                                        :
                                        <Button className="float-right seller-coupon-btn"
                                                onClick={this.onCouponSubmit}>Submit</Button>
                                    }
                                </Form.Group>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal key={2} size="xl | lg | sm" className='responsiveModal' scrollable={true} centered
                           show={this.state.editModal} onHide={this.onCloseEditCoupon}>
                        <Modal.Header className="d-flex justify-content-between">
                            <Modal.Title className='modalHeading'>Edit Coupon</Modal.Title>
                            <i onClick={this.onCloseEditCoupon} className="fa fa-times"/>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.detailsDataLoading ?
                                <div className="loader-spinner-div">
                                    {loader}
                                </div> :
                                <div className="text-left p-3">
                                    <Form.Group controlId="couponAddCode">
                                        <Form.Label>Type <span className="requiredMark"
                                                               title="required">*</span></Form.Label>
                                        <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                          color='#E0E0E0'>
                                            <Select
                                                className="inputTextSize"
                                                onChange={this.onCouponTypeChange}
                                                options={couponType}
                                                value={
                                                    couponType.filter(option =>
                                                        option.value === this.state.type)
                                                }
                                            />
                                            <div
                                                className="text-danger my-2">{this.validator.message('type', this.state.type, 'required')}</div>
                                        </ReactPlaceholder>
                                    </Form.Group>
                                    {this.state.type !== "" &&
                                        <Fragment>
                                            {this.state.type === "on_product" &&
                                                <div id="onProductCoupon">
                                                    <Form.Group controlId="couponProduct">
                                                        <Form.Label>Product <span className="requiredMark"
                                                                                  title="required">*</span></Form.Label>
                                                        <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                                          color='#E0E0E0'>
                                                            <Select
                                                                className="inputTextSize"
                                                                value={selectedProducts}
                                                                onChange={this.onCouponProductsChange}
                                                                options={coupon_product_array}
                                                                isMulti
                                                            />
                                                            <div
                                                                className="text-danger my-2">{this.validator.message('products', this.state.products, 'required')}</div>
                                                        </ReactPlaceholder>
                                                    </Form.Group>
                                                </div>
                                            }
                                        </Fragment>
                                    }
                                    <Form.Group controlId="couponAddCode">
                                        <Form.Label>Coupon code <span className="requiredMark" title="required">*</span></Form.Label>
                                        <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                          color='#E0E0E0'>
                                            <Form.Control className="inputTextSize inputBoxSize" type="text"
                                                          data-coupon-add="code" name="code"
                                                          placeholder="Enter Coupon Code"
                                                          onChange={(e) => this.onCouponCodeChange(e)}
                                                          value={this.state.code}/>
                                            <div
                                                className="text-danger my-2">{this.validator.message('code', this.state.code, 'required')}</div>
                                        </ReactPlaceholder>
                                    </Form.Group>
                                    <Form.Group controlId="couponStartDate">
                                        <Form.Label className="hdLabelBold w-100">Start date <span
                                            className="requiredMark" title="required">*</span></Form.Label>
                                        <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                          color='#E0E0E0'>
                                            <DatePicker className="form-control inputTextSize inputBoxSize"
                                                        selected={this.state.startDate}
                                                        onChange={(date) => this.setStartDate(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        minDate={new Date()}
                                                        isClearable
                                                        placeholderText="Coupon start date"
                                                        data-coupon-add="start_date"
                                                        name="start_date"
                                                        showMonthDropdown
                                                        showYearDropdown
                                            />
                                            <div
                                                className="text-danger my-2">{this.validator.message('start_date', this.state.startDate, 'required')}</div>
                                        </ReactPlaceholder>
                                    </Form.Group>
                                    <Form.Group controlId="couponEndDate">
                                        <Form.Label className="hdLabelBold w-100">End date <span
                                            className="requiredMark" title="required">*</span></Form.Label>
                                        <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                          color='#E0E0E0'>
                                            <DatePicker className="form-control inputTextSize w-100 inputBoxSize"
                                                        selected={this.state.endDate}
                                                        onChange={(date) => this.setEndDate(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        minDate={new Date()}
                                                        isClearable
                                                        placeholderText="Coupon expires date"
                                                        data-coupon-add="end_date"
                                                        name="end_date"
                                                        showMonthDropdown
                                                        showYearDropdown
                                            />
                                            <div
                                                className="text-danger my-2">{this.validator.message('end_date', this.state.endDate, 'required')}</div>
                                        </ReactPlaceholder>
                                    </Form.Group>
                                    <Row>
                                        <Col lg={7}>
                                            <Form.Group controlId="couponAmount">
                                                <Form.Label>Amount <span className="requiredMark"
                                                                         title="required">*</span></Form.Label>
                                                <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                                  color='#E0E0E0'>
                                                    <Form.Control className="inputTextSize inputBoxSize" type="text"
                                                                  placeholder="Enter amount" name="amount"
                                                                  onChange={(e) => this.onCouponAmountChange(e)}
                                                                  value={this.state.amount}/>
                                                    <div
                                                        className="text-danger my-2">{this.validator.message('amount', this.state.amount, 'required|currency')}</div>
                                                </ReactPlaceholder>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={5}>
                                            <Form.Group controlId="couponAmount">
                                                <Form.Label>Discount type <span className="requiredMark"
                                                                                title="required">*</span></Form.Label>
                                                <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                                  color='#E0E0E0'>
                                                    <Select
                                                        className="inputTextSize"
                                                        onChange={this.onCouponDiscountTypeChange}
                                                        options={discountType}
                                                        value={
                                                            discountType.filter(option =>
                                                                option.value === this.state.discountType)
                                                        }
                                                    />
                                                    <div
                                                        className="text-danger my-2">{this.validator.message('discount_type', this.state.discountType, 'required')}</div>
                                                </ReactPlaceholder>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {this.state.type !== "" &&
                                        <Fragment>
                                            {this.state.type !== "on_product" &&
                                                <Fragment>
                                                    <div id="onPurchaseCoupon">
                                                        <Form.Group controlId="couponMinPurchaseAmount">
                                                            <Form.Label>Minimum purchase account <span
                                                                className="requiredMark"
                                                                title="required">*</span></Form.Label>
                                                            <ReactPlaceholder type='text' ready={this.state.loading}
                                                                              row={2} color='#E0E0E0'>
                                                                <Form.Control className="inputTextSize inputBoxSize"
                                                                              type="text"
                                                                              placeholder="Enter minimum amount"
                                                                              onChange={(e) => this.onCouponMinPurchaseAmountChange(e)}
                                                                              value={this.state.min_purchase_amount}/>
                                                                <div
                                                                    className="text-danger my-2">{this.validator.message('min_purchase_amount', this.state.min_purchase_amount, 'required|currency')}</div>
                                                            </ReactPlaceholder>
                                                        </Form.Group>
                                                        <Form.Group controlId="couponMaxRedeemAmount">
                                                            <Form.Label>Max redeem amount<span className="requiredMark"
                                                                                               title="required">*</span></Form.Label>
                                                            <ReactPlaceholder type='text' ready={this.state.loading}
                                                                              row={2} color='#E0E0E0'>
                                                                <Form.Control className="inputTextSize inputBoxSize"
                                                                              type="text"
                                                                              placeholder="Enter max redeem amount"
                                                                              onChange={(e) => this.onCouponMaxRedeemAmountChange(e)}
                                                                              value={this.state.max_redeem_amount}/>
                                                                <div
                                                                    className="text-danger my-2">{this.validator.message('max_redeem_amount', this.state.max_redeem_amount, 'required|currency')}</div>
                                                            </ReactPlaceholder>
                                                        </Form.Group>
                                                    </div>
                                                </Fragment>
                                            }
                                        </Fragment>
                                    }
                                    <Form.Group controlId="couponProduct">
                                        <Form.Label>Status<span className="requiredMark"
                                                                title="required">*</span></Form.Label>
                                        <ReactPlaceholder type='text' ready={this.state.loading} row={2}
                                                          color='#E0E0E0'>
                                            <Select
                                                className="inputTextSize"
                                                onChange={this.onCouponStatusChange}
                                                options={couponStatus}
                                                value={
                                                    couponStatus.filter(option =>
                                                        option.value === this.state.status)
                                                }
                                            />
                                            <div
                                                className="text-danger my-2">{this.validator.message('status', this.state.status, 'required')}</div>
                                        </ReactPlaceholder>
                                    </Form.Group>
                                    <Form.Group>
                                        {this.state.detailsDataLoading ?
                                            <Fragment>
                                                <Button disabled={true}
                                                        className="float-right seller-coupon-btn">Update</Button>
                                            </Fragment> :
                                            <Fragment>
                                                {this.state.loadingBtn ?
                                                    <Button className="float-right seller-coupon-btn"><span
                                                        className="spinner-border spinner-border-sm" role="status"
                                                        aria-hidden="true"/>
                                                        Loading...
                                                    </Button> :
                                                    <Button className="float-right seller-coupon-btn"
                                                            onClick={this.onCouponUpdate}>Update</Button>
                                                }
                                            </Fragment>
                                        }
                                    </Form.Group>
                                </div>
                            }
                        </Modal.Body>
                    </Modal>
                </Fragment>
            )
        } else {
            Router.push("/dashboard")
        }
    }
}





function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    const couponActivation = state.voucherReducer.couponActivation;
    return {
        backendApi,
        couponActivation
    };
}

export default connect(mapStateToProps)(CouponPart);

