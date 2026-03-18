import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../../../services/common";

class CommonOrderIdPart extends PureComponent {

    render() {
        let pd = this.props.data;
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        return (
            <Fragment>
                {this.props.type=="return" &&
                    <div className="order-card">
                        <h5 className="text-center">Request for {pd.request_for}</h5>
                    </div>
                }
                <div className="order-card">
                    <div className="d-flex justify-content-between">
                        <div className='modalOrderId'>
                            <p className="order-text"> <span className="mr-2">OrderId</span><span className="orderId">{pd.order_id}</span></p>
                            <p className="order-text"> <span >Placed on
                                <span className="ml-1">
                                      {this.props.type=="return"?
                                          <Fragment>
                                              {pd.return_date}
                                          </Fragment>:
                                          this.props.type=="refund" ?
                                              <Fragment>
                                                  {pd.refund_date}
                                              </Fragment>:
                                              <Fragment>
                                                  {pd.replace_date}
                                              </Fragment>
                                      }
                                </span>
                            </span></p>
                        </div>
                        <div>
                            <p className="order-text ModalOrderId">
                                <span className="mr-2">status</span>
                                {pd.status==="Cancelled" ?
                                    <span className="order-status-btn badge badge-danger">Cancelled</span> :
                                    pd.status==="Pending" ?
                                        <span className="order-status-btn badge badge-dark">Pending</span> :
                                        <span className="order-status-btn badge badge-success">Received</span>
                                }
                            </p>
                            <p className="order-text modalOrderId"> <span className="mr-2">Total</span><span className="order-total">
                                {
                                    currencySymbolFormat===1 ?
                                        <span>{onCurrencyFormat(pd.total)}{defaultCurrency}</span>:
                                        <span>{defaultCurrency}{onCurrencyFormat(pd.total)}</span>
                                }
                                </span></p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    return {
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps)(CommonOrderIdPart);