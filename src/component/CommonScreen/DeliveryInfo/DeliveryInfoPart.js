import React, {PureComponent, Fragment, Component} from "react";
import Api from "../../../ClientApi/Api";
import SimpleReactValidator from 'simple-react-validator';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Select from "react-select";
import {connect} from "react-redux";
import {user} from "../../../services/actions/userAction";
import Router from "next/router";
import {
    billingModalHide,
    shippingBillingAddress,
    shippingModalHide
} from "../../../services/actions/shippingBillingPickupAction";
import {alert} from "../../../services/common";
import Link from "next/link";
import Photo from "../Image/Photo";

class DeliveryInfoPart extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            name:"",
            phone:"",
            country:"",
            region:"",
            city:"",
            area:"",
            postCode:"",
            address:"",
            shippingPlace:"",
            addArea:null,
            addAreaModal: false,
            editAreaModal: false,
            addAreaName: "",
            addAreaDeliveryFee: 0,
            addAreaStatus: "",
            addAreaCountry: "",
            addAreaRegion: "",
            addAreaCity: "",
            editAreaStatus: "",
            editAreaCountry: "",
            editAreaRegion:"",
            editAreaCity:"",
            editAreaName: "",
            editAreaId: "",
            activeCountries:[],
            activeRegions: [],
            activeCities: [],
            activeAreas:[],
            shippingAreaExist: false,
            editShippingAreaExist:false,
            loadingSubmitBtn:false
        }
        this.onName = this.onName.bind(this)
        this.onPhone = this.onPhone.bind(this)
        this.onAddAreaCountryChange = this.onAddAreaCountryChange.bind(this);
        this.onAddAreaRegionChange = this.onAddAreaRegionChange.bind(this);
        this.onAddAreaCityChange = this.onAddAreaCityChange.bind(this);
        this.onAddAreaStatusChange = this.onAddAreaStatusChange.bind(this);
        this.onPostCode = this.onPostCode.bind(this)
        this.onAddress = this.onAddress.bind(this)
        this.onShippingPlace = this.onShippingPlace.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }
    componentDidMount() {
        Api().get('activeShippingCountries')
            .then(response => {
                if(response.status == 200) {
                    this.setState({
                        activeCountries:response.data
                    })
                }
            })
            .catch(function(error) {

            })
    }
    onName(e){
        this.setState({
            name:e.target.value
        })
    }
    onPhone(e){
        this.setState({
            phone:e.target.value
        })
    }
    async  onAddAreaCountryChange(e) {
        let activeCountries = this.state.activeCountries;
        let countryName = '';
            activeCountries.map(pd=>{
            if(pd.id==e.value){
                countryName = e.value;
            }
        })
        this.setState({
            addAreaCountry: e,
            country:countryName
        });
        const data = {
            countryId:e.value
        }
      await  Api().post('activeRegionsByCountry',data)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeRegions: response.data});
                    this.setState({
                        addAreaRegion: "",
                        activeCities:[],
                        addAreaCity:"",
                        addArea:""
                    });
                }
            })
    }
    async onAddAreaRegionChange(e) {
        this.setState({
            addAreaRegion: e,
            region:e.label
        });
        const data  = {
            region:e.value
        }
      await  Api().post('activeCitiesByRegion',data)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeCities: response.data});
                    this.setState({
                        addAreaCity: "",
                        addArea:""
                    });
                }
            })
    }
    async onAddAreaCityChange(e) {
        this.setState({
            addAreaCity: e,
            city:e.label
        });
        let data = {
            id:e.value
        }
     await   Api().post('activeAreasByCity',data)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeAreas: response.data});
                    this.setState({addPickupPointArea: ""});
                }
            })
    }
    onAddAreaStatusChange(e) {
        this.setState({addArea: e,
            area:e.label
        });
    }
    onPostCode(e){
        this.setState({
            postCode:e.target.value
        })
    }
    onAddress(e){
        this.setState({
            address:e.target.value
        })
    }
    onShippingPlace(e){
        if(e.target.id!=""){
            let btnId = e.target.id;
            let header = document.getElementById("shippingBtn");
            let targetedId = document.getElementById(btnId);
            let current = header.getElementsByClassName("selected");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" selected", " ");
            }
            targetedId.className += " selected";
            this.setState({
                shippingPlace:e.target.value
            })
        }
    }
    onSubmit(){

        let address =  Router.query.address;


        if (this.validator.allValid()) {
            let data = {
                name:this.state.name,
                phone:this.state.phone,
                country: this.state.country,
                region:this.state.region,
                city:this.state.city,
                area:this.state.area,
                postCode:this.state.postCode,
                address:this.state.address,
                shippingPlace:this.state.shippingPlace,
                defaultShipping:0,
                defaultBilling:0,
            }
            this.setState({
                loadingSubmitBtn:true
            })
            Api().post('postShippingAddress',data).then(res=>{
                if(res.data!==0){
                    this.props.user();
                    if(address){
                          alert('success','Shipping address inserted successfully!');
                          Router.push("/checkout");
                    }else{
                        if(this.props.billing){
                            alert('success','Billing address inserted successfully!')

                            this.props.billingModalHide();
                            this.props.shippingBillingAddress(res.data);
                        }
                        else if(this.props.shipping){

                            alert('success','Shipping address inserted successfully!')

                            this.props.shippingModalHide();
                            this.props.shippingBillingAddress(res.data);
                        }
                        else{
                            alert('success','Shipping address inserted successfully!')
                            Router.push("/address");
                        }
                    }
                    this.setState({
                        loadingSubmitBtn:false
                    })
                }
            }).catch(error=>{});
        } else {
            this.validator.showMessages();
            window.scroll(0,0);
            this.forceUpdate();
        }
    }
    onCancel(){
        this.setState({
            name:"",
            phone:"",
            country:"",
            region:"",
            city:"",
            area:"",
            postCode:"",
            address:"",
            shippingPlace:"",
            addArea:null,
            countryName:'',
            regionName:'',
            cityName:'',
            areaName:'',
            addAreaModal: false,
            editAreaModal: false,
            addAreaName: "",
            addAreaDeliveryFee: 0,
            addAreaStatus: "",
            addAreaCountry: "",
            addAreaRegion: "",
            addAreaCity: "",
            activeCountries:[],
            activeRegions: [],
            activeCities: [],
            activeAreas:[],
            shippingAreaExist: false,
            editShippingAreaExist:false
        })
    }

    render() {

        const activeCountries = [];
        if(this.state.activeCountries.length>0) {
            let tempActiveCountries = Array.from(this.state.activeCountries);
            tempActiveCountries.map(tempActiveCountries => {
                activeCountries.push({value: tempActiveCountries['id'],
                    label: (<><Image src={this.props.backendApi+tempActiveCountries['flag']} className="mr-2 flag"/> <span>{tempActiveCountries['name']}</span></>)});
            })
        }
        const activeRegions = [];
        if(this.state.activeRegions.length>0) {
            let tempActiveRegions = Array.from(this.state.activeRegions);
            tempActiveRegions.map(tempActiveRegions => {
                activeRegions.push({value: tempActiveRegions['id'], label: tempActiveRegions['name']})
            })
        }
        const activeCities = [];
        if(this.state.activeCities.length>0) {
            let tempActiveCities = Array.from(this.state.activeCities);
            tempActiveCities.map(tempActiveCities => {
                    activeCities.push({value: tempActiveCities['id'], label: tempActiveCities['name']})
            })
        }
        const activeAreas = [];
        if(this.state.activeAreas.length>0) {
            let tempActiveAreas = Array.from(this.state.activeAreas);
            tempActiveAreas.map(tempActiveAreas => {
                activeAreas.push({value: tempActiveAreas['id'], label: tempActiveAreas['name']})
            })
        }
        return   <Fragment>
                     <section id="deliveryInfo" className="">
                         <Container>
                             {this.props.mobileDelivery!=true &&
                                <Row>
                                 <Col lg={12} md={12} sm={12} xs={12}>
                                     <span className=" profile title mb-4 addDeliveryInfo">Add Delivery Information</span>
                                 </Col>
                                </Row>
                             }
                             <Row>
                                 <Col lg={12} md={12} sm={12} xs={12} className="p-1">
                                     <Card className="addNewAddress"  >
                                         <Card.Body className="addressAddCardBody">
                                             <Row>
                                                 <Col lg={5} md={5} className="mb-3 addressInfos">
                                                     <div className="newAddressInput">
                                                         <label className="my-profile-title">Full Name</label>
                                                         <input onChange={(e)=>this.onName(e)} type="text" id="standard-basic" className="form-control" value={this.state.name} name="name"/>
                                                         <div className="mb-2 text-danger">{this.validator.message('name', this.state.name, 'required')}</div>
                                                     </div>
                                                     <div className="newAddressInput">
                                                         <p className="my-profile-title">Phone Number</p>
                                                         <input onChange={(e)=>this.onPhone(e)} value={this.state.phone}  type="text" id="standard-basic" className="form-control" name="phone"/>
                                                         <div className="mb-2 text-danger">{this.validator.message('phone', this.state.phone, 'required|phone')}</div>
                                                     </div>
                                                 </Col>
                                                 <Col lg={7} md={7} className="mb-3 addressInfos">
                                                     <div className="newAddressInput">
                                                         <p className="my-profile-title">Country</p>
                                                         <Select
                                                             data-area-add="country"
                                                             value={this.state.addAreaCountry}
                                                             onChange={this.onAddAreaCountryChange}
                                                             options={activeCountries}
                                                         />
                                                         <div className="mb-2 text-danger">{this.validator.message('country', this.state.country, 'required')}</div>
                                                     </div>
                                                     <div className="newAddressInput">
                                                         <p className="my-profile-title">Region</p>
                                                         <Select
                                                             data-area-add="region"
                                                             value={this.state.addAreaRegion}
                                                             onChange={this.onAddAreaRegionChange}
                                                             options={activeRegions}
                                                         />
                                                         <div className="mb-2 text-danger">{this.validator.message('region', this.state.region, 'required')}</div>
                                                     </div>
                                                     <div className="newAddressInput">
                                                         <p className="my-profile-title">City</p>
                                                         <Select
                                                             data-area-add="region"
                                                             value={this.state.addAreaCity}
                                                             onChange={this.onAddAreaCityChange}
                                                             options={activeCities}
                                                         />
                                                         <div className="mb-2 text-danger">{this.validator.message('city', this.state.city, 'required')}</div>
                                                     </div>
                                                     <div className="newAddressInput">
                                                         <p className="my-profile-title">Area</p>
                                                         <Select
                                                             data-area-add="status"
                                                             value={this.state.addArea}
                                                             onChange={this.onAddAreaStatusChange}
                                                             options={activeAreas}
                                                         />
                                                         <div className="mb-2 text-danger">{this.validator.message('area', this.state.area, 'required')}</div>
                                                     </div>
                                                     <div className="newAddressInput">
                                                         <p className="my-profile-title">Postal Code</p>
                                                         <input onChange={(e)=>this.onPostCode(e)} value={this.state.postCode}  type="text"  className="form-control" name="postalcode"/>
                                                         <div className="mb-2 text-danger">{this.validator.message('postCode', this.state.postCode, 'required|numeric')}</div>
                                                     </div>
                                                     <div className="newAddressInput">
                                                         <p className="my-profile-title">Address</p>
                                                          <textarea onChange={(e)=>this.onAddress(e)} value={this.state.address} className="addressInputField form-control" name="address" />
                                                         <div className="mb-2 text-danger">{this.validator.message('address', this.state.address, 'required')}</div>
                                                     </div>
                                                     <div id="shippingBtn" className="newAddressInput">
                                                         <p className="label-select-text">Select a label for effective delivery</p>
                                                         <Button id="home" value="home" onClick={(e)=>this.onShippingPlace(e)} className="address-label mr-2 shippingPlace"><i className="far fa-house"/> Home</Button>
                                                         <Button id="office" value="office" onClick={(e)=>this.onShippingPlace(e)}  className="address-label shippingPlace"><i className="far fa-building/"></i> Office</Button>
                                                         <div className="mb-2 text-danger">{this.validator.message('shippingPlace', this.state.shippingPlace, 'required')}</div>
                                                     </div>
                                                 </Col>
                                                 {this.props.mobileDelivery ?
                                                     <div className="mobile-nav">
                                                         <Container>
                                                             <Row className="w-100">
                                                                 <Fragment>
                                                                     <Col md={4} sm={4} xs={4} className="navCol">
                                                                         <div className="cart text-center mobile-nav-icon-div">
                                                                             <Button onClick={this.onCancel}  className="mobile-nav-link btn mobile-nav-btn" > Cancel</Button>
                                                                         </div>
                                                                     </Col>
                                                                     <Col md={4} sm={4} xs={4}  className="navCol">
                                                                         <div className="mobile-icon">
                                                                             <Link href='/'  >
                                                                                 <div className="mobile-icon-div">
                                                                                     <Photo
                                                                                         src="/home.png"
                                                                                         blurDataURL="/home.png"
                                                                                         class="nav-icon"
                                                                                     />
                                                                                 </div>
                                                                             </Link>
                                                                         </div>
                                                                     </Col>
                                                                     <Col md={4} sm={4} xs={4}  className="navCol">
                                                                         <div className="account text-center mobile-nav-icon-div">
                                                                             {this.state.loadingSubmitBtn ?
                                                                                 <Button className="mobile-nav-link btn mobile-nav-btn"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                                                     Loading...
                                                                                 </Button> :
                                                                                 <Button onClick={this.onSubmit}   className="mobile-nav-link btn mobile-nav-btn" > Save</Button>
                                                                             }
                                                                         </div>
                                                                     </Col>
                                                                 </Fragment>
                                                             </Row>
                                                         </Container>
                                                     </div>
                                                     :
                                                     <Col lg={12} md={12} sm={12} xs={12} className="newAddressInput text-right">
                                                         <Button onClick={this.onCancel} className="newAddressCancel mr-3">Cancel</Button>
                                                         {this.state.loadingSubmitBtn ?
                                                             <Button className="newAddressAdd"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                                 Loading...
                                                             </Button> :
                                                             <Button onClick={this.onSubmit} className="newAddressAdd">Save</Button>
                                                         }
                                                     </Col>
                                                 }
                                             </Row>
                                         </Card.Body>
                                     </Card>
                                 </Col>
                             </Row>
                         </Container>
                     </section>
                </Fragment>
    }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}




const mapDispatchToProps = {
    user,
    billingModalHide,
    shippingBillingAddress,
    shippingModalHide
};


export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfoPart);


