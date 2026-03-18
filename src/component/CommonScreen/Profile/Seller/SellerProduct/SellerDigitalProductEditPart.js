import React, { PureComponent, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import SimpleReactValidator from 'simple-react-validator';
import Api from "../../../../../ClientApi/Api";
import ReactPlaceholder from "react-placeholder";
import {mediaLimit, selectedMedia, showMediaFile} from "../../../../../services/actions/mediaAction";
import {connect} from "react-redux";
import Router from "next/router";
import {alert} from "../../../../../services/common";
import dynamic from "next/dynamic"
import MediaUpload from "../../../Media/MediaUpload";
import MediaFile from "../../../Media/MediaFile";
const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false })

class SellerDigitalProductEditPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            codStatus: 1,
            productName:'',
            productCategory:'',
            min_qty:1,
            productTags:'',
            barcode:'',
            productDescription:'',
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
            productVatTypes:'',
            tempVariation:[],
            productTaxVariation: [],
            SelectProductVariationType: [],
            status:0,
            dataLoadingStatus:false,
            thumbnailPhotoLimit:1,
            galleryPhotosLimit:5,
            productFileLimit:1,
            productType:'digital',
            loadingBtn:false,
            loading:false,
            id:""
        };
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.onVideoProviderChange = this.onVideoProviderChange.bind(this);
        this.onProductDescriptionChange = this.onProductDescriptionChange.bind(this);
        this.productCodStatus = this.productCodStatus.bind(this);
        this.onProductDiscountTypeChange = this.onProductDiscountTypeChange.bind(this);
        this.saveVariationTypesValue = this.saveVariationTypesValue.bind(this);
        this.onSubmitProduct = this.onSubmitProduct.bind(this);
        this.onVatTypesChange = this.onVatTypesChange.bind(this);
        this.onProductName = this.onProductName.bind(this);
        this.onBarcodeChange = this.onBarcodeChange.bind(this)
        this.onUnitPriceChange = this.onUnitPriceChange.bind(this)
        this.onPurchasePriceChange =  this.onPurchasePriceChange.bind(this)
        this.onDiscountChange =  this.onDiscountChange.bind(this)
        this.onStockQuantity = this.onStockQuantity.bind(this)
        this.onMetaTitleChange = this.onMetaTitleChange.bind(this)
        this.onMetaDescription = this.onMetaDescription.bind(this)
        this.handle = this.handle.bind(this)
        this.onFetchData = this.onFetchData.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0);
        Api().get('/getDigitalProductCategories')
            .then(response => {
                this.setState({activeCategories: response.data});})
            .catch(function(error) {
            })
        Api().get('/getVats')
            .then(response => {
                this.setState({vatTypes: response.data});
            })
            .catch(function (error) {
            })
        this.onFetchData();
    }
    onFetchData(){

        let url = window.location.pathname.split("/")[2];

        console.log(url,'url');

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
                let min_qty = res.data[0].min_qty;
                let selectedGallery = res.data[0].gallery;
                let selectedThumbnail = res.data[0].thumbnail;
                let selectedFile = res.data[0].file;
                let barcode = res.data[0].barcode;
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
                let productTags = res.data[0].tags;
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
                if(selectedGallery.length>0){
                    let photoId = [];
                    selectedGallery.map(pd=>{
                        photoId.push(`${pd.id}`);
                    })
                    this.props.selectedMedia({
                        photoId:photoId,
                        type:"edit_digital_product_gallery"
                    });
                    if (selectedGallery.length > this.state.galleryPhotosLimit-1) {
                        this.props.mediaLimit({
                            limit: 'exceed',
                            type:"edit_digital_product_gallery"
                        })
                    }
                    this.props.showMediaFile({
                        showFile: selectedGallery,
                        type:"edit_digital_product_gallery"
                    });
                }
                if(selectedThumbnail.length>0){
                    let photoId = [];
                    selectedThumbnail.map(pd=>{
                        photoId.push(`${pd.id}`);
                    })
                    this.props.selectedMedia({
                        photoId:photoId,
                        type:"edit_digital_product_thumbnail"
                    });
                    if (selectedThumbnail.length > this.state.thumbnailPhotoLimit-1) {
                        this.props.mediaLimit({
                            limit: 'exceed',
                            type:"edit_digital_product_thumbnail"
                        })
                    }
                    this.props.showMediaFile({
                        showFile: selectedThumbnail,
                        type:"edit_digital_product_thumbnail"
                    });
                }
                if(selectedFile.length>0){
                    let photoId = [];
                    selectedFile.map(pd=>{
                        photoId.push(`${pd.id}`);
                    })
                    this.props.selectedMedia({
                        photoId:photoId,
                        type:"edit_file"
                    });
                    if (selectedFile.length > this.state.productFileLimit-1) {
                        this.props.mediaLimit({
                            limit: 'exceed',
                            type:"edit_file"
                        })
                    }
                    this.props.showMediaFile({
                        showFile: selectedFile,
                        type:"edit_file"
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
                this.setState({
                    productName:productName,
                    productCategory:category,
                    min_qty:min_qty,
                    barcode:barcode,
                    productDescription:productDescription,
                    unit_price:unit_price,
                    purchase_price:purchase_price,
                    discount_price:discount_price,
                    stock_quantity:stock_quantity,
                    sku:sku,
                    productVideoLink:productVideoLink,
                    metaTitle:metaTitle,
                    metaDescription:metaDescription,
                    productVideoProvider:productVideoProvider,
                    discountType:discountType,
                    dataLoadingStatus:true,
                    status:status,
                    vatVariationField:0,
                    productType:productType,
                    loading:true
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
    handleTagsChange(e) {
        this.setState({productTags: e});
    };
    onBarcodeChange(e){
        this.setState({
            barcode:e.target.value
        })
    }
    onProductDescriptionChange(value) {
        this.setState({
            productDescription:value
        })
    }
    saveVariationTypesValue(variation,e) {
        this.setState({
            [variation]:e.target.value
        })
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
        if (checkVatEmptyOrNot===false &&
            this.validator.fieldValid('productName') &&
            this.validator.fieldValid('productCategory') &&
            this.validator.fieldValid('productFile') &&
            this.validator.fieldValid('thumbnailImage') &&
            this.validator.fieldValid('productDescription') &&
            this.validator.fieldValid('unit_price') &&
            this.validator.fieldValid('purchase_price') &&
            this.validator.fieldValid('stock_quantity')
        ){
            let productName =  this.state.productName;
            let productCategory = this.state.productCategory;
            let productMinQnt = this.state.min_qty;
            let tag  = this.state.productTags;
            let tags = [];
            if(tag !== ''){
                tag.map(pd=>{
                    tags.push(pd.value);
                });
            }
            let barcode  = this.state.barcode;
            let selectedProductFile =  this.props.dynamicData['selected_for_edit_file']!==undefined ? this.props.dynamicData['selected_for_edit_file']: null
            let selectedGalleryPhotos =  this.props.dynamicData['selected_for_edit_digital_product_gallery']!==undefined ? this.props.dynamicData['selected_for_edit_digital_product_gallery']: null
            let selectedThumbnailPhotos = this.props.dynamicData['selected_for_edit_digital_product_thumbnail']!==undefined ? this.props.dynamicData['selected_for_edit_digital_product_thumbnail']: null
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
            this.setState({
                loadingBtn:true
            })
            const data = {
                'id':this.state.id,
                'productName' :  productName,
                'productCategory' :  productCategory,
                'selectedFile':selectedProductFile,
                'productMinQnt' : productMinQnt,
                'tags' :  tags,
                'barcode'  : barcode,
                'selectedGalleryPhotos' :  selectedGalleryPhotos,
                'selectedThumbnailPhotos' :  selectedThumbnailPhotos,
                'productDescription' :  productDescription,
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
                'vat' : tax,
                'seller_product':1
            }
            Api().post('updateDigitalProduct',data).then(res=>{
                if(res.data===1){
                    this.componentDidMount();
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
            this.validator.showMessageFor("productFile");
            this.validator.showMessageFor('thumbnailImage');
            this.validator.showMessageFor('productDescription');
            this.validator.showMessageFor("unit_price");
            this.validator.showMessageFor("purchase_price");
            this.validator.showMessageFor("stock_quantity");
            this.forceUpdate();
        }
    }
    handle(value) {
        this.setState({
            context: value
        });
    }

    render() {
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
        console.log(activeCategories,'activeCategories');
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
        let discountType = [];
        let discountTypes = [
            {value: 'flat', label: "Flat"},
            {value: 'percent', label: "Percent"}
        ];
        if(this.state.discountType!==null){
            discountTypes.map(pd=>{
                if(pd.value==this.state.discountType){
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
        let checkVatEmptyOrNot = false;
        this.state.productTaxVariation.map(pd=>{
            if((this.state[pd.label]===undefined || this.state[pd.label]==="" ) || (this.state[pd.label+"_type"]===undefined || this.state[pd.label+"_type"]==="")){
                checkVatEmptyOrNot = true
            }
        })

        console.log(this.state.productType,'this.state.productType');


        if(this.state.productType!=="digital"){
            Router.push("/seller-digital-products")
        }
        if(this.state.pageNotFoundStatus==true){
            Router.push("/seller-digital-products")
        }

        return (
          <Fragment>
              <Row>
                  <Col lg={12}>
                      <div>
                          <div className="card">
                              <div className="card-body text-left">
                                  <div className="p-3">
                                      <Form.Group>
                                          <Form.Label className="inputBoxTitle">Product Name*</Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Form.Control className="inputTextSize inputBoxSize" value={this.state.productName} required={true} onChange={(e)=>this.onProductName(e)} type="text"  placeholder="Enter product title"/>
                                              <p className="text-danger my-2"> {this.validator.message('productName', this.state.productName, 'required')}</p>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group >
                                          <Form.Label className="inputBoxTitle">Product Category*</Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Select
                                                  value={category}
                                                  onChange={this.onCategoryChange}
                                                  options={activeCategories}
                                                  isSearchable={true}
                                              />
                                              <div className="text-danger my-2"> {this.validator.message('productCategory', this.state.productCategory, 'required')}</div>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <MediaFile  title="Product file"   multipleFile={false} type="edit_file" for="zip" fileType="zip"  limit={1}   />
                                              <p className="text-danger my-2"> {this.validator.message('productFile', this.props.dynamicData['selected_for_edit_file'], 'required')}</p>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group >
                                          <Form.Label className="inputBoxTitle">Tags</Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <CreatableSelect
                                                  className="inputTextSize"
                                                  data-category-add="tags"
                                                  isMulti
                                                  value={this.state.productTags}
                                                  onChange={this.handleTagsChange}
                                                  placeholder="Type and hit enter to add tag"
                                              />
                                              <Form.Text className="text-muted hd-info-text">
                                                  Will be used for better search result
                                              </Form.Text>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                  </div>
                              </div>
                          </div>
                          <div className="card">
                              <div className="card-header p-3">
                                  <h6 className="card-title">Product Image<span className="requiredMark" title="Required"></span></h6>
                              </div>
                              <div className="card-body text-left">
                                  <Form.Group className="p-3 ">
                                      <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                          <MediaUpload  title="Product gallery"
                                                        note="These images are visible in product details page gallery. Use 600x600 sizes images."
                                                        multipleFile={true}
                                                        type="edit_digital_product_gallery"
                                                        for="product_gallery"
                                                        fileType="photo"
                                                        limit={5}
                                                        widthSize={600}
                                                        heightSize={600}
                                          />
                                          <MediaUpload required={true} title="Product thumbnail"
                                                       note="This image is visible in all product box. Use 600x600 sizes image. Keep some blank space around main object of your image as we had to crop some edge in different devices to make it responsive."
                                                       multipleFile={true}
                                                       type="edit_digital_product_thumbnail"
                                                       for="product_thumbnail"
                                                       fileType="photo"
                                                       limit={1}
                                                       widthSize={600}
                                                       heightSize={600}
                                          />
                                          <p className="text-danger my-2"> {this.validator.message('thumbnailImage',this.props.dynamicData['selected_for_edit_digital_product_thumbnail'], 'required')}</p>
                                      </ReactPlaceholder>
                                  </Form.Group>
                              </div>
                          </div>
                          <div className="card">
                              <div className="card-header p-3">
                                  <h6 className="card-title">Product Description<span className="requiredMark" title="Required">*</span></h6>
                              </div>
                              <div className="card-body text-left">
                                  <Form.Group className="p-3 joditEditorText">
                                      <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                          <TextEditor
                                              className="inputTextSize"
                                              value={this.state.productDescription}
                                              tabIndex={1}
                                              onBlur={(newContent) => this.onProductDescriptionChange(newContent)}
                                              onChange={(newContent) => this.onProductDescriptionChange(newContent)}
                                          />
                                          <div className="text-danger my-2"> {this.validator.message('productDescription', this.state.productDescription, 'required|string')}</div>
                                      </ReactPlaceholder>
                                  </Form.Group>
                              </div>
                          </div>
                          <div className="card">
                              <div className="card-header">
                                  <h6 className="card-title">Product price and Stock</h6>
                              </div>
                              <div className="card-body text-left">
                                  <div className="p-3">
                                      <Form.Group>
                                          <Form.Label className="inputBoxTitle">Unit price <span className="requiredMark" title="Required">*</span></Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Form.Control className="inputTextSize inputBoxSize" value={this.state.unit_price} type="text"  onChange={(e) => this.onUnitPriceChange(e)}  placeholder="Enter product unit price" />
                                              <div className="text-danger my-2"> {this.validator.message('unit_price', this.state.unit_price, 'required|numeric')}</div>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group>
                                          <Form.Label className="inputBoxTitle">Purchase price</Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Form.Control className="inputTextSize inputBoxSize" value={this.state.purchase_price} type="text"  onChange={this.onPurchasePriceChange} placeholder="Enter product purchase price" />
                                              <div className="text-danger my-2"> {this.validator.message('purchase_price', this.state.purchase_price, 'currency')}</div>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group>
                                          <Form.Label className="inputBoxTitle">Discount</Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Form.Control className="inputTextSize inputBoxSize" value={this.state.discount_price} type="text" onChange={(e)=>this.onDiscountChange(e)} placeholder="Enter discount" />
                                              <p className="text-danger my-2"> {this.validator.message('discount_price', this.state.discount_price, 'numeric')}</p>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group>
                                          <Form.Label className="inputBoxTitle">Discount type</Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Select
                                                  className="inputTextSize"
                                                  data-category-add="discount"
                                                  value={discountTypes.filter(option=>
                                                      option.value === this.state.discountType
                                                  ) }
                                                  onChange={this.onProductDiscountTypeChange}
                                                  options={discountTypes}
                                              />
                                              {this.state.discount_price>0 &&    <div className="text-danger my-2"> {this.validator.message('discountType', this.state.discountType, 'required')}</div> }
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group>
                                          <Form.Label className="hdLabelBold inputBoxTitle">Stock quantity<span className="requiredMark"  title="Required">*</span> </Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Form.Control className="inputTextSize inputBoxSize" value={this.state.stock_quantity} type="text" data-product-add="stock" name="stock" onChange={(e) => this.onStockQuantity(e)} placeholder="Enter stock quantity" />
                                              <p className="text-danger my-2"> {this.validator.message('stock_quantity', this.state.stock_quantity, 'numeric')}</p>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      <Form.Group>
                                          <Form.Label className="inputBoxTitle">Sku number </Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Form.Control className="inputTextSize inputBoxSize" value={this.state.sku} type="text"  onChange={(e) => this.onSkuChange(e)} placeholder="Enter sku enter" />
                                              <div className="text-danger my-2"> {this.validator.message('sku', this.state.sku, 'alpha_num')}</div>
                                          </ReactPlaceholder>
                                      </Form.Group>
                                  </div>
                              </div>
                              {}
                              <div className="card">
                                  <div className="card-header p-3">
                                      <h6 className="card-title">Product meta data</h6>
                                  </div>
                                  <div className="card-body">
                                      <div className="p-3 text-left">
                                          <Form.Group >
                                              <Form.Label className="inputBoxTitle">Meta title</Form.Label>
                                              <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                  <Form.Control className="inputTextSize inputBoxSize" value={this.state.metaTitle} onChange={(e)=>this.onMetaTitleChange(e)} type="text" data-product-add="meta_title" name="meta_title" placeholder="Enter product meta title" />
                                              </ReactPlaceholder>
                                          </Form.Group>
                                          <Form.Group >
                                              <Form.Label className="hdLabelBold inputBoxTitle">Meta description</Form.Label>
                                              <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                  <Form.Control className="inputTextSize inputBoxSize" value={this.state.metaDescription} onChange={(e)=>this.onMetaDescription(e)} as="textarea" rows={4} data-product-add="meta_description" name="meta_description" placeholder="Enter product meta description" />
                                              </ReactPlaceholder>
                                          </Form.Group>
                                      </div>
                                  </div>
                              </div>
                              <div className="card">
                                  <div className="card-header p-3">
                                      <h6>Vat and tax</h6>
                                  </div>
                                  <div className="card-body p-2 text-left">
                                      <Form.Group className="p-3">
                                          <Form.Label className="inputBoxTitle">Vat type</Form.Label>
                                          <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                              <Select
                                                  className="inputTextSize"
                                                  isMulti
                                                  value={this.state.productVatTypes}
                                                  onChange={(e)=>this.onVatTypesChange(e)}
                                                  options={vatTypes}
                                              />
                                          </ReactPlaceholder>
                                      </Form.Group>
                                      {this.state.productVatTypes.length>0 &&
                                          <Fragment>
                                              <div className="row p-3">
                                                  {this.state.productVatTypes.map((pd,i)=>{
                                                      return <Fragment>
                                                          <Col lg={7}>
                                                              <Form.Group>
                                                                  <Form.Label className="inputBoxTitle">{pd.label}</Form.Label>
                                                                  <Form.Control className="inputTextSize inputBoxSize" value={this.state[pd.label]} type="text" onChange={(e) => this.onVatTypeValueChange(pd.label, e)}  placeholder="Enter  amount"  />
                                                              </Form.Group>
                                                          </Col>
                                                          <Col lg={5}>
                                                              <Form.Group>
                                                                  <Form.Label className="inputBoxTitle">Type</Form.Label>
                                                                  <Select
                                                                      className="inputTextSize"
                                                                      value = {
                                                                          discountTypes.filter(option =>
                                                                              option.value === this.state[pd.label+"_type"])
                                                                      }
                                                                      onChange={(e)=>this.onVatVariableTypeChange(pd.label,e)}
                                                                      options={discountTypes}
                                                                  />
                                                              </Form.Group>
                                                          </Col>
                                                      </Fragment>
                                                  })}
                                              </div>
                                          </Fragment>
                                      }
                                      <p className="text-danger my-2"> {this.validator.message('tax_variation', this.state.vatVariationField, 'required')}</p>
                                  </div>
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
                                  </Button>:
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

export default connect(mapStateToProps, mapDispatchToProps)(SellerDigitalProductEditPart);



