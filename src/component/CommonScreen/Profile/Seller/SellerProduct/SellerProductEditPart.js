import React, { PureComponent, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import SimpleReactValidator from 'simple-react-validator';
import {Switch} from "@material-ui/core";
import ReactPlaceholder from "react-placeholder";
import Api from "../../../../../ClientApi/Api";
import {mediaLimit, selectedMedia, showMediaFile} from "../../../../../services/actions/mediaAction";
import {connect} from "react-redux";
import Router from "next/router";
import {alert} from "../../../../../services/common";
import dynamic from "next/dynamic"
import MediaUpload from "../../../Media/MediaUpload";
const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false })

class SellerProductEditPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.selectedVariationTypes = [];
        this.selectedVatTypes = [];
        this.fetchPhoto = "";
        this.state = {
            codStatus: 1,
            freeShipping: true,
            flatShipping:false,
            productWiseShipping:false,
            variationImage:[],
            productName:'',
            productCategory:'',
            productBrand:'',
            unit:'',
            min_qty:1,
            productTags:'',
            barcode:'',
            refundStatus: 0,
            replaceStatus: 0,
            selectedGalleryPhotos:[],
            selectedThumbnailPhotos:[],
            productDescription:'',
            variationArray:[],
            typeOfVariations: [],
            productVariationAttributes: [],
            variationArrayField:0,
            unit_price:'',
            purchase_price:'',
            discount_price:'',
            discountType:'',
            stock_quantity:1,
            sku:'',
            productVideoProvider:'',
            productVideoLink:'',
            metaTitle:'',
            metaDescription:'',
            shippingFee:0,
            minimumStockQuantity:'',
            showStockStatus:0,
            cashOnDelivery:0,
            featuredStatus:0,
            todaysDealStatus: 0,
            productFlashDeal:'',
            productFlashDealDiscountPrice:'',
            productFlashDiscountType:'',
            shippingDays:'',
            productVatTypes:'',
            tempVariation:[],
            productTaxVariation: [],
            SelectProductVariationType: [],
            variationsMix: [],
            status:0,
            dataLoadingStatus:false,
            productType:'physical',
            loadingBtn:false,
            id:""
        };
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onBrandChange = this.onBrandChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.productRefundStatus = this.productRefundStatus.bind(this);
        this.productReplaceStatus = this.productReplaceStatus.bind(this);
        this.onVideoProviderChange = this.onVideoProviderChange.bind(this);
        this.onProductDescriptionChange = this.onProductDescriptionChange.bind(this);
        this.productCodStatus = this.productCodStatus.bind(this);
        this.productFeaturedStatus = this.productFeaturedStatus.bind(this);
        this.productTodaysDealStatus = this.productTodaysDealStatus.bind(this);
        this.onVariationAttributesChange = this.onVariationAttributesChange.bind(this);
        this.changeVariationTypeStateValue = this.changeVariationTypeStateValue.bind(this);
        this.deleteVariationMix = this.deleteVariationMix.bind(this);
        this.onProductDiscountTypeChange = this.onProductDiscountTypeChange.bind(this);
        this.saveVariationTypesValue = this.saveVariationTypesValue.bind(this);
        this.productFreeShipping = this.productFreeShipping.bind(this);
        this.onSubmitProduct = this.onSubmitProduct.bind(this);
        this.onVatTypesChange = this.onVatTypesChange.bind(this);
        this.productShowStockStatus = this.productShowStockStatus.bind(this);
        this.onSelectedGalleryPhotos = this.onSelectedGalleryPhotos.bind(this);
        this.onSelectedThumbnailPhotos = this.onSelectedThumbnailPhotos.bind(this);
        this.onSelectedPdfFile = this.onSelectedPdfFile.bind(this);
        this.onProductName = this.onProductName.bind(this);
        this.onMinimumQuantity = this.onMinimumQuantity.bind(this);
        this.onUnitChange = this.onUnitChange.bind(this);
        this.onBarcodeChange = this.onBarcodeChange.bind(this)
        this.onUnitPriceChange = this.onUnitPriceChange.bind(this)
        this.onPurchasePriceChange =  this.onPurchasePriceChange.bind(this)
        this.onDiscountChange =  this.onDiscountChange.bind(this)
        this.onStockQuantity = this.onStockQuantity.bind(this)
        this.onMetaTitleChange = this.onMetaTitleChange.bind(this)
        this.onMetaDescription = this.onMetaDescription.bind(this)
        this.onShippingFee = this.onShippingFee.bind(this)
        this.onMinimumQuantityAlert = this.onMinimumQuantityAlert.bind(this)
        this.onCashOnDelivery = this.onCashOnDelivery.bind(this)
        this.handle = this.handle.bind(this)
        this.onFetchData = this.onFetchData.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0);
        Api().get('/getActiveCategories')
            .then(response => {
                this.setState({activeCategories: response.data});})
            .catch(function(error) {
            })
        Api().get('/getBrandsByOrder')
            .then(response => {
                this.setState({activeBrands: response.data});
            })
            .catch(function (error) {
            })
        Api().get('/getVariationType')
            .then(response => {
                this.setState({variationAttributes: response.data});
            })
            .catch(function (error) {
            })
        Api().get('/getVats')
            .then(response => {
                this.setState({vatTypes: response.data});
            })
            .catch(function (error) {
            })
        Api().get('getShippingInfo').then(res=>{
            this.setState({
                shipping_method:res.data.shipping_method,
                shippingFee:res.data.shipping_fee,
                refundDays:res.data.refund_duration,
                replaceDays:res.data.replace_duration,
                dataLoadingStatus:true
            })
        })
        this.onFetchData();
    }
    onFetchData(){
        let url = window.location.pathname.split("/")[2];
        const id = url;
        const data = {
            id:id
        }
        this.setState({
            id:url
        })
        Api().post('/getProductById',data).then(res=>{
            if(res.data.length>0) {
                let productName = res.data[0].name;
                let category = res.data[0].category;
                let brand = res.data[0].brand;
                let unit = res.data[0].unit;
                let min_qty = res.data[0].min_qty;
                let barcode = res.data[0].barcode;
                let refundStatus = res.data[0].refund;
                let selectedThumbnail = res.data[0].thumbnail;
                let selectedGallery  = res.data[0].gallery;
                let replaceStatus = res.data[0].replace;
                let productDescription = res.data[0].description;
                let unit_price = res.data[0].unit_price;
                let purchase_price = res.data[0].purchase_price;
                let discount_price = res.data[0].discount;
                let discountType = res.data[0].discount_type;
                let stock_quantity = res.data[0].stock;
                let sku = res.data[0].sku;
                let productVideoProvider = res.data[0].video_provider;
                let productVideoLink = res.data[0].video_link;
                let metaTitle = res.data[0].meta_title;
                let metaDescription = res.data[0].meta_description;
                let shippingFee = res.data[0].shipping_fee;
                let minimumStockQuantity = res.data[0].stock_warning_quantity;
                let showStockStatus = res.data[0].show_stock_quantity;
                let cashOnDelivery = res.data[0].cash_on_delivery;
                let featuredStatus = res.data[0].seller_featured;
                let todaysDealStatus = res.data[0].todays_deal;
                let productFlashDeal = res.data[0].meta_description;
                let productFlashDealDiscountPrice = res.data[0].flash_deal_discount;
                let shippingDays = res.data[0].shipping_days;
                let productTags = res.data[0].tags;
                let productVariationAttributes = res.data[0].variations != null ? res.data[0].variations : "";
                let variations_attr = res.data[0].variations_attr;
                let variations_attr_mix_value = res.data[0].variations_attr_mix_value;
                let vats = res.data[0].vat;
                let productType = res.data[0].product_type;
                let status = res.data[0].status;
                let productTagsArray = [];
                if (productTags != null) {
                    productTags.split(",").map(pd => {
                        productTagsArray.push({
                            label: `${pd}`, value: `${pd}`, __isNew__: true
                        })
                    });
                }
                this.setState({
                    productTags: productTagsArray
                })
                let productVariationAttributesArray = [];
                if (productVariationAttributes !== "") {
                    productVariationAttributes.split(",").map((pd, i) => {
                        if(this.state.variationAttributes!==undefined){
                            this.state.variationAttributes.map(v => {
                                if (v.name == pd) {
                                    productVariationAttributesArray.push({
                                        label: v.name, value: v.id
                                    })
                                }
                            })
                        }
                        this.selectedVariationTypes.push(pd);
                    });
                    this.setState({
                        productVariationAttributes: productVariationAttributesArray
                    })
                }
                var variations_attr_array_json = variations_attr;
                var variations_attr_mix_value_array_json = variations_attr_mix_value;
                if (variations_attr_array_json != null) {
                    variations_attr_array_json.map(pd => {
                        if (pd.attributes != undefined) {
                            const attribute = pd.attributes;
                            var attribute_array = [];
                            var variations = "";
                            attribute.map(attr => {
                                variations = pd.variation;
                                if (variations == pd.variation) {
                                    attribute_array.push({label: `${attr}`, value: `${attr}`, __isNew__: true})
                                }
                            })
                            this.setState({[variations]: attribute_array});
                            let tempVar = attribute_array;
                            let tempArr = [];
                            tempVar.forEach(tv => {
                                tempArr.push(tv['label']);
                            })
                            let name_of_state = pd.variation + '_value';
                            this.setState({
                                [name_of_state]: tempArr
                            })
                            let tempMixUp = [];
                            this.selectedVariationTypes.map((value, index) => {
                                let variations = [];
                                if (pd.variation == value) {
                                    variations.push(...tempArr);
                                } else {
                                    let tempVar = this.state[value + '_value'];
                                    if (tempVar != null || tempVar != undefined) {
                                        variations.push(...tempVar);
                                    }
                                }
                                if (tempMixUp.length == 0) {
                                    variations.map((value, index) => {
                                        tempMixUp.push(value);
                                    })
                                } else {
                                    let tempMixUpRevised = [];
                                    tempMixUp.map((value, index) => {
                                        variations.map((value2, index) => {
                                            tempMixUpRevised.push(value + "_" + value2);
                                        })
                                    })
                                    tempMixUp = tempMixUpRevised;
                                }
                            })
                            this.setState({variationsMix: tempMixUp});
                            let tempVariationArray = [];
                            tempMixUp.map((value, index) => {
                                tempVariationArray.push(
                                    {
                                        variation: value,
                                        sku: null,
                                        price: null,
                                        stock: null,
                                        image: null
                                    }
                                )
                            })
                            this.setState({variationArray: tempVariationArray});
                        }
                    })
                }
                this.setState({
                    variations_attr_mix_value: variations_attr_mix_value
                })
                if(variations_attr_mix_value_array_json!=null){
                    variations_attr_mix_value_array_json.map(pd=>{
                        let variation  =  pd.variation+"_variation";
                        let price = pd.variation+"_price";
                        let sku = pd.variation+"_sku";
                        let stock =  pd.variation+"_stock";
                        let image =  pd.variation+"_image";
                        this.setState({
                            [variation]:pd.variation,
                            [price]:pd.price,
                            [sku]:pd.sku,
                            [stock]:pd.stock,
                            [image]:pd.image
                        })
                        let thumbnail = pd.image;
                        if(thumbnail!==null){
                            let photoId = [];
                            thumbnail.map(pd=>{
                                photoId.push(`${pd.id}`);
                            })
                            this.props.selectedMedia({
                                photoId:photoId,
                                type:image
                            });
                            if (thumbnail.length > 1-1) {
                                this.props.mediaLimit({
                                    limit: 'exceed',
                                    type:image
                                })
                            }
                            this.props.showMediaFile({
                                showFile: thumbnail,
                                type: image
                            });
                        }
                    })
                    this.setState({variationArray: variations_attr_mix_value_array_json,
                    })
                }
                if(selectedThumbnail.length>0){
                    let photoId = [];
                    selectedThumbnail.map(pd=>{
                        photoId.push(`${pd.id}`);
                    })
                    this.props.selectedMedia({
                        photoId:photoId,
                        type:"edit_physical_product_thumbnail"
                    });
                    if (selectedThumbnail.length > 1-1) {
                        this.props.mediaLimit({
                            limit: 'exceed',
                            type:"edit_physical_product_thumbnail"
                        })
                    }
                    this.props.showMediaFile({
                        showFile: selectedThumbnail,
                        type:"edit_physical_product_thumbnail"
                    });
                }
                if(selectedGallery.length>0){
                    let photoId = [];
                    selectedGallery.map(pd=>{
                        photoId.push(`${pd.id}`);
                    })
                    this.props.selectedMedia({
                        photoId:photoId,
                        type:"edit_physical_product_gallery"
                    });
                    if (selectedGallery.length > 1-1) {
                        this.props.mediaLimit({
                            limit: 'exceed',
                            type:"edit_physical_product_gallery"
                        })
                    }
                    this.props.showMediaFile({
                        showFile: selectedGallery,
                        type:"edit_physical_product_gallery"
                    });
                }
                if(vats!==null){
                    let tax =  [];
                    vats.map(pd=>{
                        tax.push({value:pd.name,label:pd.name})
                    })
                    this.setState({
                        productTaxVariation:tax,
                        productVatTypes:tax
                    })
                }
                if(vats!==null){
                    vats.map(pd=>{
                        this.setState({
                            [pd.name]:pd.price,
                            [pd.name+"_type"]:pd.type
                        })
                    })
                }
                if(this.state.shipping_method==="product_wise"){
                    this.setState({
                        freeShipping:false,
                        flatShipping:false,
                        productWiseShipping:true
                    })
                }
                this.setState({
                    productName:productName,
                    productCategory:category,
                    productBrand:brand,
                    unit:unit,
                    min_qty:min_qty,
                    barcode:barcode,
                    productDescription:productDescription,
                    unit_price:unit_price,
                    purchase_price:purchase_price,
                    discount_price:discount_price,
                    stock_quantity:stock_quantity,
                    refundStatus:refundStatus,
                    replaceStatus:replaceStatus,
                    shippingFee:shippingFee,
                    sku:sku,
                    productVideoLink:productVideoLink,
                    metaTitle:metaTitle,
                    metaDescription:metaDescription,
                    productVideoProvider:productVideoProvider,
                    minimumStockQuantity:minimumStockQuantity,
                    showStockStatus:showStockStatus,
                    cashOnDelivery:cashOnDelivery,
                    featuredStatus:featuredStatus,
                    todaysDealStatus:todaysDealStatus,
                    productFlashDeal:productFlashDeal,
                    productFlashDealDiscountPrice:productFlashDealDiscountPrice,
                    shippingDays:shippingDays,
                    discountType:discountType,
                    productType:productType,
                    dataLoadingStatus:true,
                    status:status,
                    vatVariationField:0,
                })
            }
            else{
                this.setState({
                    pageNotFoundStatus:true
                })
            }
        });
    }
    onProductName(e){
        this.setState({
            productName:e.target.value
        })
    }
    onCategoryChange(e) {
        this.setState({productCategory: e.value});
    }
    onBrandChange(e) {
        this.setState({productBrand: e.value});
    }
    onUnitChange(e){
        this.setState({
            unit:e.target.value
        })
    }
    onMinimumQuantity(e){
        this.setState({
            min_qty: e.target.value
        })
    }
    handleTagsChange(e) {
        this.setState({productTags: e});
    };
    onBarcodeChange(e){
        this.setState({
            barcode:e.target.value
        })
    }
    productRefundStatus() {
        this.state.refundStatus === 0 ? this.setState({refundStatus: 1}) : this.setState({refundStatus: 0});
    }
    productReplaceStatus() {
        this.state.replaceStatus === 0 ? this.setState({replaceStatus: 1}) : this.setState({replaceStatus: 0});
    }
    onSelectedGalleryPhotos(e){
        let photos = e.file
        this.setState({
            selectedGalleryPhotos:photos
        })
    }
    onSelectedThumbnailPhotos(e){
        let photos = e.file
        this.setState({
            selectedThumbnailPhotos:photos
        })
    }
    onProductDescriptionChange(value) {
        this.setState({
            productDescription:value
        })
    }
    onVariationAttributesChange(e) {
        let tempVar = e;
        this.setState({productVariationAttributes: e});
        if(e.length == 0) {
            this.setState({variationsMix: []})
        }
        this.selectedVariationTypes = [];
        tempVar.forEach(vt => {
            this.selectedVariationTypes.push(vt['label']);
        })
    }
    changeVariationTypeStateValue(name, e) {
        this.setState({
            [name]:e
        })
        let tempVar = e;
        let tempArr = [];
        tempVar.forEach(tv => {
            tempArr.push(tv['label']);
        })
        let name_of_state = name+'_value';
        this.setState({
            [name_of_state]: tempArr
        })
        let tempMixUp = [];
        this.selectedVariationTypes.map((value, index) => {
            let variations = [];
            if(name == value) {
                variations.push(...tempArr);
            } else {
                let tempVar = this.state[value+'_value'];
                if(tempVar != null || tempVar != undefined) {
                    variations.push(...tempVar);
                }
            }
            if(tempMixUp.length == 0) {
                variations.map((value, index) => {
                    tempMixUp.push(value);
                })
            } else {
                let tempMixUpRevised = [];
                tempMixUp.map((value, index) => {
                    variations.map((value2, index) => {
                        tempMixUpRevised.push(value+"_"+value2);
                    })
                })
                tempMixUp = tempMixUpRevised;
            }
        })
        this.setState({variationsMix: tempMixUp});
        let tempVariationArray = [];
        tempMixUp.map((value, index) => {
            tempVariationArray.push(
                {
                    variation: value,
                    sku: null,
                    price: null,
                    stock: null,
                    image:null
                }
            )
        })
        this.setState({variationArray: tempVariationArray});
    }
    saveVariationTypesValue(variation,e) {
        this.setState({
            [variation]:e.target.value
        })
    }
    deleteVariationMix(variation) {
        let tempArr = this.state.variationsMix;
        let filtered = tempArr.filter((value) => {
            if(variation != value)
                return value;
        });
        this.setState({variationsMix: filtered});
        let tempVariationArray = this.state.variationArray;
        let newTempVariationArray = [];
        tempVariationArray.map((value, index) => {
            if(value['variation'] != variation) {
                newTempVariationArray.push(value);
            }
        })
        this.setState({variationArray: newTempVariationArray})
    }
    onUnitPriceChange(e){
        this.setState({
            unit_price:e.target.value
        })
    }
    onPurchasePriceChange(e){
        this.setState({
            purchase_price:e.target.value
        })
    }
    onDiscountChange(e){
        this.setState({
            discount_price:e.target.value
        })
    }
    onProductDiscountTypeChange(e) {
        this.setState({discountType: e.value});
    }
    onStockQuantity(e){
        this.setState({
            stock_quantity:e.target.value
        })
    }
    onSkuChange(e){
        this.setState({
            sku:e.target.value
        })
    }
    onVideoProviderChange(e) {
        this.setState({productVideoProvider: e.value});
    }
    onVideoLinkChange(e){
        this.setState({
            productVideoLink:e.target.value
        })
    }
    onSelectedPdfFile(e){
        let file = e.file
        this.setState({
            selectedPdf:file
        })
    }
    onMetaTitleChange(e){
        this.setState({
            metaTitle:e.target.value
        })
    }
    onMetaDescription(e){
        this.setState({
            metaDescription:e.target.value
        })
    }
    productCodStatus() {
        this.state.codStatus === 0 ? this.setState({codStatus: 1}) : this.setState({codStatus: 0});
    }
    productFreeShipping(e) {
        if(e.target.name=='free_shipping'){
            if(this.state.free_shipping==true){
                this.setState({
                    freeShipping:false,
                    flatShipping:false,
                    productWiseShipping:false,
                    shippingFee:0
                })
            }
            else{
                this.setState({
                    freeShipping:true,
                    flatShipping:false,
                    productWiseShipping:false,
                    shippingFee:0
                })
            }
        }
        if(e.target.name=='flat_shipping'){
            if(this.state.flat_shipping==true){
                this.setState({
                    freeShipping:false,
                    flatShipping:false,
                    productWiseShipping:false
                })
            }
            else{
                this.setState({
                    freeShipping:false,
                    flatShipping:true,
                    productWiseShipping:false
                })
            }
        }
        if(e.target.name=='product_wise_shipping'){
            if(this.state.productWiseShipping==true){
                this.setState({
                    freeShipping:false,
                    flatShipping:false,
                    productWiseShipping:false
                })
            }
            else{
                this.setState({
                    freeShipping:false,
                    flatShipping:false,
                    productWiseShipping:true
                })
            }
        }
    }
    onShippingFee(e){
        this.setState({
            shippingFee:e.target.value
        })
    }
    onMinimumQuantityAlert(e){
        this.setState({
            minimumStockQuantity:e.target.value
        })
    }
    productShowStockStatus() {
        this.state.showStockStatus == 1 ? this.setState({showStockStatus: 0}) : this.setState({showStockStatus: 1});
    }
    onCashOnDelivery(){
        this.state.cashOnDelivery === 0 ? this.setState({cashOnDelivery: 1}) : this.setState({cashOnDelivery: 0});
    }
    productFeaturedStatus() {
        this.state.featuredStatus === 0 ? this.setState({featuredStatus: 1}) : this.setState({featuredStatus: 0});
    }
    productTodaysDealStatus() {
        this.state.todaysDealStatus === 0 ? this.setState({todaysDealStatus: 1}) : this.setState({todaysDealStatus: 0});
    }
    onShippingDays(e){
        this.setState({
            shippingDays:e.target.value
        })
    }
    onVatTypesChange(vat) {
        this.setState({
            productVatTypes:vat
        })
        let productTaxVariation = [];
        vat.map(pd=>{
            productTaxVariation.push(
                { value: pd.value, label: pd.label}
            );
        })
        this.setState({
            productTaxVariation:productTaxVariation
        })
    }
    onVatVariableTypeChange(variable,e) {
        this.setState({
            [variable+"_type"]: e.value
        })
    }
    onVatTypeValueChange(vat, e) {
        this.setState({
            [vat]: e.target.value,
        });
    }
    onSubmitProduct() {
        let checkVatEmptyOrNot = false;
        this.state.productTaxVariation.map(pd=>{
            if((this.state[pd.label]===undefined || this.state[pd.label]==="" ) || (this.state[pd.label+"_type"]===undefined || this.state[pd.label+"_type"]==="")){
                checkVatEmptyOrNot = true
            }
        })
        let  checkProductVariationEmptyOrNot = false;
        let  checkProductVariationNumOrNot = false;
        this.state.variationArray.map((pd, i) => {
            if((this.state[pd.variation+"_price"]===undefined || this.state[pd.variation+"_price"]==="") || (this.state[pd.variation+"_stock"]===undefined || this.state[pd.variation+"_stock"]==="")){
                checkProductVariationEmptyOrNot = true
            }
            if(isNaN(this.state[pd.variation+"_price"]) || (/^-?[0-9]+$/.test(this.state[pd.variation+"_stock"]))!==true){
                checkProductVariationNumOrNot = true
            }
        })
        let selectedVariationTypesEmptyOrNot = false;
        this.selectedVariationTypes.map(vt=>{
            if(this.state[vt+'_value']===undefined){
                selectedVariationTypesEmptyOrNot = true
            }{
                if(this.state[vt+'_value']!==undefined){
                    if(this.state[vt+'_value'].length===0){
                        selectedVariationTypesEmptyOrNot = true
                    }
                }
            }
        })
        if (checkVatEmptyOrNot===false && checkProductVariationEmptyOrNot===false && checkProductVariationNumOrNot===false && selectedVariationTypesEmptyOrNot===false &&  this.validator.fieldValid('productName') &&
            this.validator.fieldValid('productCategory') &&
            this.validator.fieldValid('unit') &&
            this.validator.fieldValid('minimum_quantity') &&
            this.validator.fieldValid('thumbnailImage') &&
            this.validator.fieldValid('productDescription') &&
            this.validator.fieldValid('unit_price') &&
            this.validator.fieldValid('purchase_price') &&
            this.validator.fieldValid('stock_quantity') &&
            this.validator.fieldValid('shippingDays') &&
            this.validator.fieldValid('minimumQuantity')
        ){
            let productName =  this.state.productName;
            let productCategory = this.state.productCategory;
            let productBrand =  this.state.productBrand;
            let unit  = this.state.unit;
            let productMinQnt = this.state.min_qty;
            let tag  = this.state.productTags;
            let tags = [];
            if(tag !== ''){
                tag.map(pd=>{
                    tags.push(pd.value);
                });
            }
            let barcode  = this.state.barcode;
            let refundStatus =  this.state.refundStatus;
            let replaceStatus =  this.state.replaceStatus;
            let selectedGalleryPhotos =  this.props.dynamicData['selected_for_edit_physical_product_gallery']!==undefined ? this.props.dynamicData['selected_for_edit_physical_product_gallery']: null
            let selectedThumbnailPhotos = this.props.dynamicData['selected_for_edit_physical_product_thumbnail']!==undefined ? this.props.dynamicData['selected_for_edit_physical_product_thumbnail']: null
            let productDescription =  this.state.productDescription;
            let unit_price =  this.state.unit_price;
            let purchase_price =  this.state.purchase_price;
            let discount_price = this.state.discount_price;
            let discountType =  this.state.discountType!=="" ? this.state.discountType : "flat";
            let stock_quantity =  this.state.stock_quantity!==""?this.state.stock_quantity:1;
            let sku_number = this.state.sku;
            let productVideoProvider =  this.state.productVideoProvider;
            let productVideoLink =  this.state.productVideoLink;
            let metaTitle =  this.state.metaTitle;
            let metaDescription =  this.state.metaDescription;
            let shippingFee =  this.state.shippingFee;
            let minimumStockQuantity =  this.state.minimumStockQuantity;
            let showStockStatus =  this.state.showStockStatus;
            let cashOnDelivery =  this.state.cashOnDelivery;
            let featuredStatus =  this.state.featuredStatus;
            let todaysDealStatus =  this.state.todaysDealStatus;
            let shippingDays =  this.state.shippingDays;
            let productVatTypes =  this.state.productVatTypes;
            let tax = [];
            if(productVatTypes.length>0){
                productVatTypes.map(pd=>{
                    tax.push({
                        name:pd.value,
                        price:this.state[pd.label],
                        type:this.state[pd.label+"_type"],
                    })
                })
            }
            let variations = [];
            let variations_attr = [];
            let variations_attr_mix = [];
            let variations_attr_mix_value = [];
            let variations_attr_mix_value_final = [];
            if(this.selectedVariationTypes.length > 0) {
                this.selectedVariationTypes.map((value, index) => {
                    variations.push(value);
                    let tempValue = this.state[value+'_value'];
                    variations_attr.push({
                        variation: value,
                        attributes: tempValue
                    })
                    variations_attr_mix = this.state.variationsMix;
                    this.state.variationArray.map(pd=>{
                        variations_attr_mix_value.push(
                            {
                                variation:pd.variation,
                                price:this.state[pd.variation+"_price"],
                                sku:this.state[pd.variation+"_sku"]!==undefined ? this.state[pd.variation+"_sku"] : "",
                                stock:this.state[pd.variation+"_stock"],
                                image:this.props.dynamicData['selected_for_'+pd.variation+"_image"]!==undefined ? this.props.dynamicData['selected_for_'+pd.variation+"_image"][0]: ""
                            });
                    });
                    variations_attr_mix_value.map(pd=>{
                        variations_attr_mix_value_final.push({
                            variation:pd.variation,
                            price:pd.price,
                            sku:pd.sku,
                            stock:pd.stock,
                            image:pd.image!==undefined ? pd.image:""
                        });
                    })
                });
            }
            this.setState({
                loadingBtn:true
            })
            const data =
                {
                    'id':this.state.id,
                    'productName' :  productName,
                    'productCategory' :  productCategory,
                    'productBrand' :   productBrand,
                    'unit'  : unit,
                    'productMinQnt' : productMinQnt,
                    'tags' :  tags,
                    'barcode'  : barcode,
                    'refundStatus' :  refundStatus,
                    'replaceStatus' :  replaceStatus,
                    'selectedGalleryPhotos' :  selectedGalleryPhotos,
                    'selectedThumbnailPhotos' :  selectedThumbnailPhotos,
                    'productDescription' :  productDescription,
                    'variations' : variations,
                    'variations_attr' : variations_attr ,
                    'variations_attr_mix' : variations_attr_mix,
                    'variations_attr_mix_value' :variations_attr_mix_value_final,
                    'unit_price' : unit_price,
                    'purchase_price' :  purchase_price,
                    'discount_price':discount_price,
                    'discountType' : discountType,
                    'stock_quantity' :  stock_quantity,
                    'sku_number' :sku_number,
                    'productVideoProvider' :  productVideoProvider,
                    'productVideoLink' : productVideoLink,
                    'metaTitle'  :  metaTitle,
                    'metaDescription'  :  metaDescription,
                    'shippingFee'  :  shippingFee,
                    'minimumStockQuantity'  :  minimumStockQuantity,
                    'showStockStatus'  :  showStockStatus,
                    'cashOnDelivery'  :  cashOnDelivery,
                    'featuredStatus' :  featuredStatus,
                    'shippingDays' : shippingDays,
                    'todaysDealStatus':todaysDealStatus,
                    'vat' : tax,
                    'seller_product':1
                }
            Api().post('update-product',data).then(res=>{
                if(res.data===1){
                    window.scroll(0,0)

                    alert('success','Product has been updated successfully!');

                    this.setState({
                        loadingBtn:false
                    })
                }
                else{

                   alert('warning','Something went wrong!');


                    this.setState({
                        loadingBtn:false
                    })
                }
            }).catch()
        }else{
            window.scroll(0,0);
            this.validator.showMessageFor("productName");
            this.validator.showMessageFor("productCategory");
            this.validator.showMessageFor('unit');
            this.validator.showMessageFor("minimum_quantity");
            this.validator.showMessageFor('thumbnailImage');
            this.validator.showMessageFor('productDescription');
            this.validator.showMessageFor("unit_price");
            this.validator.showMessageFor("purchase_price");
            this.validator.showMessageFor("stock_quantity");
            this.validator.showMessageFor("minimumQuantity");
            this.validator.showMessageFor("shippingDays");
            this.forceUpdate();
        }
    }
    handle(value) {
        this.setState({
            props: value
        });
    }

    render() {
        const { editorState } = this.state;
        let activeCategories = [];
        let category = [];
        if(this.state.activeCategories != null) {
            let tempActiveCategories = Array.from(this.state.activeCategories);
            tempActiveCategories.map(tempActiveCategories => {
                if(tempActiveCategories['level'] == 0) {
                    activeCategories.push({value: tempActiveCategories['id'], label: tempActiveCategories['name'], level: tempActiveCategories['level']});
                }else if(tempActiveCategories['level'] == 1) {
                    activeCategories.push({value: tempActiveCategories['id'], label: "—— "+tempActiveCategories['name'], level: tempActiveCategories['level']});
                } else {
                    activeCategories.push({value: tempActiveCategories['id'], label: "———— "+tempActiveCategories['name'], level: tempActiveCategories['level']});
                }
            })
        }
        activeCategories.map(pd=>{
            if(pd.value==this.state.productCategory){
                category.push({
                    value:pd.value,label:pd.label
                })
            }
        })
        let activeBrands = [];
        let brand = [];
        if(this.state.activeBrands != null) {
            let tempActiveBrands = Array.from(this.state.activeBrands);
            tempActiveBrands.map(tempActiveBrands => {
                activeBrands.push({value: tempActiveBrands['id'], label: tempActiveBrands['name']});
            })
        }
        activeBrands.map(pd=>{
            if(pd.value===this.state.productBrand){
                brand.push({value:pd.value,label:pd.label});
            }
        })
        let videoProvider = [];
        let videoProviders = [
            {value: 'youtube', label:'Youtube'},
            {value: 'dailymotion', label: 'Dailymotion'},
            {value: 'vimeo', label: 'Vimeo'}
        ]
        if(this.state.productVideoProvider!==null){
            videoProviders.map(pd=>{
                if(pd.value===this.state.productVideoProvider){
                    videoProvider.push({value:pd.value,label:pd.label})
                }
            })
        }
        const editorConfiguration = {
            toolbar: [ 'heading', '|', 'Alignment', 'bold', 'italic' , 'link', 'bulletedlist', 'numberedlist', 'undo', 'redo', '|', 'insertImage', 'mediaEmbed', 'blockquote', 'insertTable', 'indent', 'outdent']
        };
        let activeFlashDeals = [];
        let discountType = [];
        let discountTypes = [
            {value: 'flat', label: "Flat"},
            {value: 'percent', label: "Percent"}
        ];
        if(this.state.discountType!==null){
            discountTypes.map(pd=>{
                if(this.state.discountType==pd.value){
                    discountType.push({value: pd.value, label: pd.label,});
                }
            })
        }
        let vatTypes = [];
        if(this.state.vatTypes != null) {
            let tempVatTypes = Array.from(this.state.vatTypes);
            tempVatTypes.map(tempVatTypes => {
                vatTypes.push({value: tempVatTypes['name'], label: tempVatTypes['name']})
            })
        }
        let variationAttributes = [];
        if(this.state.variationAttributes != null) {
            let tempVariationAttributes = Array.from(this.state.variationAttributes);
            tempVariationAttributes.map(tempVariationAttributes => {
                variationAttributes.push({value: tempVariationAttributes['id'], label: tempVariationAttributes['name']});
            })
        }
        let vat = [];
        if(this.selectedVatTypes.length > 0) {
            this.selectedVatTypes.map(pd => {
                vat.push({
                    name: pd,
                    price: this.state[pd],
                    type: this.state[pd+"_type"]
                })
            })
        }
        let checkVatEmptyOrNot = false;
        this.state.productTaxVariation.map(pd=>{
            if((this.state[pd.label]===undefined || this.state[pd.label]==="" ) || (this.state[pd.label+"_type"]===undefined || this.state[pd.label+"_type"]==="")){
                checkVatEmptyOrNot = true
            }
        })
        let  checkProductVariationEmptyOrNot = false;
        let  checkProductVariationNumOrNot = false;
        this.state.variationArray.map((pd, i) => {
            if((this.state[pd.variation+"_price"]===undefined || this.state[pd.variation+"_price"]==="") || (this.state[pd.variation+"_stock"]===undefined || this.state[pd.variation+"_stock"]==="")){
                checkProductVariationEmptyOrNot = true
            }
            if(isNaN(this.state[pd.variation+"_price"]) || (/^-?[0-9]+$/.test(this.state[pd.variation+"_stock"]))!==true){
                checkProductVariationNumOrNot = true
            }
        })
        let selectedVariationTypesEmptyOrNot = false;
        this.selectedVariationTypes.map(vt=>{
            if(this.state[vt+'_value']===undefined){
                selectedVariationTypesEmptyOrNot = true
            }{
                if(this.state[vt+'_value']!==undefined){
                    if(this.state[vt+'_value'].length===0){
                        selectedVariationTypesEmptyOrNot = true
                    }
                }
            }
        })

        if(this.state.productType!=="physical"){
             Router.push("/seller-products")

        }
        if(this.state.pageNotFoundStatus==true){

            Router.push("/seller-products")

        }

        return (
            <Fragment>
                <Row>
                    <Col lg={8}>
                        <div>
                            <div className="card">
                                <div className="card-body text-left">
                                    <div className="p-3">
                                        <Form.Group>
                                            <Form.Label className="inputBoxTitle">Product Name*</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Form.Control className="inputTextSize inputBoxSize" value={this.state.productName} required={true} onChange={(e)=>this.onProductName(e)} type="text"  placeholder="Enter product title"/>
                                                <p className="text-danger my-2"> {this.validator.message('productName', this.state.productName, 'required')}</p>
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label className="inputBoxTitle">Product Category*</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Select
                                                    data-product-add="category"
                                                    value={category}
                                                    onChange={this.onCategoryChange}
                                                    options={activeCategories}
                                                    isSearchable={true}
                                                />
                                            </ReactPlaceholder>
                                            <div className="text-danger my-2"> {this.validator.message('productCategory', this.state.productCategory, 'required')}</div>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label className="inputBoxTitle">Brand</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Select
                                                    value={brand}
                                                    onChange={this.onBrandChange}
                                                    options={activeBrands}
                                                    isSearchable={true}
                                                />
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="inputBoxTitle">Unit  <span className="requiredMark" title="Required">*</span></Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Form.Control className="inputTextSize inputBoxSize" value={this.state.unit} onChange={(e)=>this.onUnitChange(e)} type="text"  name="unit" placeholder="Enter Product unit (exp: kg,gm,pc,l etc)" />
                                                <div className="text-danger my-2"> {this.validator.message('unit', this.state.unit, 'required|String')}</div>
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label className="inputBoxTitle">Minimum Quantity <span className="requiredMark" title="Required">*</span></Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Form.Control className="inputTextSize inputBoxSize" value={this.state.min_qty} onChange={(e)=>this.onMinimumQuantity(e)} type="text"  name="min_qty" placeholder="Enter minimum product quantity" />
                                                <div className="text-danger my-2"> {this.validator.message('minimum_quantity', this.state.min_qty, 'required|numeric')}</div>
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label className="inputBoxTitle">Tags</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <CreatableSelect
                                                    data-category-add="tags"
                                                    isMulti
                                                    value={this.state.productTags}
                                                    onChange={this.handleTagsChange}
                                                    placeholder="tags_placeholder"
                                                />
                                                <Form.Text className="text-muted hd-info-text">
                                                    Will be used for better search result
                                                </Form.Text>
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="inputBoxTitle">Barcode</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Form.Control className="inputTextSize inputBoxSize" value={this.state.barcode} onChange={(e)=>this.onBarcodeChange(e)} type="text"  name="barcode" placeholder="Enter product bar code" />
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="inputBoxTitle">Refundable</Form.Label><br/>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                {this.state.refundDays===undefined ?
                                                    <Fragment>
                                                        <Switch
                                                            className="editProductSwitch"
                                                            checked={false}
                                                            color="primary"
                                                        />
                                                    </Fragment>
                                                    :this.state.refundDays===0 ?
                                                        <Fragment>
                                                            <Switch
                                                                className="editProductSwitch"
                                                                checked={false}
                                                                onChange={this.productRefundStatus}
                                                                name="refund"
                                                                data-product-add="refund"
                                                                color="primary"
                                                            />
                                                            <Form.Text className="text-muted hd-info-text">
                                                                Refund option is disabled by admin.
                                                            </Form.Text>
                                                        </Fragment> :
                                                        <Fragment>
                                                            <Switch
                                                                className="editProductSwitch"
                                                                checked={Boolean(this.state.refundStatus)}
                                                                onChange={this.productRefundStatus}
                                                            />
                                                            <Form.Text className="text-muted hd-info-text">
                                                                if you enable refund then with in {this.state.refundDays} days customer can claim for refund.
                                                            </Form.Text>
                                                        </Fragment>
                                                }
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="inputBoxTitle">Replaceable</Form.Label><br/>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                {this.state.replaceDays===undefined ?
                                                    <Switch className="editProductSwitch" checked={false}/>
                                                    :
                                                    this.state.replaceDays===0 ?
                                                        <Fragment>
                                                            <Switch className="editProductSwitch" checked={false}/>
                                                            <Form.Text className="text-muted hd-info-text">Replace is disabled by admin.</Form.Text>
                                                        </Fragment>
                                                        :
                                                        <Fragment>
                                                            <Switch
                                                                className="editProductSwitch"
                                                                checked={Boolean(this.state.replaceStatus)}
                                                                onChange={this.productReplaceStatus}
                                                            />
                                                            <Form.Text className="text-muted hd-info-text">If you enabled this then with in {this.state.replaceDays} days customer can replace this product.</Form.Text>
                                                        </Fragment>
                                                }
                                            </ReactPlaceholder>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title hd-card-title hdFontWeightBold">Product Image</h6>
                                </div>
                                <div className="card-body">
                                    <div className="p-3 text-left">
                                        <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                            <MediaUpload  title="Product gallery"
                                                          note="These images are visible in product details page gallery. Use 400x600 sizes images."
                                                          multipleFile={true}
                                                          type="edit_physical_product_gallery"
                                                          for="product_gallery"
                                                          fileType="photo"
                                                          limit={5}
                                                          widthSize={600}
                                                          heightSize={600}
                                            />
                                        </ReactPlaceholder>
                                        <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                            <MediaUpload required={true}
                                                         title="Product thumbnail"
                                                         note="This image is visible in all product box. Use 400x600 sizes image. Keep some blank space around main object of your image as we had to crop some edge in different devices to make it responsive.."
                                                         multipleFile={true}
                                                         type="edit_physical_product_thumbnail"
                                                         for="product_thumbnail" fileType="photo"  limit={1} widthSize={600} heightSize={600}    />
                                            <p className="text-danger my-2"> {this.validator.message('thumbnailImage',this.props.dynamicData['selected_for_edit_physical_product_thumbnail'], 'required')}</p>
                                        </ReactPlaceholder>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Product Description<span className="requiredMark" title="Required">*</span></h6>
                                </div>
                                <div className="card-body text-left">
                                    <Form.Group className="p-3 joditEditorText">
                                        <ReactPlaceholder type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0'>
                                            <TextEditor
                                                className="inputTextSize"
                                                value={this.state.productDescription}
                                                tabIndex={1}
                                                onBlur={(newContent) => this.onProductDescriptionChange(newContent)}
                                                onChange={(newContent) => this.onProductDescriptionChange(newContent)}
                                            />
                                        </ReactPlaceholder>
                                        <div className="text-danger my-2"> {this.validator.message('productDescription', this.state.productDescription, 'required|string')}</div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Product variation</h6>
                                </div>
                                <div className="card-body text-left">
                                    <div className="p-3">
                                        <Form.Group>
                                            <Form.Label className="hdLabelBold">{('Variation')} {('attributes')}</Form.Label>
                                            <ReactPlaceholder type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0'>
                                                <Select
                                                    data-category-add="variation_attributes"
                                                    isMulti
                                                    value={this.state.productVariationAttributes}
                                                    onChange={this.onVariationAttributesChange}
                                                    options={variationAttributes}
                                                />
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        {this.state.productVariationAttributes != null ?
                                            this.selectedVariationTypes.map((vt, i) => {
                                                return (
                                                    <Form.Group key={vt}>
                                                        <Form.Label className="hdLabelBold">{vt}</Form.Label>
                                                        <CreatableSelect
                                                            data-category-add={"variationType_"+vt}
                                                            isMulti
                                                            value={ this.state[vt] }
                                                            onChange={(e) => {
                                                                this.changeVariationTypeStateValue(vt, e)
                                                            }}
                                                        />
                                                    </Form.Group>
                                                )
                                            })
                                            : ""}
                                        {selectedVariationTypesEmptyOrNot &&
                                            <p className="text-danger my-2">Product variation attribute field is required</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title">Product price and Stock</h6>
                                </div>
                                <div className="card-body text-left">
                                    <div className="p-3">
                                        <Form.Group>
                                                <Form.Label className="hdLabelBold">{('Unit price')} <span className="requiredMark" title={('Field is required')}>*</span></Form.Label>
                                              <ReactPlaceholder type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0'>
                                                <Form.Control value={this.state.unit_price} type="text" data-product-add="unit_price" name="unit_price" onChange={(e) => this.onUnitPriceChange(e)}  placeholder={('Enter product unit price')} />
                                                <p className="text-danger my-2"> {this.validator.message('unit_price', this.state.unit_price, 'required|numeric')}</p>
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group>
                                                <Form.Label className="hdLabelBold">{('Purchase price')}</Form.Label>
                                            <ReactPlaceholder type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0'>
                                                <Form.Control value={this.state.purchase_price} type="text" data-product-add="purchase_price" name="purchase_price" onChange={this.onPurchasePriceChange} placeholder={('Enter product purchase price')} />
                                                <p className="text-danger my-2"> {this.validator.message('purchase_price', this.state.purchase_price, 'currency')}</p>
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="hdLabelBold">{('Discount')}</Form.Label>
                                            <ReactPlaceholder type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0'>
                                                <Form.Control value={this.state.discount_price} type="text" data-product-add="discount" name="discount" onChange={(e)=>this.onDiscountChange(e)} placeholder={('Enter discount')} />
                                                <p className="text-danger my-2"> {this.validator.message('discount_price', this.state.discount_price, 'numeric')}</p>
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="hdLabelBold">{('Discount')} {('type')}</Form.Label>
                                            <ReactPlaceholder type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0'>
                                                <Select
                                                    data-category-add="discount"
                                                    value={discountType}
                                                    onChange={this.onProductDiscountTypeChange}
                                                    options={discountTypes}
                                                />
                                                {this.state.discount_price>0 &&    <p className="text-danger my-2"> {this.validator.message('discountType', this.state.discountType, 'required')}</p> }
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        {this.state.productVariationAttributes != null && this.state.variationsMix != null ?
                                            this.state.productVariationAttributes.length != 0 ?
                                                <Form.Group>
                                                    <Table striped bordered hover responsive>
                                                        <thead>
                                                        <tr>
                                                            <th>{('Variation')}</th>
                                                            <th>{('Sku')}</th>
                                                            <th>{('Price')}</th>
                                                            <th>{('Stock')}</th>
                                                            <th>{('Image')}</th>
                                                            <th>{('Option')}</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.dataLoadingStatus &&
                                                            <Fragment>
                                                                {this.state.variationsMix.map((vm, i) => {
                                                                    return (
                                                                        <tr key={vm}>
                                                                            <td>{vm}</td>
                                                                            <td>{<input type="text"  className="form-control"  onChange={(e) => this.saveVariationTypesValue(vm+"_sku", e)} value={this.state[vm+"_sku"]} name={vm+"_sku"}/>}</td>
                                                                            <td>{<input type="text" className="form-control" onChange={(e) => this.saveVariationTypesValue(vm+"_price", e)} value={this.state[vm+"_price"]} name={vm+"_price"}/>}</td>
                                                                            <td>{<input type="text" className="form-control"  onChange={(e) => this.saveVariationTypesValue(vm+"_stock", e)} value={this.state[vm+"_stock"]} name={vm+"_stock"}/>}</td>
                                                                            <td  className="variation_table_thumbnail">{<MediaUpload required={true} multipleFile={true} type={vm+"_image"} for="product_variation"  limit={1} widthSize={600} heightSize={600} productVariation={true} fetchData={this.state[vm+"_image"]}  />} </td>
                                                                            <td><Button className="hd-option-btn btn-danger" onClick={() => this.deleteVariationMix(vm)}><i className="fad fa-trash-alt hd-option-icon"></i></Button></td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </Fragment>
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Form.Group> :
                                                <Fragment>
                                                    <Form.Group>
                                                        <Form.Label className="hdLabelBold">{('Stock')} {('quantity')}<span className="requiredMark"  title={('Field is required')}>*</span> </Form.Label>
                                                        {this.selectedVariationTypes.length>0 ?
                                                            <Form.Control value="1" type="text" data-product-add="stock" name="stock" onChange={(e) => this.onStockQuantity(e)} placeholder={('Enter stock quantity')} />
                                                            :
                                                            <Fragment>
                                                                <Form.Control value={this.state.stock_quantity} type="text" data-product-add="stock" name="stock" onChange={(e) => this.onStockQuantity(e)} placeholder={('Enter stock quantity')} />
                                                                <p className="text-danger my-2"> {this.validator.message('stock_quantity', this.state.stock_quantity, 'numeric')}</p>
                                                            </Fragment>
                                                        }
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label className="hdLabelBold">{('Sku')} {('number')} </Form.Label>
                                                        <Form.Control value={this.state.sku} type="text"  onChange={(e) => this.onSkuChange(e)} placeholder={('Enter sku number')} />
                                                        <p className="text-danger my-2"> {this.validator.message('sku', this.state.sku, 'alpha_num')}</p>
                                                    </Form.Group>
                                                </Fragment>
                                            :   <Fragment>
                                                <Form.Group>
                                                    <Form.Label className="hdLabelBold">{('Stock')} {('quantity')}<span className="requiredMark"  title={('Field is required')}>*</span> </Form.Label>
                                                    {this.selectedVariationTypes.length>0 ?
                                                        <Form.Control value="1" type="text" data-product-add="stock" name="stock" onChange={(e) => this.onStockQuantity(e)} placeholder={('Enter stock quantity')} />
                                                        :
                                                        <Fragment>
                                                            <Form.Control value={this.state.stock_quantity} type="text" data-product-add="stock" name="stock" onChange={(e) => this.onStockQuantity(e)} placeholder={('Enter stock quantity')} />
                                                            <p className="text-danger my-2"> {this.validator.message('stock_quantity', this.state.stock_quantity, 'numeric')}</p>
                                                        </Fragment>
                                                    }
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="hdLabelBold">{('Sku')} {('number')} </Form.Label>
                                                    <Form.Control value={this.state.sku} type="text"  onChange={(e) => this.onSkuChange(e)} placeholder={('Enter sku number')} />
                                                    <p className="text-danger my-2"> {this.validator.message('sku', this.state.sku, 'alpha_num')}</p>
                                                </Form.Group>
                                            </Fragment>}
                                        {checkProductVariationEmptyOrNot &&
                                            <p className="text-danger my-2">Product variation field is required</p>
                                        }
                                        {(checkProductVariationEmptyOrNot==false && checkProductVariationNumOrNot) &&
                                            <p className="text-danger my-2"> product variation field should be number</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title ">Product video</h6>
                                </div>
                                <div className="card-body text-left">
                                    <div className="p-3">
                                        <Form.Group>
                                            <Form.Label className="inputBoxTitle">Video provider</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Select
                                                    data-category-add="video_provider"
                                                    value={videoProvider}
                                                    onChange={this.onVideoProviderChange}
                                                    options={videoProviders}
                                                />
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label className="inputBoxTitle">Video link</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                               <Form.Control className="inputTextSize inputBoxSize" value={this.state.productVideoLink} onChange={(e)=>this.onVideoLinkChange(e)} type="text" data-product-add="video_link" name="video_link" placeholder="Enter product video link" />
                                            </ReactPlaceholder>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Product meta data</h6>
                                </div>
                                <div className="card-body">
                                    <div className="p-3 text-left">
                                        <Form.Group >
                                            <Form.Label className="inputBoxTitle">Meta title</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Form.Control className="inputTextSize inputBoxSize" value={this.state.metaTitle} onChange={(e)=>this.onMetaTitleChange(e)} type="text" data-product-add="meta_title" name="meta_title" placeholder="Enter product meta title" />
                                            </ReactPlaceholder>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label className="hdLabelBold inputBoxTitle">Meta description</Form.Label>
                                            <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                                <Form.Control className="inputTextSize inputBoxSize" value={this.state.metaDescription} onChange={(e)=>this.onMetaDescription(e)} as="textarea" rows={4} data-product-add="meta_description" name="meta_description" placeholder="Enter product meta description" />
                                            </ReactPlaceholder>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title ">Shipping fee</h6>
                                </div>
                                <div className="card-body p-3">
                                        <div className="p-3 text-left">
                                            <ReactPlaceholder type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0'>
                                              {this.state.shipping_method==='product_wise'  ?
                                                 <Fragment>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label className="hdLabelBold">{('Free')} {('shipping')}</Form.Label>
                                                        <Switch
                                                            checked={this.state.freeShipping}
                                                            onChange={this.productFreeShipping}
                                                            name="free_shipping"
                                                            data-product-add="free_shipping"
                                                            color="primary"
                                                        /><br/>
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label className="hdLabelBold">{('Product wise')} {('shipping')}</Form.Label>
                                                        <Switch
                                                            checked={this.state.productWiseShipping}
                                                            onChange={this.productFreeShipping}
                                                            name="product_wise_shipping"
                                                            data-product-add="product_wise_shipping"
                                                            color="primary"
                                                        /><br/>
                                                        {this.state.productWiseShipping===true &&  <Fragment><Form.Control onChange={(e)=>this.onShippingFee(e)} value={this.state.shippingFee} type="text" data-product-add="shipping_fees" name="shipping_fees" placeholder={('Enter shipping fees')} />   </Fragment>   }
                                                        <Form.Text className="text-muted hd-info-text">
                                                            {('If free shipping is activated fee will be 0. If area wise shipping is enable don\'t need to add shipping cost. If flat shipping is enabled don\'t need to add shipping cost add it inshop profile. If product wise shipping is enabled add your shipping fee.')}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Fragment>
                                                 : this.state.shipping_method ==='seller_wise_flat' ?
                                                    <Fragment>
                                                        <span> {('Seller wise flat rate is enable.If you want to change shipping method,Please go to shipping configuration and change it')}</span>
                                                    </Fragment> : this.state.shipping_method == undefined ?
                                                        <span></span>:
                                                        <span> {('Flat rate shipping is enable. If you want to change shipping method,Please go to shipping configuration and change it')}</span>
                                             }
                                             <p className="text-danger my-2"> {this.validator.message('shippingFee', this.state.shippingFee, 'currency')}</p>
                                            </ReactPlaceholder>
                                        </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Low Stock Warning</h6>
                                </div>
                                <div className="card-body text-left">
                                    <Form.Group className="p-3">
                                        <Form.Label className="inputBoxTitle">Minimum quantity</Form.Label>
                                        <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                            <Form.Control className="inputTextSize inputBoxSize" value={this.state.minimumStockQuantity} onChange={(e)=>this.onMinimumQuantityAlert(e)} type="text"  placeholder="Enter minimum quantity"/>
                                            <p className="text-danger my-2"> {this.validator.message('minimumQuantity', this.state.minimumStockQuantity, 'numeric')}</p>
                                            <Form.Text className="text-muted hd-info-text ">
                                                Product Minimum Quantity to Show Stock Warning!
                                            </Form.Text>
                                        </ReactPlaceholder>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Show Product Stock Quantity</h6>
                                </div>
                                <div className="card-body ">
                                    <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                        <Form.Group>
                                            <Switch
                                                className="editProductSwitch"
                                                checked={Boolean(this.state.showStockStatus)}
                                                onChange={(e)=>this.productShowStockStatus(e)}
                                                name="showStockQuantity"
                                                data-product-add="showStockQuantity"
                                                color="primary"
                                            />
                                            <Form.Text className="text-muted hd-info-text p-1">
                                                If you active this option your stock quantity will be shown in product page
                                            </Form.Text>
                                        </Form.Group>
                                    </ReactPlaceholder>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Cash on Delivery</h6>
                                </div>
                                <div className="card-body">
                                    <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                        <Form.Group>
                                            <Switch
                                                className="editProductSwitch"
                                                checked={Boolean(this.state.cashOnDelivery)}
                                                onChange={this.onCashOnDelivery}
                                                name="cod"
                                                data-product-add="cod"
                                                color="primary"
                                            />
                                            <Form.Text className="text-muted hd-info-text p-1">
                                                If this configuration is off Cash on Delivery for this product will be inactive
                                            </Form.Text>
                                        </Form.Group>
                                    </ReactPlaceholder>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Featured</h6>
                                </div>
                                <div className="card-body">
                                    <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                        <Form.Group>
                                            <Switch
                                                className="editProductSwitch"
                                                checked={Boolean(this.state.featuredStatus)}
                                                onChange={this.productFeaturedStatus}
                                                name="featured"
                                                data-product-add="featured"
                                                color="primary"
                                            />
                                            <Form.Text className="text-muted hd-info-text p-1">
                                                If this configuration is on, this product will be shows on seller featured product
                                            </Form.Text>
                                        </Form.Group>
                                    </ReactPlaceholder>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6 className="card-title">Estimated Shipping Time</h6>
                                </div>
                                <div className="card-body text-left">
                                    <Form.Group  className="p-3">
                                        <Form.Label className="inputBoxTitle">Shipping days<span className="requiredMark" title="Required">*</span></Form.Label>
                                        <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                           <InputGroup>
                                            <FormControl
                                                className="inputTextSize inputBoxSize"
                                                placeholder="Enter shipping days"
                                                name="shipping_time"
                                                value={this.state.shippingDays}
                                                onChange={(e)=>this.onShippingDays(e)}
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text className="upLoadBtnText">Days</InputGroup.Text>
                                            </InputGroup.Append>
                                            <div className="text-danger my-2"> {this.validator.message('shippingDays', this.state.shippingDays, 'required|numeric')}</div>
                                        </InputGroup>
                                        </ReactPlaceholder>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header p-3">
                                    <h6>Vat and tax</h6>
                                </div>
                                <div className="card-body p-2 text-left">
                                    <Form.Group className="p-3">
                                        <Form.Label>Vat type</Form.Label>
                                        <ReactPlaceholder  type='text' ready={this.state.dataLoadingStatus} row={2} color='#E0E0E0' >
                                            <Select
                                                isMulti
                                                value={this.state.productVatTypes}
                                                onChange={(e)=>this.onVatTypesChange(e)}
                                                options={vatTypes}
                                            />
                                        </ReactPlaceholder>
                                    </Form.Group>
                                    {this.state.productTaxVariation.length>0 &&
                                        <Fragment>
                                            <Fragment>
                                                <div className="row p-3">
                                                    {this.state.productTaxVariation.map((pd,i)=>{
                                                        return <Fragment>
                                                            <Col lg={7}>
                                                                <Form.Group>
                                                                    <Form.Label>{pd.label}</Form.Label>
                                                                    <Form.Control value={this.state[pd.label]} type="text" onChange={(e) => this.onVatTypeValueChange(pd.label, e)}  placeholder="Enter  amount"  />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={5}>
                                                                <Form.Group>
                                                                    <Form.Label>{("Types")}</Form.Label>
                                                                    <Select
                                                                        value = {
                                                                            discountTypes.filter(option =>
                                                                                option.value == this.state[pd.label+"_type"])
                                                                        }
                                                                        data-category-add="vat_variable_types"
                                                                        onChange={(e)=>this.onVatVariableTypeChange(pd.label,e)}
                                                                        options={discountTypes}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Fragment>
                                                    })}
                                                </div>
                                            </Fragment>
                                            {checkVatEmptyOrNot &&
                                                <p className="text-danger my-2">{("Product tax variation is required")}</p>
                                            }
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="text-right" lg={12}>
                        {this.state.dataLoadingStatus ?
                            <Fragment>
                                {this.state.loadingBtn ?
                                    <Button className="float-right"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                        Loading...
                                    </Button> :
                                    <Button variant="success" type="submit" onClick={this.onSubmitProduct}>
                                        Update
                                    </Button>
                                }
                            </Fragment>:
                            <Fragment>
                                <Button disabled variant="success" type="submit" onClick={this.onSubmitProduct}>
                                    Update
                                </Button>
                            </Fragment>
                        }
                    </Col>
                </Row>
            </Fragment>
        )

    }
}


const mapDispatchToProps = {
    selectedMedia,
    showMediaFile,
    mediaLimit
};

function mapStateToProps(state) {
    const dynamicData = state.mediaReducer;
    return {
        dynamicData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProductEditPart);



