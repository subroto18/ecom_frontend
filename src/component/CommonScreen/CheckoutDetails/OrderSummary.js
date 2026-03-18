import React, {PureComponent, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import {connect} from "react-redux";

import {
    shippingModalShow,
    billingModalShow,
    pickUpModalShow,
} from "../../../services/actions/shippingBillingPickupAction";


import {changeVoucher, cancelVoucher, getVoucher} from "../../../services/actions/voucherAction"
import Router from "next/router";
import {onCurrencyFormat} from "../../../services/common";
import Link from "next/link";



class OrderSummary extends PureComponent {
    constructor() {
        super();
        this.onEditShipping = this.onEditShipping.bind(this)
        this.onEditBilling = this.onEditBilling.bind(this)
        this.onPickUpPoint = this.onPickUpPoint.bind(this)
        this.onVoucher   = this.onVoucher.bind(this);
        this.onChangeVoucher  = this.onChangeVoucher.bind(this)
        this.onVoucherSubmit = this.onVoucherSubmit.bind(this)
        this.onCheckOut = this.onCheckOut.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0)
    }
    onEditShipping(){
        this.props.shippingModelShow();
    }
    onEditBilling(){
        this.props.billingModalShow();
    }
    onPickUpPoint(){
        this.props.pickUpModalShow();
    }
    onVoucher(e){
        let data = {
            voucher:e.target.value
        }
        this.props.changeVoucher(data)
    }
    onChangeVoucher(){
        this.props.cancelVoucher();
    }


    onVoucherSubmit(){
        let voucher = this.props.voucher;
        let productId = [];
        let product  = this.props.checkoutProduct;
        let totalPrice = 0;
        let shopName = "";
        if(product.length>0){
            product.map(pd=>{
                if (productId.indexOf(pd.id)===-1){
                    productId.push({
                        'id':pd.id,
                        'price': ((pd.final_price) * (pd.quantity)),
                    });
                }
                totalPrice = totalPrice + ((pd.final_price) * (pd.quantity));
                shopName = pd.shop_name
            })
        }
        const  data = {
            voucher : voucher,
            productId :productId,
            totalPrice:totalPrice,
            shopName:shopName
        }
        this.props.getVoucher(data);
    }
      onCheckOut(){
        if(this.props.shippingName!==""){
            Router.push("/checkout")
        }else{
            Router.push(`/delivery-information`, { from: 'product-page' })
        }
    }

    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        let shippingfee = 0;
        let shippingDays = 0;
        let subtotalPrice = 0;
        let discount = 0;
        let selectedProduct = this.props.checkoutProduct;

        console.log(selectedProduct,'selectedProduct');

        let total = 0;
        let tax = [];

        selectedProduct.map(pd=>{
            if(pd.shipping_days>shippingDays){
                shippingDays = pd.shipping_days;
            }
            if(pd.discount_price!=undefined){
                subtotalPrice = subtotalPrice + (pd.discount_price * pd.quantity)
            }else{
                subtotalPrice = subtotalPrice + (pd.product_price * pd.quantity)
            }

            if(pd.discount!==undefined){
                discount = discount + pd.discount;
            }
            total = total+ (pd.final_price * pd.quantity);
            let vat = pd.tax;
            if(vat!==null){
                vat.map(v=>{
                    tax.push({
                        'name':v.name,
                        'tax':v.price,
                        'type':v.type
                    });
                })
            }


            if(this.props.shippingMethod!==""){
                if(this.props.shippingMethod!=="product_wise"){
                    shippingfee = this.props.shippingFee
                }else{
                    shippingfee = shippingfee + parseFloat(pd.shipping_fees)
                }
            }
        });

        return (
            <Fragment>
                {this.props.mobilePayment!=true &&
                  <div className="mobileCheckoutPriceDetails OrderSummaryPart">
                    <div className="cart-summery order-summery">
                        <h4>Order Summery</h4>
                        <div className="d-flex justify-content-between ">
                            <p className="cart-summery-subtitle text-muted">
                                Subtotal ({this.props.checkoutProduct.length} item(s))
                            </p>
                            {subtotalPrice!==0 ?
                                <Fragment>
                                    {currencySymbolFormat===1 ?
                                        <p className="cart-summery-subtitle-price">{onCurrencyFormat(subtotalPrice)}{defaultCurrency}</p>:
                                        <p className="cart-summery-subtitle-price">{defaultCurrency}{onCurrencyFormat(subtotalPrice)}</p>
                                    }
                                </Fragment>
                                :
                                <Fragment>
                                    {currencySymbolFormat===1 ?
                                        <p className="cart-summery-subtitle-price">{onCurrencyFormat(0)}{defaultCurrency}</p>
                                           :
                                        <p className="cart-summery-subtitle-price">{defaultCurrency}{onCurrencyFormat(0)}</p>
                                    }
                                </Fragment>
                            }
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="cart-summery-subtitle text-muted">Shipping Fee</p>
                            <p className="cart-summery-subtitle-price">
                                <Fragment>
                                    {this.props.checkoutProduct.length>0 ?
                                        <Fragment>
                                            {Array.isArray(this.props.pickupPointData) ===false ?
                                                <Fragment>
                                                    {currencySymbolFormat===1 ?
                                                        <span>{onCurrencyFormat(0)}{defaultCurrency}</span>:
                                                        <span>{defaultCurrency}{onCurrencyFormat(0)}</span>
                                                    }
                                                </Fragment>
                                                  :
                                                 <Fragment>
                                                     {currencySymbolFormat===1 ?
                                                         <span>{onCurrencyFormat(shippingfee)}{defaultCurrency}</span>
                                                         :
                                                         <span>{defaultCurrency}{onCurrencyFormat(shippingfee)}</span>
                                                     }
                                                 </Fragment>
                                            }
                                        </Fragment>:
                                            <Fragment>
                                                {currencySymbolFormat===1 ?
                                                    <span>{onCurrencyFormat(0)}{defaultCurrency}</span>:
                                                    <span>{defaultCurrency}{onCurrencyFormat(0)}</span>
                                                }
                                            </Fragment>
                                    }
                                </Fragment>
                            </p>
                        </div>

                        {tax.length>0 &&
                            <Fragment>
                                {tax.map(tx=>{
                                    return  <div className="orderTax">
                                        <span className="oTaxLabel checkoutGreyLabel">{tx.name}({tx.type})</span>
                                        <span className="oTaxValue">{tx.tax}%</span>
                                    </div>
                                })}
                            </Fragment>
                        }

                        {selectedProduct.length>0 &&
                           <Fragment>
                               {this.props.matchVoucher &&
                                   <div className="orderDiscount">
                           <span className="oDiscountLabel checkoutGreyLabel">
                                Coupon Discount({this.props.voucherDiscountType})
                             </span>
                                       <span className="oDiscountValue">{this.props.totalCouponDiscount}%</span>
                                   </div>
                               }
                           </Fragment>
                        }
                          {selectedProduct.length>0 ?
                              <Fragment>
                                  {this.props.matchVoucher ?
                                      <div className="voucherDiv">
                                          <InputGroup>
                                              <FormControl
                                                  readOnly={true}
                                                  className="checkoutVoucherInput"
                                                  placeholder="Enter Voucher"
                                                  value={this.props.voucher}
                                              />
                                              <InputGroup.Append>
                                                  <Button
                                                      className="voucherBtn"
                                                      variant="outline-secondary"
                                                      onClick={this.onChangeVoucher}
                                                  >
                                                      Change Voucher
                                                  </Button>
                                              </InputGroup.Append>
                                          </InputGroup>
                                          {this.props.invalidVoucher &&
                                              <p className="text-danger mt-2">Invalid voucher code</p>
                                          }
                                      </div>
                                      :
                                      <div className="voucherDiv">
                                          <InputGroup>
                                              <FormControl
                                                  className="checkoutVoucherInput"
                                                  placeholder="Enter Voucher"
                                                  aria-label="Enter Voucher"
                                                  aria-describedby="basic-addon2"
                                                  value={this.props.voucher}
                                                  onChange={(e)=>this.onVoucher(e)}
                                              />
                                              <InputGroup.Append>
                                                  {this.props.voucher!=="" ?
                                                      <Button
                                                          className="voucherBtn"
                                                          variant="outline-secondary"
                                                          onClick={this.onVoucherSubmit}
                                                      >
                                                          Apply
                                                      </Button>:
                                                      <Button
                                                          className="voucherBtn"
                                                          variant="outline-secondary"
                                                          disabled={true}
                                                      >
                                                          Apply
                                                      </Button>
                                                  }
                                              </InputGroup.Append>
                                          </InputGroup>
                                          <div>
                                              {this.props.voucher!=="" &&
                                                  <Fragment>
                                                      {this.props.invalidVoucher &&
                                                          <p className="text-danger mt-2">Invalid voucher code</p>
                                                      }
                                                  </Fragment>
                                              }
                                          </div>
                                      </div>
                                  }
                              </Fragment>
                                :
                              <div className="voucherDiv">
                                  <InputGroup>
                                      <FormControl
                                          className="checkoutVoucherInput"
                                          placeholder="Enter Voucher"
                                          aria-label="Enter Voucher"
                                          aria-describedby="basic-addon2"
                                          disabled={true}
                                      />
                                      <InputGroup.Append>
                                          <Button
                                              className="voucherBtn"
                                              variant="outline-secondary"
                                              disabled={true}
                                          >
                                              Apply
                                          </Button>
                                      </InputGroup.Append>
                                  </InputGroup>
                                  <div>
                                      {this.props.voucher!=="" &&
                                          <Fragment>
                                              {this.props.invalidVoucher &&
                                                  <p className="text-danger mt-2">Invalid voucher code</p>
                                              }
                                          </Fragment>
                                      }
                                  </div>
                              </div>
                          }
                        <div className="orderTotal">
                            <span className="oTotalLabel">Total</span>
                                 {selectedProduct.length > 0 ?
                                       <Fragment>
                                           {Array.isArray(this.props.pickupPointData) === false ?
                                               <Fragment>
                                                   {currencySymbolFormat===1 ?
                                                       <span className="oTotalValue">{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span>:
                                                       <span className="oTotalValue">{defaultCurrency}{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}</span>
                                                   }
                                               </Fragment>
                                              :
                                               <Fragment>
                                                   {currencySymbolFormat===1 ?
                                                       <span className="oTotalValue">{onCurrencyFormat(total+shippingfee-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span> :
                                                       <Fragment>
                                                           <span className="oTotalValue">{defaultCurrency}{onCurrencyFormat((total+shippingfee)-this.props.totalCouponDiscountPrice)}</span>
                                                       </Fragment>
                                                   }
                                               </Fragment>
                                           }
                                       </Fragment>
                                        :
                                       <Fragment>
                                          {currencySymbolFormat===1 ?
                                              <span className="oTotalValue">{onCurrencyFormat(0)}{defaultCurrency}</span> :
                                              <span className="oTotalValue">{defaultCurrency}{onCurrencyFormat(0)}</span>
                                          }
                                      </Fragment>
                                 }
                        </div>
                    </div>
                </div>
                }

                {this.props.mobileCheckout &&
                  <div className="mobileCheckoutBottomBar">
                    <div className="checkoutBottomLeft">
                        <div className="mobileOrderTotal">
                            <span className="oTotalLabel">Total</span>
                            {Array.isArray(this.props.pickupPointData) === false ?
                                <Fragment>
                                    {currencySymbolFormat===1 ?
                                        <span className="oTotalValue">{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span>
                                         :
                                        <span className="oTotalValue">{defaultCurrency}{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}</span>
                                    }
                                </Fragment> :
                                <Fragment>
                                    {currencySymbolFormat===1 ?
                                        <span className="oTotalValue">{onCurrencyFormat((total+shippingfee)-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span>
                                        :
                                        <span className="oTotalValue">{defaultCurrency}{onCurrencyFormat((total+shippingfee) - this.props.totalCouponDiscountPrice)}</span>
                                    }
                                </Fragment>
                            }
                        </div>
                    </div>
                    <div className="checkoutBottomRight">
                        <Link href="/payment" className="oCheckoutBtn btn">Next</Link>
                    </div>
                </div>
                }
                
                
                {this.props.cart &&
                    <Fragment>
                        {selectedProduct.length>0 ?
                            <Button   onClick={this.onCheckOut}  className="oCheckoutBtn btn w-100">Checkout</Button> :
                            <Button    className="oCheckoutBtn btn disabled w-100">Checkout</Button>
                        }
                    </Fragment>
                }
                
                
                {this.props.mobilePayment &&
                   <div className="mobilePaymentBottomBar">
                    <div>
                        <div className="mPSubTotalDiv">
                            <span className="mPSubtotal mr-2">Subtotal :</span>
                            <Fragment>
                                {currencySymbolFormat===1 ?
                                    <span className="mPSubtotalAmount">{onCurrencyFormat(subtotalPrice)}{defaultCurrency}</span>
                                      :
                                    <span className="mPSubtotalAmount">{defaultCurrency}{onCurrencyFormat(subtotalPrice)}</span>
                                }
                            </Fragment>
                        </div>
                        <div className="mPTotalDiv">
                            <span className="mPTotal mr-2">Total :</span>
                            {Array.isArray(this.props.pickupPointData) === false ?
                                <Fragment>
                                    {currencySymbolFormat===1 ?
                                        <span className="mPTotalAmount">{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span>
                                         :
                                        <span className="mPTotalAmount">{defaultCurrency}{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}</span>
                                    }
                                </Fragment>
                                :
                                <Fragment>
                                    {currencySymbolFormat===1 ?
                                        <span className="mPTotalAmount">{onCurrencyFormat(total+shippingfee-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span>
                                        :
                                        <span className="mPTotalAmount">{defaultCurrency}{onCurrencyFormat(total+shippingfee-this.props.totalCouponDiscountPrice)}</span>
                                    }
                                </Fragment>
                            }
                        </div>
                    </div>
                       {this.props.confirm ?
                           <Button onClick={this.props.confirm} className="mobilePayOptConfirm">Confirm</Button>:
                           <Button className="mobilePayOptConfirm disabled">Confirm</Button>
                       }
                </div>
                }
                {this.props.mobileCart &&
                   <div className="mobileCheckoutBottomBar">
                    <div className="checkoutBottomLeft">
                        <div className="mobileOrderTotal">
                            <span className="oTotalLabel">Total</span>
                            {Array.isArray(this.props.pickupPointData) === false ?
                                <Fragment>
                                    {currencySymbolFormat===1?
                                        <span className="oTotalValue">{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span>
                                          :
                                        <span className="oTotalValue">{defaultCurrency}{onCurrencyFormat(total-this.props.totalCouponDiscountPrice)}</span>
                                    }
                                </Fragment>
                                :
                                <Fragment>
                                    {currencySymbolFormat===1 ?
                                        <span className="oTotalValue">{onCurrencyFormat(total+shippingfee-this.props.totalCouponDiscountPrice)}{defaultCurrency}</span>
                                           :
                                        <span className="oTotalValue">{defaultCurrency}{onCurrencyFormat(total+shippingfee-this.props.totalCouponDiscountPrice)}</span>
                                    }
                                </Fragment>
                            }
                        </div>
                    </div>
                    <div className="checkoutBottomRight">
                        {selectedProduct.length>0 ?
                            <Button  onClick={this.onCheckOut}  className="oCheckoutBtn btn">Checkout</Button> :
                            <Button  className="oCheckoutBtn btn disabled">Checkout</Button>
                        }
                    </div>
                </div>
                }
            </Fragment>
        );
    }
}




const mapDispatchToProps = {
    shippingModalShow,
    billingModalShow,
    pickUpModalShow,
    changeVoucher,
    cancelVoucher,
    getVoucher
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const voucher = state.voucherReducer.voucher;
    const checkoutProduct = state.productReducer.checkoutProduct;
    const shippingName = state.shippingBillingPickupReducer.shippingName;
    const shippingMethod = state.shippingBillingPickupReducer.shippingMethod;
    const shippingFee = state.userReducer.shippingFee;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const pickupPointData = state.shippingBillingPickupReducer.pickupPointData;

    const matchVoucher = state.voucherReducer.matchVoucher;
    const voucherDiscountType = state.voucherReducer.voucherDiscountType;
    const totalCouponDiscount = state.voucherReducer.totalCouponDiscount;
    const invalidVoucher = state.voucherReducer.invalidVoucher;
    const totalCouponDiscountPrice = state.voucherReducer.totalCouponDiscountPrice;

    return {
        isAuthorized,
        voucher,
        shippingName,
        checkoutProduct,
        shippingMethod,
        shippingFee,
        defaultCurrency,
        currencySymbolFormat,
        pickupPointData,
        matchVoucher,
        voucherDiscountType,
        totalCouponDiscount,
        invalidVoucher,
        totalCouponDiscountPrice
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);



