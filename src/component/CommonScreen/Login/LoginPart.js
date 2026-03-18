import React, {PureComponent, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Link from "next/link";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import {starter} from "../../../services/actions/starterAction";
import {login,loginWithFacebook,loginWithGoogle} from "../../../services/actions/userAction";
import {topProgressBar,loginNotificationReset} from "../../../services/actions/commonAction";
import {alert} from "../../../services/common";


class LoginPart extends PureComponent {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            email:"",
            password:"",
            phone:"",
            notMatch:false,
            loading:false,
            loginUsing:'email',
            rememberMe:false,
            errorMessage:'',
            socialMediaLogin:[],
            captcha:false,
            captchaStatus:0,
            captchaKey:""
        };
        this.onChangeLoginMethod = this.onChangeLoginMethod.bind(this)
        this.onPhone = this.onPhone.bind(this)
        this.onRememberMe = this.onRememberMe.bind(this)
        this.handleSocialFacebookLogin = this.handleSocialFacebookLogin.bind(this)
        this.handleSocialGoogleLogin = this.handleSocialGoogleLogin.bind(this)
        this.handleSocialFacebookErrorLogin = this.handleSocialFacebookErrorLogin.bind(this)
        this.handleSocialGoogleErrorLogin = this.handleSocialGoogleErrorLogin.bind(this)
        this.onCaptcha = this.onCaptcha.bind(this)
    }
    onChangeLoginMethod(data){
        this.setState({
            loginUsing:data
        })
    }
    componentDidMount() {
        this.setState({
            email:"",
            password:"",
            phone:"",
            notMatch:false,
            loading:false,
            loginUsing:'email',
            rememberMe:false,
        })

        this.props.topProgressBar(100);
        this.props.loginNotificationReset();
        document.addEventListener("keydown", (e) =>
            e.code === "Enter" && this.submitForm())

    }
    onEmailCheck(e) {
        this.setState({
            email:e.target.value
        })
    }
    onPasswordCheck(e) {
        this.setState({
            password:e.target.value
        })
    }


    onPhone(value){
        this.setState({
            phone:value
        })
    }
    onRememberMe(){
        let rememberMe = this.state.rememberMe;
        if(rememberMe){
            this.setState({
                rememberMe:false
            })
        }else{
            this.setState({
                rememberMe:true
            })
        }
    }
    handleSocialFacebookLogin(user) {
        if(user){
            let profile = user.data;
            let name = profile.name;
            let email = profile.email;
            let avatar = profile.picture;
            const data = {
                name:name,
                email:email,
                avatar:avatar
            }
            this.props.loginWithFacebook(data);
            this.props.topProgressBar(100);
        }
    };


    handleSocialFacebookErrorLogin(err){

        if(err){
            alert('warning','Something went wrong!')
        }

    }

    handleSocialGoogleErrorLogin(err){

        if(err){
            alert('warning','Something went wrong!')
        }


    }

    handleSocialGoogleLogin(user) {

           let profile = user.data;
            let name = profile.name;
            let email = profile.email;
            let avatar = profile.picture;
            const data = {
                name:name,
                email:email,
                avatar:avatar
            }

            this.props.loginWithGoogle(data);
            this.props.topProgressBar(100);

    };
    onCaptcha() {
        this.setState({
            captcha:true
        })
    }



    submitForm() {


        if(this.state.loginUsing==="email"){
            if(this.validator.fieldValid('email') &&
                this.validator.fieldValid('password')
            ) {
                let email = this.state.email;
                let password = this.state.password;
                let data = {
                    password:password,
                    email:email
                }

                this.props.login(data);
                this.props.topProgressBar(100);

            }else{
                this.validator.showMessageFor('email');
                this.validator.showMessageFor('password');
                this.forceUpdate();
            }
        }else{
            if(this.validator.fieldValid('phone') &&
                this.validator.fieldValid('password')
            ) {
                let phone = this.state.phone;
                let password = this.state.password;
                let data = {
                    password:password,
                    phone:phone
                }
                this.props.login(data);
                this.props.topProgressBar(100);
            }else{
                this.validator.showMessageFor('phone');
                this.validator.showMessageFor('password');
                this.forceUpdate();
            }
        }
    }

    render() {


        return (
            <Fragment>
                <div className="loginDiv">

                    <div className="login-input">
                         <h1 className="title">Welcome to {this.props.siteName}</h1>
                         <div>
                            <p className="mb-3 subTitle">Login to account.</p>
                             {this.props.banUser===1 ?
                                <Fragment>
                                    <Fragment>
                                        <p className="mb-2 alert alert-danger"><i className="far fa-exclamation-circle"/>  Account has been suspended! </p>
                                    </Fragment>
                                </Fragment>:
                                 <Fragment>
                                     {this.props.loginErrorMessage!=="" &&
                                         <p className="mb-2 alert alert-danger"><i className="far fa-exclamation-circle"/>{this.props.loginErrorMessage}</p>
                                     }
                                     {this.state.loginUsing==="email" ?
                                         <Fragment>
                                             {this.props.passwordNotMatch &&
                                                 <p className="mb-2 alert alert-danger"><i className="far fa-exclamation-circle"/> Email or password does not match </p>
                                             }
                                         </Fragment>
                                         :
                                         <Fragment>
                                             {this.props.passwordNotMatch &&
                                                 <p className="mb-2 alert alert-danger"><i className="far fa-exclamation-circle"/> Phone number or password does not match </p>
                                             }
                                         </Fragment>
                                     }
                                 </Fragment>
                             }
                        </div>
                         <Form>
                            {this.state.loginUsing=="email" ?
                                <Fragment>
                                    <InputGroup className='loginInputGroup'>
                                        <InputGroup.Prepend className='loginRegistrationInputField'>
                                            <InputGroup.Text className='loginRegistrationIcon'><i className="inputIcon fas fa-envelope"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl onChange={(e) => this.onEmailCheck(e)} placeholder="Phone/Email" type="email" className='inputTextField'/>
                                    </InputGroup>
                                    <div className="mb-2 text-danger">{this.validator.message('email', this.state.email, 'required|email')}</div>
                                    <span onClick={()=>this.onChangeLoginMethod('phone')} className="float-right usePhoneNumberText change-login-mode-btn">use phone number instead</span>
                                </Fragment>:
                                <Fragment>
                                    <InputGroup>
                                        <PhoneInput
                                            onChange={this.onPhone}
                                            value={this.state.phone}
                                        />
                                    </InputGroup>
                                    <span onClick={()=>this.onChangeLoginMethod('email')} className="float-right change-login-mode-btn">use email number instead</span>
                                    <div className="mb-2 mt-2 text-danger errorText">{this.validator.message('phone', this.state.phone, 'required|phone')}</div>
                                </Fragment>
                            }
                            <InputGroup className="loginInputGroup passwordInput">
                                <InputGroup.Prepend className='loginRegistrationInputField'>
                                    <InputGroup.Text className='loginRegistrationIcon'><i className="inputIcon fas fa-lock"/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={(e) => this.onPasswordCheck(e)} className="loginForm inputTextField" placeholder="Password" type="password"/>
                            </InputGroup>
                            <p className="mb-2 text-danger errorText"> {this.validator.message('password', this.state.password, 'required')}</p>
                        </Form>
                    </div>

                    <Row>
                        <Col lg={6} md={6}>

                            {this.props.reCaptcha.status===1  &&

                                <div className="recaptcha mb-2 mt-4">
                                    <ReCAPTCHA
                                        sitekey={this.props.reCaptcha.siteKey}
                                        onChange={this.onCaptcha}
                                    />
                                </div>

                            }

                            <Form.Group controlId="formBasicCheckbox" className="rememberCheackBox">
                                <Form.Check onClick={this.onRememberMe} value={this.state.rememberMe} type="checkbox" label="Remember me" />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={6}>
                            <Link href="/forget-password" className="float-right forget-password-btn">Forget Password?</Link>
                        </Col>
                    </Row>

                    <Col lg={12} md={12} sm={12} xs={12} className="p-0">
                        {this.props.reCaptcha.status===1 ?
                            <Fragment>
                                { this.state.captcha!==true ?
                                    <Button id="keydown" disabled={true} className="w-100 login-btn btn">Login</Button>:
                                    <Fragment>
                                        {this.props.userLoading ?
                                            <Button  disabled className="w-100 login-btn btn">
                                                <div className="spinner-border text-light login-btn-spinner" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </Button>
                                            :
                                            <Button id="keydown" onClick={(e)=>{this.submitForm(e)}} className="w-100 login-btn btn">Login</Button>
                                        }
                                    </Fragment>
                                }
                            </Fragment>:
                            <Fragment>
                                {this.props.userLoading ?
                                    <Button  disabled className="w-100 login-btn btn">
                                        <div className="spinner-border text-light login-btn-spinner" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </Button>
                                    :
                                    <Button id="keydown" onClick={(e)=>{this.submitForm(e)}} className="w-100 login-btn btn">Login</Button>
                                }
                            </Fragment>
                        }
                        <p className="text-center mt-2">
                            Don't have an account?{" "}
                            <Link class="loginLink" href="/user/registration">Click here</Link>
                        </p>
                    </Col>

                </div>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    starter,
    login,
    topProgressBar,
    loginNotificationReset,
    loginWithGoogle,
    loginWithFacebook
};

function mapStateToProps(state) {

    const starterLoading = state.starterReducer.starterLoading;
    const starterData = state.starterReducer.starterData;
    const starterErrMsg = state.starterReducer.starterErrMsg;
    const userLoading = state.userReducer.userLoading;
    const userData = state.userReducer.userData;
    const userErrMsg = state.userReducer.userErrMsg;
    const siteName = state.starterReducer.siteName;
    const reCaptcha = state.starterReducer.reCaptcha;
    const passwordNotMatch = state.userReducer.passwordNotMatch
    const loginErrorMessage = state.userReducer.loginErrorMessage
    const banUser=  state.userReducer.banUser;

    return {
        starterLoading,
        starterData,
        starterErrMsg,
        userLoading,
        userData,
        userErrMsg,
        siteName,
        reCaptcha,
        passwordNotMatch,
        loginErrorMessage,
        banUser
    };
}





export default connect(mapStateToProps, mapDispatchToProps)(LoginPart);


