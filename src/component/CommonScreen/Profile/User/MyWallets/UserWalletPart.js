import React, { PureComponent, Fragment } from "react";
import parse from "html-react-parser";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Api from "../../../../../ClientApi/Api";
import SimpleReactValidator from "simple-react-validator";
import { sendEmail } from "../../../../../services/actions/commonAction";
import { alert, onCurrencyFormat } from "../../../../../services/common";
import { selectedMedia } from "../../../../../services/actions/mediaAction";
import { getWalletData } from "../../../../../services/actions/walletAction";
import { connect } from "react-redux";
import Photo from "../../../Image/Photo";
import dynamic from "next/dynamic";
const OnlinePayment = dynamic(
  () => import("../../../OnlinePayment/OnlinePayment"),
  {
    ssr: false,
  },
);
const MediaUpload = dynamic(() => import("../../../Media/MediaUpload"), {
  ssr: false,
});

class UserWalletPart extends PureComponent {
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
    this.state = {
      offlineModal: false,
      amount: "",
      transactionId: "",
      loading: true,
      modal: false,
      paymentDataLoading: true,
      paymentData: [],
      paymentMethodIndex: "",
      loadingBtn: false,
      data: [],
      onlinePaymentModal: false,
    };
    this.onOfflineModalHide = this.onOfflineModalHide.bind(this);
    this.onOfflineModalShow = this.onOfflineModalShow.bind(this);
    this.onlineModalShow = this.onlineModalShow.bind(this);
    this.onAmount = this.onAmount.bind(this);
    this.onPaymentMethodChange = this.onPaymentMethodChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.callBack = this.callBack.bind(this);
    this.onlineModalHide = this.onlineModalHide.bind(this);
  }
  componentDidMount() {
    if (this.props.walletActivation !== 0) {
      this.props.getWalletData();
    }
    window.scroll(0, 0);
  }
  onOfflineModalShow() {
    this.setState({
      offlineModal: true,
    });
    Api()
      .get("getOfflinePayment")
      .then((res) => {
        this.setState({
          paymentData: res.data,
          paymentDataLoading: false,
          paymentMethodIndex: res.data[0].id,
        });
      })
      .catch((error) => {});
  }
  onlineModalShow() {
    this.setState({
      onlinePaymentModal: true,
    });
  }
  onlineModalHide() {
    this.setState({
      onlinePaymentModal: false,
    });
  }
  onOfflineModalHide() {
    this.setState({
      offlineModal: false,
    });
  }
  onPaymentMethodChange(e) {
    this.setState({
      paymentMethodIndex: e,
    });
  }
  onAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }
  onTransaction(e) {
    this.setState({
      transactionId: e.target.value,
    });
  }
  callBack() {
    this.componentDidMount();
  }
  onSubmit() {
    if (this.validator.allValid()) {
      this.setState({
        loadingBtn: true,
        loadingImage: true,
      });

      let amount = this.state.amount;
      let transactionId = this.state.transactionId;
      let photo =
        this.props.dynamicData["selected_for_offline_payment"] !== undefined
          ? this.props.dynamicData["selected_for_offline_payment"]
          : null;
      let paymentMethod = this.state.paymentMethodIndex;
      const data = {
        amount: amount,
        transactionId: transactionId,
        photo: photo,
        paymentMethod: paymentMethod,
      };
      Api()
        .post("offline-wallet-recharge", data)
        .then((res) => {
          if (res.data === 1) {
            this.setState({
              loadingBtn: false,
              offlineModal: false,
              loadingImage: false,
            });

            alert("success", "Form submitted successfully");
            this.props.sendEmail();
            this.props.selectedMedia({
              selectedMediaFile: [],
            });
            this.componentDidMount();
          }
        })
        .catch();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    let defaultCurrency = this.props.defaultCurrency;
    let currencySymbolFormat = this.props.currencySymbolFormat;
    const loader = (
      <div className="pre-loader">
        <div className="loader-spinner">
          <div className="spinner-border text-muted" />
        </div>
      </div>
    );
    const walletBalance = this.props.walletData.map((pd) => {
      return pd.walletBalance;
    });
    const totalRecharge = this.props.walletData.map((pd) => {
      return pd.totalRecharge;
    });
    let activePaymentGateway = this.props.activePaymentGateway;

    console.log(this.state.onlinePaymentModal, "this.state.onlinePaymentModal");

    return (
      <Fragment>
        <Container className="wallet-container">
          <Row className="mt-3">
            <Col lg={3} md={12} sm={12} xs={12}>
              <div className="wallet-div">
                <div className="wallet-content-div balance">
                  <h6 className="wallet-recharge walletBalance">
                    <i className="fal fa-wallet walletIcon myWalletIcon" />
                    Wallet balance
                  </h6>
                  {currencySymbolFormat === 1 ? (
                    <p className="wallet-balance">
                      {this.props.walletData.length > 0
                        ? onCurrencyFormat(walletBalance)
                        : onCurrencyFormat(0)}
                      {defaultCurrency}
                    </p>
                  ) : (
                    <p className="wallet-balance">
                      {defaultCurrency}
                      {this.props.walletData.length > 0
                        ? onCurrencyFormat(walletBalance)
                        : onCurrencyFormat(0)}
                    </p>
                  )}
                </div>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12} xs={12}>
              <div className="wallet-div">
                <div className="wallet-content-div balance">
                  <h6 className="wallet-recharge walletBalance">
                    <i className="fal fa-wallet walletIcon myWalletIcon" />
                    Total Recharge
                  </h6>
                  {currencySymbolFormat === 1 ? (
                    <p className="wallet-balance">
                      {this.props.walletData.length > 0
                        ? onCurrencyFormat(totalRecharge)
                        : onCurrencyFormat(0)}
                      {defaultCurrency}
                    </p>
                  ) : (
                    <p className="wallet-balance">
                      {defaultCurrency}
                      {this.props.walletData.length > 0
                        ? onCurrencyFormat(totalRecharge)
                        : onCurrencyFormat(0)}
                    </p>
                  )}
                </div>
              </div>
            </Col>
            {activePaymentGateway.paypalStatus === 1 ||
            activePaymentGateway.stripeStatus === 1 ||
            activePaymentGateway.sslcommerzStatus === 1 ? (
              <Fragment>
                <Col lg={3} md={6} sm={6} xs={12}>
                  <div
                    onClick={this.onlineModalShow}
                    className="wallet-div recharge"
                  >
                    <div className="wallet-content-div">
                      <i className="fad fa-plus-octagon addWalletIcon" />
                      <p className="wallet-recharge">Online recharge wallet</p>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={6} sm={6} xs={12}>
                  <div
                    onClick={this.onOfflineModalShow}
                    className="wallet-div recharge"
                  >
                    <div className="wallet-content-div">
                      <i className="fad fa-plus-octagon addWalletIcon" />
                      <p className="wallet-recharge">Offline recharge wallet</p>
                    </div>
                  </div>
                </Col>
              </Fragment>
            ) : (
              <Fragment>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <div
                    onClick={this.onOfflineModalShow}
                    className="wallet-div recharge"
                  >
                    <div className="wallet-content-div">
                      <i className="fad fa-plus-octagon addWalletIcon" />
                      <p className="wallet-recharge">Offline recharge wallet</p>
                    </div>
                  </div>
                </Col>
              </Fragment>
            )}
          </Row>
          <div className="my-wallet-div">
            <Row>
              <Col lg={12}>
                <h6>Wallet Recharge History</h6>
                {this.props.walletDataLoading ? (
                  <div className="loader-spinner-div">{loader}</div>
                ) : (
                  <Table
                    striped
                    bordered
                    hover
                    className="text-center table-style table-responsive-sm"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Payment date</th>
                        <th>Total Amount</th>
                        <th>Payment method</th>
                        <th>Payment Approval</th>
                      </tr>
                    </thead>
                    <Fragment>
                      <Fragment>
                        {this.props.walletData.map((pd) => {
                          if (pd.recharge_data.length > 0) {
                            return (
                              <Fragment>
                                {pd.recharge_data.map((rd, i) => {
                                  return (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>{rd.date}</td>
                                      <td>{onCurrencyFormat(rd.amount)}</td>
                                      <td>{rd.payment_method}</td>
                                      {rd.status === "Pending" ? (
                                        <td>
                                          <span className="badge pending">
                                            {rd.status}
                                          </span>
                                        </td>
                                      ) : (
                                        <td>
                                          <span className="badge approve">
                                            {rd.status}
                                          </span>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                })}
                              </Fragment>
                            );
                          } else {
                            return (
                              <tbody>
                                <tr>
                                  <td colSpan="5">
                                    There isn't any wallet recharge yep
                                  </td>
                                </tr>
                              </tbody>
                            );
                          }
                        })}
                      </Fragment>
                    </Fragment>
                  </Table>
                )}
              </Col>
            </Row>
          </div>
          <Modal
            size="xl | lg | sm"
            className="responsiveModal"
            centered
            scrollable={true}
            show={this.state.offlineModal}
            onHide={this.onOfflineModalHide}
          >
            <Modal.Header>
              <h6>Offline wallet recharge</h6>
              <button
                onClick={this.onOfflineModalHide}
                type="button"
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body className="offline-payment-modal">
              <hr />
              <Fragment>
                <Fragment>
                  {this.state.paymentDataLoading ? (
                    <Fragment>
                      <div className="loader-spinner-div">{loader}</div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {this.state.paymentData.length > 0 && (
                        <Fragment>
                          {this.state.paymentData.map((pd) => {
                            return (
                              <Fragment>
                                <div className="offline-wallet-recharge-title-div">
                                  <div className="offline-wallet-recharge-div">
                                    {pd.nameWithPhoto.map((np) => {
                                      return (
                                        <Fragment>
                                          <label className="pGatewayLabel recharge mobilePGatewayLabel offlinePGateway">
                                            <input
                                              onChange={() =>
                                                this.onPaymentMethodChange(
                                                  np.index,
                                                )
                                              }
                                              className="pGatewayRadio"
                                              checked={
                                                np.index ===
                                                this.state.paymentMethodIndex
                                              }
                                              type="radio"
                                              name="test"
                                              value={np.index}
                                            />
                                            <span className="gatewayDiv offLinePayOption">
                                              <Photo
                                                src={`${this.props.backendApi}${np.thumbnail}`}
                                                blurDataURL="/blank.jpg"
                                                class="offline-wallet-photo offLineWalletPic"
                                              />
                                              <span className="pGatewayName offline-recharge">
                                                {np.name}
                                              </span>
                                            </span>
                                          </label>
                                        </Fragment>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="offline-wallet-recharge-content-div">
                                  <div className="offline-wallet-content">
                                    <h6 className="offline-ins">Instruction</h6>
                                    {pd.instruction.map((ins) => {
                                      if (
                                        ins.index ===
                                        this.state.paymentMethodIndex
                                      ) {
                                        return (
                                          <Fragment>
                                            {parse(ins.instruction)}
                                          </Fragment>
                                        );
                                      }
                                    })}
                                  </div>
                                </div>
                                <Fragment>
                                  {pd.bankDetails.map((bd) => {
                                    if (
                                      bd.index === this.state.paymentMethodIndex
                                    ) {
                                      if (bd.bankName !== null) {
                                        return (
                                          <Fragment>
                                            <div className="offline-wallet-recharge-bank-content-div">
                                              <div className="offline-wallet-bank-content">
                                                <h6>Bank Information</h6>
                                                <div className="sellerTableSize resSellerTable table-responsive-sm table-responsive-md table-responsive-lg">
                                                  <Table striped bordered hover>
                                                    <thead>
                                                      <tr>
                                                        <th>Bank Name</th>
                                                        <th>
                                                          Account Holder name
                                                        </th>
                                                        <th>Account number</th>
                                                        <th>Routine number</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
                                                        <td>{bd.bankName}</td>
                                                        <td>
                                                          {bd.accountName}
                                                        </td>
                                                        <td>
                                                          {bd.accountNumber}
                                                        </td>
                                                        <td>
                                                          {bd.routingNumber}
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </Table>
                                                </div>
                                              </div>
                                            </div>
                                          </Fragment>
                                        );
                                      }
                                    }
                                  })}
                                </Fragment>

                                <div className="offline-wallet-recharge">
                                  <div className="form-group">
                                    <label htmlFor="email">Amount * </label>
                                    <input
                                      onChange={(e) => this.onAmount(e)}
                                      type="text"
                                      className="form-control inputBoxSize"
                                      placeholder="Enter your recharged Amount"
                                    />
                                    <div className="mb-2 text-danger">
                                      {" "}
                                      {this.validator.message(
                                        "amount",
                                        this.state.amount,
                                        "required|currency",
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="email">
                                      Transaction ID *{" "}
                                    </label>
                                    <input
                                      onChange={(e) => this.onTransaction(e)}
                                      type="text"
                                      className="form-control inputBoxSize"
                                      placeholder="Enter your Transaction ID"
                                    />
                                    <div className="mb-2 text-danger">
                                      {" "}
                                      {this.validator.message(
                                        "transactionId",
                                        this.state.transactionId,
                                        "required",
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <MediaUpload
                                      title="payment receipt"
                                      note="send your payment receipt after your payment"
                                      multipleFile={false}
                                      type="offline_payment"
                                      for="offline_payment"
                                      limit={1}
                                      widthSize={600}
                                      heightSize={600}
                                    />

                                    <div className="mb-2 text-danger">
                                      {" "}
                                      {this.validator.message(
                                        "photo",
                                        this.props.dynamicData[
                                          "selected_for_offline_payment"
                                        ],
                                        "required",
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  {this.state.loadingBtn ? (
                                    <Button
                                      disabled={true}
                                      className="float-right"
                                    >
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                      Loading...
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={this.onSubmit}
                                      className="float-right"
                                    >
                                      Submit
                                    </Button>
                                  )}
                                </div>
                              </Fragment>
                            );
                          })}
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </Fragment>
              </Fragment>
            </Modal.Body>
          </Modal>
          <OnlinePayment
            modal={this.state.onlinePaymentModal}
            onModalHide={this.onlineModalHide}
            paymentFor="wallet"
            callback={this.callBack}
          />
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  sendEmail,
  selectedMedia,
  getWalletData,
};

function mapStateToProps(state) {
  const dynamicData = state.mediaReducer;
  const defaultCurrency = state.starterReducer.defaultCurrency;
  const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
  const walletActivation = state.walletReducer.walletActivation;
  const walletData = state.walletReducer.walletData;
  const activePaymentGateway = state.userReducer.activePaymentGateway;
  const walletDataLoading = state.walletReducer.walletDataLoading;
  const backendApi = state.starterReducer.backendApi;
  return {
    dynamicData,
    defaultCurrency,
    currencySymbolFormat,
    walletActivation,
    walletData,
    activePaymentGateway,
    walletDataLoading,
    backendApi,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserWalletPart);
