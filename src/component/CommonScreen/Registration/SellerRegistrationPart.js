import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import SimpleReactValidator from 'simple-react-validator';
import Api from '../../../ClientApi/Api';
import {sendEmail, topProgressBar} from "../../../services/actions/commonAction";
import {alert} from "../../../services/common";
import {connect} from "react-redux";
import {updateUserRole} from "../../../services/actions/userAction"
import Router from "next/router";
import {debounce} from "@mui/material";

class SellerRegistrationPart extends PureComponent {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.onEmail = debounce(this.onEmail.bind(this), 1000);
        this.onShopName = debounce(this.onShopName.bind(this), 1000);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            shopName: '',
            shopAddress: '',
            redirect: false,
            emailExit: false,
            passwordNotMatch: false,
            loading: false,
            status: "",
            emailExist: false,
            shopNameExist: false,
            message: "",
            code: "",
            userId: "",
            verificationCodeSend: false,
            emailResponse: false,
            shopNameResponse: false
        }
        this.onName = this.onName.bind(this);
        this.onShopAddress = this.onShopAddress.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this)
        this.sendVerificationCode = this.sendVerificationCode.bind(this)
        this.onPassword = this.onPassword.bind(this);
        this.onConfirmPassword = this.onConfirmPassword.bind(this)
        this.onRegister = this.onRegister.bind(this)
        this.resetStatus = this.resetStatus.bind(this)
        this.onCode = this.onCode.bind(this)
        this.sendVerificationCode = this.sendVerificationCode.bind(this)
        this.onSellerRegistration = this.onSellerRegistration.bind(this)
    }


    componentDidMount() {
        window.scroll(0, 0)

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
            email: e.target.value,
            emailResponse: false,
            emailExist: false
        })

        let data = {
            email: e.target.value
        }
        Api().get('/sanctum/csrf-cookie').then(res => {
            Api().post('checkUserEmail', data).then(res => {
                if (res.data === 1) {
                    this.setState({
                        emailExist: true
                    })
                } else {
                    this.setState({
                        emailExist: false
                    })
                }

                this.setState({
                    emailResponse: true,
                })
            })
        })
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

                Api().post('sendEmailVerificationCode', data).then(res => {
                        if (res.data !== 0) {
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
            } else {
                window.scroll(0, 0)
                this.validator.showMessageFor('name');
                this.validator.showMessageFor('email');
                this.forceUpdate();
            }
        }
    }

    sendVerificationCode() {
        let data = {
            userId: this.state.userId
        }
        Api().get('/sanctum/csrf-cookie').then(res => {
            Api().post('reSendEmailVerificationCode', data).then(res => {
                if (res.data == 1) {
                    this.setState({
                        loading: false,
                        status: 'success',
                        message: 'We sent a verification code to your email'
                    })
                    document.getElementById('showNotification').style.display = 'block';
                    this.props.sendEmail();
                } else {
                    this.setState({
                        loading: false,
                        status: 'danger',
                        message: 'something went wrong'
                    })

                    document.getElementById('showNotification').style.display = 'block';
                }
            })

        })
    }

    onShopName(e) {
        this.setState({
            shopName: e.target.value
        })
        const data = {
            shopName: e.target.value
        }

        this.setState({
            shopNameResponse: false,
            shopNameExist: false
        })

        Api().post('checkShopName', data).then(res => {
            if (res.data == 1) {
                this.setState({
                    shopNameExist: true
                })
            } else {
                this.setState({
                    shopNameExist: false
                })
            }

            this.setState({
                shopNameResponse: true,
            })
        }).catch(error => {

        })
    }

    onShopAddress(e) {
        this.setState({
            shopAddress: e.target.value
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
                    passwordNotMatch: true,
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


    onSellerRegistration() {


        if (this.state.shopNameExist != true) {

            if (this.validator.fieldValid('shopName') &&
                this.validator.fieldValid('shopAddress')
            ) {

                let shop_name = this.state.shopName;
                let shop_address = this.state.shopAddress;
                let data = {
                    role_id: 2,
                    shop_name: shop_name,
                    shop_address: shop_address,
                    existingUser: 1
                }
                this.setState({
                    loading: true
                })
                Api().get('/sanctum/csrf-cookie').then(res => {
                    Api().post('shopRegistration', data).then(res => {
                            if (res.data === 1) {
                                this.props.updateUserRole();
                                this.props.topProgressBar(100);
                                alert('success', 'Shop registration successful!');
                                Router.push(`/`);
                            } else {
                                this.setState({
                                    loading: false,
                                    status: 'danger',
                                    message: res.data,
                                })
                                document.getElementById('showNotification').style.display = 'block';
                            }
                        }
                    ).catch(error => {
                    })
                })
            } else {
                this.validator.showMessages('shopName');
                this.validator.fieldValid('shopAddress');
                this.forceUpdate();
            }
        }
    }

    onRegister() {
        if (this.state.passwordNotMatch !== true && this.state.shopNameExist != true) {
            if (this.validator.fieldValid('name') &&
                this.validator.fieldValid('password') &&
                this.validator.fieldValid('shopName') &&
                this.validator.fieldValid('shopAddress')
            ) {
                let name = this.state.name;
                let email = this.state.email;
                let password = this.state.password;
                let confirmPassword = this.state.confirmPassword
                let shop_name = this.state.shopName;
                let shop_address = this.state.shopAddress;
                let code = this.state.code;
                let userId = this.state.userId
                let data = {
                    name: name,
                    email: email,
                    role_id: 2,
                    password: password,
                    password_confirmation: confirmPassword,
                    shop_name: shop_name,
                    shop_address: shop_address,
                    code: code,
                    userId: userId,
                    existingUser: 0
                }
                this.setState({
                    loading: true
                })
                Api().get('/sanctum/csrf-cookie').then(res => {
                    Api().post('sellerRegistration', data).then(res => {
                            if (res.data == 1) {
                                this.setState({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    password: '',
                                    confirmPassword: '',
                                    shopName: '',
                                    shopAddress: '',
                                    redirect: false,
                                    emailExit: false,
                                    passwordNotMatch: false,
                                    loading: false,
                                    status: "",
                                    emailExist: false,
                                    shopNameExist: false,
                                    message: "",
                                    code: "",
                                    userId: "",
                                    verificationCodeSend: false,
                                    emailResponse: false,
                                    shopNameResponse: false
                                })

                                this.props.topProgressBar(100);
                                alert('success', 'Shop registration successful!');

                            } else {
                                this.setState({
                                    loading: false,
                                    status: 'danger',
                                    message: res.data,
                                })
                                document.getElementById('showNotification').style.display = 'block';
                            }
                        }
                    ).catch(error => {

                    })
                })
            } else {
                this.validator.showMessages('name');
                this.validator.showMessages('password');
                this.validator.showMessages('shopName');
                this.validator.fieldValid('shopAddress');
                this.forceUpdate();
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
        return (
            <Fragment>
                <div className="loginDiv">
                    <div className="register-input">
                        <h1>Welcome to {this.props.siteTitle}</h1>
                        <p className="mb-3">Create an seller account.</p>
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
                        {this.props.isAuthorized ?
                            <Fragment>
                                {this.props.role !== 2 &&
                                    <Form>
                                        <p className="sellerRegistrationTitleLabel">Store Information</p>
                                        <hr className="sellerRegistration"/>

                                        <InputGroup className="mb-3 loginInputGroup">
                                            <InputGroup.Prepend className="loginRegistrationInputField">
                                                <InputGroup.Text id="basic-addon1" className='loginRegistrationIcon'><i
                                                    className="inputIcon far fa-store"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl className='inputTextField' placeholder="Shop Name"
                                                         onChange={(e) => this.onShopName(e)}/>
                                        </InputGroup>

                                        {this.state.shopNameExist ?
                                            <p className="mb-2 text-danger">Shop name is already exist</p> :
                                            <p className="mb-2 text-danger">{this.validator.message('shopName', this.state.shopName, 'required|string')}</p>
                                        }


                                        <InputGroup className="mb-3 loginInputGroup">
                                            <InputGroup.Prepend className="loginRegistrationInputField">
                                                <InputGroup.Text id="basic-addon1" className='loginRegistrationIcon'><i
                                                    className="inputIcon far fa-map"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl className='formControl inputTextField' placeholder="Address"
                                                         onChange={(e) => this.onShopAddress(e)}
                                            />
                                            <p className="mb-2 text-danger">{this.validator.message('shopAddress', this.state.shopAddress, 'required|string')}</p>
                                        </InputGroup>


                                        <Col lg={12} md={12} sm={12} xs={12} className="p-0">

                                            {this.state.shopNameResponse ?
                                                <Fragment>
                                                    {this.state.loading ?
                                                        <Button disabled className="w-100 sellerRegistrationBtn btn">
                                                            <div className="spinner-border text-light" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        </Button> :
                                                        <Button onClick={this.onSellerRegistration}
                                                                className="w-100 sellerRegistrationBtn register-btn">Register</Button>
                                                    }
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <Button disabled={true}
                                                            className="w-100 sellerRegistrationBtn register-btn">Register</Button>
                                                </Fragment>
                                            }

                                        </Col>

                                    </Form>
                                }
                            </Fragment>
                            :
                            <Form>
                                <InputGroup className="mb-3 loginInputGroup">
                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                        <InputGroup.Text className='loginRegistrationIcon'><i
                                            className="inputIcon far fa-user"/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl className='formControl inputTextField' placeholder="Full Name"
                                                 autocomplete="on" onChange={(e) => this.onName(e)} type="text"/>
                                </InputGroup>
                                <div
                                    className="mb-2 text-danger">{this.validator.message('name', this.state.name, 'required|string')}</div>
                                {this.state.verificationCodeSend ?
                                    <Fragment>
                                        <Fragment>
                                            <Fragment>
                                                <InputGroup className="mb-3 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text className='loginRegistrationIcon'><i
                                                            className="inputIcon fas fa-envelope"/></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className="formControl inputTextField"
                                                                 value={this.state.email} readOnly={true}/>
                                                </InputGroup>

                                                <InputGroup className="mb-3 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text className='loginRegistrationIcon'><i
                                                            className="inputIcon fas fa-check-circle"/></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className="formControl inputTextField"
                                                                 placeholder="verification code"
                                                                 onChange={(e) => this.onCode(e)}/>
                                                    <p className="mb-2 text-danger errorText">{this.validator.message('emailVerificationCode', this.state.code, 'required')}</p>
                                                </InputGroup>

                                                <div className="btnGroup mb-3">
                                                    <span onClick={this.sendVerificationCode}
                                                          className="Btn float-right" id="verifiBtn"/>
                                                    <span className="timer"><span className="float-right" id="counter"/></span>
                                                </div>
                                                <InputGroup className="mb-3 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text id="basic-addon1"
                                                                         className='loginRegistrationIcon'><i
                                                            className="inputIcon far fa-lock"/></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className='formControl inputTextField' type="password"
                                                                 placeholder="Password"
                                                                 onChange={(e) => this.onPassword(e)}/>
                                                </InputGroup>
                                                <p className="mb-2 text-danger">{this.validator.message('password', this.state.password, 'required|min:6')}</p>
                                                <InputGroup className="mb-3 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text id="basic-addon1"
                                                                         className='loginRegistrationIcon'><i
                                                            className="inputIcon far fa-lock"></i></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className='formControl inputTextField' type="password"
                                                                 placeholder="Repeat Password"
                                                                 onChange={(e) => this.onConfirmPassword(e)}
                                                    />
                                                </InputGroup>

                                                {this.state.passwordNotMatch ?
                                                    <p className="mb-2 text-danger">The password not matched</p> :
                                                    <p className="mb-2 text-danger">{this.validator.message('confirm_password', this.state.confirmPassword, 'required')}</p>
                                                }

                                                <p className="sellerRegistrationTitleLabel">Store Information</p>
                                                <hr className="sellerRegistration"/>

                                                <InputGroup className="mb-3 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text id="basic-addon1"
                                                                         className='loginRegistrationIcon'><i
                                                            className="inputIcon far fa-store"></i></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className='inputTextField' placeholder="Shop Name"
                                                                 onChange={(e) => this.onShopName(e)}/>
                                                </InputGroup>

                                                {this.state.shopNameExist ?
                                                    <p className="mb-2 text-danger">Shop name is already exist</p> :
                                                    <p className="mb-2 text-danger">{this.validator.message('shopName', this.state.shopName, 'required|string')}</p>
                                                }


                                                <InputGroup className="mb-3 loginInputGroup">
                                                    <InputGroup.Prepend className="loginRegistrationInputField">
                                                        <InputGroup.Text id="basic-addon1"
                                                                         className='loginRegistrationIcon'><i
                                                            className="inputIcon far fa-map"></i></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl className='inputTextField' placeholder="Address"
                                                                 onChange={(e) => this.onShopAddress(e)}/>
                                                </InputGroup>
                                                <p className="mb-2 text-danger">{this.validator.message('shopAddress', this.state.shopAddress, 'required|string')}</p>
                                            </Fragment>
                                        </Fragment>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <InputGroup className="mb-3 loginInputGroup">
                                            <InputGroup.Prepend className="loginRegistrationInputField">
                                                <InputGroup.Text className='loginRegistrationIcon'><i
                                                    className="inputIcon far fa-envelope"/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl className='formControl inputTextField' placeholder="Email"
                                                         onChange={(e) => this.onEmail(e)}/>
                                        </InputGroup>
                                        {this.state.emailExist ?
                                            <p className="mb-2 text-danger errorText">The email address has already be
                                                taken</p> :
                                            <p className="mb-2 text-danger errorText">{this.validator.message('email', this.state.email, 'required|email')}</p>
                                        }
                                    </Fragment>
                                }
                                {this.state.verificationCodeSend ?

                                    <Col lg={12} md={12} sm={12} xs={12} className="p-0">

                                        {this.state.shopNameResponse ?
                                            <Fragment>
                                                {this.state.loading ?
                                                    <Button disabled className="w-100 sellerRegistrationBtn btn">
                                                        <div className="spinner-border text-light" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </Button> :
                                                    <Button onClick={this.onRegister}
                                                            className="w-100 sellerRegistrationBtn register-btn">Register</Button>
                                                }
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <Button disabled={true}
                                                        className="w-100 sellerRegistrationBtn register-btn">Register</Button>
                                            </Fragment>

                                        }

                                    </Col>

                                    :

                                    <Col lg={12} md={12} sm={12} xs={12} className="p-0">

                                        {this.state.emailResponse ?
                                            <Fragment>
                                                {this.state.loading ?
                                                    <Button disabled className="w-100 sellerRegistrationBtn btn">
                                                        <div className="spinner-border text-light" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </Button> :
                                                    <Button onClick={this.verifyEmail}
                                                            className="w-100 sellerRegistrationBtn register-btn">Verify
                                                        email</Button>
                                                }
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <Button disabled={true}
                                                        className="w-100 sellerRegistrationBtn register-btn">Verify
                                                    email</Button>
                                            </Fragment>
                                        }

                                    </Col>
                                }
                            </Form>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    sendEmail,
    updateUserRole,
    topProgressBar
};

function mapStateToProps(state) {
    const siteTitle = state.starterReducer.siteTitle;
    const isAuthorized = state.userReducer.isAuthorized;
    const role = state.userReducer.role;

    return {
        siteTitle,
        isAuthorized,
        role
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SellerRegistrationPart);


