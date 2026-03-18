import React, {PureComponent, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import SimpleReactValidator from "simple-react-validator";
import ReactHtmlParser from "react-html-parser";
import Api from "../../../../ClientApi/Api";
import {alert, onCurrencyFormat} from "../../../../services/common";
import MediaFile from "../../../CommonScreen/Media/MediaFile";
import {connect} from "react-redux";
import Photo from "../../../CommonScreen/Image/Photo";
import Link from "next/link";
class ManageSellerProfile extends PureComponent {
    constructor() {
        super();
        this.state = {
            sellerVerifyModal: false,
            message: "",
            selectedFile: "",
            instruction: "",
            sellerVerificationStatus: [],
            verificationStatusLoading: true,
            total_product: 0,
            total_sale: 0,
            total_earning: 0.0,
            completed_order: 0,
            orders_this_month: 0,
            earning_this_month: 0,
            pending_order: 0,
            cancelled_order: 0,
            catProduct: '',
            packageFound: false,
            packagePurchasedDate: '',
            packageExpiryDate: '',
            packageName: '',
            packageThumbnail: '',
            packageStatus: '',
            loadingBtn:false
        }
        this.validator = new SimpleReactValidator();
        this.onVerifySeller = this.onVerifySeller.bind(this)
        this.onCloseVerifyModal = this.onCloseVerifyModal.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.onSelectedFile = this.onSelectedFile.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        Api().get('getSellerVerificationInstruction').then(res => {
            this.setState({
                instruction: res.data
            })
        })
        Api().get('getSellerVerification').then(res => {
            this.setState({
                sellerVerificationStatus: res.data,
                verificationStatusLoading: false
            })
        })
        Api().get('sellerSalesDetails').then(res => {
            this.setState({
                total_product: res.data.total_product,
                total_sale: res.data.total_sale,
                total_earning: res.data.total_earning,
                completed_order: res.data.completed_order,
                orders_this_month: res.data.orders_this_month,
                earning_this_month: res.data.earning_this_month,
                pending_order: res.data.pending_order,
                cancelled_order: res.data.cancelled_order,
                catProduct: res.data.catProduct,
            })
        }).catch(error => {
        })
        Api().get('getSellerProductDetails').then(res => {
            this.setState({
                packageName: res.data.package_name,
                packageThumbnail: res.data.package_thumbnail,
                packagePurchasedDate: res.data.purchase_date,
                packageExpiryDate: res.data.package_expiry_date,
                loading: false,
                packageFound: res.data.package_found,
                packageStatus: res.data.status
            })
        }).catch(error => {
        })
    }
    onVerifySeller() {
        this.setState({
            sellerVerifyModal: true
        })
    }
    onCloseVerifyModal() {
        this.setState({
            sellerVerifyModal: false
        })
    }
    onSelectedFile(file) {
        this.setState({
            selectedFile: file.photo
        })
    }
    onMessage(e) {
        this.setState({
            message: e.target.value
        })
    }
    onSubmit() {
        if (this.validator.fieldValid('message') &&
            this.validator.fieldValid('file')
        ) {
            let message = this.state.message;
            let selectedFile = this.props.dynamicData['selected_for_seller_verification'] !== undefined ? this.props.dynamicData['selected_for_seller_verification'] : null
            const data = {
                message: message,
                media: selectedFile
            }
            this.setState({
                loadingBtn:true
            })
            Api().post('verify-seller', data).then(res => {
                if (res.data === 1) {
                    alert('success','Form has been submitted successfully');
                }
                this.setState({
                    sellerVerifyModal: false,
                    loadingBtn:false
                })
                this.componentDidMount();
            }).catch(error => {
            })
        } else {
            this.forceUpdate();
            this.validator.showMessageFor('message');
            this.validator.showMessageFor('file');
        }
    }

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        let d = this.state.catProduct;
        const CatTable = Object.entries(d).map(([key, value]) => {
            return <tr>
                <td>{key}</td>
                <td>{value}</td>
            </tr>
        })
        const loader = <div className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        const verificationLoader = <div>
            <div className="text-center">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <Container>
                    <div className='mb-3'>
                        <span className="profile title mb-4">Dashboard</span>
                    </div>
                    <Row>
                        <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                            <div className="seller-color-divs color-type1">
                                <h4>{this.state.total_product}</h4>
                                <p>Total Products</p>
                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                            </div>
                        </Col>
                        <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                            <div className="seller-color-divs color-type2">
                                <h4>
                                    {this.state.total_sale}
                                </h4>
                                <p>Total Sells</p>
                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                            </div>
                        </Col>
                        <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                            <div className="seller-color-divs color-type3">
                                <h4>
                          {currencySymbolFormat === 1 ?
                                <span>{onCurrencyFormat(this.state.total_earning)}{defaultCurrency}</span>
                                  :
                                <span>{defaultCurrency}{onCurrencyFormat(this.state.total_earning)}</span>
                          }
                                </h4>
                                <p>Total Earnings</p>
                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                            </div>
                        </Col>
                        <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                            <div className="seller-color-divs color-type4">
                                <h4>{this.state.completed_order}</h4>
                                <p>Completed Orders</p>
                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                            <div className="seller-color-divs color-type5">
                                <h4>{this.state.orders_this_month}</h4>
                                <p>This month Orders</p>
                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                            <div className="seller-color-divs color-type6">
                                <h4>
                                    {
                                        currencySymbolFormat === 1 ?
                                            <span>{onCurrencyFormat(this.state.earning_this_month)}{defaultCurrency}</span> :
                                            <span>{defaultCurrency}{onCurrencyFormat(this.state.earning_this_month)}</span>
                                    }
                                </h4>
                                <p>This month Earnings</p>
                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                            </div>
                        </Col>
                        <Col lg={8} md={6} sm={12} xs={12} className="mb-3">
                            <div className="orders-table white-bg p-3 mb-3">
                                <h5>Orders</h5>
                                <hr/>
                                <Table striped bordered hover>
                                    <tbody>
                                    <tr>
                                        <td>Total Orders</td>
                                        <td>{this.state.total_sale}</td>
                                    </tr>
                                    <tr>
                                        <td>Completed Orders</td>
                                        <td>{this.state.completed_order}</td>
                                    </tr>
                                    <tr>
                                        <td>Pending Orders</td>
                                        <td>{this.state.pending_order}</td>
                                    </tr>
                                    <tr>
                                        <td>Cancelled Orders</td>
                                        <td>{this.state.cancelled_order}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="products-table white-bg p-3 mb-3">
                                <h5>Products</h5>
                                <hr/>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Product</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {CatTable}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col lg={4} md={6} sm={12} xs={12} className="mb-3">
                            <div className="seller-color-divs color-type1 seller-color">
                                <div className="white-bg seller-dashboard-card">
                                    <h6>Seller status</h6>
                                    <hr/>
                                    {this.state.verificationStatusLoading ?
                                        <Fragment>
                                            <div>
                                                {verificationLoader}
                                            </div>
                                        </Fragment> :
                                        <Fragment>
                                                <div className="text-center">
                                                    {this.state.sellerVerificationStatus.map(pd => {

                                                         if(pd.verification_status!=undefined){
                                                             return <Fragment>
                                                                 {pd.verification_status === 0 ?

                                                                     <Photo
                                                                         src="/pending.png"
                                                                         blurDataURL="/pending.png"
                                                                         class="sellerPackageThumbnail  silvarPackageImg"
                                                                     />

                                                                     :pd.verification_status===1 && pd.shop_status===1 ?

                                                                         <Photo
                                                                             src="/verified.png"
                                                                             blurDataURL="/verified.png"
                                                                             class="sellerPackageThumbnail  silvarPackageImg"
                                                                         />

                                                                        :pd.shop_status===0 ?

                                                                             <p> Your shop status is currently inactive. To active your shop, Talk to our support.</p> :
                                                                             pd.shop_status===1 ?

                                                                                 <Photo
                                                                                     src="/verified.png"
                                                                                     blurDataURL="/verified.png"
                                                                                     class="sellerPackageThumbnail  silvarPackageImg"
                                                                                 />:
                                                                                 <Fragment/>


                                                                 }
                                                             </Fragment>
                                                         }else{
                                                             return   <div className="text-center">
                                                                 <p className="seller-subtitle">Verify your shop</p>
                                                                 <Button onClick={this.onVerifySeller}
                                                                         className="seller-dashboard-card-btn">Verify Now</Button>
                                                             </div>
                                                         }






                                                    })}
                                                </div>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                            <div className="seller-color-divs color-type2 seller-color">
                                <div className="white-bg mb-3 seller-dashboard-card">
                                    <h6>Purchased Package</h6>
                                    <hr/>
                                    {this.state.packageFound ?
                                        <Fragment>
                                            {this.state.packageStatus == "Pending" ?
                                                <Fragment>
                                                    <div className="text-center">
                                                        {this.state.packageThumbnail !== null &&
                                                            <div className="sellerPackageThumbnailDiv">

                                                                <Photo
                                                                    src={this.props.backendApi + this.state.packageThumbnail}
                                                                    blurDataURL="/blank.png"
                                                                    class="sellerPackageThumbnail  silvarPackageImg"
                                                                />


                                                            </div>
                                                        }
                                                        <h6 className="seller-package">Package
                                                            name: {this.state.packageName}</h6>
                                                        <Button className="seller-dashboard-card-btn">Package Status
                                                            : {this.state.packageStatus}</Button>
                                                    </div>
                                                </Fragment> :
                                                <Fragment>
                                                    <div className="text-center">
                                                        {this.state.packageThumbnail !== null &&
                                                            <div className="sellerPackageThumbnailDiv">

                                                                <Photo
                                                                    src={this.props.backendApi + this.state.packageThumbnail}
                                                                    blurDataURL="/blank.png"
                                                                    class="sellerPackageThumbnail  silvarPackageImg"
                                                                />

                                                            </div>
                                                        }
                                                        <h6 className="seller-package">Package
                                                            name: {this.state.packageName}</h6>
                                                        <p className="seller-package">Purchased
                                                            date: {this.state.packagePurchasedDate}</p>
                                                        <p className="seller-package">Expiry
                                                            date: {this.state.packageExpiryDate}</p>
                                                    </div>
                                                </Fragment>
                                            }
                                        </Fragment> :
                                        <Fragment>
                                            <div className="text-center">
                                                <h6 className="seller-package">Package not found</h6>
                                                <Link href="/seller-package" className="seller-dashboard-card-btn">Upgrade
                                                    Package</Link>
                                            </div>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                            <div className="seller-color-divs color-type1 seller-color">
                                <div className="white-bg mb-3 seller-dashboard-card">
                                    <h6>Shop</h6>
                                    <hr/>
                                    <div className="text-center">
                                        <p className="seller-subtitle">Manage & organize your shop</p>
                                        <Link href="/shop-setting" className="seller-dashboard-card-btn btn">Manage Now</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Modal size="lg" scrollable={true} centered show={this.state.sellerVerifyModal} onHide={this.onCloseVerifyModal}>
                        <Modal.Header className="d-flex justify-content-between">
                            <Modal.Title>Seller Verification</Modal.Title>
                            <i onClick={this.onCloseVerifyModal} className="fa fa-times"/>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.detailsDataLoading ?
                                <Fragment>
                                    <div className="loader-spinner-div">
                                        {loader}
                                    </div>
                                </Fragment> :
                                <Fragment>
                                    <div className="instruction p-3">
                                        <div className="instruction-content p-3">
                                            <h6>Instruction</h6>
                                            <div>{ReactHtmlParser(this.state.instruction)}</div>
                                        </div>
                                    </div>
                                    <div className="instruction form">
                                        <div className="form-group">
                                            <label htmlFor="email">Message </label>
                                            <textarea className="form-control" onChange={(e) => this.onMessage(e)}
                                                      placeholder="Enter verification message" rows="12"/>
                                            <div className="mb-2 text-danger"> {this.validator.message('message', this.state.message, 'required')}</div>
                                        </div>
                                        <div className="form-group">
                                            <MediaFile  title="Verification attachment"   multipleFile={false} type="seller_verification" for="zip" fileType="zip"  limit={1}   />
                                            <div className="mb-2 text-danger"> {this.validator.message('file', this.props.dynamicData['selected_for_seller_verification'], 'required')}</div>
                                        </div>
                                        <div className="instruction form submit">
                                            {this.state.loadingBtn ?
                                                <Button  className="float-right spinnerBtn">
                                                    <div className="spinner-border text-light"
                                                         role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </Button> :
                                                <Button onClick={this.onSubmit} className="float-right">Submit</Button>
                                            }
                                        </div>
                                    </div>
                                </Fragment>
                            }
                        </Modal.Body>
                    </Modal>
                </Container>
            </Fragment>
        );
    }
}



function mapStateToProps(state) {

    const backendApi = state.starterReducer.backendApi;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const dynamicData = state.mediaReducer;
    return {
        backendApi,
        dynamicData,
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps)(ManageSellerProfile);

