import React, {PureComponent, Fragment} from 'react';
class Reviews extends PureComponent {
    render() {
        let review = this.props.value;
        return (
            <Fragment>
                <Fragment>
                    {review===0 ?
                        <div className="rating">
                            <i className="fas fa-star cartProductEmptyReview"/>
                            <i className="fas fa-star cartProductEmptyReview"/>
                            <i className="fas fa-star cartProductEmptyReview"/>
                            <i className="fas fa-star cartProductEmptyReview"/>
                            <i className="fas fa-star cartProductEmptyReview"/>
                        </div> :
                        review===1 ?
                            <div className="rating">
                                <i className="fas fa-star cartProductReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                                <i className="fas fa-star cartProductEmptyReview"/>
                            </div> :
                            review>1 && review<2 ?
                                <div className="rating">
                                    <i className="fas fa-star cartProductReview"/>
                                    <i className="fad fa-star-half cartProductReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                    <i className="fas fa-star cartProductEmptyReview"/>
                                </div> :
                                review===2 ?
                                    <div className="rating">
                                        <i className="fas fa-star cartProductReview"/>
                                        <i className="fas fa-star cartProductReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                        <i className="fas fa-star cartProductEmptyReview"/>
                                    </div> :
                                    review>2 && review<3  ?
                                        <div className="rating">
                                            <i className="fas fa-star cartProductReview"/>
                                            <i className="fas fa-star cartProductReview"/>
                                            <i className="fad fa-star-half cartProductReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                            <i className="fas fa-star cartProductEmptyReview"/>
                                        </div> :
                                        review===3 ?
                                            <div className="rating">
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                                <i className="fas fa-star cartProductEmptyReview"/>
                                            </div> :
                                            review>3 && review<4 ?
                                                <div className="rating">
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fas fa-star cartProductReview"/>
                                                    <i className="fad fa-star-half cartProductReview"/>
                                                    <i className="fas fa-star cartProductEmptyReview"/>
                                                </div> :
                                                review===4 ?
                                                    <div className="rating">
                                                        <i className="fas fa-star cartProductReview"/>
                                                        <i className="fas fa-star cartProductReview"/>
                                                        <i className="fas fa-star cartProductReview"/>
                                                        <i className="fas fa-star cartProductReview"/>
                                                        <i className="fas fa-star cartProductEmptyReview"/>
                                                    </div> :
                                                    review>4 && review<5 ?
                                                        <div className="rating">
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fad fa-star-half cartProductReview"/>
                                                        </div> :
                                                        <div className="rating">
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fas fa-star cartProductReview"/>
                                                            <i className="fas fa-star cartProductReview"/>
                                                        </div>
                    }
                </Fragment>
            </Fragment>
        );
    }
}
export default Reviews;