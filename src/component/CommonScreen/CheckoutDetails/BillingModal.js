import React, {PureComponent, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {connect} from "react-redux";
import {billingModalHide} from "../../../services/actions/shippingBillingPickupAction";
import DefaultBillingModal from "../../Desktop/Checkout/BillingModal/DefaultBillingModal";
import AddBillingModal from "../../Desktop/Checkout/BillingModal/AddBillingModal";

class BillingModal extends PureComponent {
    render() {
        return (
            <Fragment>
                <Modal centered size="xl | lg | sm" className='responsiveModal' scrollable={true} show={this.props.billingModal}   onHide={()=>this.props.billingModalHide()} >
                    <div className="modal-body shippingModal">
                        <button onClick={()=>this.props.billingModalHide()} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <Tabs defaultActiveKey="photos" id="uncontrolled-tab-example">
                            <Tab  eventKey="photos" title="Default billing Address">
                                <DefaultBillingModal/>
                            </Tab>
                            <Tab eventKey="Upload" title="Add new billing">
                                <AddBillingModal/>
                            </Tab>
                        </Tabs>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    billingModalHide
};

function mapStateToProps(state) {
    const billingModal = state.shippingBillingPickupReducer.billingModal;

    return {
        billingModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingModal);
