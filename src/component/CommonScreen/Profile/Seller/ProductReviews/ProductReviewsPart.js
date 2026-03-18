import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import {MDBDataTable} from "mdbreact";
import Api from "../../../../../ClientApi/Api";
import SimpleReactValidator from 'simple-react-validator';
import Switch from "@mui/material/Switch";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {connect} from "react-redux";
import {alert} from "../../../../../services/common";
import {refreshNotification} from "../../../../../services/actions/notificationAction";
import Photo from "../../../Image/Photo";

class ProductReviewsPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state  = {
            data:[],
            loading:true,
            detailsDataLoading:false,
            reviewData:[],
            modal:false,
            checkbox:false,
        }
        this.onDetails = this.onDetails.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onCheckBoxMarked = this.onCheckBoxMarked.bind(this)
        this.onMarked = this.onMarked.bind(this)
    }
    componentDidMount() {
        Api().get('getAllSellerReviews').then(res=>{
            this.setState({
                data:res.data.data,
                reviewManageByAdmin:res.data.reviewManageByAdmin,
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
        Api().post('getReviewDetails',data).then(res=>{
            this.setState({
                detailsDataLoading:false,
                reviewData:res.data,
            })
        })
    }
    handleClose(){
        this.setState({
            modal:false,
            reviewData:[]
        })
    }
    onStatus(index,status){
            const data = {
                status:status,
                index:index
            }
            Api().post('postReviewStatus',data).then(res=>{
                if(res.data===1){
                    alert('success','Review status has been updated successfully!');
                    this.componentDidMount()
                }else if(res.data===2){
                    alert('warning','Sorry ! Only admin can change the status!');
                }
            }).catch(error=>{
                alert('warning','Something went wrong!');
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
                'type':'new-review'
            }
            Api().post('markedAsSeen',data).then(res=>{
                if(res.data==1){
                    this.componentDidMount();
                    this.setState({
                        checkbox:false
                    })
                }
                this.props.refreshNotification('productReview');
                this.setState({
                    loadingMarkBtn:false
                })
            }).catch(error=>{
            });
        }
    }

  render() {
    let data = this.state.data;
    let row = [];
    if(data.length>0){
        data.map((pro,index)=>{
            let notification = pro.notification;
            row.push({
                serial: `${index+1}`,
                productName:  <p>{pro.product_name} <span>{notification===1?   <span className="seller-new-notification">New</span>:<></>}</span></p>,
                userName:`${pro.user_name}` ,
                rating: `${pro.rating}` ,
                status:  <Switch  onChange={()=>this.onStatus(pro.index,pro.status)}  checked={pro.status}/>,
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
                label: 'Product Name',
                field: 'productName',
                width: 100,
            },
            {
                label: 'User name',
                field: 'userName',
                width: 100,
            },
            {
                label: 'Product rating',
                field: 'rating',
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
                                <Row className="mb-3 px-2">
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
                                                <div className='sellerTableSize sellerTableRespons table-responsive-sm table-responsive-md table-responsive-lg'>
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
                <Modal size="xl | lg | sm" className='responsiveModal'  scrollable={true}  centered show={this.state.modal} onHide={this.handleClose}>
                    <Modal.Header className="d-flex justify-content-between">
                        <Modal.Title className='modalHeading'>Review Details</Modal.Title>
                        <i onClick={this.handleClose} className="fa fa-times"/>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.detailsDataLoading ?
                            <Fragment>
                                <div className="loader-spinner-div">
                                    {loader}
                                </div>
                            </Fragment>:
                            <Fragment>
                                {this.state.reviewData.map(pd=>{
                                    return   <div className="order-details">
                                        <Row>
                                            <Col lg={7}>
                                                <div className="order-card">
                                                    <div key={1} className="review-part">
                                                        <h6>Reviewed on {pd.date}</h6>
                                                        <p className="text-muted mb-2">Your product rating & review:</p>
                                                        <Row>
                                                            <Col lg={7}>
                                                                <div>

                                                                    <Photo
                                                                        src={`${this.props.backendApi}${pd.product_thumbnail}`}
                                                                        blurDataURL="/blank.jpg"
                                                                        class="review-img reviewModalImg"
                                                                    />

                                                                </div>
                                                            </Col>
                                                            <Col lg={5}>
                                                                <div>
                                                                    <h6 className='reviewProductName'>{pd.product_name}</h6>
                                                                    <p className="text-muted">
                                                                        {pd.product_variation!=null &&
                                                                        <Fragment>{
                                                                            pd.product_variation.map((variant,i)=>{
                                                                                return <Fragment className="text-left mb-1"><span className="variation">{(Object.keys(variant))[0]}: </span> <span className="variation mr-1"> {(Object.values(variant))[0]}</span></Fragment>
                                                                            })
                                                                        }
                                                                        </Fragment>
                                                                        }
                                                                    </p>
                                                                    <ReactStars
                                                                        classNames="review"
                                                                        count={5}
                                                                        value={pd.product_rating}
                                                                        size={24}
                                                                        activeColor="#ffd700"
                                                                    />
                                                                    {pd.product_rating_description!=null &&
                                                                    <div className="review-des-div">
                                                                        <p>{pd.product_rating_description}</p>
                                                                    </div>
                                                                    }
                                                                    {pd.rating_photos.length>0 &&
                                                                    <Fragment>
                                                                        {pd.rating_photos.map(photos=> {
                                                                            if(photos!==null){
                                                                                return    <div className="reviewImg">

                                                                                    <Photo
                                                                                        src={`${this.props.backendApi}${photos}`}
                                                                                        blurDataURL="/blank.jpg"
                                                                                        class="smImgSrc img-fluid"
                                                                                    />

                                                                                </div>
                                                                            }
                                                                        })}
                                                                    </Fragment>
                                                                    }
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={5}>
                                                <div className="order-card">
                                                    <div className="review-part">
                                                        <h6>Sold by <span className="shop-name">{pd.seller_name}</span></h6>
                                                        <p className="text-muted mb-2">Your seller review:</p>
                                                        <ReactStars
                                                            classNames="review"
                                                            count={5}
                                                            value={pd.seller_rating}
                                                            size={24}
                                                            activeColor="#ffd700"
                                                        />
                                                        {pd.seller_rating_description!==null &&
                                                        <div className="review-des-div">
                                                            <p>{pd.seller_rating_description}</p>
                                                        </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="order-card">
                                                    <div className="review-part">
                                                        <h6>Reviewed by <span className="shop-name">{pd.user_name}</span></h6>
                                                    </div>
                                                </div>
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

    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductReviewsPart);

