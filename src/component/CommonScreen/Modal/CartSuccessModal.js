import React, {PureComponent,Fragment} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import Router from "next/router"
import {hideSuccessModal} from "../../../services/actions/productAction";
import {onCurrencyFormat} from "../../../services/common";
import Photo from "../Image/Photo";
class CartSuccessModal extends PureComponent {
    onHideModal(){
        this.props.hideSuccessModal();
    }
    onCart(){
        this.props.hideSuccessModal();
        Router.push('/cart');
    }
    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        return (
            <Fragment>
                <Modal
                    show={this.props.successCartStatus}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className='cartSuccessModal'>
                    <Modal.Header className="cartSuccessModalHeader"/>

                    {this.props.addCartProductInfo.length>0 &&
                        <Modal.Body>
                            <div className="cart-product-add-title-div">
                                <div className="success-animation">
                                    <svg className="checkmark"  viewBox="0 0 52 52">
                                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                    </svg>
                                </div>
                                <h3 className="cart-add-title cart-success-title">Item added to your cart!</h3>
                            </div>
                            <div className="cart-product-des d-flex justify-content-center">
                                <div className="cart-product-image">

                                    <Photo
                                        onClick={(event)=>this.onChangeBigImage(event)}
                                        src={this.props.backendApi + this.props.addCartProductInfo.image}
                                        blurDataURL="/blank.jpg"
                                        class="img-fluid cart-success-img"
                                    />

                                </div>
                                <div className="cart-product-name d-flex justify-content-center align-items-center">
                                    <div className="cart-add-name-div">
                                        <p className="text-left cart-success-title">{this.props.addCartProductInfo.product_name}</p>
                                        <p className="text-left mb-1"><span>Total Price :</span>
                                            <span className="regularPrice cart-success-price">
                                            {symbolFormat===1 ?
                                                <Fragment>
                                                    {
                                                        this.props.addCartProductInfo.discount ?
                                                            onCurrencyFormat(this.props.addCartProductInfo.quantity * this.props.addCartProductInfo.discount_price)
                                                            :
                                                            onCurrencyFormat(this.props.addCartProductInfo.quantity * this.props.addCartProductInfo.product_price)
                                                    }{defaultCurrency}
                                                </Fragment>:
                                                <Fragment>
                                                    {defaultCurrency}{
                                                    this.props.addCartProductInfo.discount ?
                                                        onCurrencyFormat(this.props.addCartProductInfo.quantity * this.props.addCartProductInfo.discount_price)
                                                        :
                                                        onCurrencyFormat(this.props.addCartProductInfo.quantity * this.props.addCartProductInfo.product_price)
                                                }
                                                </Fragment>
                                            }
                                        </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-add-btn-div">
                                <Button onClick={this.onHideModal.bind(this)}  className="mr-4">Back to shopping</Button>
                                <Button onClick={this.onCart.bind(this)}  className="btn">Proceed  to checkout</Button>
                            </div>
                        </Modal.Body>
                    }


                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}




const mapDispatchToProps = {
    hideSuccessModal
};

function mapStateToProps(state) {
  const defaultCurrency = state.starterReducer.defaultCurrency;
  const symbolFormat = state.starterReducer.symbolFormat;
  const backendApi = state.starterReducer.backendApi;
  const successCartStatus = state.productReducer.successCartStatus;
  const addCartProductInfo = state.productReducer.addCartProductInfo

    return {
        defaultCurrency,
        symbolFormat,
        backendApi,
        successCartStatus,
        addCartProductInfo
    };
}





export default connect(mapStateToProps, mapDispatchToProps)(CartSuccessModal);


