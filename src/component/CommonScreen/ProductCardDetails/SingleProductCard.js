import React, {Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import ReactImageZoom from "react-image-zoom";
import dynamic from "next/dynamic"
import {connect} from "react-redux";
import {
    addCartProduct,
    getCheckoutProduct,
    deSelectProduct,
    updateProductState,
    selectedCheckoutProduct
} from "../../../services/actions/productAction";
import {popupLoginOpen} from "../../../services/actions/commonAction"
import Router from "next/router";
import {addCompareProduct} from "../../../services/actions/compareAction";
import {addWishlistProduct} from "../../../services/actions/wishlishAction";
import Photo from "../Image/Photo";
import Link from "next/link";
import {onCurrencyFormat,alert} from "../../../services/common";

const Reviews = dynamic(() => import("../Reviews/Reviews"));
class SingleProductCard extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true,
            imageSrc:'',
            quantity: 1,
            model: false,
            variation: [],
            selectedVariation: "",
            variationPrice:null,
            variationDiscountPrice:null,
            variationStock:'',
            variationImage:"",
            cartBtn:false,
            notAvailable:false,
            pageLoad:false,
            modal:false
        }
        this.onCheckout  = this.onCheckout.bind(this)
        this.onSelectedVariation = this.onSelectedVariation.bind(this)

    }
    componentDidMount() {
        if(this.props.cartVariation!==true){
            this.props.deSelectProduct();
        }
        this.props.selectedCheckoutProduct([],"");
    }
    onChangeBigImage(e) {
        let imgSrc = document.getElementById(e.target.id).src;
        let baseUrl = this.props.backendApi;
        let Url = imgSrc;
        Url = Url.replace(baseUrl, "");
        this.setState({
            imageSrc: Url
        })
        let header = document.getElementById("smallImgDiv");
        var targetedId = document.getElementById(e.target.id).closest('.smallImg');
        var current = header.querySelector('.selectedSmallImg')
        if (current!=null) {
             current.classList.remove("selectedSmallImg");
        }
        targetedId.className += " selectedSmallImg";
    }

    onSelect(variation, attribute, variations_attr, variations_attr_mix,e,index) {
        if(this.props.isAuthorized) {
            this.setState({
                [variation]: attribute
            })
            let variationAttrName = [];
            variations_attr.map(pd => {
                variationAttrName.push(pd.variation);
            })
            let selectedVariation = "";
            let match = false
            if (variations_attr.length === 1) {
                selectedVariation = selectedVariation + "_" + "_" + attribute
                let selected = this.getUnique(selectedVariation.split("_"));
                selected = selected.filter(entry => entry.trim() !== '');
                variations_attr_mix.map(variation_mix_pd => {
                    let string = variation_mix_pd.variation.split("_");
                    if (this.arrayCompare(string, selected)) {
                        let variationNameAttr = []  
                        variationAttrName.map((vn, i) => {
                            variationNameAttr.push({
                                [vn]: string[i]
                            });
                        })
                        if (variation_mix_pd.image !== null) {
                            let stateChange = {
                                selectedProductId: index,
                                selectedVariationMix: variationNameAttr,
                                selectedVariation: selectedVariation.substring(1),
                                variationPrice: variation_mix_pd.price,
                                variationDiscountPrice: variation_mix_pd.discount,
                                variationStock: variation_mix_pd.stock,
                                imageSrc: variation_mix_pd.image,
                                variationSku: variation_mix_pd.sku,
                                cartBtn: true
                            }
                            this.setState({
                                imageSrc: variation_mix_pd.image
                            })

                            this.props.updateProductState(stateChange);

                            let smImg = document.getElementsByClassName("smImgSrc")
                            for (let i = 0; i < smImg.length; i++) {
                                if (smImg[i].src == variation_mix_pd.image) {
                                    let header = document.getElementById("smallImgDiv");
                                    var targetedId = smImg[i].closest('.smallImg');
                                    var current = header.querySelector('.selectedSmallImg')
                                    if (current != null) {
                                        current = current.classList.remove("selectedSmallImg");
                                    }
                                    targetedId.className += " selectedSmallImg";
                                }
                            }
                        } else {
                            let stateChange = {
                                selectedProductId: index,
                                selectedVariationMix: variationNameAttr,
                                selectedVariation: selectedVariation.substring(1),
                                variationPrice: variation_mix_pd.price,
                                variationDiscountPrice: variation_mix_pd.discount,
                                variationStock: variation_mix_pd.stock,
                                variationImage: variation_mix_pd.image,
                                variationSku: variation_mix_pd.sku,
                                cartBtn: true
                            }
                            this.setState({
                                imageSrc: ""
                            })
                            this.props.updateProductState(stateChange);
                        }
                        if (this.props.quantity > variation_mix_pd.stock) {
                            let stateChange = {
                                quantity: variation_mix_pd.stock
                            }
                            this.props.updateProductState(stateChange);
                        } else if (this.props.quantity > this.props.data[0].stock) {
                            let stateChange = {
                                quantity: this.props.data[0].stock
                            }
                            this.props.updateProductState(stateChange);
                        }
                    }
                })
            } else {
                variations_attr.map((pd) => {
                    if (pd.variation !== variation) {
                        if (this.state[pd.variation] !== undefined) {
                            selectedVariation = selectedVariation + "_" + this.state[pd.variation] + "_" + attribute
                            let selected = this.getUnique(selectedVariation.split("_"));
                            selected = selected.filter(entry => entry.trim() !== '');
                            variations_attr_mix.map(variation_mix_pd => {
                                let string = variation_mix_pd.variation.split("_");
                                if (this.arrayCompare(string, selected)) {
                                    let variationNameAttr = []  
                                    variationAttrName.map((vn, i) => {
                                        variationNameAttr.push({
                                            [vn]: string[i]
                                        });
                                    })
                                    if (variation_mix_pd.image !== null) {
                                        let stateChange = {
                                            selectedProductId: index,
                                            selectedVariationMix: variationNameAttr,
                                            selectedVariation: selectedVariation.substring(1),
                                            variationPrice: variation_mix_pd.price,
                                            variationDiscountPrice: variation_mix_pd.discount,
                                            variationStock: variation_mix_pd.stock,
                                            imageSrc: variation_mix_pd.image,
                                            variationSku: variation_mix_pd.sku,
                                            cartBtn: true,
                                            notAvailable: false
                                        }
                                        this.setState({
                                            imageSrc: variation_mix_pd.image
                                        })
                                        this.props.updateProductState(stateChange);
                                    } else {
                                        let stateChange = {
                                            selectedProductId: index,
                                            selectedVariationMix: variationNameAttr,
                                            selectedVariation:selectedVariation.substring(1),
                                            variationPrice: variation_mix_pd.price,
                                            variationDiscountPrice: variation_mix_pd.discount,
                                            variationStock: variation_mix_pd.stock,
                                            variationImage: variation_mix_pd.image,
                                            variationSku: variation_mix_pd.sku,
                                            cartBtn: true,
                                            notAvailable: false
                                        }
                                        this.setState({
                                            imageSrc: ""
                                        })
                                        this.props.updateProductState(stateChange);
                                    }
                                    if (this.props.quantity > variation_mix_pd.stock) {
                                        let stateChange = {
                                            quantity: variation_mix_pd.stock
                                        }
                                        this.props.onUpdateProductState(stateChange);
                                    } else if (this.props.quantity > this.props.data[0].stock) {
                                        let stateChange = {
                                            quantity: this.props.data[0].stock
                                        }
                                        this.props.updateProductState(stateChange);
                                    }
                                    match = true
                                }
                                if (string.length === selected.length && match === false) {
                                    let statechange = {
                                        cartBtn: false,
                                        notAvailable: true
                                    }
                                    this.props.updateProductState(statechange);
                                }
                            })
                        }
                    }
                })
            }
            let btnId = e.target.id;
            let header = document.getElementById(variation);
            let targetedId = document.getElementById(btnId);
            let current = header.getElementsByClassName("newClassOnClick");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" newClassOnClick", " ");
            }
            targetedId.className += " newClassOnClick";
        }
    }

    arrayCompare(_arr1, _arr2) {
        if (
            !Array.isArray(_arr1)
            || !Array.isArray(_arr2)
            || _arr1.length !== _arr2.length
        ) {
            return false;
        }
        const arr1 = _arr1.concat().sort();
        const arr2 = _arr2.concat().sort();
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    getUnique(array){
        var uniqueArray = [];
        for(let i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }


    checkArray(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };


    onDecreaseQuantity(e){
        let currentQuantity = this.props.quantity
        if(currentQuantity===1){
            let changeState = {
                quantity: 1
            }
            this.props.updateProductState(changeState);
        }
        else{
            let decrease = currentQuantity-1
            let changeState = {
                quantity: decrease
            }
            this.props.updateProductState(changeState);
        }
    }



    onIncreaseQuantity(e){
        let currentQuantity = Number(this.props.quantity) ;
        if(this.props.variationStock!==""){
            if(currentQuantity+1>this.props.variationStock){
                let changeState = {
                    quantity: this.props.variationStock
                }
                this.props.updateProductState(changeState);
            }else{
                let increase = currentQuantity+1;
                let changeState = {
                    quantity: increase
                }
                this.props.updateProductState(changeState);
            }
        }else{
            if(currentQuantity+1>this.props.data[0].stock){
                let changeState = {
                    quantity: this.props.data[0].stock
                }
                this.props.updateProductState(changeState);
            }else{
                let changeState = {
                    quantity: currentQuantity+1
                }
                this.props.updateProductState(changeState);
            }
        }
    }


    onAddToCart(){
        if(this.props.isAuthorized!==true){
             this.props.popupLoginOpen();
        }else{
            let data = this.props.data[0];
            let image = this.state.imageSrc!==""?this.state.imageSrc:this.props.variationImage
            if(image){
                image = image.replace(/^.*\/\/[^\/]+/, '')
            }else{
                image = data.product_image
            }

            if(this.props.selectedVariation!==""){
                if(this.props.selectedProductId===data.index){
                    const productInfo = {
                        'id':data.index,
                        'discount':data.off,
                        'discount_type':data.discount_type,
                        'sku':data.sku,
                        'image':image,
                        'quantity':this.props.quantity,
                        'variation':this.props.selectedVariationMix,
                        'selectedVariation':this.props.selectedVariation,
                        'product_price':this.props.variationPrice,
                        'discount_price':this.props.variationDiscountPrice,
                        'product_name':data.product_name,
                        'cash_on_delivery':data.cash_on_delivery,
                        'cat_type':data.cat_type
                    }
                    this.props.addCartProduct(productInfo);


                }else{
                    const productInfo = {
                        'id':data.index,
                        'product_price':data.product_price,
                        'discount_price':data.discount_price,
                        'discount':data.off,
                        'image':image,
                        'variation':this.props.selectedVariationMix,
                        'selectedVariation':this.props.selectedVariation,
                        'discount_type':data.discount_type,
                        'sku':data.sku,
                        'quantity':this.props.quantity,
                        'product_name':data.product_name,
                        'cash_on_delivery':data.cash_on_delivery,
                        'cat_type':data.cat_type
                    }
                    this.props.addCartProduct(productInfo);
                }
            }else{
                const productInfo = {
                    'id':data.index,
                    'product_price':data.product_price,
                    'discount_price':data.discount_price,
                    'discount':data.off,
                    'image':image,
                    'variation':this.props.selectedVariationMix,
                    'selectedVariation':this.props.selectedVariation,
                    'discount_type':data.discount_type,
                    'sku':data.sku,
                    'quantity':this.props.quantity,
                    'product_name':data.product_name,
                    'cash_on_delivery':data.cash_on_delivery,
                    'cat_type':data.cat_type
                }
                this.props.addCartProduct(productInfo);
            }
        }
    }


    onCheckout(){

        let data = this.props.data[0];
        let image = this.state.imageSrc!==""?this.state.imageSrc:this.props.variationImage
        if(image){
            image = image
        }else{
            image = data.product_image
        }

        if(this.props.selectedVariation!==""){
            if(this.props.selectedProductId===data.index){
                const productInfo = {
                    'id':data.index,
                    'discount':data.off,
                    'discount_type':data.discount_type,
                    'sku':data.sku,
                    'image':image,
                    'quantity':this.props.quantity,
                    'variation':this.props.selectedVariationMix,
                    'selectedVariation':this.props.selectedVariation,
                    'product_price':this.props.variationPrice,
                    'discount_price':this.props.variationDiscountPrice,
                    'product_name':data.product_name,
                    'cash_on_delivery':data.cash_on_delivery
                }
                this.props.getCheckoutProduct(productInfo);
            }else{
                const productInfo = {
                    'id':data.index,
                    'product_price':data.product_price,
                    'discount_price':data.discount_price,
                    'discount':data.off,
                    'image':image,
                    'variation':data.variation,
                    'selectedVariation':data.selectedVariation,
                    'discount_type':data.discount_type,
                    'sku':data.sku,
                    'quantity':this.props.quantity,
                    'product_name':data.product_name,
                    'cash_on_delivery':data.cash_on_delivery
                }
                this.props.getCheckoutProduct(productInfo);
            }
        }else{
            const productInfo = {
                'id':data.index,
                'product_price':data.product_price,
                'discount_price':data.discount_price,
                'discount':data.off,
                'image':image,
                'variation':data.variation,
                'selectedVariation':data.selectedVariation,
                'discount_type':data.discount_type,
                'sku':data.sku,
                'quantity':this.props.quantity,
                'product_name':data.product_name,
                'cash_on_delivery':data.cash_on_delivery
            }
            this.props.getCheckoutProduct(productInfo);
        }
        if(this.props.isAuthorized!==true){
            this.props.popupLoginOpen();
        }else{
              if(this.props.shippingName){
                 Router.push("/checkout");
                }else{
                  Router.push({
                      pathname: '/delivery-information',
                      query: { address: true }
                  })

                }
        }
    }
    onTopUp =  () => {
        window.scroll(0,0)
    }
    onCompare(index){
        this.props.addCompareProduct(index);
    }

    onWishList(index){
        if(this.props.isAuthorized){
            this.props.addWishlistProduct(index);
        }else{
           this.props.popupLoginOpen();
        }
    }



    onSelectedVariation(fun){

        if(this.props.isAuthorized!==true){
            this.props.popupLoginOpen();
        }else{
            if(this.props.notAvailable){
                alert('info','The variation is not available!')
            }else{
                if(this.props.selectedVariation!==""){
                   if(fun==="checkout"){
                       this.onCheckout()
                   }else if(fun==="cart"){
                       this.onAddToCart();
                   }
                }else{
                    alert('warning','Please select the variation first!')
                }

            }
        }
    }


    onStockOut(){
        alert('info','The product is out of stock!')
    }




    render() {

        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        var loadImg = "";
        let allPhotos = [];
        let discountPrice = [];
        let regularPrice = [];
        if(this.props.loading===false){
            if(this.props.data[0].gallery.length>0){
                loadImg = this.props.data[0].gallery[0]
            }else{
                this.props.data[0].variation_mix.map(pd=>{
                    if(pd.image!==""){
                        loadImg = pd.image;
                    }
                })
            }
            if(this.props.data[0].gallery.length>0){
                this.props.data[0].gallery.map(gallery=>{
                    if(allPhotos.indexOf(gallery) === -1) {
                        allPhotos.push(gallery);
                    }
                })
            }
            if(this.props.data[0].variation!==null){
                this.props.data[0].variation_mix.map(pd=>{
                    if(pd.image!==""){
                        if(allPhotos.indexOf(pd.image) === -1) {
                            allPhotos.push(pd.image);
                        }
                    }
                    if(pd.price>pd.discount){
                        discountPrice.push(pd.discount);
                        regularPrice.push(pd.price);
                    }else{
                        regularPrice.push(pd.price);
                    }
                })
            }
        }
        discountPrice =  discountPrice.filter((e, i) => i===0 || i===discountPrice.length-1)
        discountPrice = discountPrice.sort();
        regularPrice =  regularPrice.filter((e, i) => i===0 || i===regularPrice.length-1)
        regularPrice = regularPrice.sort();
        if(regularPrice.length===1){
            regularPrice = [...regularPrice,regularPrice[0]]
        }
        if(discountPrice.length===1){
            discountPrice = [...discountPrice,discountPrice[0]]
        }
        const props = {
            width: 400,
            height: 300,
            zoomPosition: "original",
            img:this.state.imageSrc!==""?this.props.backendApi+this.state.imageSrc: this.props.backendApi+loadImg
        };

        return (
                <Fragment>
                    <Fragment>
                        {this.props.data.map(pd=>{
                            return  <Row>
                                <Col xl={6} lg={6} className="singleBigProductImg" >
                                    <div className="singleProductImgDiv d-flex justify-content-center d-flex justify-content-center ">
                                        <div className="mainImgDiv singlePagePic">
                                            <ReactImageZoom {...props} />
                                        </div>
                                        <div id="smallImgDiv"  className="smallImgDiv">
                                            {allPhotos.map((allPhotos,i)=>{
                                                if(allPhotos!==null){
                                                    return  <div  className="smallImg  d-flex justify-content-center d-flex justify-content-center">

                                                                   <Fragment>
                                                                       <img className="smImgSrc"  id={i} onClick={(event)=>this.onChangeBigImage(event)}
                                                                           src={allPhotos!==null?`${this.props.backendApi}${allPhotos}`: "/blank.jpg"}
                                                                          alt=""
                                                                       />

                                                                   </Fragment>
                                                           </div>
                                                }
                                            })}
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6}>
                                    <div className="singleProductCardDetails">
                                        <div className="singleProductCardTitleDiv">
                                            <h1 className="singleProductCardTitle">
                                                {pd.product_name}
                                            </h1>
                                        </div>
                                        <Reviews value={pd.review}/>
                                        <hr/>

                                           <div className="productDetailsDiv">
                                            <Fragment>
                                                    <div className="sellerDiv">
                                                           <p>Sold By :</p>
                                                          <div className="sellerCompanyNameDiv">
                                                               <Link href={`/shop/${pd.seller_slug}`}>
                                                                   <p className="sellerNameTitle">{pd.seller_name}<span className="seller-rating">{pd.seller_rating}<i className="fas fa-star"/></span></p>
                                                               </Link>
                                                                  {pd.cat_type!=="digital" &&
                                                                      <ul>
                                                                          {pd.replace_days!==0 &&
                                                                              <li className="cg-policy"><Link href="/replace-policy">{pd.replace_days} days replacement Policy</Link></li>
                                                                          }
                                                                          {pd.refund_days!==0 &&
                                                                              <li className="cg-policy"><Link href="/refund-policy">{pd.refund_days} days refund policy</Link></li>
                                                                          }
                                                                      </ul>

                                                                  }

                                                          </div>
                                                    </div>
                                            </Fragment>
                                        </div>
                                        <div className="productDetailsDiv">
                                            <p className="brand">Brand:  <span className="brandName">  {pd.brand!==null ? pd.brand : "No Brand"}</span>
                                                {pd.brand_logo!=null &&
                                                    <div className="product-brand-image">
                                                        <Photo
                                                            src={this.props.backendApi+pd.brand_logo}
                                                            blurDataURL="/blank.jpg"
                                                            class=""
                                                            elassName=""
                                                        />
                                                    </div>


                                                }
                                            </p>
                                        </div>


                                        {pd.cat_type!=="digital" &&
                                            <div className="productDetailsDiv">
                                                <p className="deliveryTitle">Delivery: <span className="deliveryText"> Usually delivered in {pd.delivery} days <i className="fa-solid fa-circle-question"/></span> </p>
                                            </div>
                                        }


                                        {pd.promotion.length>0 &&
                                            <div className="productDetailsDiv">
                                                  <div className="productPromotionDiv">
                                                      <div className="promotionDiv">
                                                          <p> Promotion:</p>
                                                      </div>
                                                      <div className="promotionCodeDiv">
                                                        <Dropdown>
                                                           <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                             See all offer
                                                        </Dropdown.Toggle>
                                             <Dropdown.Menu>
                                                {pd.promotion.map(promotion=>{
                                                    return <Fragment>
                                                        {promotion.promotion_type==="on_product" ?
                                                            <Fragment>
                                                                <Dropdown.Item className="coupon-text" href="#/action-1">Type <span className="voucherCode">"{promotion.promotion_code}"</span> to get {promotion.amount} % off</Dropdown.Item>
                                                            </Fragment>:
                                                            <Fragment>
                                                                <Dropdown.Item>
                                                                    <h6 className="coupon-amount">{promotion.amount} % off</h6>
                                                                    <p className="coupon-text">Spend {promotion.min_purchase} get up to {promotion.max_discount}  off</p>
                                                                    <p className="coupon-date">{promotion.start_date} - {promotion.end_date}</p>
                                                                    <p className="coupon-name">Coupon code <span className="coupon-code">"{promotion.promotion_code}"</span></p>
                                                                </Dropdown.Item>
                                                            </Fragment>
                                                        }
                                                    </Fragment>
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                                      </div>
                                                  </div>
                                            </div>
                                        }
                                        <Fragment>
                                            {pd.variation!=null &&
                                            <div className="variation">
                                                {pd.variation.map(productVariation=>{
                                                    return  <div className="variationDiv">
                                                        <div className="variationName">{productVariation.variation} : </div>
                                                        <div id={productVariation.variation} className="variationValue">
                                                            {productVariation.attributes.map(attr=>{
                                                                return   <Fragment>
                                                                    <span  id={attr} onClick={e=>this.onSelect(productVariation.variation,attr,pd.variation,pd.variation_mix,e,pd.index)} className="box   variationBtnBox">{attr}</span>
                                                                </Fragment>
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                            }
                                        </Fragment>



                                        <div className="regularPriceDiv">
                                            {pd.variation!=null ?
                                                <Fragment>
                                                    <Fragment>
                                                            {pd.discount_price!==undefined ?
                                                                <Fragment>
                                                                    {this.props.variationDiscountPrice!=null ?
                                                                        <Fragment>
                                                                            {symbolFormat===1 ?
                                                                                <p className="text-left"><span>Price : </span>  <span className="regularPrice singlePrice ml-2 mr-2">{onCurrencyFormat(this.props.variationDiscountPrice)}{defaultCurrency} </span><span className="text-danger"><del>{onCurrencyFormat(this.props.variationPrice)}{defaultCurrency}</del></span></p> :
                                                                                <p className="text-left"><span>Price : </span>  <span className="regularPrice singlePrice ml-2 mr-2">{defaultCurrency}{onCurrencyFormat(this.props.variationDiscountPrice)} </span><span className="text-danger"><del>{defaultCurrency}{onCurrencyFormat(this.props.variationPrice)}</del></span></p>
                                                                            }
                                                                        </Fragment>:
                                                                        <Fragment>
                                                                            {symbolFormat===1 ?
                                                                                <p className="text-left"><span>Price :
                                                                                </span>  <span className="regularPrice singlePrice ml-2 mr-2">
                                                                                    {discountPrice[0]===discountPrice[1] ?
                                                                                        onCurrencyFormat(discountPrice[0]) + defaultCurrency
                                                                                         :
                                                                                        onCurrencyFormat(discountPrice[0]) + defaultCurrency
                                                                                        +" - "+
                                                                                        onCurrencyFormat(discountPrice[1]) +defaultCurrency
                                                                                    }
                                                                                </span>
                                                                                    <span className="text-danger">
                                                                                    <del>
                                                                                        {regularPrice[0]===regularPrice[1] ?
                                                                                            onCurrencyFormat(regularPrice[0])+defaultCurrency
                                                                                            :
                                                                                            onCurrencyFormat(regularPrice[0]) +defaultCurrency
                                                                                            +" - "+
                                                                                            onCurrencyFormat(regularPrice[1]) +defaultCurrency
                                                                                        }
                                                                                    </del>
                                                                                 </span>
                                                                                </p>
                                                                                :
                                                                                <p className="text-left"><span>Price :
                                                                                </span>
                                                                                    <span className="regularPrice singlePrice ml-2 mr-2">
                                                                                        {discountPrice[0]===discountPrice[1] ?
                                                                                            defaultCurrency+onCurrencyFormat(discountPrice[0])
                                                                                              :
                                                                                            defaultCurrency + onCurrencyFormat(discountPrice[0])
                                                                                             + "-" +
                                                                                             defaultCurrency+onCurrencyFormat(discountPrice[1])
                                                                                        }
                                                                                    </span>
                                                                                    <span className="text-danger">
                                                                                        <del>
                                                                                            {regularPrice[0]===regularPrice[1] ?
                                                                                                 defaultCurrency+onCurrencyFormat(regularPrice[0])
                                                                                                 :
                                                                                                  defaultCurrency + onCurrencyFormat(regularPrice[0])
                                                                                                  + "-" +
                                                                                                  defaultCurrency+ onCurrencyFormat(regularPrice[1])
                                                                                            }
                                                                                        </del>
                                                                                    </span>
                                                                                </p>
                                                                            }
                                                                        </Fragment>
                                                                    }
                                                                </Fragment>
                                                                :
                                                                <Fragment>
                                                                    {this.props.variationPrice!=null ?
                                                                        <Fragment>
                                                                            {/*amount symbol 1*/}
                                                                            {/*symbol amount 2*/}
                                                                            {symbolFormat===1 ?
                                                                                <p className="text-left"><span>Price : </span>  <span className="regularPrice singlePrice ml-2 mr-2">{onCurrencyFormat(this.props.variationPrice)}{defaultCurrency} </span></p>
                                                                                :
                                                                                <p className="text-left"><span>Price : </span>  <span className="regularPrice singlePrice ml-2 mr-2">{defaultCurrency}{onCurrencyFormat(this.props.variationPrice)} </span></p>
                                                                            }
                                                                        </Fragment>
                                                                          :
                                                                        <Fragment>
                                                                            {symbolFormat===1 ?
                                                                                <p className="text-left"><span>Price : </span>  <span className="regularPrice singlePrice ml-2 mr-2"> {regularPrice[0]===regularPrice[1] ? `${regularPrice[0]} ${defaultCurrency}` : onCurrencyFormat(regularPrice[0]) + `${defaultCurrency}`   + " - "+ onCurrencyFormat(regularPrice[1]) + `${defaultCurrency}` }  </span></p>
                                                                                   :
                                                                                <p className="text-left"><span>Price : </span>  <span className="regularPrice singlePrice ml-2 mr-2"> {regularPrice[0]===regularPrice[1] ? `${defaultCurrency}` + onCurrencyFormat(regularPrice[0]) : `${defaultCurrency}` + onCurrencyFormat(regularPrice[0]) +` - ${defaultCurrency}`+ onCurrencyFormat(regularPrice[1]) }  </span></p>
                                                                            }
                                                                        </Fragment>
                                                                    }
                                                                </Fragment>
                                                            }
                                                        </Fragment>
                                                </Fragment> :
                                                <Fragment>
                                                    {pd.discount_price!=undefined ?
                                                        <Fragment>
                                                            {symbolFormat===1 ?
                                                                <p className="text-left"><span>Price : </span>   <span className="regularPrice singlePrice ml-2 mr-2">{onCurrencyFormat(pd.discount_price) }{defaultCurrency}</span> <span className="text-danger"><del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del></span></p>
                                                                :
                                                                <p className="text-left"><span>Price : </span>   <span className="regularPrice singlePrice ml-2 mr-2">{defaultCurrency}{onCurrencyFormat(pd.discount_price)}</span> <span className="text-danger"><del>{defaultCurrency}{onCurrencyFormat(pd.product_price)}</del></span></p>
                                                            }
                                                        </Fragment>
                                                           :
                                                        <Fragment>
                                                            {symbolFormat===1 ?
                                                                <p className="text-left"><span>Price : </span>   <span className="regularPrice singlePrice ml-2 mr-2">{onCurrencyFormat(pd.product_price)}{defaultCurrency}</span></p>
                                                                :
                                                                <p className="text-left"><span>Price : </span>   <span className="regularPrice singlePrice ml-2 mr-2">{defaultCurrency}{onCurrencyFormat(pd.product_price)}</span></p>
                                                            }
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                            }
                                        </div>


                                        {pd.cat_type!=="digital"  &&
                                            <Fragment>
                                                {pd.variation!=null ?
                                                    <div className="quantityDiv">
                                                        {this.props.cartBtn ?
                                                            <Fragment>
                                                                {this.props.quantity<=1 ?
                                                                    <Button disabled={true}  value={this.props.quantity} onClick={(e)=>this.onDecreaseQuantity(e)}  className="btnMinus">-</Button>:
                                                                    <Button value={this.props.quantity} onClick={(e)=>this.onDecreaseQuantity(e)}  className="btnMinus">-</Button>
                                                                }
                                                                {this.props.quantity==0 ?
                                                                    <span className="quantity">1</span>:
                                                                    <span className="quantity">{this.props.quantity}</span>
                                                                }
                                                                {this.props.variationStock<=this.props.quantity ?
                                                                    <Button disabled={true} value={this.props.quantity} onClick={(e)=>this.onIncreaseQuantity(e)} className="btnPlus">+</Button>:
                                                                    <Button value={this.props.quantity} onClick={(e)=>this.onIncreaseQuantity(e)} className="btnPlus">+</Button>
                                                                }
                                                            </Fragment>
                                                            :
                                                            <Fragment>
                                                                <Button disabled value={this.props.quantity} onClick={(e)=>this.onDecreaseQuantity(e)}  className="btnMinus">-</Button>
                                                                <span className="quantity">{this.props.quantity}</span>
                                                                <Button disabled value={this.props.quantity} onClick={(e)=>this.onIncreaseQuantity(e)} className="btnPlus">+</Button>
                                                            </Fragment>
                                                        }
                                                    </div>
                                                    :
                                                    <div className="quantityDiv">
                                                        {this.props.quantity<=1 ?
                                                            <Button disabled={true}  value={this.props.quantity} onClick={(e)=>this.onDecreaseQuantity(e)}  className="btnMinus">-</Button>:
                                                            <Button value={this.props.quantity} onClick={(e)=>this.onDecreaseQuantity(e)}  className="btnMinus">-</Button>
                                                        }
                                                        <span className="quantity">{this.props.quantity}</span>
                                                        {pd.stock<=this.props.quantity ?
                                                            <Button disabled={true}  value={this.props.quantity} onClick={(e)=>this.onIncreaseQuantity(e)} className="btnPlus">+</Button>:
                                                            <Button  value={this.props.quantity} onClick={(e)=>this.onIncreaseQuantity(e)} className="btnPlus">+</Button>
                                                        }
                                                    </div>
                                                }
                                            </Fragment>
                                        }



                                        <div className="availableProduct text-left">
                                                {pd.show_stock===1 &&
                                                    <Fragment>
                                                        {this.props.variationStock==""?
                                                          <Fragment>{
                                                              pd.stock===0 ?
                                                                  <Fragment>
                                                                      <span className="availableProductTitle text-danger">Out of stock</span>
                                                                  </Fragment>:
                                                                  <Fragment>
                                                                      <span className="availableProductTitle "> {pd.stock + " available in stock"} </span>
                                                                  </Fragment>
                                                          }</Fragment>
                                                               :
                                                            <Fragment>
                                                                {this.props.variationStock==0 ?
                                                                    <span className="availableProductTitle text-danger">Out of stock</span>:
                                                                    <span className="availableProductTitle "> {this.props.variationStock + " available in stock"} </span>
                                                                }
                                                            </Fragment>
                                                        }
                                                    </Fragment>
                                                }
                                            {this.props.notAvailable &&
                                                <span className="availableProductTitle text-danger">The variation is not available at this moment</span>
                                            }
                                            </div>

                                        <div className="totalPriceDiv text-left">
                                            {pd.variation!=null ?
                                                <Fragment>
                                                        <Fragment>
                                                            <Fragment>
                                                                {pd.discount_price!=null ?
                                                                    <Fragment>
                                                                        {symbolFormat===1 ?
                                                                            <p><span>Total Price :
                                                                            </span><span className="regularPrice">
                                                                                {this.props.variationDiscountPrice!=null ?
                                                                                    `${onCurrencyFormat(this.props.variationDiscountPrice*this.props.quantity) + defaultCurrency}`
                                                                                    :
                                                                                    discountPrice[0]===discountPrice[1] ?
                                                                                        `${onCurrencyFormat(discountPrice[0]) + defaultCurrency}`
                                                                                        :
                                                                                        `${onCurrencyFormat(discountPrice[0]) + defaultCurrency}`
                                                                                        +" - "+
                                                                                        `${onCurrencyFormat(discountPrice[1]) + defaultCurrency}`
                                                                                }
                                                                             </span>
                                                                            </p>
                                                                              :
                                                                            <p><span>Total Price :
                                                                            </span><span className="regularPrice">
                                                                                {this.props.variationDiscountPrice!=null ?
                                                                                    `${defaultCurrency + onCurrencyFormat(this.props.variationDiscountPrice*this.props.quantity)}`
                                                                                    :
                                                                                    discountPrice[0]===discountPrice[1] ?
                                                                                        `${defaultCurrency + onCurrencyFormat(discountPrice[0])}`
                                                                                        :
                                                                                        `${defaultCurrency + onCurrencyFormat(discountPrice[0])}`
                                                                                         + "-" +
                                                                                        `${defaultCurrency+ onCurrencyFormat(discountPrice[1])}`
                                                                                }
                                                                            </span></p>
                                                                        }
                                                                    </Fragment>
                                                                      :
                                                                    <Fragment>
                                                                        {symbolFormat===1 ?
                                                                            <p><span>Total Price : </span><span className="regularPrice">
                                                                                {this.props.variationPrice!=null ?
                                                                                    onCurrencyFormat(this.props.variationPrice) +
                                                                                    `${defaultCurrency}` :  regularPrice[0]===regularPrice[1] ?
                                                                                        onCurrencyFormat(regularPrice[0]) + `${defaultCurrency}`
                                                                                        :
                                                                                        onCurrencyFormat(regularPrice[0]) + `${defaultCurrency}`
                                                                                        + ` - `+
                                                                                        onCurrencyFormat(regularPrice[1]) + `${defaultCurrency}` }
                                                                            </span></p>
                                                                               :
                                                                            <p><span>Total Price :
                                                                            </span><span className="regularPrice">
                                                                                {this.props.variationPrice!=null ?
                                                                                    `${defaultCurrency + onCurrencyFormat(this.props.variationPrice)}`
                                                                                    :
                                                                                     regularPrice[0]===regularPrice[1] ?
                                                                                        `${defaultCurrency + onCurrencyFormat(regularPrice[0])}`
                                                                                        :
                                                                                        `${defaultCurrency + onCurrencyFormat(regularPrice[0])}`
                                                                                        +"-"+
                                                                                        `${defaultCurrency + onCurrencyFormat(regularPrice[1])}`
                                                                                }
                                                                            </span>
                                                                            </p>
                                                                        }
                                                                    </Fragment>
                                                                }
                                                            </Fragment>
                                                        </Fragment>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    {pd.discount_price!=null ?
                                                        <Fragment>
                                                            {symbolFormat===1 ?
                                                                <p><span>Total Price : </span><span className="regularPrice">{onCurrencyFormat(this.props.quantity * pd.discount_price)}{defaultCurrency}</span></p>
                                                                   :
                                                                <p><span>Total Price : </span><span className="regularPrice">{defaultCurrency}{onCurrencyFormat(this.props.quantity * pd.discount_price)}</span></p>
                                                            }
                                                        </Fragment>
                                                         :
                                                        <Fragment>
                                                            {symbolFormat===1 ?
                                                                <p><span>Total Price : </span><span className="regularPrice">{onCurrencyFormat(this.props.quantity * pd.product_price) }{defaultCurrency}</span></p>
                                                                  :
                                                                <p><span>Total Price : </span><span className="regularPrice">{defaultCurrency}{onCurrencyFormat(this.props.quantity * pd.product_price) }</span></p>
                                                            }
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                            }
                                        </div>


                                        {this.props.mobile!==true ?
                                            <div className="addCardProduct text-left">
                                                {pd.variation!=null ?
                                                    <Fragment>
                                                        {this.props.cartBtn ?
                                                            <Fragment>
                                                                <Fragment>
                                                                          {this.props.variationStock<=0 ?
                                                                              <Fragment>
                                                                                  <Button  onClick={this.onStockOut.bind(this)}   className="btn mr-3 disable">Buy now <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                                  <Button onClick={this.onStockOut.bind(this)}   className="btn mr-3 disable">Add to Cart <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                              </Fragment>
                                                                               :
                                                                              <Fragment>
                                                                                  <Button onClick={()=>this.onSelectedVariation("checkout")}   className="btn mr-3">Buy now <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                                  <Button onClick={()=>this.onSelectedVariation("cart")}   className="btn mr-3">Add to Cart <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                              </Fragment>
                                                                          }
                                                                      </Fragment>
                                                            </Fragment>
                                                            :
                                                            <Fragment>
                                                                {pd.stock<=0 ?
                                                                  <Fragment>
                                                                      <Button onClick={this.onStockOut.bind(this)}  className="btn mr-3 disable">Buy now<i className="fas fa-shopping-cart ml-2"/></Button>
                                                                      <Button onClick={this.onStockOut.bind(this)}   className="btn mr-3 disable">Add to Cart <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                  </Fragment> :
                                                                   <Fragment>
                                                                       <Button onClick={()=>this.onSelectedVariation("checkout")}  disabled={false} className="btn mr-3">Buy now<i className="fas fa-shopping-cart ml-2"/></Button>
                                                                       <Button onClick={()=>this.onSelectedVariation("cart")}  disabled={false} className="btn mr-3">Add to Cart <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                   </Fragment>
                                                                }
                                                            </Fragment>
                                                        }
                                                    </Fragment> :
                                                    <Fragment>
                                                        <Fragment>
                                                            {pd.stock<=0 ?
                                                                <Fragment>
                                                                    <Button onClick={this.onStockOut.bind(this)}  className="btn mr-3 disable">Buy now<i className="fas fa-shopping-cart ml-2"/></Button>
                                                                    <Button onClick={this.onStockOut.bind(this)}  className="btn mr-3 disable">Add to Cart <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                </Fragment>:
                                                                <Fragment>
                                                                    <Button onClick={this.onCheckout.bind(this)}  disabled={false} className="btn mr-3">Buy now<i className="fas fa-shopping-cart ml-2"/></Button>
                                                                    <Button onClick={this.onAddToCart.bind(this)}  disabled={false} className="btn mr-3">Add to Cart <i className="fas fa-shopping-cart ml-2"/></Button>
                                                                </Fragment>
                                                            }
                                                        </Fragment>
                                                    </Fragment>
                                                }
                                            </div>
                                              :
                                            <div className="mobile-nav">
                                                    <div className="w-100 ">
                                                        <Fragment>
                                                            <div className="mobile-nav-bottom">
                                                                <div  className="navCol">
                                                                    <div className="cart text-center mobile-nav-icon-div">
                                                                        {pd.variation!=null ?
                                                                            <Fragment>
                                                                                {this.props.cartBtn ?
                                                                                    <Fragment>
                                                                                        {this.props.variationStock<=0 ?
                                                                                            <Fragment>
                                                                                                <Button onClick={this.onStockOut.bind(this)}  className="mobile-nav-link btn mobile-nav-btn disable">Buy now</Button>
                                                                                            </Fragment>
                                                                                            :
                                                                                            <Fragment>
                                                                                                <Button onClick={()=>this.onSelectedVariation("checkout")}   className="mobile-nav-link btn mobile-nav-btn">Buy now</Button>
                                                                                            </Fragment>
                                                                                        }
                                                                                    </Fragment>
                                                                                    :
                                                                                    <Fragment>
                                                                                        {pd.stock<=0 ?
                                                                                            <Fragment>
                                                                                                <Button onClick={this.onStockOut.bind(this)}  className="mobile-nav-link btn mobile-nav-btn disable">Buy now</Button>
                                                                                            </Fragment> :
                                                                                            <Fragment>
                                                                                                <Button onClick={()=>this.onSelectedVariation("checkout")}   className="mobile-nav-link btn mobile-nav-btn">Buy now</Button>
                                                                                            </Fragment>
                                                                                        }
                                                                                    </Fragment>
                                                                                }
                                                                            </Fragment>
                                                                            :
                                                                            <Fragment>
                                                                                {pd.stock<=0 ?
                                                                                    <Button onClick={this.onStockOut.bind(this)}  className="mobile-nav-link btn mobile-nav-btn disable">Buy now</Button>:
                                                                                    <Button onClick={this.onCheckout.bind(this)}   className="mobile-nav-link btn mobile-nav-btn">Buy now</Button>
                                                                                }
                                                                            </Fragment>
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div   className="navCol">
                                                                    <div className="mobile-icon">
                                                                        <Link href='/'  >
                                                                            <div className="mobile-icon-div">

                                                                                <Photo
                                                                                    src="/home.png"
                                                                                    blurDataURL="/home.png"
                                                                                    class=""
                                                                                />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>

                                                                <div  className="navCol">
                                                                    <div className="account text-center mobile-nav-icon-div">
                                                                        {pd.variation!=null ?
                                                                            <Fragment>
                                                                                {this.props.cartBtn ?
                                                                                    <Fragment>
                                                                                        {this.props.variationStock<=0 ?
                                                                                            <Fragment>
                                                                                                <Button onClick={this.onStockOut.bind(this)}  className="mobile-nav-link btn mobile-nav-btn disable">Add to Cart </Button>
                                                                                            </Fragment>
                                                                                            :
                                                                                            <Fragment>
                                                                                                <Button onClick={()=>this.onSelectedVariation("cart")}  className="mobile-nav-link btn mobile-nav-btn">Add to Cart </Button>
                                                                                            </Fragment>
                                                                                        }
                                                                                    </Fragment>
                                                                                    :
                                                                                    <Fragment>
                                                                                        {pd.stock<=0 ?
                                                                                            <Fragment>
                                                                                                <Button onClick={this.onStockOut.bind(this)}  className="mobile-nav-link btn mobile-nav-btn disable">Add to Cart </Button>
                                                                                            </Fragment> :
                                                                                            <Fragment>
                                                                                                <Button onClick={()=>this.onSelectedVariation("cart")}   className="mobile-nav-link btn mobile-nav-btn">Add to Cart</Button>
                                                                                            </Fragment>
                                                                                        }
                                                                                    </Fragment>
                                                                                }
                                                                            </Fragment>
                                                                            :
                                                                            <Fragment>
                                                                                {pd.stock<=0 ?
                                                                                    <Button onClick={this.onStockOut.bind(this)}  className="mobile-nav-link btn mobile-nav-btn disable">Add to Cart</Button>
                                                                                    :
                                                                                    <Button onClick={this.onAddToCart.bind(this)}   className="mobile-nav-link btn mobile-nav-btn">Add to Cart</Button>
                                                                                }
                                                                            </Fragment>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    </div>
                                            </div>
                                        }

                                        {this.props.mobile!==true &&
                                           <div className="compareProduct">
                                            <div className="add-to-compare-cart">
                                               <p onClick={()=>this.onWishList(pd.index)}  className="mr-3 wishList">Add to wishList <i className="far fa-heart ml-1"/>  </p>
                                               <p  onClick={()=>this.onCompare(pd.index)} className="Compare">Add to Compare  <i className="far fa-sync-alt ml-1 "/> </p>
                                            </div>
                                        </div>
                                        }

                                    </div>
                                </Col>
                            </Row>
                        })}
                    </Fragment>
              
               </Fragment>
        );
    }
}

const mapDispatchToProps = {
    deSelectProduct,
    selectedCheckoutProduct,
    updateProductState,
    popupLoginOpen,
    addCartProduct,
    getCheckoutProduct,
    addCompareProduct,
    addWishlistProduct,
};

function mapStateToProps(state) {

    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;

    const isAuthorized = state.userReducer.isAuthorized;
    const backendApi = state.starterReducer.backendApi;
    const variationImage = state.productReducer.variationImage;

    const selectedVariation = state.productReducer.selectedVariation;
    const selectedProductId = state.productReducer.selectedProductId;
    const quantity = state.productReducer.quantity;
    const variationPrice = state.productReducer.variationPrice;
    const variationDiscountPrice = state.productReducer.variationDiscountPrice;

    const selectedVariationMix = state.productReducer.selectedVariationMix;
    const variationStock = state.productReducer.variationStock;


    const notAvailable = state.productReducer.notAvailable
    const checkoutProduct = state.productReducer.checkoutProduct
    const shippingName = state.shippingBillingPickupReducer.shippingName

    return {
        isAuthorized,
        backendApi,
        variationImage,
        selectedVariation,
        selectedProductId,
        quantity,
        variationPrice,
        variationDiscountPrice,
        selectedVariationMix,
        defaultCurrency,
        currencySymbolFormat,
        notAvailable,
        variationStock,
        checkoutProduct,
        shippingName
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductCard);




