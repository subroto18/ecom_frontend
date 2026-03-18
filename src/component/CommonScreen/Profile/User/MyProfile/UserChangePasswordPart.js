import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../../../ClientApi/Api";
import {alert} from "../../../../../services/common";
class UserChangePasswordPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
        this.state = {
            loading : false,
            data:[],
            currentPassword:'',
            newPassword:'',
            retypePassword:'',
            retypePasswordNotMatch:false,
            currentPasswordNotMatch:false,
            loadingBtn:false
        }
        this.onCurrentPassword = this.onCurrentPassword.bind(this)
        this.onNewPassword = this.onNewPassword.bind(this)
        this.onRetypePassword = this.onRetypePassword.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }


    onCurrentPassword(e){
        this.setState({
            currentPassword:e.target.value,
            currentPasswordNotMatch:false
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
        if (this.validator.allValid()) {
            let currentPassword = this.state.currentPassword;
            let newPassword = this.state.newPassword;
            let data = {
                currentPassword:currentPassword,
                newPassword:newPassword,
            }
            this.setState({
                loadingBtn:true
            })
            Api().post('changePassword',data).then(res=>{
               if(res.data==1){
                   alert('success','Password has been changed!')
                   this.setState({
                       loading : false,
                       data:[],
                       currentPassword:'',
                       newPassword:'',
                       retypePassword:'',
                       retypePasswordNotMatch:false,
                       currentPasswordNotMatch:false,
                       loadingBtn:false
                   })
               }else{
                   this.setState({
                       currentPasswordNotMatch:true
                   })
                   this.setState({
                       loadingBtn:false
                   })
               }
            }).catch()
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }


  render() {

    const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
    return (
      <Fragment>
          {this.state.loading ?
                    <Fragment>{loader}</Fragment>:
                    <Fragment>
                      <div className="change-password-div">
                          <Row>
                              <Col lg={12} className="m-auto">
                                  {this.state.currentPasswordNotMatch &&
                                  <p className="alert alert-danger">Your current password is not correct</p>
                                  }
                                  <div className="form-group">
                                  <label htmlFor="currentPassword">Current password</label>
                                  <input value={this.state.currentPassword} onChange={(e)=>this.onCurrentPassword(e)} type="password" className="form-control inputTextSize inputBoxSize" id="currentPassword" placeholder="Enter your current password"/>
                                      <div className="mb-2 text-danger inputTextSize"> {this.validator.message('password', this.state.currentPassword, 'required')}</div>
                                 </div>
                                  <div className="form-group">
                                      <label htmlFor="newPassword">New password</label>
                                      <input value={this.state.newPassword} onChange={(e)=>this.onNewPassword(e)} type="password" className="form-control inputTextSize inputBoxSize" id="newPassword" placeholder="Minimum 6 characters"/>
                                      <div className="mb-2 text-danger inputTextSize"> {this.validator.message('newPassword', this.state.newPassword, 'required|min:6')}</div>
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="retypePassword">Retype password</label>
                                      <input  value={this.state.retypePassword}  onChange={(e)=>this.onRetypePassword(e)} type="password" className="form-control inputTextSize inputBoxSize" id="retypePassword" placeholder="Please retype your password"/>
                                      <div className="mb-2 text-danger inputTextSize"> {this.validator.message('retypePassword', this.state.retypePassword, 'required|min:6|regex')}</div>
                                      {this.state.retypePasswordNotMatch &&
                                      <p className="text-danger inputTextSize">Password not matched</p>
                                      }
                                  </div>
                                  {this.state.retypePasswordNotMatch!==true && this.state.currentPasswordNotMatch!==true  ?
                                      <Fragment>
                                          {this.state.loadingBtn ?
                                              <button className="btn float-right disabled"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                  Loading...
                                              </button> :
                                              <button onClick={this.submitForm} className="btn float-right">Change Password</button>
                                          }
                                      </Fragment>
                                     :
                                      <button disabled  className="btn float-right">Change Password</button>
                                  }
                              </Col>
                          </Row>
                      </div>
                    </Fragment>
                }
      </Fragment>
    )
  }
}


export default UserChangePasswordPart;