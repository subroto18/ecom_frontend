import React, {PureComponent, Fragment} from 'react';
import Modal from "react-bootstrap/Modal";
import { pickUpModalHide} from "../../../services/actions/shippingBillingPickupAction";
import {connect} from "react-redux";
import dynamic from "next/dynamic"
const PickupPoint = dynamic(() => import("../../Desktop/Checkout/pickupPoint/PickupPoint"));
class PickupPointModal extends PureComponent {

    render() {
        return (
            <Fragment>
                <Modal centered size="xl | lg | sm" scrollable={true} show={this.props.pickupPointModal} className="responsiveModal"  onHide={()=>this.props.pickUpModalHide()} >
                    <div className="modal-body shippingModal">
                        <button onClick={()=>this.props.pickUpModalHide()} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <PickupPoint/>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    pickUpModalHide
};

function mapStateToProps(state) {
    const pickupPointModal = state.shippingBillingPickupReducer.pickupPointModal;

    return {
        pickupPointModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PickupPointModal);
