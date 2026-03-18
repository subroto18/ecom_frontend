
import { combineReducers } from "redux";
import starterReducer from "./starterReducer";
import userReducer from "./userReducer";
import commonReducer from "./commonReducer"
import compareReducer from "./compareReducer";
import wishlistReducer from "./wishlistReducer";
import cartReducer from "./cartReducer";
import filterReducer from "./filterReducer";
import productReducer from "./productReducer"
import dealReducer from "./dealReducer"
import bannerReducer from "./bannerReducer"
import categoryReducer from "./categoryReducer"
import brandReducer from "./brandReducer"
import sellerReducer from "./sellerReducer";
import featuredReducer from "./featuredReducer"
import trendingReducer from "./trendingReducer"
import topRatedReducer from "./topRatedReducer"
import flashdealReducer from "./flashdealReducer";
import checkoutReducer from "./checkoutReducer"
import shippingBillingPickupReducer from "./shippingBillingPickupReducer";
import voucherReducer from "./voucherReducer";
import confirmOrderReducer from "./confirmOrderReducer";
import walletReducer from "./walletReducer";
import notificationReducer from "./notificationReducer"
import mediaReducer from "./mediaReducer"
import onlinePaymentReducer from "./onlinePaymentReducer"
import sellerPackageReducer from "./sellerPackageReducer";
import stripeReducer from "./stripeReducer";
export default combineReducers({
    starterReducer,
    userReducer,
    commonReducer,
    compareReducer,
    wishlistReducer,
    cartReducer,
    filterReducer,
    productReducer,
    categoryReducer,
    dealReducer,
    brandReducer,
    bannerReducer,
    sellerReducer,
    featuredReducer,
    trendingReducer,
    topRatedReducer,
    flashdealReducer,
    checkoutReducer,
    shippingBillingPickupReducer,
    voucherReducer,
    confirmOrderReducer,
    walletReducer,
    notificationReducer,
    mediaReducer,
    onlinePaymentReducer,
    sellerPackageReducer,
    stripeReducer
})

