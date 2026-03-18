import React, {PureComponent,Fragment} from 'react';
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../ClientApi/Api";
import AuthContext from "../../../Auth/Auth";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Select from "react-select";
import TextField from "@material-ui/core/TextField/TextField";
import {Link, withRouter} from "react-router-dom";
const MobileTopBack = React.lazy(() => import("../MobileCommon/MobileTopBack"));
class AddMobileShipping extends PureComponent {
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
            addAreaDeliveryFee: null,
            addAreaStatus: null,
            editAreaStatus: null,
            addAreaCountry: null,
            addAreaRegion: null,
            addAreaCity: null,
            addArea:null,
            editAreaCountry: null,
            editAreaName: null,
            editAreaId: null,
            activeCountries: null,
            activeRegions: null,
            activeCities: null,
            countryName:'',
            regionName:'',
            cityName:'',
            areaName:'',
            shippingChecked:0,
            billingChecked:0
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
        this.onDefaultShipping = this.onDefaultShipping.bind(this)
        this.onDefaultBilling = this.onDefaultBilling.bind(this)
    }
    componentDidMount() {
        Api().get('shippingAddress').then(res=>{
        }).catch(error=>{
        })
        Api().get('/activeShippingCountries')
            .then(response => {
                console.log(response.data,'activeShippingCountries ');
                if(response.status == 200) {
                    this.setState({
                        activeCountries:response.data
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
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
    onAddAreaCountryChange(e) {
        let country = this.state.activeCountries;
        country.map(pd=>{
            if(pd.id===e.value){
                this.setState({
                    countryName:pd.name
                });
            }
        })
        this.setState({
            addAreaCountry: e,
        });
        let countryId = e.value;
        Api().get('activeRegionsByCountry/'+countryId)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeRegions: response.data});
                    this.setState({addAreaRegion: null});
                    this.setState({activeCities: null});
                    this.setState({addAreaCity: null});
                }
            })
    }
    onAddAreaRegionChange(e) {
        console.log(e);
        this.setState({addAreaRegion: e,
            regionName:e.label
        });
        let regionId = e.value;
        Api().get('/activeCitiesByRegion/'+regionId)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeCities: response.data});
                    this.setState({addAreaCity: null});
                }
            })
    }
    onAddAreaCityChange(e) {
        this.setState({addAreaCity: e,
            cityName:e.label
        });
        let cityId = e.value;
        Api().get('activeAreaByCity/'+cityId)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeAreas: response.data});
                }
            })
    }
    onAddAreaStatusChange(e) {
        this.setState({addArea: e,
            areaName:e.label
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
            var targetedId = document.getElementById(btnId);
            var current = header.getElementsByClassName("selected");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" selected", " ");
            }
            targetedId.className += " selected";
            this.setState({
                shippingPlace:e.target.value
            })
        }
    }
    onDefaultShipping(){
        let defaultShipping = this.state.shippingChecked;
        if(defaultShipping===1){
            this.setState({
                shippingChecked:0
            })
        }else{
            this.setState({
                shippingChecked:1
            })
        }
    }
    onDefaultBilling(){
        let defaultBilling = this.state.billingChecked;
        if(defaultBilling===1){
            this.setState({
                billingChecked:0
            })
        }else{
            this.setState({
                billingChecked:1
            })
        }
    }
    onSubmit(){
        if (this.validator.allValid()) {
            let data = {
                name:this.state.name,
                phone:this.state.phone,
                country: this.state.countryName,
                region:this.state.regionName,
                city:this.state.cityName,
                area:this.state.areaName,
                postCode:this.state.postCode,
                address:this.state.address,
                shippingPlace:this.state.shippingPlace,
                defaultShipping:0,
                defaultBilling:0,
            }
            Api().post('postShippingAddress',data).then(res=>{
                if(res.data===1){
                    this.props.history.push("/checkout");
                }
            }).catch(error=>{});
        } else {
            this.validator.showMessages();
            window.scroll(0,0);
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
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
            addAreaDeliveryFee: null,
            addAreaStatus: null,
            editAreaStatus: null,
            addAreaCountry: null,
            addAreaRegion: null,
            addAreaCity: null,
            addArea:null,
            editAreaCountry: null,
            editAreaName: null,
            editAreaId: null,
            activeCountries: null,
            activeRegions: null,
            activeCities: null,
            countryName:'',
            regionName:'',
            cityName:'',
            areaName:''
        })
    }
    static contextType = AuthContext;
    render() {
        const activeCountries = [];
        if(this.state.activeCountries != null) {
            let tempActiveCountries = Array.from(this.state.activeCountries);
            tempActiveCountries.map(tempActiveCountries => {
                activeCountries.push({value: tempActiveCountries['id'], label: (<><span>{tempActiveCountries['name']}</span></>)});
            })
        }
        const activeRegions = [];
        if(this.state.activeRegions != null) {
            let tempActiveRegions = Array.from(this.state.activeRegions);
            tempActiveRegions.map(tempActiveRegions => {
                activeRegions.push({value: tempActiveRegions['id'], label: tempActiveRegions['name']})
            })
        } else {
            activeRegions.push({value: "", label: "select shipping country" })
        }
        const activeCities = [];
        if(this.state.activeCities != null) {
            let tempActiveCities = Array.from(this.state.activeCities);
            tempActiveCities.map(tempActiveCities => {
                activeCities.push({value: tempActiveCities['id'], label: tempActiveCities['name']})
            })
        } else {
            activeCities.push({value: "", label: "select shipping region" })
        }
        const activeAreas = [];
        if(this.state.activeAreas != null) {
            let tempActiveArea = Array.from(this.state.activeAreas);
            tempActiveArea.map(tempActiveArea => {
                activeAreas.push({value: tempActiveArea['id'], label: tempActiveArea['name']})
            })
        } else {
            activeAreas.push({value: "", label: "select shipping city" })
        }
        return (
            <Fragment>
                <MobileTopBack title="Add Shipping Address"/>
                <Row key={1}>
                    <Col key={1} lg={12} md={12} sm={12} xs={12} className="p-1">
                        <Card key={1} className="addNewAddress" style={{ width: '100%' }}>
                            <Card.Body key={1} className="addressAddCardBody">
                                <Row key={1}>
                                    <Col key={1} lg={5} md={5} className="mb-3 addressInfos">
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
                                    <Col key={1} lg={7} md={7} className="mb-3 addressInfos">
                                        <div className="newAddressInput">
                                            <p className="my-profile-title">Country</p>
                                            <Select
                                                data-area-add="country"
                                                value={this.state.addAreaCountry}
                                                onChange={this.onAddAreaCountryChange}
                                                options={activeCountries}
                                            />
                                            <div className="mb-2 text-danger">{this.validator.message('country', this.state.countryName, 'required')}</div>
                                        </div>
                                        <div className="newAddressInput">
                                            <p className="my-profile-title">Region</p>
                                            <Select
                                                data-area-add="region"
                                                value={this.state.addAreaRegion}
                                                onChange={this.onAddAreaRegionChange}
                                                options={activeRegions}
                                            />
                                            <div className="mb-2 text-danger">{this.validator.message('region', this.state.regionName, 'required')}</div>
                                        </div>
                                        <div className="newAddressInput">
                                            <p className="my-profile-title">City</p>
                                            <Select
                                                data-area-add="region"
                                                value={this.state.addAreaCity}
                                                onChange={this.onAddAreaCityChange}
                                                options={activeCities}
                                            />
                                            <div className="mb-2 text-danger">{this.validator.message('city', this.state.cityName, 'required')}</div>
                                        </div>
                                        <div className="newAddressInput">
                                            <p className="my-profile-title">Area</p>
                                            <Select
                                                data-area-add="status"
                                                value={this.state.addArea}
                                                onChange={this.onAddAreaStatusChange}
                                                options={activeAreas}
                                            />
                                            <div className="mb-2 text-danger">{this.validator.message('area', this.state.areaName, 'required')}</div>
                                        </div>
                                        <div className="newAddressInput">
                                            <p className="my-profile-title">Postal Code</p>
                                            <input onChange={(e)=>this.onPostCode(e)} value={this.state.postCode}  type="text" id="standard-basic" className="form-control" name="postalcode"/>
                                            <div className="mb-2 text-danger">{this.validator.message('postCode', this.state.postCode, 'required|numeric')}</div>
                                        </div>
                                        <div className="newAddressInput">
                                            <p className="my-profile-title">Address</p>
                                            <TextField onChange={(e)=>this.onAddress(e)} value={this.state.address} id="standard-basic" className="addressInputField" name="address"/>
                                            <div className="mb-2 text-danger">{this.validator.message('address', this.state.address, 'required')}</div>
                                        </div>
                                        <div id="shippingBtn" className="newAddressInput">
                                            <p className="label-select-text">Select a label for effective delivery</p>
                                            <Button id="home" value="home" onClick={(e)=>this.onShippingPlace(e)} className="address-label mr-2 shippingPlace"><i className="far fa-house"/> Home</Button>
                                            <Button id="office" value="office" onClick={(e)=>this.onShippingPlace(e)}  className="address-label shippingPlace"><i className="far fa-building/"></i> Office</Button>
                                            <div className="mb-2 text-danger">{this.validator.message('shippingPlace', this.state.shippingPlace, 'required')}</div>
                                        </div>
                                    </Col>
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
                                                            <Link to='/'  >
                                                                <div className="mobile-icon-div">
                                                                    <img className="nav-icon" src={process.env.PUBLIC_URL + "/home.png"}/>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                    <Col md={4} sm={4} xs={4}  className="navCol">
                                                        <div className="account text-center mobile-nav-icon-div">
                                                            <Button onClick={this.onSubmit}   className="mobile-nav-link btn mobile-nav-btn" > Save</Button>
                                                        </div>
                                                    </Col>
                                                </Fragment>
                                            </Row>
                                        </Container>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
export default withRouter(AddMobileShipping);
