import React, {PureComponent, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../../../ClientApi/Api";
import Switch from "@mui/material/Switch";
import {DebounceInput} from "react-debounce-input";
import ReactPlaceholder from "react-placeholder";
import MediaUpload from "../../../Media/MediaUpload";
import {connect} from "react-redux";
import {alert} from "../../../../../services/common";
import {selectedMedia,mediaLimit,showMediaFile} from "../../../../../services/actions/mediaAction";

class ShopSettingPart extends PureComponent {

    constructor() {
        super();
        this.validator = new SimpleReactValidator();

        this.state = {
            shopName:"",
            logo:[],
            banner:[],
            shopAddress:"",
            shopNumber:"",
            metaTitle:"",
            metaDescription:"",
            facebook:"",
            twitter:"",
            instagram:"",
            youtube:"",
            bankPayment:0,
            cashPayment:0,
            bankName:'',
            bankAccountName:'',
            bankAccountNumber:'',
            routingNumber:'',
            shopNameExist:false,
            loading:false,
            loadingShopBtn:false,
            loadingPaymentBtn:false,
            loadingMediaBtn:false

        }
        this.onSocialMediaSubmit  = this.onSocialMediaSubmit.bind(this)
        this.onFacebook =  this.onFacebook.bind(this)
        this.onTwitter =  this.onTwitter.bind(this)
        this.onInstagram =  this.onInstagram.bind(this)
        this.onYoutube =  this.onYoutube.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCashPayment =  this.onCashPayment.bind(this)
        this.onBankPayment = this.onBankPayment.bind(this)
        this.onPayment = this.onPayment.bind(this)
    }

    componentDidMount() {

        Api().get('getShopInfo').then(res=>{
            this.setState({
                shopName:res.data.shopName,
                shopAddress:res.data.shop_address,
                shopNumber:res.data.shop_phone_number,
                metaTitle:res.data.mete_title,
                metaDescription:res.data.meta_description,
                facebook:res.data.facebook_link,
                twitter:res.data.twitter_link,
                instagram:res.data.instagram_link,
                youtube:res.data.youtube_link,

            })

            let shopAvatar = res.data.shop_avatar;
            let shopCover = res.data.shop_banner;

            if(shopAvatar.length>0){

                let photoId = [];
                shopAvatar.map(pd=>{
                    photoId.push(`${pd.id}`);

                })

                this.props.selectedMedia({
                    photoId:photoId,
                    type:"shop_avatar"
                });

                if (shopAvatar.length > 1-1) {
                    this.props.mediaLimit({
                        limit: 'exceed',
                        type:"shop_avatar"
                    })
                }

                this.props.showMediaFile({
                    showFile: shopAvatar,
                    type:"shop_avatar"
                });

            }

            if(shopCover.length>0){

                let photoId = [];
                shopAvatar.map(pd=>{
                    photoId.push(`${pd.id}`);

                })

                this.props.selectedMedia({
                    photoId:photoId,
                    type:"shop_cover"
                });

                if (shopCover.length > 1-1) {
                    this.props.mediaLimit({
                        limit: 'exceed',
                        type:"shop_cover"
                    })
                }

                this.props.showMediaFile({
                    showFile: shopCover,
                    type:"shop_cover"
                });

            }

        }).catch(error=>{

        })


        Api().get('getShopPaymentSetting').then(res=>{
            this.setState({
                bankPayment:res.data.bank_payment,
                cashPayment:res.data.cash_payment,
                bankName:res.data.bank_name,
                bankAccountName:res.data.bank_account_name,
                bankAccountNumber:res.data.bank_account_number,
                routingNumber:res.data.bank_routing_number,
                loading:true
            })
        }).catch(error=>{

        })
    }


    onShopName(e){
        this.setState({
            shopName:e.target.value
        })

        let data = {
            shopName:e.target.value
        }

        Api().post('ShopNameCheck',data).then(res=>{
            console.log(res.data);
            if(res.data === 1){
                this.setState({
                    shopNameExist: true
                })
            }else{
                this.setState({
                    shopNameExist:false
                })
            }
        })


    }

    onShopAddress(e){
        this.setState({
            shopAddress:e.target.value
        })
    }
    onShopNumber(e){
        this.setState({
            shopNumber:e.target.value
        })
    }

    onMetaTitle(e){
        this.setState({
            metaTitle:e.target.value
        })
    }
    onMetaDescription(e){
        this.setState({
            metaDescription:e.target.value
        })
    }

    onFacebook(e){
        this.setState({
            facebook:e.target.value
        })
    }
    onInstagram(e){
        this.setState({
            instagram:e.target.value
        })
    }
    onTwitter(e){
        this.setState({
            twitter:e.target.value
        })
    }
    onYoutube(e){
        this.setState({
            youtube:e.target.value
        })

    }


    onSocialMediaSubmit(){
        let facebook  = this.state.facebook;
        let twitter =  this.state.twitter;
        let instagram = this.state.instagram;
        let youtube  =  this.state.youtube;

        if(facebook==null && twitter==null && instagram==null && youtube==null){
            alert('warning','Social media fields are empty!')

        }else{
            if (this.validator.fieldValid('facebook') &&
                this.validator.fieldValid('twitter') &&
                this.validator.fieldValid('instagram') &&
                this.validator.fieldValid('youtube'))
            {

                const data = {
                    facebook:facebook,
                    twitter:twitter,
                    instagram:instagram,
                    youtube:youtube,

                }


                this.setState({
                    loadingMediaBtn:true
                })


                Api().post('postShopSocialLink',data).then(res=>{
                    if(res.data===1){
                        alert('success','Shop info updated successfully!');
                        this.componentDidMount()
                    }

                    this.setState({
                        loadingMediaBtn:false
                    })

                }).catch(function (error) {

                });

            } else {
                this.validator.showMessageFor("facebook");
                this.validator.showMessageFor("twitter");
                this.validator.showMessageFor("instagram");
                this.validator.showMessageFor("youtube");
                this.validator.showMessageFor("linkedin");
                this.validator.showMessageFor("pinterest");
                this.validator.showMessageFor("tiktok");
                this.forceUpdate();
            }

        }



    }

    onSubmit(){

        if(this.state.shopNameExist!==true){

            if (this.validator.fieldValid('shopName')) {
                let shop_avatar = this.props.dynamicData['selected_for_shop_avatar']!==undefined ? this.props.dynamicData['selected_for_shop_avatar']: null;
                let shop_cover = this.props.dynamicData['selected_for_shop_cover']!==undefined ? this.props.dynamicData['selected_for_shop_cover']: null;
                let shopName = this.state.shopName;
                let shopNumber = this.state.shopNumber;
                let shopAddress = this.state.shopAddress;
                let metaTitle  = this.state.metaTitle;
                let metaDescription = this.state.metaDescription;
                let data = {
                    shopName:shopName,
                    shopNumber:shopNumber,
                    shopLogo:shop_avatar,
                    shopBanner:shop_cover,
                    shopAddress:shopAddress,
                    metaTitle:metaTitle,
                    metaDescription:metaDescription
                }


                this.setState({
                    loadingShopBtn:true
                })


                Api().post('postShopInfo',data).then(res=>{
                    if(res.data===1){
                        alert('success','Shop info updated successfully!');
                        this.componentDidMount()
                    }

                    this.setState({
                        loadingShopBtn:false
                    })
                }).catch(error=>{

                })



            } else {
                window.scroll(0,0)
                this.validator.showMessageFor('shopName');
                // rerender to show messages for the first time
                // you can use the autoForceUpdate option to do this automatically`
                this.forceUpdate();
            }

        }

    }


    onCashPayment(){
        let cashPayment = this.state.cashPayment;
        if(cashPayment===1){
            this.setState({
                cashPayment: 0
            })
        }else{
            this.setState({
                cashPayment:1
            })
        }
    }

    onBankPayment(){
        let bankPayment = this.state.bankPayment;
        if(bankPayment===1){
            this.setState({
                bankPayment: 0
            })
        }else{
            this.setState({
                bankPayment:1
            })
        }
    }


    onBankName(e){
        this.setState({
            bankName:e.target.value
        })
    }

    onBankAccountName(e){
        this.setState({
            bankAccountName:e.target.value
        })
    }

    onBankAccountNumber(e){
        this.setState({
            bankAccountNumber:e.target.value
        })
    }

    onRoutingNumber(e){
        this.setState({
            routingNumber:e.target.value
        })
    }

    onPayment(){


        let  bankPayment = this.state.bankPayment;
        let  cashPayment = this.state.cashPayment;
        let  bankName = this.state.bankName;
        let  bankAccountName = this.state.bankAccountName;
        let  bankAccountNumber  = this.state.bankAccountNumber;
        let  routingNumber = this.state.routingNumber;

        if(this.state.bankPayment===1){
            if (this.validator.fieldValid('bankName') &&
                this.validator.fieldValid('bankAccountName') &&
                this.validator.fieldValid('bankAccountNumber') &&
                this.validator.fieldValid('routingNumber'))
            {

                let data = {
                    cashPayment:cashPayment,
                    bankPayment:bankPayment,
                    bankName:bankName,
                    bankAccountName:bankAccountName,
                    bankAccountNumber:bankAccountNumber,
                    routingNumber:routingNumber
                }

                this.setState({
                    loadingPaymentBtn:true
                })

                Api().post('postShopPaymentSetting',data).then(res=>{

                    if(res.data===1){
                        alert('success','Payout setting has been updated!');
                    }

                    this.setState({
                        loadingPaymentBtn:false
                    })

                }).catch(error=>{

                })

            } else {
                this.validator.showMessageFor("bankName");
                this.validator.showMessageFor("bankAccountName");
                this.validator.showMessageFor("bankAccountNumber");
                this.validator.showMessageFor("routingNumber");
                this.forceUpdate();
            }
        }else{

            let cashPayment = this.state.cashPayment;
            let bankPayment = this.state.bankPayment;

            let data = {
                cashPayment:cashPayment,
                bankPayment:bankPayment
            }

            this.setState({
                loadingPaymentBtn:true
            })


            Api().post('postShopPaymentSetting',data).then(res=>{
                if(res.data===1){

                    alert('success','Payout setting has been updated!');

                }

                this.setState({
                    loadingPaymentBtn:false
                })

            }).catch(error=>{

            })

        }



    }

    render() {
        return (
            <Fragment>

                <div key={2} className="card">
                    <div className="card-body text-left">
                        <div className="p-3">

                            <Form.Group className="mb-2">
                                <Form.Label className='inputBoxTitle' >Shop Name <span className="requiredMark" title="Required">*</span></Form.Label>

                                <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                    <DebounceInput
                                        minLength={1}
                                        debounceTimeout={300}
                                        className='inputTextSize inputBoxSize form-control'
                                        value={this.state.shopName} type="text"
                                        onChange={(e) => this.onShopName(e)}
                                        placeholder="Enter shop name" />

                                    {this.state.shopNameExist ?
                                        <p className="text-danger mb-2">The shop name is already exist</p>
                                        :
                                        <div className="text-danger my-2"> {this.validator.message('shopName', this.state.shopName, 'required')}</div>
                                    }

                                </ReactPlaceholder>


                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label className='inputBoxTitle' >Shop Avatar</Form.Label>
                                   <ReactPlaceholder  type='text' ready={this.state.loading} row={1} color='#E0E0E0' >
                                    <MediaUpload    multipleFile={false} note="Please use 400 x 400 for better view" type="shop_avatar" for="shop"  limit={1} widthSize={400} heightSize={400}  />
                                </ReactPlaceholder>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label className='inputBoxTitle' >Shop Cover</Form.Label>
                                <ReactPlaceholder  type='text' ready={this.state.loading} row={1} color='#E0E0E0' >
                                   <MediaUpload note="Please use 312 x 820 for better view"    multipleFile={false} type="shop_cover" for="shop"  limit={1} widthSize={820} heightSize={312}  />
                                </ReactPlaceholder>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label className='inputBoxTitle'>Shop Number</Form.Label>
                                <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                    <Form.Control className='inputTextSize inputBoxSize' value={this.state.shopNumber} type="text"  onChange={(e)=>this.onShopNumber(e)} placeholder="Enter shop number" />
                                </ReactPlaceholder>

                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label className="hdLabelBold inputBoxTitle">Shop address</Form.Label>
                                <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                    <Form.Control className='inputTextSize inputBoxSize' value={this.state.shopAddress} onChange={(e)=>this.onShopAddress(e)} as="textarea" rows={2} placeholder="Enter shop address" />
                                    <div className="text-danger my-2"> {this.validator.message('shopAddress', this.state.shopAddress, 'required')}</div>
                                </ReactPlaceholder>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label className='inputBoxTitle'>Meta title</Form.Label>

                                <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                    <Form.Control className='inputTextSize inputBoxSize' value={this.state.metaTitle} onChange={(e)=>this.onMetaTitle(e)} type="text"  placeholder="Meta title" />
                                </ReactPlaceholder>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label className="hdLabelBold inputBoxTitle">Meta description</Form.Label>
                                <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                    <Form.Control className='inputTextSize inputBoxSize' value={this.state.metaDescription} onChange={(e)=>this.onMetaDescription(e)} as="textarea" rows={2}  placeholder="Enter  meta description" />
                                </ReactPlaceholder>

                            </Form.Group>

                            {this.state.loading==false ?

                                <Fragment>
                                    <Button disabled={true} onClick={this.onSubmit} className="float-right mt-2 mb-4">Submit</Button>
                                </Fragment> :
                                <Fragment>
                                    {this.state.loadingShopBtn ?
                                        <Button className="float-right mt-2 mb-4"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                            Loading...
                                        </Button> :
                                        <Button onClick={this.onSubmit} className="float-right mt-2 mb-4">Submit</Button>

                                    }

                                </Fragment>

                            }




                        </div>

                    </div>
                </div>

                <div>
                    <span className="profile title mb-4">Social Media</span>
                </div>
                <div key={3} className="card mt-2">


                    <div className="card-body text-left">
                        <div className="p-3">
                            <Form.Group>

                                <InputGroup className="mb-3">

                                    <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >

                                    <InputGroup.Append>
                                        <InputGroup.Text><i className="fab fa-facebook-f socialIconSize"/></InputGroup.Text>
                                    </InputGroup.Append>

                                        <FormControl
                                            className='inputTextSize inputBoxSize'
                                            placeholder="Enter facebook link"
                                            value={this.state.facebook}
                                            onChange={(e)=>this.onFacebook(e)}
                                        />
                                    </ReactPlaceholder>


                                </InputGroup>
                                <p className="text-danger my-2"> {this.validator.message('facebook', this.state.facebook, 'url')}</p>
                            </Form.Group>


                            <Form.Group>
                                <InputGroup className="mb-3">

                                    <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >

                                    <InputGroup.Append>
                                        <InputGroup.Text><i className="fab fa-instagram socialIconSize"/></InputGroup.Text>
                                    </InputGroup.Append>


                                        <FormControl
                                            className='inputTextSize inputBoxSize'
                                            placeholder="Enter instagram link"
                                            value={this.state.instagram}
                                            onChange={(e)=>this.onInstagram(e)}
                                        />
                                    </ReactPlaceholder>


                                </InputGroup>
                                <p className="text-danger my-2"> {this.validator.message('instagram', this.state.instagram, 'url')}</p>
                            </Form.Group>

                            <Form.Group>

                                <InputGroup className="mb-3">

                                    <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >

                                    <InputGroup.Append>
                                        <InputGroup.Text><i className="fab fa-twitch socialIconSize"/></InputGroup.Text>
                                    </InputGroup.Append>

                                        <FormControl
                                            className='inputTextSize inputBoxSize'
                                            placeholder="Enter twitter link"
                                            value={this.state.twitter}
                                            onChange={(e)=>this.onTwitter(e)}
                                        />
                                    </ReactPlaceholder>
                                </InputGroup>
                                <p className="text-danger my-2"> {this.validator.message('twitter', this.state.twitter, 'url')}</p>
                            </Form.Group>

                            <Form.Group>


                                <InputGroup className="mb-3">

                                    <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >

                                    <InputGroup.Append>
                                        <InputGroup.Text><i className="fab fa-youtube socialIconSize"/></InputGroup.Text>
                                    </InputGroup.Append>


                                        <FormControl
                                            placeholder="Enter youtube link"
                                            value={this.state.youtube}
                                            onChange={(e)=>this.onYoutube(e)}
                                        />
                                    </ReactPlaceholder>


                                </InputGroup>
                                <p className="text-danger my-2"> {this.validator.message('youtube', this.state.youtube, 'url')}</p>
                            </Form.Group>



                            {this.state.loading==false ?

                                <Fragment>
                                    <Button disabled={true}  className="float-right mt-2 mb-4">Submit</Button>
                                </Fragment> :
                                <Fragment>
                                    {this.state.loadingMediaBtn ?
                                        <Button className="float-right mt-2 mb-4"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                            Loading...
                                        </Button> :
                                        <Button  onClick={this.onSocialMediaSubmit} className="float-right mt-2 mb-4">Submit</Button>


                                    }

                                </Fragment>

                            }

                        </div>

                    </div>
                </div>

                <div>
                    <span className="profile title mb-4">Payment Setting</span>
                </div>
                <div key={3} className="card mt-2">

                    <div className="card-body text-left">
                        <div className="text-left p-3">
                            <Form.Group>
                                <Form.Label className='inputBoxTitle'>Cash payment</Form.Label>
                                <Switch
                                    className='shopInfoPay'
                                    checked={Boolean(this.state.cashPayment)}
                                    onChange={(e)=>this.onCashPayment(e)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='inputBoxTitle'>Bank payment</Form.Label>
                                <Switch
                                    className='shopInfoPay'
                                    checked={Boolean(this.state.bankPayment)}
                                    onChange={(e)=>this.onBankPayment(e)}
                                />
                            </Form.Group>

                            <Fragment>
                                {this.state.bankPayment===1 &&
                                    <Fragment>
                                        <Form.Group>
                                            <Form.Label className='inputBoxTitle'>Bank Name<span className="requiredMark" title="Required">*</span></Form.Label>
                                            <Form.Control className='inputTextSize inputBoxSize' value={this.state.bankName} onChange={(e)=>this.onBankName(e)} type="text" placeholder="Enter Bank name" />
                                            <div className="text-danger my-2"> {this.validator.message('bankName', this.state.bankName, 'required')}</div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className='inputBoxTitle'>Bank Account Name <span className="requiredMark" title="Required">*</span></Form.Label>
                                            <Form.Control className='inputTextSize inputBoxSize' value={this.state.bankAccountName} onChange={(e)=>this.onBankAccountName(e)} type="text" placeholder="Enter bank account name" />
                                            <div className="text-danger my-2"> {this.validator.message('bankAccountName', this.state.bankAccountName, 'required')}</div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className='inputBoxTitle'>Bank Account Number<span className="requiredMark" title="Required">*</span></Form.Label>
                                            <Form.Control className='inputTextSize inputBoxSize' value={this.state.bankAccountNumber} onChange={(e)=>this.onBankAccountNumber(e)} type="text" placeholder="Enter bank account number" />
                                            <div className="text-danger my-2"> {this.validator.message('bankAccountNumber', this.state.bankAccountNumber, 'required')}</div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className='inputBoxTitle'>Bank Routing Number <span className="requiredMark" title="Required">*</span></Form.Label>
                                            <Form.Control className='inputTextSize inputBoxSize' value={this.state.routingNumber} onChange={(e)=>this.onRoutingNumber(e)} type="text" placeholder="Enter routing number" />
                                            <div className="text-danger my-2"> {this.validator.message('routingNumber', this.state.routingNumber, 'required')}</div>
                                        </Form.Group>

                                    </Fragment>
                                }
                            </Fragment>


                            {this.state.loading==false ?

                                <Fragment>
                                    <Button disabled={true}  className="float-right mt-2 mb-4">Submit</Button>
                                </Fragment> :
                                <Fragment>
                                    {this.state.loadingPaymentBtn ?
                                        <Button className="float-right mt-2 mb-4"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                            Loading...
                                        </Button> :
                                        <Button onClick={this.onPayment} className="float-right mt-2 mb-4">Submit</Button>
                                    }
                                </Fragment>

                            }

                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}


const mapDispatchToProps = {
    selectedMedia,
    mediaLimit,
    showMediaFile
};

function mapStateToProps(state) {
    const dynamicData = state.mediaReducer;
    const role = state.userReducer.role;
    return {
        dynamicData,
        role
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopSettingPart);

