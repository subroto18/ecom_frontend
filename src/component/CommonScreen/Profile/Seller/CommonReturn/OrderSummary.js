import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../../../services/common";
class OrderSummary extends PureComponent {
    render() {
        let pd = this.props.data;
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        return (
            <Fragment>
                <div className="order-card modalOrderSummery">
                    <div>
                        <h4>Order Summery</h4>
                        <hr/>
                        <div className="d-flex justify-content-between">
                            <p className="cart-summery-subtitle text-muted">Subtotal</p>
                            <p className="cart-summery-subtitle-price">
                                {currencySymbolFormat===1?
                                    <span>{onCurrencyFormat(pd.sub_total)}{defaultCurrency}</span>
                                    :
                                    <span>{defaultCurrency}{onCurrencyFormat(pd.sub_total)}</span>
                                }
                            </p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="cart-summery-subtitle text-muted">Shipping fee</p>
                            <p className="cart-summery-subtitle-price">
                                {currencySymbolFormat===1?
                                    <span>  {onCurrencyFormat(pd.product_shipping)}{defaultCurrency}</span>
                                    :
                                    <span>{defaultCurrency}  {onCurrencyFormat(pd.product_shipping)}</span>
                                }
                            </p>
                        </div>
                        {pd.tax!==null &&
                            <Fragment>{pd.tax.map(vat=>{
                                return  <div className="d-flex justify-content-between">
                                    <p className="cart-summery-subtitle text-muted">{vat.name} ({vat.type})</p>
                                    <p className="cart-summery-subtitle-price"><span>{vat.price}%</span></p>
                                </div>
                            })}</Fragment>
                        }
                        {pd.coupon!==null &&
                            <Fragment>{
                                pd.coupon.map(voucher=>{
                                    return <div className="d-flex justify-content-between">
                                        <p className="cart-summery-subtitle text-muted">Voucher discount({voucher.voucher_discount_type})</p>
                                        <p className="cart-summery-subtitle-price"><span>{voucher.voucher_discount}%</span></p>
                                    </div>
                                })
                            }</Fragment>
                        }
                        <hr/>
                        <div className="d-flex justify-content-between ">
                            {pd.coupon!==null ?
                                <p className="oTotalLabel">Total<span className="text-muted">(without voucher apply)</span></p>:
                                <p className="oTotalLabel">Total</p>
                            }
                            <p className="oTotalValue">
                                {currencySymbolFormat===1?
                                    <span>{onCurrencyFormat(pd.total)}{defaultCurrency}</span>
                                    :
                                    <span>{defaultCurrency}{onCurrencyFormat(pd.total)}</span>
                                }
                            </p>
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

export default connect(mapStateToProps)(OrderSummary);