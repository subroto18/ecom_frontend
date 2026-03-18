import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ReactStars from "react-rating-stars-component";
import Api from "../../../../../ClientApi/Api";
import {connect} from "react-redux";
import Router from "next/router";
import {alert} from "../../../../../services/common";
import Photo from "../../../Image/Photo";
import MediaUpload from "../../../Media/MediaUpload";

class UserReviewPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true, 
            fileType:'',
            buttonDisable:false,
            progress:0,
            maxNumber:2,
            loadingImage:false,
            productReview:5,
            sellerReview:5,
            productReviewDetail:"",
            sellerReviewDetail:"",
            loadingBtn:false
        }
        this.changeRating = this.changeRating.bind(this)
        this.changeSellerRating =  this.changeSellerRating.bind(this)
        this.onProductReview = this.onProductReview.bind(this)
        this.onSellerReview  = this.onSellerReview.bind(this)
        this.submit  = this.submit.bind(this)
    }
    componentDidMount() {

        window.scroll(0,0);
         let orderId = window.location.pathname.split("/")[3];
         let productId =  window.location.pathname.split("/")[5];
         let productIndex = window.location.pathname.split("/")[7];
         const data = {
             orderId : orderId,
             productId:productId,
             productIndex:productIndex
         }
     Api().post('getReviewData',data).then(res=>{
           this.setState({
               data:res.data,
               loading:false
           })
     }).catch()
    }
    changeRating( newRating, name ) {
        this.setState({
            productReview: newRating
        });
    }
    changeSellerRating(newRating){
        this.setState({
            sellerReview: newRating
        });
    }
    onProductReview(e){
        this.setState({
            productReviewDetail:e.target.value
        })
    }
    onSellerReview(e){
        this.setState({
            sellerReviewDetail:e.target.value
        })
    }
    submit(){
        let productReview  = this.state.productReview;
        let sellerReview = this.state.sellerReview;
        let productReviewDetail = this.state.productReviewDetail;
        let sellerReviewDetail = this.state.sellerReviewDetail;
        let reviewPhotos = this.props.dynamicData['selected_for_review']!==undefined ? this.props.dynamicData['selected_for_review']: null;
        const data  = {
            productReview:productReview,
            sellerReview:sellerReview,
            productReviewDetail:productReviewDetail,
            sellerReviewDetail:sellerReviewDetail,
            reviewPhotoId:reviewPhotos,
            productId:window.location.pathname.split("/")[5],
            orderId: window.location.pathname.split("/")[3],
            productIndex: window.location.pathname.split("/")[7]

        }
        this.setState({
            loadingBtn:true
        })
        Api().post('postReview',data).then(res=>{
           if(res.data===1){
               alert('success','Feedback submitted!');
               Router.push("/reviews")
           }
            this.setState({
                loadingBtn:false
            })
        }).catch()
    }

  render() {
    const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
    return (
      <Fragment>
          {this.state.loading ?
                        <Fragment>{loader}</Fragment>:
                        <Fragment>
                            {this.state.data.map(pd=>{
                                return  <div className="review-div">
                                    <Row>
                                        <Col lg={7}>
                                            <div key={1} className="review-part">
                                                <h6>Delivered on {pd.delivery_date}</h6>
                                                <p className="text-muted mb-2">Rate and review purchased product:</p>
                                                <Row className="mt-3">
                                                    <Col lg={3}>

                                                        <Photo
                                                            src={`${this.props.backendApi}${pd.product_thumbnail}`}
                                                            blurDataURL="/blank.jpg"
                                                            class="order-img"
                                                        />

                                                    </Col>
                                                    <Col lg={9} className='oder-cd reviewBodyPart'>
                                                        <h6 className='productName'>{pd.product_name}</h6>
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
                                                            value={this.state.productReview}
                                                            onChange={this.changeRating}
                                                            size={24}
                                                            activeColor="#ffd700"
                                                        />
                                                        <p>Review detail</p>
                                                        <textarea onChange={(e)=>this.onProductReview(e)} className="form-control mb-3" rows="3"/>
                                                        <MediaUpload    multipleFile={false} type="review" for="review"  limit={4} widthSize={400} heightSize={400}  />
                                                        <div className="note">
                                                            <h6>Important:</h6>
                                                            <ul className='importantNote'>
                                                                <li>  Maximum 4 images can be uploaded</li>
                                                                <li>  Image size can be maximum 2 mb</li>
                                                                <li>  Please ensure you meet the Community Guidelines before uploading your review</li>
                                                            </ul>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col lg={1}>
                                            <div className="review-vertical-line">
                                                <div className="rvl"/>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="review-part review-seller-name">
                                                <h6>Sold by <span className="shop-name">{pd.seller}</span></h6>
                                                <p className="text-muted mb-2">Rate and review your seller:</p>
                                                <ReactStars
                                                    classNames="review"
                                                    count={5}
                                                    value={this.state.sellerReview}
                                                    onChange={this.changeSellerRating}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                />
                                                <p>Review detail</p>
                                                <textarea onChange={(e)=>this.onSellerReview(e)} className="form-control" rows="3"/>
                                                {this.state.loadingBtn ?
                                                     <Button className="review-btn reviewSubmitBtn"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                        Loading...
                                                    </Button> :
                                                    <Button onClick={this.submit} className="review-btn reviewSubmitBtn">Submit</Button>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            })}
                        </Fragment>
                    }
      </Fragment>
    )
  }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    const dynamicData = state.mediaReducer;

    return {
        backendApi,
        dynamicData
    };
}

export default connect(mapStateToProps)(UserReviewPart);



