import React, { PureComponent, Fragment } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import Photo from "../Image/Photo";
import Link from "next/link";
import {addCartProduct, selectedCheckoutProduct} from "../../../services/actions/productAction";
import {getCartProductDetails, detailsDelCartProduct} from "../../../services/actions/cartAction";
import {addWishlistProduct} from "../../../services/actions/wishlishAction";
import {alert, onCurrencyFormat} from "../../../services/common";
import Router from "next/router";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

class CartPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            isCheck: false,
            isCheckId: [],
            isGoing: true,
            isCheckAll: true,
            checkClass: "CheckBoxIcon",
            checkClassOut: "CheckBoxOutlineBlankIcon",
            cartBtn:true,
            selectAll:false,
            selectSellerProduct:true,
            shopName:"",
            selectedProduct:[],
            selectedProduct1:[],
            shippingMethod:"",
            shippingFee:0,
        };
        this.onCheckSingleProduct = this.onCheckSingleProduct.bind(this);
        this.onCheckBtn = this.onCheckBtn.bind(this);
        this.onSelectAllSellerProduct = this.onSelectAllSellerProduct.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onCheckOut = this.onCheckOut.bind(this)
        this.onDeleteAll = this.onDeleteAll.bind(this)
    }
    componentDidMount() {
        window.scroll(0, 0);
        this.setState({
            isCheckAll: false,
        });
    }
    async onCheckBtn(e) {
        if (this.state.isCheckAll === false) {
            this.setState({
                isCheckAll: true,
            });
        } else {
            this.setState({
                isCheckAll: false,
            });
        }
    }
    async onCheckSingleProduct(e) {
        let value = this.state.isCheckId;
        if (e.target.checked == true) {
            value.push(e.target.value);
            this.setState({ isCheckId: value });
        } else {
            {
                var index = value.indexOf(e.target.value);
                if (index !== -1) {
                    value.splice(index, 1);
                    this.setState({ isCheckId: value });
                }
            }
        }
        if (this.state.isCheck === false) {
            this.setState({
                isCheck: true,
            });
        } else {
            this.setState({
                isCheck: false,
            });
        }
    }
    async onDecrease(product){
        let  data = {
            id:product.id,
            image:product.product_image,
            variation:product.variation,
            selectedVariation:product.selectedVariation,
            quantity:product.quantity-1,
            cartDetails:true
        }
        this.props.addCartProduct(data,{cartUpdate:true});
    }
    async  onIncrease(product){
            let  data = {
                id:product.id,
                image:product.product_image,
                variation:product.variation,
                selectedVariation:product.selectedVariation,
                quantity:product.quantity+1,
                cartDetails:true,
                cat_type:product.cat_type
            }
            this.props.addCartProduct(data,{cartUpdate:true});
    }


    async onDelete(product,i){

        if(window.confirm("Are you sure you want to delete this item?")){
            let data = {
                id:product.id,
                variation:product.selectedVariation
            }
            this.props.detailsDelCartProduct(data);
            this.setState({
                selectedProduct:[]
            })
        }
    }



    async onAddWishlist(product){
        this.props.addWishlistProduct(product.id);
    }


    async onSelectAll(e){
        let isCheckAll = this.state.isCheckAll;
        if(isCheckAll){
            this.setState({
                isCheckAll:false
            })
        }else{
            this.setState({
                isCheckAll:true
            })
        }
    }


    onDeleteAll(){

         if(window.confirm("Are you sure you want to clear the cart?")){
             Api().post('deleteCartProduct').then(res=>{
                 if(res.data==1){
                     this.props.getCartProductDetails({cartUpdate: true});
                 }
             })
         }


    }
    async onSelectAllSellerProduct(shop,shippingDays){
        let out_of_stock  = false;
        shop.cart_product.map(pd=>{
            if(pd.quantity>pd.stock){
                out_of_stock = true
            }
        })
        if(out_of_stock){
            alert('warning','The stock out for couple of products!');
        }else{
            let shopName = this.state.shopName;
            if(shopName!=""){
                if(shopName===shop.shop_name){
                    this.setState({
                        shopName:"",
                        selectedProduct:[]
                    })
                    this.props.selectedCheckoutProduct([],shop.shop_name);
                }else{
                    this.setState({
                        shopName:shop.shop_name
                    })
                    this.props.cartProductDetails.map(pd=>{
                        if(pd.shop_name===this.state.shopName){
                            pd.cart_product.map(p=>{
                                if(this.state[p.id + p.selectedVariation]===p.id+p.selectedVariation)
                                    this.setState({
                                        [p.id + p.selectedVariation]: ""
                                    })
                            })
                        }
                    })
                    let selectedProduct  = [];
                    let selectShop =  shop.shop_name;
                    this.props.cartProductDetails.map(pd=>{
                        if(pd.shop_name==selectShop){
                            pd.cart_product.map(p=>{
                                selectedProduct.push(p);
                            })
                        }
                    })
                    this.setState({
                        selectedProduct:selectedProduct
                    })
                    this.props.selectedCheckoutProduct(selectedProduct,shop.shop_name,shippingDays);
                }
            }else{
                this.setState({
                    shopName:shop.shop_name
                })
                this.props.cartProductDetails.map(pd=>{
                    pd.cart_product.map(p=>{
                        if(this.state[p.id + p.selectedVariation]==p.id+p.selectedVariation)
                            this.setState({
                                [p.id + p.selectedVariation]: ""
                            })
                    })
                })
                let selectedProduct  = [];
                let selectShop =  shop.shop_name;
                this.props.cartProductDetails.map(pd=>{
                    if(pd.shop_name===selectShop){
                        pd.cart_product.map(p=>{
                            selectedProduct.push(p);
                        })
                    }
                })
                this.setState({
                    selectedProduct:selectedProduct
                })
                this.props.selectedCheckoutProduct(selectedProduct,shop.shop_name,shippingDays);
            }
        }
    }
    async onSelectProduct(product,shop,shippingDays){
        if(product.quantity>product.stock){
            alert('warning','Product quantity is higher than product stock!');
        }else{
            if(this.state.shopName!==""){
                this.setState({
                    [product.id+product.selectedVariation]:product.id+product.selectedVariation,
                    selectedShop:shop.shop_name
                })
                this.props.cartProductDetails.map(pd=>{
                    pd.cart_product.map(p=>{
                        if(this.state[p.id + p.selectedVariation]===p.id+p.selectedVariation)
                            this.setState({
                                [p.id + p.selectedVariation]: ""
                            })
                    })
                    this.setState({
                        shopName:""
                    })
                })
                if(this.state.shopName!==shop.shop_name){
                    let selectedProduct =[]
                    selectedProduct.push(product);
                    this.setState({
                        selectedProduct:selectedProduct
                    })
                    this.props.selectedCheckoutProduct(selectedProduct,shop.shop_name,shippingDays);
                }
            }else{
                if(this.state[product.id+product.selectedVariation]===product.id+product.selectedVariation){
                    this.setState({
                        [product.id+product.selectedVariation]:"",
                        selectedShop:shop.shop_name
                    })
                    let selectedProduct = this.state.selectedProduct
                    selectedProduct.map((pd,i)=>{
                        if(pd.id===product.id && pd.selectedVariation===product.selectedVariation){
                            selectedProduct.splice(i,1);
                        }
                    })
                    this.setState({
                        selectedProduct:selectedProduct
                    })
                    this.props.selectedCheckoutProduct(selectedProduct,shop.shop_name,shippingDays);
                }else{
                    if(this.state.selectedShop!==undefined){
                        if(this.state.selectedShop!==shop.shop_name){
                            this.setState({
                                [product.id+product.selectedVariation]:product.id+product.selectedVariation,
                                selectedShop:shop.shop_name
                            })
                            this.props.cartProductDetails.map(pd=>{
                                pd.cart_product.map(p=>{
                                    if(this.state[p.id + p.selectedVariation]===p.id+p.selectedVariation)
                                        this.setState({
                                            [p.id + p.selectedVariation]: ""
                                        })
                                })
                            })
                            let selectedProduct = [];
                            selectedProduct.push(product);
                            this.setState({
                                selectedProduct:selectedProduct
                            })
                            this.props.selectedCheckoutProduct(selectedProduct,shop.shop_name,shippingDays);
                        }else{
                            this.setState({
                                [product.id+product.selectedVariation]:product.id+product.selectedVariation,
                                selectedShop:shop.shop_name
                            })
                            let selectedProduct = this.state.selectedProduct;
                            selectedProduct.push(product);
                            this.setState({
                                selectedProduct:selectedProduct
                            })
                            this.props.selectedCheckoutProduct(selectedProduct,shop.shop_name,shippingDays);
                        }
                    }else{
                        this.setState({
                            [product.id+product.selectedVariation]:product.id+product.selectedVariation,
                            selectedShop:shop.shop_name
                        })
                        let selectedProduct = this.state.selectedProduct;
                        selectedProduct.push(product);
                        this.setState({
                            selectedProduct:selectedProduct
                        })
                        this.props.selectedCheckoutProduct(selectedProduct,shop.shop_name,shippingDays);
                    }
                }
            }
        }
    }

    async  onCheckOut(){
        if(this.props.shippingName!==""){
            Router.push("/checkout")
            this.props.history.push('/checkout');
        }else{
            this.props.history.push('/delivery-information');
        }
    }



    render() {

        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        return (
            <Fragment>
                {this.props.cartProductDetails.length>0 &&
                   <Row className="mr-lg-2 mr-md-2">
                    <Col lg={12} sm={12} xs={12}  className="cart-select-all">

                        <div className="cartDiv d-flex justify-content-between ">
                            <div>
                                <FormControlLabel className="checkAll" control={
                                    <Checkbox
                                        onChange={this.onSelectAll.bind(this)}
                                        name="checkedB"
                                        color="primary"
                                        inputProps={{ "aria-label": "" }}
                                        checked={this.state.isCheckAll}
                                        type="checkbox"
                                    />
                                }
                                   label="Delete ALL"
                                />
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                {this.state.isCheckAll ?
                                    <Button onClick={this.onDeleteAll} className="cart-all-delete"><i className="fas fa-trash"></i> DELETE</Button>
                                 :
                                    <Button disabled  className="cart-all-delete"><i className="fas fa-trash"/> DELETE</Button>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col className="white-bg">
                        <Fragment>{
                            this.props.cartProductDetails.map((pd) => {
                                if(pd.cart_product.length>0){
                                    return  <Fragment>
                                        <Row className="cartDivRow">
                                            <Col lg={12} sm={12} xs={12}>
                                                <div className="d-flex justify-content-between cart-shop ">
                                                    <div>
                                                        <Fragment>
                                                            {this.state.isCheckAll ?
                                                                <FormControlLabel
                                                                    className="checkAll"
                                                                    control={
                                                                        <Checkbox
                                                                            name="checkedB"
                                                                            color="primary"
                                                                            inputProps={{"aria-label": ""}}
                                                                            type="checkbox"
                                                                            checked={true}
                                                                            value={true}
                                                                        />
                                                                    }
                                                                    label={pd.shop_name}
                                                                />
                                                                :
                                                                <FormControlLabel
                                                                    className="checkAll"
                                                                    control={
                                                                        <Checkbox
                                                                            onClick={()=>this.onSelectAllSellerProduct(pd,pd.shipping_days)}
                                                                            name="checkedB"
                                                                            color="primary"
                                                                            inputProps={{"aria-label": ""}}
                                                                            type="checkbox"
                                                                            checked={pd.shop_name==this.state.shopName}
                                                                        />
                                                                    }
                                                                    label={pd.shop_name}
                                                                />
                                                            }
                                                        </Fragment>
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <p className="es-d-t"><span>Estimate Time </span> <span>{pd.shipping_days} Days</span> </p>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </Col>
                                            {pd.cart_product.map((product,i)=>{
                                                return  <Fragment>
                                                    <Col lg={7} md={7} sm={7} xs={12} className="d-flex cart-product-details">
                                                        <div className="checkProduct">
                                                            {this.state.isCheckAll ?
                                                                <FormControlLabel className="checkAll" control={<Checkbox name="checkedB" color="primary" inputProps={{"aria-label": ""}} checked={this.state.isCheckAll} type="checkbox"/>}  label={pd.shop_name} />
                                                                :
                                                                <Fragment>
                                                                    {pd.shop_name===this.state.shopName  ?
                                                                        <FormControlLabel label="" className="checkAll" control={<Checkbox name="checkedB" color="primary" inputProps={{"aria-label": ""}} type="checkbox" checked={pd.shop_name==this.state.shopName}/>}/>
                                                                        :
                                                                        <FormControlLabel label="" className="checkAll" control={
                                                                            <Checkbox
                                                                                onChange={()=>this.onSelectProduct(product,pd,pd.shipping_days)}
                                                                                name="checkedB"
                                                                                color="primary"
                                                                                inputProps={{"aria-label": ""}}
                                                                                type="checkbox"
                                                                                checked={this.state[product.id+product.selectedVariation]===product.id+product.selectedVariation}
                                                                            />
                                                                        }
                                                                        />
                                                                    }
                                                                </Fragment>
                                                            }
                                                        </div>
                                                        <div>
                                                            <Link href={`/product/`+product.slug}>

                                                                <Photo
                                                                    src={`${this.props.backendApi}${product.product_image}`}
                                                                    blurDataURL="/blank.jpg"
                                                                    class="cart-img"
                                                                />

                                                            </Link>
                                                        </div>
                                                        <div className="checkoutProductDetail ms-2">
                                                            <Link href={`/product/`+product.slug}>
                                                               <span className="checkoutProductName">{product.productName}</span>
                                                            </Link>
                                                            <br />
                                                            <span className="checkoutProductVariation">
                                                               {product.variation!=null &&
                                                               <Fragment>{
                                                                   product.variation.map((pd,i)=>{
                                                                       return <Fragment className="text-left mb-1"><span className="variation">{(Object.keys(pd))[0]}: </span> <span className="variation">{(Object.values(pd))[0]}</span></Fragment>
                                                                   })
                                                               }
                                                               </Fragment>
                                                               }
                                                               <Fragment>
                                                                   {(product.stock===0  || product.quantity>product.stock)  &&
                                                                     <p className="text-danger">Out of stock</p>
                                                                   }
                                                               </Fragment>
                                                          </span>
                                                        </div>
                                                    </Col>
                                                    <Col lg={2} md={2} sm={2} xs={4} className="text-center cart-product-price-div">
                                                        <Fragment>
                                                            {product.discount ?
                                                              <Fragment>
                                                                  {currencySymbolFormat===1 ?
                                                                      <p className="cart-product-price">{onCurrencyFormat(product.discount_price*product.quantity)}{defaultCurrency}</p>
                                                                        :
                                                                      <p className="cart-product-price">{defaultCurrency}{onCurrencyFormat(product.discount_price*product.quantity)}</p>
                                                                  }
                                                              </Fragment>:
                                                                <Fragment>
                                                                    {currencySymbolFormat===1 ?
                                                                        <p className="cart-product-price"> {onCurrencyFormat(product.product_price*product.quantity)   }{defaultCurrency}</p>
                                                                          :
                                                                        <p className="cart-product-price">{defaultCurrency}{onCurrencyFormat(product.product_price*product.quantity)}</p>
                                                                    }
                                                                </Fragment>
                                                            }
                                                        </Fragment>
                                                        {this.state.isCheckAll || pd.shop_name===this.state.shopName  ?
                                                          <Fragment>
                                                              <i   className="far fa-heart cart-product-wishlist mr-2 disabled"/>
                                                              <i   className="far fa-trash-alt cart-product-trash disabled"/>
                                                          </Fragment> :
                                                            <Fragment>
                                                                {this.state[product.id + product.selectedVariation] === product.id + product.selectedVariation ?
                                                                    <Fragment>
                                                                        <i className="far fa-heart cart-product-wishlist mr-2 disabled"/>
                                                                        <i  className="far fa-trash-alt cart-product-trash disabled"/>
                                                                    </Fragment> :
                                                                    <Fragment>
                                                                        <i onClick={() => this.onAddWishlist(product)}
                                                                           className="far fa-heart cart-product-wishlist mr-2"/>
                                                                        <i onClick={() => this.onDelete(product, i)}
                                                                           className="far fa-trash-alt cart-product-trash"/>
                                                                    </Fragment>
                                                                }
                                                            </Fragment>
                                                        }
                                                    </Col>
                                                    <Col  lg={3} md={3} sm={3} xs={6} className="d-flex justify-content-center align-items-center pt-3 pb-3">
                                                        <Fragment>
                                                            {this.state.isCheckAll ?
                                                                <Fragment>
                                                                    <Button type="button" disabled  class="cart-value-button" id="decrease"  value="Decrease Value">-</Button>
                                                                    <span className="quantityCart">{product.quantity}</span>
                                                                    <Button type="button" disabled  class="cart-value-button">+</Button>
                                                                </Fragment>
                                                                :
                                                                <Fragment>

                                                                    {pd.shop_name===this.state.shopName ?
                                                                        <Fragment>
                                                                            <Button type="button" disabled  class="cart-value-button" id="decrease"  value="Decrease Value">-</Button>
                                                                            <span className="quantityCart">{product.quantity}</span>
                                                                            <Button type="button" disabled id="decrease"  class="cart-value-button">+</Button>
                                                                        </Fragment> :
                                                                        <Fragment>
                                                                            <Fragment>
                                                                                <Fragment>
                                                                                    {this.state[product.id+product.selectedVariation]===product.id+product.selectedVariation ?
                                                                                        <Fragment>
                                                                                            <Button type="button" disabled={true}  class="cart-value-button" id="decrease"  value="Decrease Value">-</Button>
                                                                                            <span className="quantityCart">{product.quantity}</span>
                                                                                            <Button type="button" id="decrease"  disabled={true}  class="cart-value-button">+</Button>
                                                                                        </Fragment>:
                                                                                        <Fragment>
                                                                                            {product.quantity===1 ?
                                                                                                <Button type="button" disabled  class="cart-value-button" id="decrease"  value="Decrease Value">-</Button>:
                                                                                                <Button type="button"  onClick={()=>this.onDecrease(product)} class="cart-value-button" id="decrease"  value="Decrease Value">-</Button>
                                                                                            }
                                                                                            <span className="quantityCart">{product.quantity}</span>
                                                                                            <Button type="button" id="decrease" onClick={()=>this.onIncrease(product)}  class="cart-value-button">+</Button>
                                                                                        </Fragment>
                                                                                    }
                                                                                </Fragment>
                                                                            </Fragment>
                                                                        </Fragment>
                                                                    }
                                                                </Fragment>
                                                            }
                                                        </Fragment>
                                                    </Col>
                                                </Fragment>
                                            })}
                                        </Row>
                                    </Fragment>
                                }
                            })
                        }
                        </Fragment>
                    </Col>
                </Row>
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    addCartProduct,
    selectedCheckoutProduct,
    getCartProductDetails,
    detailsDelCartProduct,
    addWishlistProduct
};

function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const isAuthorized = state.userReducer.isAuthorized;
    const backendApi = state.starterReducer.backendApi;
    const cartProductDetails = state.cartReducer.cartProductDetails;
    const shippingFee = state.shippingBillingPickupReducer.shippingFee;

    return {
        isAuthorized,
        backendApi,
        cartProductDetails,
        shippingFee,
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPart);


