import React, {PureComponent, Fragment} from "react";
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../ClientApi/Api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {DebounceInput} from "react-debounce-input";
import Link from "next/link";
import {connect} from "react-redux";
import Router from "next/router";
import {sendEmail, topProgressBar} from "../../../services/actions/commonAction";
import {alert} from "../../../services/common";
import {debounce} from "@mui/material";


class UserRegistrationPart extends PureComponent {

    constructor(props) {

        super(props);
        this.validator = new SimpleReactValidator();
        this.onPhone = debounce(this.onPhone.bind(this), 1000);

        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            verificationCodeSend: false,
            confirmPassword: '',
            redirect: false,
            loginUsingEmail: true,
            loginUsingPhone: false,
            emailExist: false,
            phoneExist: false,
            passwordNotMatch: false,
            loading: false,
            status: "",
            message: "",
            userId: "",
            functionCall: false,
            code: '',
            phoneResponse: false,
            emailResponse: false,

        }

        this.onName = this.onName.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onPassword = this.onPassword.bind(this);
        this.onConfirmPassword = this.onConfirmPassword.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.onLoginUsing = this.onLoginUsing.bind(this)
        this.verifyEmail = this.verifyEmail.bind(this)
        this.verifyPhone = this.verifyPhone.bind(this)
        this.resetStatus = this.resetStatus.bind(this)
        this.onCode = this.onCode.bind(this)
    }

    componentDidMount() {

        document.addEventListener("keydown", (e) =>
            e.code === "Enter" && this.submitForm())
    }

    onName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onEmail(e) {
        this.setState({
            email: e.target.value
        })
        let data = {
            email: e.target.value
        }

        this.setState({
            emailExist: false,
            emailResponse: false
        })

        Api().get('/sanctum/csrf-cookie').then(res => {
            Api().post('checkUserEmail', data).then(res => {
                if (res.data === 1) {
                    this.setState({
                        emailExist: true,
                        emailResponse: true
                    })
                } else if(res.data===0) {
                    this.setState({
                        emailExist: false,
                        emailResponse: true
                    })
                }

            })
        })

    }

    onPhone(value) {
        this.setState({
            phone: value
        })
        let data = {
            phone: value
        }
        if (value == undefined) {
            this.setState({
                phoneExist: false,
                phone: ""
            })
        }

        this.setState({
            phoneResponse: false
        })

        Api().get('/sanctum/csrf-cookie').then(res => {
            Api().post('checkUserPhone', data).then(res => {
                if (res.data == 1) {
                    this.setState({
                        phoneExist: true
                    })
                } else {
                    this.setState({
                        phoneExist: false,
                    })
                }

                this.setState({
                    phoneResponse: true
                })
            })
        })

    }

    onPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
        let password = this.state.password
        let confirmPassword = e.target.value;
        if (confirmPassword > 0) {
            if (password !== confirmPassword) {
                this.setState({
                    passwordNotMatch: true
                })
            } else {
                this.setState({
                    passwordNotMatch: false,
                })
            }
        } else {
            this.setState({
                passwordNotMatch: false,
            })
        }
    }

    onLoginUsing(e) {
        if (e.target.value === "email") {
            this.setState({
                loginUsingEmail: true,
                loginUsingPhone: false
            })
        } else {
            this.setState({
                loginUsingEmail: false,
                loginUsingPhone: true
            })
        }
    }

    verifyEmail() {
        if (this.state.emailExist != true) {
            if (this.validator.fieldValid('name') &&
                this.validator.fieldValid('email')
            ) {
                this.setState({
                    loading: true
                })
                let name = this.state.name;
                let email = this.state.email;
                let data = {
                    name: name,
                    email: email,
                }

                Api().get('/sanctum/csrf-cookie').then(res => {
                    Api().post('sendEmailVerificationCode', data).then(res => {
                            if (res.data != 0) {
                                this.setState({
                                    verificationCodeSend: true,
                                    loading: false,
                                    status: 'success',
                                    message: 'We sent a verification code to your email',
                                    userId: res.data
                                })
                                this.props.sendEmail();
                            } else {
                                this.setState({
                                    verificationCodeSend: true,
                                    loading: false,
                                    status: 'danger',
                                    message: 'Something went wrong',
                                })
                            }
                        }
                    ).catch(error => {
                    })

                })
            } else {
                window.scroll(0, 0)
                this.validator.showMessageFor('name');
                this.validator.showMessageFor('email');
                this.forceUpdate();
            }
        }
    }

    verifyPhone() {
        if (this.state.phoneExist != true) {
            if (this.validator.fieldValid('name') &&
                this.validator.fieldValid('phone')
            ) {
                this.setState({
                    loading: true
                })
                let name = this.state.name;
                let phone = this.state.phone;
                let data = {
                    name: name,
                    phone: phone,
                }
                Api().get('/sanctum/csrf-cookie').then(res => {
                    Api().post('sendVerificationCode', data).then(res => {
                            if (res.data !== 0) {
                                this.setState({
                                    verificationCodeSend: true,
                                    loading: false,
                                    status: 'success',
                                    message: 'We sent a verification code to your phone',
                                    userId: res.data
                                })
                            } else {
                                this.setState({
                                    verificationCodeSend: true,
                                    loading: false,
                                    status: 'danger',
                                    message: 'something went wrong',
                                })
                            }
                        }
                    ).catch(error => {
                    })
                })
            } else {
                window.scroll(0, 0)
                this.validator.showMessageFor('name');
                this.validator.showMessageFor('phone');
                this.forceUpdate();
            }
        }
    }

    submitForm() {
        if (this.state.loginUsingEmail && this.state.emailExist === false && this.state.passwordNotMatch === false) {
            if (this.validator.fieldValid('name') &&
                this.validator.fieldValid('email') &&
                this.validator.fieldValid('emailVerificationCode') &&
                this.validator.fieldValid('password') &&
                this.validator.fieldValid('confirm_password')
            ) {
                let name = this.state.name;
                let email = this.state.email;
                let password = this.state.password;
                let confirmPassword = this.state.confirmPassword;
                let code = this.state.code;
                let userId = this.state.userId;
                let data = {
                    name: name,
                    email: email,
                    role_id: 1,
                    password: password,
                    code: code,
                    password_confirmation: confirmPassword,
                    userId: userId
                }
                this.setState({
                    loading: true
                })

                Api().get('/sanctum/csrf-cookie').then(res => {
                    Api().post('userRegistration', data).then(res => {


                            if (res.data == 1) {

                                this.setState({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    password: '',
                                    verificationCodeSend: false,
                                    confirmPassword: '',
                                    redirect: false,
                                    loginUsingEmail: true,
                                    loginUsingPhone: false,
                                    emailExist: false,
                                    phoneExist: false,
                                    passwordNotMatch: false,
                                    loading: false,
                                    userId: "",
                                    functionCall: false,
                                    code: '',
                                    phoneResponse: true,
                                    emailResponse: true,
                                })

                                this.props.topProgressBar(100);
                                alert('success', 'User registration successful!');
                            }
                            this.setState({
                                loading: false,
                                status: res.data == 1 ? '' : 'danger',
                                message: res.data == 1 ? '' : res.data,
                            })
                            document.getElementById('showNotification').style.display = 'block';


                        }
                    ).catch(error => {
                    })
                })

            } else {
                window.scroll(0, 0)
                this.validator.showMessageFor('name');
                this.validator.showMessageFor('email');
                this.validator.fieldValid('emailVerificationCode') &&
                this.validator.showMessageFor('password');
                this.validator.showMessageFor('confirm_password');
                this.forceUpdate();
            }
        } else {
            if (this.state.phoneExist === false && this.state.passwordNotMatch === false) {
                if (this.validator.fieldValid('name') &&
                    this.validator.fieldValid('phone') &&
                    this.validator.fieldValid('smsVerificationCode') &&
                    this.validator.fieldValid('password') &&
                    this.validator.fieldValid('confirm_password')
                ) {
                    let name = this.state.name;
                    let phone = this.state.phone;
                    let password = this.state.password;
                    let confirmPassword = this.state.confirmPassword
                    let code = this.state.code;
                    let userId = this.state.userId
                    let data = {
                        name: name,
                        phone: phone,
                        role_id: 1,
                        code: code,
                        password: password,
                        password_confirmation: confirmPassword,
                        userId: userId
                    }
                    this.setState({
                        loading: true
                    })

                    Api().get('/sanctum/csrf-cookie').then(res => {
                        Api().post('userRegistration', data).then(res => {

                                if (res.data == 1) {

                                    this.setState({
                                        name: '',
                                        email: '',
                                        phone: '',
                                        password: '',
                                        verificationCodeSend: false,
                                        confirmPassword: '',
                                        redirect: false,
                                        loginUsingEmail: true,
                                        loginUsingPhone: false,
                                        emailExist: false,
                                        phoneExist: false,
                                        passwordNotMatch: false,
                                        loading: false,
                                        userId: "",
                                        functionCall: false,
                                        code: '',
                                        phoneResponse: true,
                                        emailResponse: true,
                                    })

                                    alert('success', 'Registration successful!');
                                    this.props.topProgressBar(100);

                                }

                                this.setState({
                                    loading: false,
                                    status: res.data == 1 ? '' : 'danger',
                                    message: res.data == 1 ? '' : res.data,
                                })
                                document.getElementById('showNotification').style.display = 'block';


                            }
                        ).catch(error => {
                        })
                    })
                } else {
                    window.scroll(0, 0)
                    this.validator.showMessageFor('name');
                    this.validator.showMessageFor('phone');
                    this.validator.showMessageFor('smsVerificationCode');
                    this.validator.showMessageFor('password');
                    this.validator.showMessageFor('confirm_password');
                    this.forceUpdate();
                }
            }
        }
    }

    resetStatus() {
        this.setState({
            status: ''
        })
    }


    onCode(e) {
        this.setState({
            code: e.target.value
        })
    }

    render() {
        if (this.state.redirect) {
            Router.push("/login");
        }
        return (
            <Fragment>
                <div className="loginDiv">
                    <div className="register-input">
                        <h1>Welcome to {this.props.siteTitle}</h1>

                        <p className="mb-3">Create an account.</p>


                        {this.state.message !== "" &&
                            <Fragment>

                                {this.state.status === "success" ?
                                    <p id="showNotification" className="alert alert-success">{this.state.message}</p> :
                                    this.state.status === "danger" ?
                                        <p id="showNotification"
                                           className="alert alert-danger">{this.state.message}</p> :
                                        <></>
                                }

                            </Fragment>
                        }

                        <Form>
                            <InputGroup className="mb-2 mb-xs-1 loginInputGroup">
                                <InputGroup.Prepend className="mb-xs-1 loginRegistrationInputField">
                                    <InputGroup.Text className="formIcon loginRegistrationIcon"><i
                                        className="inputIcon fas fa-user"/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl className="formControl inputTextField" placeholder="Full Name" type="text"
                                             onChange={(e) => this.onName(e)}/>
                            </InputGroup>
                            <p className="mb-2 text-danger errorText">{this.validator.message('name', this.state.name, 'required|string')}</p>
                            {this.state.verificationCodeSend !== true &&
                                <RadioGroup className="loginUsingDiv" row aria-label="login"
                                            onChange={this.onLoginUsing}>
                                    <FormControlLabel className="mr-2 onLoginUsing radioButton" value="email"
                                                      checked={this.state.loginUsingEmail} control={<Radio/>}
                                                      label="Use Email address"/>
                                    <FormControlLabel className="mr-2 phoneNumberUse radioButton" value="phone"
                                                      checked={this.state.loginUsingPhone} control={<Radio/>}
                                                      label="Use Phone number"/>
                                </RadioGroup>
                            }
                            {this.state.verificationCodeSend ?
                                <Fragment>
                                    {this.state.loginUsingEmail ?
                                        <Fragment>
                                            <Fragment>
                                                <InputGroup className="mb-2 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text className='loginRegistrationIcon'><i
                                                            className="inputIcon fas fa-envelope"/></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className="formControl inputTextField"
                                                                 value={this.state.email} readOnly={true}/>
                                                </InputGroup>
                                                <InputGroup className="mb-2 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text className='loginRegistrationIcon'><i
                                                            className="inputIcon fas fa-check-circle"/></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className="formControl inputTextField"
                                                                 placeholder="verification code"
                                                                 onChange={(e) => this.onCode(e)}/>
                                                    <p className="mb-2 text-danger errorText">{this.validator.message('emailVerificationCode', this.state.code, 'required')}</p>
                                                </InputGroup>
                                            </Fragment>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <Fragment>
                                                <InputGroup className="mb-2 loginInputGroup">
                                                    <PhoneInput
                                                        onChange={this.onPhone}
                                                        value={this.state.phone}
                                                        readOnly={true}/>
                                                </InputGroup>
                                                <InputGroup className="mb-2 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text className='loginRegistrationIcon'><i
                                                            className="inputIcon fas fa-check-circle"></i></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className="formControl inputTextField"
                                                                 placeholder="verification code"
                                                                 onChange={(e) => this.onCode(e)}/>
                                                    <p className="mb-2 text-danger errorText">{this.validator.message('smsVerificationCode', this.state.code, 'required')}</p>
                                                </InputGroup>

                                            </Fragment>
                                        </Fragment>
                                    }
                                </Fragment>
                                :
                                <Fragment>
                                    <Fragment>
                                        {this.state.loginUsingEmail ?
                                            <Fragment>
                                                <InputGroup className="mb-2 loginInputGroup passwordInput">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text className='loginRegistrationIcon'><i
                                                            className="inputIcon fas fa-envelope"/></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <DebounceInput
                                                        onChange={(e) => this.onEmail(e)}
                                                        className="form-control formControl inputTextField"
                                                        placeholder="Email" type="email"
                                                        minLength={1}
                                                        debounceTimeout={300}
                                                    />
                                                </InputGroup>
                                                {this.state.emailExist ?
                                                    <p className="mb-2 text-danger errorText">The email address has
                                                        already be taken</p> :
                                                    <p className="mb-2 text-danger errorText">{this.validator.message('email', this.state.email, 'required|email')}</p>
                                                }
                                            </Fragment> :
                                            <Fragment>
                                                <PhoneInput
                                                    value={this.state.phone}
                                                    onChange={this.onPhone}
                                                />
                                                {this.state.phoneExist ?
                                                    <p className="mb-2 text-danger errorText">The phone number be
                                                        already taken</p> :
                                                    <p className="mb-2 text-danger errorText phoneErrorMsg">{this.validator.message('phone', this.state.phone, 'required|phone')}</p>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                </Fragment>
                            }
                            {this.state.verificationCodeSend &&
                                <Fragment>
                                    <InputGroup className="mb-2 loginInputGroup">
                                        <InputGroup.Prepend className="loginRegistrationInputField">
                                            <InputGroup.Text className='loginRegistrationIcon' id="basic-addon1"><i
                                                className="inputIcon fas fa-lock"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className="formControl inputTextField" placeholder="Password"
                                                     type="password" onChange={(e) => this.onPassword(e)}/>
                                    </InputGroup>
                                    <p className="mb-2 text-danger errorText">{this.validator.message('password', this.state.password, 'required|min:6')}</p>
                                    <InputGroup className="mb-2 loginInputGroup">
                                        <InputGroup.Prepend className="loginRegistrationInputField">
                                            <InputGroup.Text className='loginRegistrationIcon'><i
                                                className="inputIcon fas fa-lock"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl className="formControl inputTextField"
                                                     placeholder="Confirm Password" type="password"
                                                     onChange={(e) => this.onConfirmPassword(e)}/>
                                    </InputGroup>
                                    {this.state.passwordNotMatch ?
                                        <p className="mb-2 text-danger errorText">The password not matched</p> :
                                        <p className="mb-2 text-danger errorText">{this.validator.message('confirm_password', this.state.confirmPassword, 'required')}</p>
                                    }
                                </Fragment>
                            }
                        </Form>

                    </div>

                    <Col lg={12} md={12} sm={12} xs={12} className="p-0">

                        {this.state.verificationCodeSend ?
                            <Fragment>
                                {this.state.loading ?
                                    <Button disabled onClick={this.onSubmit} className="registrationLink">
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </Button> :
                                    <Button  onClick={this.submitForm}
                                            className="w-100 register-btn">Register</Button>
                                }

                            </Fragment> :
                            <Fragment>
                                {this.state.loading ?
                                    <Button disabled onClick={this.onSubmit} className="registrationLink">
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </Button> :
                                    <Fragment>
                                        {this.state.loginUsingPhone ?
                                            <Fragment>
                                                {(this.state.phoneResponse) ?
                                                    <Fragment>
                                                        <Button onClick={this.verifyPhone}
                                                                className="w-100 register-btn">Verify Phone </Button>
                                                    </Fragment> :
                                                    <Fragment>
                                                        <Button disabled={true} className="w-100 register-btn">Verify
                                                            Phone </Button>
                                                    </Fragment>
                                                }
                                            </Fragment>
                                            :
                                            <Fragment>
                                                {(this.state.emailResponse) ?
                                                    <Fragment>
                                                        <Button onClick={this.verifyEmail}
                                                                className="w-100 register-btn">Verify Email</Button>
                                                    </Fragment> :
                                                    <Fragment>
                                                        <Button disabled={true} className="w-100 register-btn">Verify
                                                            Email</Button>
                                                    </Fragment>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </Fragment>
                        }
                        <p className="text-center">Have an account?{" "}
                            <Link class="registrationLink" href="/login">Click here</Link>
                        </p>
                    </Col>

                </div>

            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    sendEmail,
    topProgressBar
};

function mapStateToProps(state) {
    const siteTitle = state.starterReducer.siteTitle;
    return {
        siteTitle
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationPart);


