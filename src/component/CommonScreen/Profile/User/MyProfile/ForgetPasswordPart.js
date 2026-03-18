import React, {Component, Fragment} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../../../ClientApi/Api";
import InputGroup from "react-bootstrap/InputGroup";
import {DebounceInput} from "react-debounce-input";
import PhoneInput from "react-phone-input-2";

import 'react-phone-input-2/lib/style.css';
import {connect} from "react-redux";
import {sendEmail} from "../../../../../services/actions/commonAction";

class ForgetPasswordPart extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            loading : false,
            data:[],
            email:'',
            phone:'',
            notFound:false,
            msg:"",
            loginUsingEmail:true,
            loginUsingPhone:false,
            emailExist:false,
            phoneExist:false,
        }
        this.onEmail = this.onEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onLoginUsing = this.onLoginUsing.bind(this)
        this.onPhone = this.onPhone.bind(this)
    }
    onEmail(e) {
        this.setState({
            email:e.target.value
        })
    }
    onPhone(value){
        this.setState({
            phone:value
        })
    }
    onLoginUsing(e){
        if(e.target.value==="email"){
            this.setState({
                loginUsingEmail:true,
                loginUsingPhone:false
            })
        }else{
            this.setState({
                loginUsingEmail:false,
                loginUsingPhone:true
            })
        }
    }
    onSubmit() {
        if(this.state.loginUsingEmail){
            if( this.validator.fieldValid('email')) {
                let email = this.state.email;
                let data = {
                    email:email,
                    siteUrl:this.props.baseApi,
                }
                this.setState({
                    loading:true
                })
                Api().post('forgot-password',data).then(res=>{
                    if(res.data===0){
                        this.setState({
                            notFound:true,
                            msg:"",
                            loading:false
                        })
                    }else{
                        this.setState({
                            msg:res.data.status,
                            notFound:false,
                            loading:false
                        })

                        this.props.sendEmail();
                    }
                }).catch()
            }else{
                window.scroll(0,0)
                this.validator.showMessageFor('email');
                this.forceUpdate();
            }
        }else{
            if( this.validator.fieldValid('phone')) {
                let phone = this.state.phone;
                let data = {
                    phone:phone,
                    siteUrl:this.props.baseApi,
                }
                this.setState({
                    loading:true
                })
                Api().post('forgot-password',data).then(res=>{
                    if(res.data===0){
                        this.setState({
                            notFound:true,
                            msg:"",
                            loading:false
                        })
                    }else{
                        this.setState({
                            msg:res.data.status,
                            notFound:false,
                            loading:false
                        })
                    }
                }).catch()
            }else{
                window.scroll(0,0)
                this.validator.showMessageFor('phone');
                this.forceUpdate();
            }
        }
    }
    render() {
        return (
                <div className="forget-password-div">
                    <h4 >Forgot your password?</h4>
                    <div className="forget-password">
                        <Row>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <div>
                                    <h6 className="mb-4">Enter your email or phone number below and we’ll send you a link to reset your password</h6>
                                </div>
                                {this.state.notFound &&
                                    <p className="alert alert-danger">There is no account with this  provided information</p>
                                }
                                {this.state.msg!=="" &&
                                    <p className="alert alert-info">{this.state.msg}</p>
                                }


                                <InputGroup className="loginUsingDiv" row aria-label="login" onChange={this.onLoginUsing}>
                                     <div className="form-check">
                                        <input className="form-check-input mr-2 onLoginUsing radioButton" id="flexRadioDefault1" value="email" checked={this.state.loginUsingEmail}  type="radio"  />
                                        <label className="form-check-label ml-4" htmlFor="flexRadioDefault1">Use Email address</label>
                                     </div>

                                    <div className="form-check">
                                        <input className="form-check-input mr-2 phoneNumberUse radioButton" id="flexRadioDefault2" value="phone" checked={this.state.loginUsingPhone}  type="radio"  />
                                        <label className="form-check-label ml-4" htmlFor="flexRadioDefault2">Use Phone number</label>
                                    </div>

                                </InputGroup>
                                <Fragment>
                                    {this.state.loginUsingEmail ?
                                        <Fragment>
                                            <InputGroup className="mb-2 loginInputGroup passwordInput">
                                                <InputGroup.Prepend className="loginRegistrationInputField">
                                                    <InputGroup.Text className='loginRegistrationIcon'><i className="inputIcon fas fa-envelope"/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <DebounceInput
                                                    onChange={(e)=>this.onEmail(e)}
                                                    className="form-control formControl inputTextField" placeholder="Email" type="email"
                                                    minLength={1}
                                                    debounceTimeout={300}
                                                />
                                            </InputGroup>
                                            <p className="mb-2 text-danger errorText">{this.validator.message('email', this.state.email, 'required|email')}</p>
                                        </Fragment> :
                                        <Fragment>
                                            <PhoneInput
                                                value={this.state.phone}
                                                onChange={this.onPhone}
                                            />
                                            <p className="mb-2 text-danger errorText phoneErrorMsg">{this.validator.message('phone', this.state.phone, 'required|phone')}</p>
                                        </Fragment>
                                    }
                                </Fragment>
                                {this.state.loading ?
                                    <button disabled={true} className="btn float-right">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>Loading...
                                    </button>:
                                    <Button onClick={this.onSubmit} className="btn float-right">Submit</Button>
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
        );
    }
}

const mapDispatchToProps = {
    sendEmail
};

function mapStateToProps(state) {
    const baseApi = state.starterReducer.baseApi;
    return {
        baseApi
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgetPasswordPart);




