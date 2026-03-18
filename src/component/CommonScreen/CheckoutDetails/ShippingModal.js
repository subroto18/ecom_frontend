import React, {PureComponent, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {connect} from "react-redux";
import dynamic from "next/dynamic"
import {shippingModalHide} from "../../../services/actions/shippingBillingPickupAction";
const DefaultShippingModal = dynamic(() => import("../../Desktop/Checkout/ShippingModal/DefaultShippingModal"));
 const AddShippingModal = dynamic(() => import("../../Desktop/Checkout/ShippingModal/AddShippingModal"));
class ShippingModal extends PureComponent {
    render() {
        return (
            <Fragment>
                <Modal centered size="xl | lg | sm" scrollable={true} className='responsiveModal' show={this.props.shippingModal} onHide={this.props.shippingModalHide}  >
                    <div className="modal-body shippingModal">
                        <button onClick={()=>this.props.shippingModalHide()} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <Tabs defaultActiveKey="photos" id="uncontrolled-tab-example">
                            <Tab  eventKey="photos" title="Default shipping Address">
                                <DefaultShippingModal/>
                            </Tab>
                            <Tab eventKey="Upload" title="Add new shipping">
                                <AddShippingModal/>
                            </Tab>
                        </Tabs>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    shippingModalHide
};

function mapStateToProps(state) {
    const shippingModal = state.shippingBillingPickupReducer.shippingModal;

    return {
        shippingModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingModal);

