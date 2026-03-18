import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import Api from "../../../../../ClientApi/Api";
import ReactPlaceholder from "react-placeholder";
import Image from "react-bootstrap/Image";
import {alert} from "../../../../../services/common"
import {shippingBillingAddress} from "../../../../../services/actions/shippingBillingPickupAction";
import Router from "next/router"
import {connect} from "react-redux";
class EditUserAddressPart extends PureComponent {
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
            defaultBilling:null,
            defaultShipping:null,
            data:[],
            addAreaStatus: null,
            editAreaStatus: null,
            addAreaCountry: null,
            addAreaRegion: null,
            addAreaCity: null,
            addArea:null,
            editAreaCountry: null,
            editAreaName: null,
            editAreaId: null,
            activeCountries:[],
            activeRegions: [],
            activeCities: [],
            activeAreas:[],
            countryName:'',
            regionName:'',
            cityName:'',
            areaName:'',
            loading:false
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
        this.onCancel  = this.onCancel.bind(this)
    }
   async componentDidMount() {
        const data = {
            id:Router.query.id
        }
       await  Api().post('getShippingAddressById',data).then(res=>{
           if(res.data===0){
               Router.push("/address")
           }
           this.setState({
               name:res.data.name,
               phone:res.data.phone,
               country:res.data.country,
               region:  res.data.region,
               city:res.data.city,
               area:res.data.area,
               postCode:res.data.postCode,
               address:res.data.address,
               shippingPlace:res.data.shippingPlace,
               defaultBilling:res.data.defaultBilling,
               defaultShipping:res.data.defaultShipping,
           })
              Api().get('activeShippingCountries')
                .then(response => {
                    if(response.status == 200) {
                        let selectedCountry = [];
                        response.data.map(pd=>{
                            if(res.data.country==pd.id){
                                selectedCountry.push({value: pd['id'], label: (<><Image src={this.props.backendApi+pd['flag']} className="mr-2 flag"/> <span>{pd['name']}</span></>)});
                                this.setState({
                                    addAreaCountry: selectedCountry
                                })
                            }
                        })
                        this.setState({
                            activeCountries:response.data,
                            loading:true
                        })
                    }
                })
                .catch(function(error) {
                })
            const countryId = {
                countryId:res.data.country
            }
            Api().post('activeRegionsByCountry',countryId)
                .then(response => {
                    if(response.status == 200) {
                        let selectedRegion = [];
                        response.data.map(pd=>{
                            if(res.data.region==pd.id){
                                selectedRegion.push({value: pd['id'], label: pd['name']})
                                this.setState({
                                    addAreaRegion: selectedRegion,
                                    region:pd['name']
                                })
                            }
                        })
                        this.setState({activeRegions: response.data});
                    }
                })
            let regionId = {
                region:res.data.region
            }
            Api().post('activeCitiesByRegion',regionId)
                .then(response => {
                    if(response.status == 200) {
                        let selectedCity = [];
                        response.data.map(pd=>{
                            if(res.data.city==pd.id){
                                selectedCity.push({value: pd['id'], label: pd['name']})
                                this.setState({
                                    addAreaCity: selectedCity,
                                    city:pd['name']
                                })
                            }
                        })
                        this.setState({activeCities: response.data});
                    }
                })
            let areaId = {
                id:res.data.city
            }
            Api().post('activeAreasByCity',areaId)
                .then(response => {
                    if(response.status == 200) {
                        let selectedArea = [];
                        response.data.map(pd=>{
                            selectedArea.push({value: pd['id'], label: pd['name']})
                                this.setState({
                                    addArea: selectedArea,
                                    area:pd['name']
                                })
                        })
                    }
                })
          }).catch(error=>{})
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
        Api().post('activeRegionsByCountry',data)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeRegions: response.data});
                    this.setState({
                        addAreaRegion: "",
                        activeCities:[],
                        addAreaCity:"",
                        addArea:"",
                        region:"",
                        city:"",
                        area:"",
                    });
                }
            })
    }
    onAddAreaRegionChange(e) {
        this.setState({
            addAreaRegion: e,
            region:e.label
        });
        const data  = {
            region:e.value
        }
        Api().post('activeCitiesByRegion',data)
            .then(response => {
                if(response.status == 200) {
                    this.setState({activeCities: response.data});
                    this.setState({addAreaCity: "",
                        addArea:"",
                        city:"",
                        area:"",
                    });
                }
            })
    }
    onAddAreaCityChange(e) {
        this.setState({
            addAreaCity: e,
            city:e.label
        });
        let data = {
            id:e.value
        }
        Api().post('activeAreasByCity',data)
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
    onSubmit(){
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
                defaultShipping:this.state.defaultShipping,
                defaultBilling:this.state.defaultBilling,
                index:this.props.match.params.id
            }
            Api().post('updateShippingAddress',data).then(res=>{
                if(res.data!==0){
                    alert('success','Address updated successfully!')
                    this.props.shippingBillingAddress(res.data);
                }
            }).catch(error=>{
            });
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
          defaultBilling:null,
          defaultShipping:null,
          data:[],
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
      return (
      <Fragment>
          <Container>
          <Row>
                                <Col lg={12} md={12} sm={12} xs={12} className="p-1 newAddressAddPart">
                                    <Card className="addNewAddress" >
                                        <Card.Body className="addressAddCardBody">
                                            <Row>
                                                <Col lg={5} md={5} className="mb-3 addressInfos">
                                                    <div className="newAddressInput">
                                                        <label className="my-profile-title">Full Name</label>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <input value={this.state.name} onChange={(e)=>this.onName(e)} type="text" id="standard-basic" className="form-control inputTextSize inputBoxSize" name="name"/>
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('name', this.state.name, 'required')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div className="newAddressInput">
                                                        <p className="my-profile-title">Phone Number</p>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <input value={this.state.phone} onChange={(e)=>this.onPhone(e)}  type="text" id="standard-basic" className="form-control inputTextSize inputBoxSize" name="phone"/>
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('phone', this.state.phone, 'required|phone')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                </Col>
                                                <Col lg={7} md={7} className="mb-3 addressInfos">
                                                    <div className="newAddressInput">
                                                        <p className="my-profile-title">Country</p>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <Select
                                                                data-area-add="country"
                                                                value={this.state.addAreaCountry}
                                                                onChange={this.onAddAreaCountryChange}
                                                                options={activeCountries}
                                                            />
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('country', this.state.country, 'required')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div className="newAddressInput">
                                                        <p className="my-profile-title">Region</p>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <Select
                                                                data-area-add="region"
                                                                value={this.state.addAreaRegion}
                                                                onChange={this.onAddAreaRegionChange}
                                                                options={activeRegions}
                                                            />
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('region', this.state.region, 'required')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div className="newAddressInput">
                                                        <p className="my-profile-title">City</p>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <Select
                                                                data-area-add="region"
                                                                value={this.state.addAreaCity}
                                                                onChange={this.onAddAreaCityChange}
                                                                options={activeCities}
                                                            />
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('city', this.state.city, 'required')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div className="newAddressInput">
                                                        <p className="my-profile-title">Area</p>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <Select
                                                                data-area-add="status"
                                                                value={this.state.addArea}
                                                                onChange={this.onAddAreaStatusChange}
                                                                options={activeAreas}
                                                            />
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('area', this.state.area, 'required')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div className="newAddressInput">
                                                        <p className="my-profile-title">Postal Code</p>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <input value={this.state.postCode} onChange={(e)=>this.onPostCode(e)} type="text" id="standard-basic" className="form-control inputTextSize inputBoxSize" name="postalcode"/>
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('postCode', this.state.postCode, 'required|numeric')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div className="newAddressInput">
                                                        <p className="my-profile-title">Address</p>
                                                        <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                                                            <textarea className="form-control inputTextSize inputBoxSize" value={this.state.address} onChange={(e)=>this.onAddress(e)} name="address" rows={3} />
                                                            <div className="mb-2 text-danger inputTextSize">{this.validator.message('address', this.state.address, 'required')}</div>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div id="shippingBtn" className="newAddressInput">
                                                        <p className="label-select-text">Select a label for effective delivery</p>
                                                            <Button id="office" value="office" onClick={(e)=>this.onShippingPlace(e)} className={`address-label shippingPlace mr-2  ${this.state.shippingPlace==="office" ? "selected" : ""}`} ><i className="far fa-building"/> Office</Button>
                                                            <Button id="home" value="home" onClick={(e)=>this.onShippingPlace(e)} className={`address-label shippingPlace  ${this.state.shippingPlace==="home" ? "selected" : ""}`}><i className="far fa-house"/> Home</Button>
                                                        <div className="mb-2 text-danger inputTextSize">{this.validator.message('shippingPlace', this.state.shippingPlace, 'required')}</div>
                                                    </div>
                                                </Col>
                                                <Col lg={12} md={12} sm={12} xs={12} className="newAddressInput text-right">
                                                    <Fragment>
                                                        {this.state.loading===false ?
                                                            <Fragment>
                                                                <Button disabled={true} className="newAddressAdd float-right">Update</Button>
                                                                <Button disabled={true} className="newAddressCancel mr-1 mr-md-3 mr-lg-3">Cancel</Button>
                                                            </Fragment> :
                                                            <Fragment>
                                                                <Button onClick={this.onCancel} className="newAddressCancel mr-1 mr-md-3 mr-lg-3">Cancel</Button>
                                                                {this.state.loadingBtn==false ?
                                                                    <Button className="float-right"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                                        Loading...
                                                                    </Button> :
                                                                    <Button onClick={this.onSubmit} className="newAddressAdd float-right">Update</Button>
                                                                }
                                                            </Fragment>
                                                        }
                                                    </Fragment>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
          </Container>
      </Fragment>
    )
  }
}


const mapDispatchToProps = {
    shippingBillingAddress
};

function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserAddressPart);