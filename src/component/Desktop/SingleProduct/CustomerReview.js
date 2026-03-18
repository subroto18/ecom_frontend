import React, {PureComponent,Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dynamic from "next/dynamic"
import {connect} from "react-redux";
import Photo from "../../CommonScreen/Image/Photo";
const Reviews = dynamic(() => import("../../CommonScreen/Reviews/Reviews"));
const Pagination = dynamic(() => import("./Pagination"));
class CustomerReview extends PureComponent {
    constructor() {
        super();
         this.state  = {
             showPerPage :5,
             pagination:{
                 start: 0,
                 end: this.showPerPage,
             },
         }
    }
    componentDidMount() {
    }
    // Change page
    render() {
        let data = this.props.rating;
        let totalReview = this.props.totalReview;
        const onPaginationChange = (start, end) => {
            this.setState({
                pagination:{ start: start, end: end }
            });
        };
        return (
            <Fragment>
                <Row className="productReviewRow">
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="productReview">
                            <span className="productReviewTitle">Customer Reviews</span>
                            <Col lg={12} xl={12} className="mb-3">
                                <div className="totalReview">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <h2 className="big-view"> {totalReview} <span>/5.0</span></h2>
                                        <p className="text-view"> {data.length}<span> ratings </span></p>
                                    </div>
                                    <div className="big-star">
                                         <Reviews value={totalReview}/>
                                    </div>
                                </div>
                                <hr className="review-hr" />
                                {data.length===0 &&
                                  <div className="no-review-title">There is no review yet</div>
                                }
                                {data.slice(this.state.pagination.start, this.state.pagination.end).map((pd) => (
                                    <div className="customerInfo">
                                        <div className="customerNameDIv d-flex">
                                            <div className="customerImg">
                                                {pd.userAvatar!=null ?

                                                    <Photo
                                                        onClick={(event)=>this.onChangeBigImage(event)}
                                                        src={`${this.props.backendApi}${pd.userAvatar}`}
                                                        blurDataURL="/blank.jpg"
                                                        class=""
                                                        width="200"
                                                        height="100"
                                                    />

                                                :
                                                    <Photo
                                                        src={`${this.props.backendApi}${pd.userAvatar}`}
                                                        blurDataURL="/blank.jpg"
                                                        class=""
                                                        width="200"
                                                        height="100"
                                                    />
                                                }
                                            </div>
                                            <div className="customerName"><span className="customerNameTitle">{pd.userName}</span> <span>on {pd.postDate}</span></div>
                                        </div>
                                        <Reviews value={pd.rating}/>
                                        <div className="customerReviewImgText">
                                            <div className="customerOpinion">
                                                <p>{pd.rating_des}</p>
                                            </div>
                                            {pd.product_photos.length>0 ?
                                                <Fragment>
                                                            {pd.product_photos.map(photos=> {
                                                                if(photos!==null){
                                                                    return  <div className="reviewImg">
                                                                              <Fragment>

                                                                                  <Photo
                                                                                      onClick={(event)=>this.onChangeBigImage(event)}
                                                                                      src={`${this.props.backendApi}${photos}`}
                                                                                      blurDataURL="/blank.jpg"
                                                                                      class="smImgSrc"
                                                                                  />

                                                                            </Fragment>
                                                                         </div>
                                                                }
                                                            })}
                                                </Fragment>
                                                :
                                                <Fragment></Fragment>
                                            }
                                        </div>
                                    </div>
                                ))}
                                {data.length>4 &&
                                <nav className="paginationReview" aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <Pagination
                                            showPerPage={this.state.showPerPage}
                                            onPaginationChange={onPaginationChange}
                                            total={data.length}
                                        />
                                    </ul>
                                </nav>
                                }
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(CustomerReview);

