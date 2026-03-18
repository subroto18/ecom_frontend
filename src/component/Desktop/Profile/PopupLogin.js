import React, {Component, Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import LoginPart from "../../CommonScreen/Login/LoginPart";
import {connect} from "react-redux";
import {popupLoginHide} from "../../../services/actions/commonAction"
import Photo from "../../CommonScreen/Image/Photo";

class PopupLogin extends Component {
    constructor() {
        super();
        this.onHide = this.onHide.bind(this)
    }

    onHide() {
        this.props.popupLoginHide();
    }

    render() {


        return (
            <Fragment>
                <Modal
                    className='responsiveModal popupLoginModal'
                    show={this.props.loginModal}
                    scrollable={true}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={this.onHide}
                >
                    <Modal.Header>
                        <Modal.Title className="text-center" id="contained-modal-title-vcenter"/>
                        <i onClick={this.onHide} className="far fa-times"/>
                    </Modal.Header>
                    <Modal.Body className='modalBody'>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12} className="login-input-group px-5 ">
                                <div>
                                    <div className="login-input">
                                        <div className="login-site-logo">

                                            <div className="popup-login-logo">
                                                <Photo
                                                    src={`${this.props.backendApi}${this.props.logo}`}
                                                    blurDataURL={`${this.props.backendApi}${this.props.logo}`}
                                                    class=""
                                                />
                                            </div>
                                        </div>
                                        <div className='popupLoginDiv'>
                                            <LoginPart/>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    popupLoginHide
};

function mapStateToProps(state) {
    const loginModal = state.commonReducer.loginModal;
    const backendApi = state.starterReducer.backendApi;
    const logo = state.starterReducer.logo

    return {
        loginModal,
        backendApi,
        logo
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupLogin);



