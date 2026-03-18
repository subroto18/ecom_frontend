import React, {PureComponent, Fragment} from 'react';
import MobileTopBack from "../MobileCommon/MobileTopBack";
import ShippingBilling from "../../CommonScreen/CheckoutDetails/ShippingBilling";
import CheckoutProduct from "../../CommonScreen/CheckoutDetails/CheckoutProduct";
import OrderSummary from "../../CommonScreen/CheckoutDetails/OrderSummary";


class MobileCheckout extends PureComponent {
    componentDidMount() {
        window.scroll(0,0)
    }
    render() {
        return (
            <Fragment>
                <MobileTopBack title="Checkout"/>
                <div className="container p-0">
                    <div className="orderSummery mt-3">
                        <ShippingBilling mobileCheckout={true}/>
                    </div>
                    <div className="checkoutPackagesDetails">
                        <CheckoutProduct/>
                    </div>
                      <OrderSummary mobileCheckout={true} />
                </div>
            </Fragment>
        );
    }
}
export default MobileCheckout;