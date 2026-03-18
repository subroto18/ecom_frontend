import React, { PureComponent, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Api from "../../../../ClientApi/Api";
import Select from "react-select";
import parse from "html-react-parser";

import { connect } from "react-redux";
import { onlinePayData } from "../../../../services/actions/onlinePaymentAction";
import SimpleReactValidator from "simple-react-validator";
import Router from "next/router";
import Photo from "../../Image/Photo";
import { onCurrencyFormat } from "../../../../services/common";
import Link from "next/link";
import {
  selectedMedia,
  showMediaFile,
  mediaLimit,
} from "../../../../services/actions/mediaAction";
import dynamic from "next/dynamic";
const OnlinePayment = dynamic(
  () => import("../../OnlinePayment/OnlinePayment"),
  {
    ssr: false,
  },
);
const MediaUpload = dynamic(() => import("../../Media/MediaUpload"), {
  ssr: false,
});

class SellerPackagePart extends PureComponent {
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
    this.state = {
      loading: true,
      data: [],
      modal: false,
      offlinePaymentModal: false,
      onlinePaymentModal: false,
      paymentData: [],
      paymentDataLoading: true,
      paymentMethodIndex: "",
      amount: "",
      transactionId: "",
      packageId: "",
      packagePrice: "",
      loadingImage: false,
      loadingBtn: false,
      sellerVerificationStatus: [],
      verificationStatusLoading: false,
    };
    this.onBuyPackage = this.onBuyPackage.bind(this);
    this.onHandleClose = this.onHandleClose.bind(this);
    this.onOfflineModalHide = this.onOfflineModalHide.bind(this);
    this.onlineModalHide = this.onlineModalHide.bind(this);
    this.onPaymentType = this.onPaymentType.bind(this);
    this.onAmount = this.onAmount.bind(this);
    this.onPaymentMethodChange = this.onPaymentMethodChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    Api()
      .get("getSellerPackage")
      .then((res) => {
        this.setState({
          data: res.data,
          loading: false,
        });
      })
      .catch((error) => {});

    Api()
      .get("getSellerVerification")
      .then((res) => {
        this.setState({
          sellerVerificationStatus: res.data,
          verificationStatusLoading: false,
        });
      });
  }

  onBuyPackage(id, price) {
    this.setState({
      modal: true,
      packageId: id,
      packagePrice: price,
    });

    let data = {
      sellerPackageAmountForOnlinePay: price,
      sellerPackageIdForOnlinePay: id,
    };

    this.props.onlinePayData(data);
  }

  onHandleClose() {
    this.setState({
      modal: false,
    });
  }

  onOfflineModalHide() {
    this.setState({
      offlinePaymentModal: false,
    });
  }

  onlineModalHide() {
    this.setState({
      onlinePaymentModal: false,
    });
  }

  onPaymentMethodChange(e) {
    console.log(e);
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
      let packageId = this.state.packageId;

      const data = {
        amount: amount,
        transactionId: transactionId,
        photo: photo,
        paymentMethod: paymentMethod,
        packageId: packageId,
      };

      Api()
        .post("offline-seller-package-recharge", data)
        .then((res) => {
          if (res.data === 1) {
            this.setState({
              loadingBtn: false,
              offlinePaymentModal: false,
              loadingImage: false,
            });

            this.props.selectedMedia({
              photoId: [],
              type: "offline_payment",
            });

            this.props.mediaLimit({
              limit: "",
              type: "offline_payment",
            });

            Router.push("/seller-products");
            this.componentDidMount();
          }
        })
        .catch();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  onPaymentType(e) {
    if (e.value === "offline") {
      this.setState({
        modal: false,
        offlinePaymentModal: true,
        paymentDataLoading: true,
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
    } else {
      this.setState({
        modal: false,
        onlinePaymentModal: true,
      });
    }
  }

  render() {
    let defaultCurrency = this.props.defaultCurrency;
    let currencySymbolFormat = this.props.currencySymbolFormat;

    const paymentType = [
      { value: "online", label: "Online payment" },
      { value: "offline", label: "Offline payment" },
    ];

    const loader = (
      <div className="pre-loader">
        <div className="loader-spinner">
          <div className="spinner-border text-muted" />
        </div>
      </div>
    );

    return (
      <Fragment>
        <section className="sectionDiv">
          <Container>
            <div className=" p-5 mt-5 sellerPackageTitleDiv">
              <h2 className="text-center premiumPackages ">
                Premium Packages for Sellers
              </h2>
            </div>
            <Row>
              <Fragment>
                {this.state.loading ? (
                  <Fragment>
                    <Col lg={4} md={4} sm={12} xs={12}>
                      <div className="card my-5 sellerPackage">{loader}</div>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                      <div className="card my-5 sellerPackage">{loader}</div>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                      <div className="card my-5 sellerPackage">{loader}</div>
                    </Col>
                  </Fragment>
                ) : (
                  <Fragment>
                    {this.state.data.map((pd) => {
                      return (
                        <Col lg={4} md={4} sm={12} xs={12}>
                          <div className="card my-5 sellerPackage pb-3">
                            <Row>
                              <Col lg={6} md={12} sm={6}>
                                <div className="seller-package-thumbnail-div ">
                                  <Photo
                                    src={
                                      pd.package_thumbnail !== null
                                        ? this.props.backendApi +
                                          pd.package_thumbnail
                                        : "/blank.jpg"
                                    }
                                    blurDataURL="/blank.jpg"
                                    class="sellerPackageThumbnail sellerPackagePic rounded mx-auto d-block"
                                  />
                                </div>
                              </Col>
                              <Col lg={6} md={12} sm={6}>
                                <div className="package-div sellerPackageDetails">
                                  <h4 className="package-name seller-package">
                                    <span className="sellerPackageName">
                                      {pd.package_name}
                                    </span>
                                  </h4>
                                  <h3 className="package-price seller-package">
                                    {currencySymbolFormat === 1 ? (
                                      <p>
                                        {onCurrencyFormat(pd.package_price)}
                                        {defaultCurrency}{" "}
                                      </p>
                                    ) : (
                                      <p>
                                        {defaultCurrency}
                                        {onCurrencyFormat(
                                          pd.package_price,
                                        )}{" "}
                                      </p>
                                    )}
                                  </h3>
                                  <p className="package-pp seller-package">
                                    Physical product:{pd.physical_product}
                                  </p>
                                  <p className="package-dp seller-package">
                                    Digital product:{pd.digital_product}
                                  </p>
                                  <p className="package-duration seller-package">
                                    Duration {pd.package_duration} days
                                  </p>
                                </div>
                                <div className="package-div pt-2">
                                  <Button
                                    onClick={() =>
                                      this.onBuyPackage(
                                        pd.package_index,
                                        pd.package_price,
                                      )
                                    }
                                  >
                                    Buy Package{" "}
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      );
                    })}
                  </Fragment>
                )}
              </Fragment>
            </Row>
          </Container>

          <OnlinePayment
            amount={this.state.packagePrice}
            packageId={this.state.packageId}
            modal={this.state.onlinePaymentModal}
            onModalHide={this.onlineModalHide}
          />

          <Modal
            size="xl | lg | sm"
            className="responsiveModal offlinePaymentModal"
            centered
            scrollable={true}
            show={this.state.offlinePaymentModal}
            onHide={this.onOfflineModalHide}
          >
            <Modal.Header>
              <h6>Offline Package purchase</h6>
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
                                  <div className="offline-wallet-recharge-div offlineWalletImgSection">
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
                                          <Fragment className="paymentDetailsText">
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

          <Modal
            key={2}
            size="md | sm"
            className="responsiveModal"
            scrollable={true}
            centered
            show={this.state.modal}
            onHide={this.onHandleClose}
          >
            <Modal.Header>
              <button
                onClick={this.onHandleClose}
                type="button"
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body className="pb-5">
              <div className="sellerPaymentTypeDiv">
                <Fragment>
                  {this.state.verificationStatusLoading ? (
                    <Fragment>{loader}</Fragment>
                  ) : (
                    <Fragment>
                      {this.state.sellerVerificationStatus.length > 0 ? (
                        <div className="text-center">
                          {this.state.sellerVerificationStatus.map((pd) => {
                            return (
                              <Fragment>
                                {pd.verification_status === 0 ? (
                                  <Fragment>
                                    <h3>Your shop status is pending now..</h3>
                                    <p>
                                      You can only purchase package when your
                                      shop is verified. Wait for that, or talk
                                      to your support
                                    </p>
                                    <Link
                                      className="btn mt-3"
                                      href="/support-ticket"
                                    >
                                      Create ticket
                                    </Link>
                                  </Fragment>
                                ) : pd.verification_status === 1 &&
                                  pd.shop_status === 0 ? (
                                  <Fragment>
                                    <div className="text-center">
                                      <p>
                                        {" "}
                                        Your shop status is currently inactive.
                                        To active your shop, Talk to our
                                        support.{" "}
                                      </p>
                                      <Link
                                        className="btn mt-3"
                                        href="/support-ticket"
                                      >
                                        Create ticket
                                      </Link>
                                    </div>
                                  </Fragment>
                                ) : pd.shop_status === 0 ? (
                                  <Fragment>
                                    <div className="text-center">
                                      <p>
                                        {" "}
                                        Your shop status is currently inactive.
                                        To active your shop, Talk to our
                                        support.{" "}
                                      </p>
                                      <Link
                                        className="btn mt-3"
                                        href="/support-ticket"
                                      >
                                        Create ticket
                                      </Link>
                                    </div>
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <h6>Choose payment type </h6>
                                    <Select
                                      options={paymentType}
                                      onChange={this.onPaymentType}
                                    />
                                  </Fragment>
                                )}
                              </Fragment>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center">
                          <h6 className="text-danger">
                            Sorry your shop is not verified
                          </h6>
                          <p className="text-muted">
                            You can not buy this package without verify your
                            shop.
                          </p>
                          <Link className="btn mt-3" to="/dashboard">
                            Verify now
                          </Link>
                        </div>
                      )}
                    </Fragment>
                  )}
                </Fragment>
              </div>
            </Modal.Body>
          </Modal>
        </section>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  onlinePayData,
  selectedMedia,
  showMediaFile,
  mediaLimit,
};

function mapStateToProps(state) {
  const dynamicData = state.mediaReducer;
  const defaultCurrency = state.starterReducer.defaultCurrency;
  const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
  const backendApi = state.starterReducer.backendApi;

  return {
    dynamicData,
    defaultCurrency,
    currencySymbolFormat,
    backendApi,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerPackagePart);
