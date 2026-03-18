import React, {PureComponent,Fragment} from 'react';
import Modal from "react-bootstrap/Modal";
import {connect} from "react-redux";
import SingleProductCard from "../ProductCardDetails/SingleProductCard";
import {cartVariationReset} from "../../../services/actions/productAction";
class CartVariationModal extends PureComponent {
    constructor() {
        super();
        this.onHideModal = this.onHideModal.bind(this)
    }
    onHideModal(){
        this.props.cartVariationReset();
    }

    render() {
        return (
            <Fragment>
                <Modal size="lg" className='responsiveModal cartModal ' scrollable={true} show={this.props.variationCartStatus} onHide={this.onHideModal} aria-labelledby="contained-modal-title-vcenter" centered id="productCardModal">
                    <Modal.Header>
                        <Modal.Title className="text-center" id="contained-modal-title-vcenter"/>
                        <i onClick={this.onHideModal} className="far fa-times"/>
                    </Modal.Header>
                    <Modal.Body className='modalBody'>
                        {this.props.variationCartLoadingStatus ?
                            <Fragment>
                                <div className="cartLoader">
                                    <div className="loader-spinner">
                                        <div className="spinner-border text-muted"/>
                                    </div>
                                </div>
                            </Fragment>
                            :
                            <Fragment>
                                <div className='cartModalPart'>
                                    <SingleProductCard loading={false} data={this.props.specificProduct} cartVariation={true}  />
                                </div>
                            </Fragment>
                        }
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}





const mapDispatchToProps = {
    cartVariationReset
};

function mapStateToProps(state) {
    const variationCartStatus = state.productReducer.variationCartStatus;
    const variationCartLoadingStatus = state.productReducer.variationCartLoadingStatus
    const specificProduct = state.productReducer.specificProduct

    return {
        variationCartStatus,
        variationCartLoadingStatus,
        specificProduct
    };
}





export default connect(mapStateToProps, mapDispatchToProps)(CartVariationModal);



