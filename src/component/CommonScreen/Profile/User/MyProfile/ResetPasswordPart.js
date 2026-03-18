import React, {Component, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../../../ClientApi/Api";
import {alert} from "../../../../../services/common";
import Router from "next/router";

class ResetPasswordPart extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            notFound:false,
            newPassword:'',
            retypePassword:'',
            retypePasswordNotMatch:false,
            currentPasswordNotMatch:false,
            msg:"",
            loading:false
        }
        this.onNewPassword = this.onNewPassword.bind(this)
        this.onRetypePassword = this.onRetypePassword.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    onEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onNewPassword(e){
        this.setState({
            newPassword:e.target.value
        })
    }
    onRetypePassword(e){
        this.setState({
            retypePassword:e.target.value
        })
        if(e.target.value.length>5){
            if(this.state.newPassword!==e.target.value){
                this.setState({
                    retypePasswordNotMatch:true
                })
            }else{
                this.setState({
                    retypePasswordNotMatch:false
                })
            }
        }
    }
    submitForm() {
        this.setState({
            loading:true
        })
        if (this.validator.allValid()) {
            let password = this.state.newPassword;
            let password_confirmation = this.state.retypePassword;
            let data = {
                token:this.props.tokenId,
                password:password,
                password_confirmation:password_confirmation,
            }
            Api().get('/sanctum/csrf-cookie').then(res=>{
                Api().post('reset-password',data).then(res=>{
                    if(res.data===0){
                        this.setState({
                            notFound:true,
                            msg:'',
                            loading:false
                        })
                    }else{
                        this.setState({
                            notFound:false,
                            msg:"",
                            loading:false
                        })
                        alert('success','Password has been changed!')
                        Router.push("/login")
                    }
                }).catch()
            }).catch()
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <Container>
                <div className="forget-password-div">
                    <span className="profile title mb-4">Reset your password</span>
                    <div className="forget-password">
                        <Row>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                {this.state.notFound &&
                                    <p className="alert alert-danger">Your email or token is invalid</p>
                                }
                                <div className="form-group">
                                    <label htmlFor="newPassword">New password</label>
                                    <input onChange={(e)=>this.onNewPassword(e)} type="password" className="form-control" id="newPassword" placeholder="Minimum 6 characters"/>
                                    <div className="mb-2 text-danger"> {this.validator.message('newPassword', this.state.newPassword, 'required|min:6')}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="retypePassword">Retype password</label>
                                    <input onChange={(e)=>this.onRetypePassword(e)} type="password" className="form-control" id="retypePassword" placeholder="Please retype your password"/>
                                    <div className="mb-2 text-danger"> {this.validator.message('retypePassword', this.state.retypePassword, 'required|min:6|regex')}</div>
                                    {this.state.retypePasswordNotMatch &&
                                        <p className="text-danger">Password not matched</p>
                                    }
                                </div>
                                {this.state.retypePasswordNotMatch!==true && this.state.currentPasswordNotMatch!==true  ?
                                    <Fragment>
                                        {this.state.loading!=="" ?
                                            <button onClick={this.submitForm} className="btn float-right">Change Password</button>:
                                            <button disabled onClick={this.submitForm} className="btn float-right">Change Password</button>
                                        }
                                    </Fragment>
                                    :
                                    <button disabled onClick={this.submitForm} className="btn float-right">Change Password</button>
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ResetPasswordPart;