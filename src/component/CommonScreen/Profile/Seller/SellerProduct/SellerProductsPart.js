import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {MDBDataTable} from "mdbreact";
import { Switch } from "@material-ui/core";
import Api from "../../../../../ClientApi/Api";
import {alert, onCurrencyFormat} from "../../../../../services/common";
import Router from "next/router";
import {connect} from "react-redux";
import {topProgressBar} from "../../../../../services/actions/commonAction";
import Photo from "../../../Image/Photo";
import Link from "next/link";

class SellerProductsPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading:true,
            packageName:'',
            packageThumbnail:'',
            activeProduct:0,
            remainingProduct:0,
            totalProduct:0,
            packagePurchasedDate:'',
            packageExpiryDate:'',
            productInfo:[],
            progress:0,
            uploadedProduct:0,
            package_found:true,
            status:"Pending",
            seller_status:0
        }
        this.onPublish = this.onPublish.bind(this)
        this.onFeatured = this.onFeatured.bind(this)
        this.getProductData = this.getProductData.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0)
        Api().get('getSellerProductDetails').then(res=>{
            this.setState({
                packageName:res.data.package_name,
                packageThumbnail:res.data.package_thumbnail,
                activeProduct:res.data.active_product,
                remainingProduct:res.data.remaining_product,
                totalProduct:res.data.total_product,
                packagePurchasedDate:res.data.purchase_date,
                packageExpiryDate:res.data.package_expiry_date,
                productInfo:res.data.product_info,
                uploadedProduct:res.data.uploaded_product,
                loading:false,
                seller_status:res.data.seller_status,
                package_found:res.data.package_found,
                status:res.data.status
            })
        }).catch(error=>{})
    }
    onUploadProduct(){
        let uploadedProduct = this.state.uploadedProduct;
        let packageLimit = this.state.totalProduct
        if(uploadedProduct>=packageLimit){

           alert('warning','Product limit has been fulled!');
        }else{
            Router.push("/add-product")
        }
    }
    onPublish(index,value){
        let remaining = this.state.totalProduct - this.state.activeProduct;
        if(value===1){
            this.props.topProgressBar(0);
            const data  = {
                id:index,
                value:value===0?1:0
            }
            Api().post('publishedSellerProduct',data).then(res=>{
                console.log(res.data);
                if(res.data===1){
                    console.log(res.data);
                    this.props.topProgressBar(100);
                    this.componentDidMount()
                    alert('success','Publish status has been changed!');

                }
            }).catch(error=>{
            })
            if(this.state['published_'+index]!==undefined){
                if(this.state['published_'+index]===0){
                    this.setState({
                        ['published_'+index]:1
                    })
                }else{
                    this.setState({
                        ['published_'+index]:0
                    })
                }
            }else{
                if(value===0){
                    this.setState({
                        ['published_'+index]:1
                    })
                }else{
                    this.setState({
                        ['published_'+index]:0
                    })
                }
            }
        }else{
            if(remaining>0){
                this.props.topProgressBar(0);
                const data  = {
                    id:index,
                    value:value===0?1:0
                }
                Api().post('publishedSellerProduct',data).then(res=>{
                    if(res.data===1){
                        this.props.topProgressBar(100);
                        this.componentDidMount()
                        alert('success','Publish status has been changed!');
                    }
                }).catch(error=>{
                })
                if(this.state['published_'+index]!==undefined){
                    if(this.state['published_'+index]===0){
                        this.setState({
                            ['published_'+index]:1
                        })
                    }else{
                        this.setState({
                            ['published_'+index]:0
                        })
                    }
                }else{
                    if(value===0){
                        this.setState({
                            ['published_'+index]:1
                        })
                    }else{
                        this.setState({
                            ['published_'+index]:0
                        })
                    }
                }
            }else{
                alert('warning','Product limit has been fulled!');

            }
        }
    }
    onFeatured(index,value){
        if(this.state['featured_'+index]!==undefined){
            if(this.state['featured_'+index]===0){
                this.setState({
                    ['featured_'+index]:1
                })
            }else{
                this.setState({
                    ['featured_'+index]:0
                })
            }
        }else{
            if(value===0){
                this.setState({
                    ['featured_'+index]:1
                })
            }else{
                this.setState({
                    ['featured_'+index]:0
                })
            }
        }
        const data = {
            id:index,
            value:value===0?1:0
        }
        Api().post('changeSellerFeaturedProductStatus',data).then(res=>{
            if(res.data===1){
                this.componentDidMount()
                alert('success','Featured status has been changed!');
            }
        }).catch(error=>{
        })
    }
    onDelete(id){

        if(window.confirm('Do you want to delete?')){
            const data  = {
                id:id
            }
            Api().post('deleteSellerProduct',data).then(res=>{
                if(res.data===1){
                    this.componentDidMount()
                    alert('success','Product has been deleted!');

                }
            }).catch(error=>{
            })
        }

    }
    onEdit(id){
        Router.push("/seller-products")
    }
    onExpired(){
        alert('info','Package is expired, Please recharge for your further activity!');
    }
    onPending(){
       alert('info','Package is pending ,Please wait for the admin approval!');

    }
    getProductData(page=null, pageSize=null, handleRetrievedData) {
        let selectedSellerOption = this.state.selectedSellerOption!=undefined?this.state.selectedSellerOption.value:null;
        let selectedOption = this.state.selectedOption!=undefined?this.state.selectedOption.value:null;
        let searchData = this.state.searchData;
        this.setState({
            page:page,
            pageSize:pageSize
        })
        let postObject = {
            page: page+1,
            pageSize: pageSize,
            sortBy:selectedOption,
            sortBySeller:selectedSellerOption,
            searchData:searchData,
            product_type:this.props.product_type,
            seller_type:this.props.seller_type,
            product_status:this.props.product_status
        };
        Api().post('getAllProduct',postObject).then(response => {
            console.log(response.data);
            handleRetrievedData(response)
        } ).catch(response => console.log(response));
    }

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        let data = this.state.productInfo;
        let expired = this.state.packageExpiryDate==="expired"? true:false;
        let pending = this.state.packageExpiryDate==="pending"? true:false;
        let product = [];
        if(data.length>0){
            data.map((pro,index)=>{

                let title = pro.title;

                let shortDes =  title.length > 10 ? title.substring(0, 10) + "..." :title;

                product.push({
                    serial: `${index+1}`,
                    name:  <div className="product-title-div">
                        <div className="sellerProductThumbnailImage">
                            <Photo
                                src={this.props.backendApi+this.state.packageThumbnail}
                                blurDataURL="/blank.jpg"
                                class="sellerPackageThumbnail"
                            />
                        </div>
                        <div className="product-title-div">
                            <p title={title}>{shortDes}</p>
                        </div>
                    </div>,
                    category:`${pro.category}` ,
                    qty: `${pro.quantity}` ,
                    base_price:   <div>
                        {currencySymbolFormat===1 ?
                            <span>{onCurrencyFormat(pro.base_price)}{defaultCurrency}</span>
                            :
                            <span>{defaultCurrency}{onCurrencyFormat(pro.base_price)}</span>
                        }
                    </div>,
                    published:this.state.seller_status===0? <Switch className='checkBoxBtn' disabled={true} inputProps={{ 'aria-label': 'disabled checkbox' }} />: expired ?<Switch onClick={this.onExpired} className='checkBoxBtn' checked={false} /> :pending ?  <Switch onClick={this.onPending} className='checkBoxBtn' checked={false} />  :  <Switch className='checkBoxBtn' onChange={()=>this.onPublish(pro.index,pro.published)} checked={this.state['published_'+pro.index]!==undefined ? this.state['published_'+pro.index] :  pro.published} inputProps={{ 'aria-label': 'disabled checkbox' }} />,
                    featured:this.state.seller_status===0? <Switch className='checkBoxBtn' disabled={true} inputProps={{ 'aria-label': 'disabled checkbox' }} />: expired ?<Switch onClick={this.onExpired} className='checkBoxBtn' checked={false} /> :pending ?  <Switch onClick={this.onPending} className='checkBoxBtn' checked={false} />  :  <Switch className='checkBoxBtn' onChange={()=>this.onFeatured(pro.index,pro.featured)}  checked={this.state['featured_'+pro.index]!==undefined ? this.state['featured_'+pro.index] :  pro.featured} inputProps={{ 'aria-label': 'disabled checkbox' }} />,
                    adminApproval: expired ? <badge className="badge badge-danger">Expired</badge> :pending? <badge className="badge badge-primary">Pending</badge>  :  pro.adminApproval==1 ?  <badge className="badge badge-success">Approved</badge> :   <badge className="badge badge-primary">Pending</badge>  ,
                    action:   <Fragment>
                                  <Link href={`edit-product/${pro.index}`} className="hd-p-btn  editBtn" ><i title="Edit" className="far fa-edit editIcon action mr-2"/></Link>
                                  <Button onClick={()=>this.onDelete(pro.index)}  className="hd-p-btn deleteBtn" ><i title="Delete" className="fas fa-trash deleteIcon action"/></Button>
                               </Fragment>
                });
            })
        }
        let  product_details = {
            columns: [
                {
                    label: '#',
                    field: 'serial',
                    width: 400,
                },
                {
                    label: 'Name',
                    field: 'name',
                    width: 80,
                },
                {
                    label: 'Category',
                    field: 'category',
                    width: 100,
                },
                {
                    label: 'Qty',
                    field: 'qty',
                    width: 100,
                },
                {
                    label: 'Price',
                    field: 'base_price',
                    sort: 'disabled',
                    width: 100,
                },
                {
                    label: 'Published',
                    field: 'published',
                    sort: 'disabled',
                    width: 100,
                },
                {
                    label: 'Featured',
                    field: 'featured',
                    sort: 'disabled',
                    width: 100,
                },
                {
                    label: 'Admin Approval',
                    field: 'adminApproval',
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
        const {t} = this.props;
        return (
             <Fragment>
                {this.state.loading  ?
                    <Fragment>
                        <Col md={12} sm={12} lg={12}>
                            <div className="loader-spinner-div">
                                {loader}
                            </div>
                        </Col>
                    </Fragment>
                      :
                    <Fragment>{
                        this.state.package_found!==true && this.state.status!=="Pending" ?
                            <Fragment>
                                <Col  lg={12} md={12} sm={12} xs={12}>
                                    <div className="card">
                                        <div className="alert alert-light">
                                            <h6>No package found</h6>
                                            <Link className="btn" href="/seller-package"> Purchase Package</Link>
                                        </div>
                                    </div>
                                </Col>
                            </Fragment> :
                               this.state.package_found && this.state.status==="Pending" ?
                                <Fragment>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type1">
                                                <h4>{this.state.uploadedProduct}</h4>
                                                <p>Total Uploads</p>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type1">
                                                <h4>{this.state.remainingProduct>0 ? this.state.remainingProduct : 0  }</h4>
                                                <p>Remaining Uploads</p>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type1">
                                                <h4>{this.state.activeProduct}</h4>
                                                <p>Active Uploads</p>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={8} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type4 silverPackageDiv">
                                                <Row>
                                                    <Col lg={6} md={6} sm={8} xs={6} className="packageTextSize">
                                                        <p>Package Name: {this.state.packageName}</p>
                                                        <p>Product Limit: {this.state.totalProduct}</p>
                                                        <p>Purchased Date: {this.state.packagePurchasedDate}</p>
                                                        <p>Package status: <span className="badge-primary">Pending</span></p>
                                                        <Link className="btn upgradeBtn" href="/seller-package"> Upgrade Package</Link>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={4} xs={6}>
                                                        {this.state.packageThumbnail!==null &&
                                                            <div className="sellerPackageThumbnailDiv">

                                                                <Photo
                                                                    src={this.props.backendApi+this.state.packageThumbnail}
                                                                    blurDataURL="/blank.jpg"
                                                                    class="sellerPackageThumbnail silvarPackageImg"
                                                                />

                                                            </div>
                                                        }
                                                    </Col>
                                                </Row>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col  lg={12} md={12} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="card-header d-flex justify-content-between">
                                                <h3 className="card-title">All products</h3>
                                                <Button className="float-right"  disabled={true}>Add Product</Button>
                                            </div>
                                            <div className="card-body pt-0 pb-3 sellerTableSize sellerTable table-responsive-sm table-responsive-md table-responsive-lg">
                                                <MDBDataTable
                                                    striped
                                                    bordered
                                                    hover
                                                    data={product_details}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Fragment>
                                :
                                <Fragment>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type1">
                                                <h4>{this.state.uploadedProduct}</h4>
                                                <p>Total Uploads</p>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type1">
                                                <h4>{this.state.remainingProduct>0 ? this.state.remainingProduct : 0  }</h4>
                                                <p>Remaining Uploads</p>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type1">
                                                <h4>{this.state.activeProduct}</h4>
                                                <p>Active Uploads</p>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={8} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="seller-color-divs color-type4 silverPackageDiv">
                                                <Row>
                                                    <Col lg={6} md={6} sm={8} xs={6} className="packageTextSize packageTextField">
                                                        <p>Package Name: <span className='packageName'>{this.state.packageName}</span></p>
                                                        <p>Product Limit: {this.state.totalProduct}</p>
                                                        <p>Purchased Date: {this.state.packagePurchasedDate}</p>
                                                        <p className="mt-1">Expiry  Date: {this.state.packageExpiryDate=="expired" ? <span className="badge-danger">Expired</span> :  this.state.packageExpiryDate=="pending" ? <span className="badge-primary">Pending</span> : <span className="badge-success">{this.state.packageExpiryDate} </span>}</p>
                                                        <Link className="btn upgradeBtn upgradePackageBtn" href="/seller-package"> Upgrade Package</Link>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={4} xs={6}>
                                                        {this.state.packageThumbnail!==null &&
                                                            <div className="sellerPackageThumbnailDiv">
                                                                <Photo
                                                                    src={this.props.backendApi+this.state.packageThumbnail}
                                                                    blurDataURL="/blank.jpg"
                                                                    class="sellerPackageThumbnail silvarPackageImg rounded mx-auto d-block"
                                                                />
                                                            </div>
                                                        }
                                                </Col>
                                                </Row>
                                                <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                            </div>
                                        </div>
                                    </Col>
                                    {this.state.seller_status!==1 &&
                                        <Col lg={6} md={8} sm={12} xs={12}>
                                            <div className="card">
                                                <div className="seller-color-divs color-type4 silverPackageDiv">
                                                    <div className="text-center mt-5">
                                                        <h5>Your shop is currently <span className="badge badge-danger">inactive</span></h5>
                                                        <p>Please wait for the admin confirmation or talk to the support</p>
                                                    </div>
                                                    <i className="fas fa-heart fa-5x seller-dashboard-icons"/>
                                                </div>
                                            </div>
                                        </Col>
                                    }
                                    <Col  lg={12} md={12} sm={12} xs={12}>
                                        <div className="card">
                                            <div className="card-header">
                                                <div>
                                                    {this.state.seller_status!==0 &&
                                                      <Fragment>
                                                          {(expired!==true && pending!==true ) &&
                                                              <Button className="float-right" onClick={()=>this.onUploadProduct()}> Add Product</Button>
                                                          }
                                                      </Fragment>
                                                    }
                                                </div>
                                            </div>
                                            <div className="card-body pt-0 pb-3 sellerTableSize sellerTable table-responsive-sm table-responsive-md table-responsive-lg">
                                                <MDBDataTable
                                                    striped
                                                    bordered
                                                    hover
                                                    data={product_details}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Fragment>
                    }</Fragment>
                 }
             </Fragment>
        )
    }
}

const mapDispatchToProps = {
    topProgressBar
};

function mapStateToProps(state) {

    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const backendApi = state.starterReducer.backendApi;
    return {
        defaultCurrency,
        currencySymbolFormat,
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProductsPart);


