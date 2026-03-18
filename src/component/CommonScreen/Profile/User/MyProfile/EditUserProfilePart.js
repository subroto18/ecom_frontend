import React, {PureComponent,Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Select from "react-select";
import Api from "../../../../../ClientApi/Api";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import {mediaLimit, selectedMedia, showMediaFile} from "../../../../../services/actions/mediaAction";
import {profileUpdate} from "../../../../../services/actions/userAction";
import {alert} from "../../../../../services/common";
import Photo from "../../../Image/Photo";
import {connect} from "react-redux";
import MediaUpload from "../../../Media/MediaUpload";

class EditUserProfilePart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator()
        this.state = {
            data:[],
            loading:true,
            modal:false,
            loadingImage:false,
            subject:"",
            message:"",
            name:"",
            gender:"",
            birthday:new Date(),
            avatar:"",
            loadingBtn:false
        }
        this.submitForm = this.submitForm.bind(this)
        this.onGender = this.onGender.bind(this)
        this.onBirthday = this.onBirthday.bind(this)
    }
    componentDidMount() {

        let avatar = this.props.avatar;
        this.setState({
            name:this.props.name,
            email:this.props.email,
            phone:this.props.phone,
            gender:this.props.gender,
            avatar:this.props.avatar,
            birthday:this.props.birthday,
            loading:false
        })
        if(avatar.length>0){
            let photoId = [];
            avatar.map(pd=>{
                photoId.push(`${pd.id}`);
            })
            this.props.selectedMedia({
                photoId:photoId,
                type:"avatar"
            });
            if (avatar.length > 1-1) {
                this.props.mediaLimit({
                    limit: 'exceed',
                    type:"avatar"
                })
            }
            this.props.showMediaFile({
                showFile: avatar,
                type:"avatar"
            });
        }
    }
    onName(e){
      this.setState({
          name:e.target.value
      })
    }
    onBirthday(e){
        this.setState({
            birthday:e
        })
    }
    onGender(e){
        this.setState({
            gender:e.value
        })
    }
    submitForm() {
        if (this.validator.allValid()) {
            let Photos = this.props.dynamicData['selected_for_avatar']!==undefined ? this.props.dynamicData['selected_for_avatar']: null;
            let name = this.state.name;
            let birthday = this.state.birthday;
            let gender = this.state.gender;
            const data = {
                name:name,
                birthday:birthday,
                PhotoId:Photos,
                gender:gender
            }
            this.setState({
                loadingBtn:true
            })
            Api().post('updateProfile',data).then(res=>{
                const data = {
                    name:res.data.name,
                    dob:res.data.dob,
                    avatar:res.data.media_url,
                    gender:res.data.gender
                }
               this.props.profileUpdate(data)
               alert('success','Profile has been updated!');
                this.setState({
                    loadingBtn:false
                })
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
        const options = [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'others', label: 'Others' }
        ];
    return (
      <Fragment>
          <Container>
          <Row>
                            <Fragment>
                                {this.state.loading ?
                                    <div className="loader-spinner-div">
                                        {loader}
                                    </div>:
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <div className="editProfileInfoCard">
                                            <div className="profileInfoCardBody">
                                                <Row>
                                                    <Col lg={4}>
                                                        {this.props.avatar.length>0 ?
                                                          <Fragment>
                                                              {this.props.avatar.map(pd=>{
                                                                  return <Fragment>
                                                                      {pd.id!==undefined ?
                                                                          <Fragment>
                                                                               <MediaUpload   multipleFile={false} type="avatar" for="avatar"  limit={1} widthSize={400} heightSize={400} avatar={true}  />
                                                                          </Fragment>
                                                                            :
                                                                          <div className="show-avatar">
                                                                              <div className="show-avatar-div">
                                                                                  <Photo
                                                                                      src={pd.media_url}
                                                                                      blurDataURL="/blank.jpg"
                                                                                      class="user-avatar-img"
                                                                                  />
                                                                              </div>
                                                                          </div>
                                                                      }
                                                                  </Fragment>
                                                              })}
                                                          </Fragment>:
                                                            <Fragment>
                                                                <MediaUpload    multipleFile={false} type="avatar" for="avatar"  limit={1} widthSize={400} heightSize={400}   />
                                                            </Fragment>

                                                        }
                                                        <Col lg={12} md={12} className="profileInfos birthday">
                                                            <p className="my-profile-title">Birthday</p>
                                                            {this.state.birthday!=="" &&
                                                            <DatePicker
                                                                selected={this.state.birthday}
                                                                onChange={(e)=>this.onBirthday(e)}
                                                                className='inputTextSize'
                                                                placeholderText={'Select date'}
                                                            />
                                                            }
                                                        </Col>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <Row>
                                                            <Col lg={12} md={12} className="profileInfos name">
                                                                <div className="form-group">
                                                                    <label className="my-profile-title" htmlFor="name">Full  Name</label>
                                                                    <input value={this.state.name} onChange={(e)=>this.onName(e)} type="text" className="form-control inputTextSize inputBoxSize" id="name" aria-describedby="emailHelp" />
                                                                    <div className="mb-2 text-danger">{this.validator.message('name', this.state.name, 'required')}</div>
                                                                </div>
                                                            </Col>
                                                            {this.state.email!==null &&
                                                                <Col lg={12} md={12} className="profileInfos email">
                                                                    <p className="my-profile-title">Email</p>
                                                                    <div className="form-group">
                                                                        <input readOnly  value={this.state.email} type="email" className="form-control my-profile-answer inputTextSize inputBoxSize" />
                                                                    </div>
                                                                </Col>
                                                            }
                                                            {this.state.phone!==null &&
                                                            <Col lg={12} md={12} className="profileInfos number">
                                                                <p className="my-profile-title">Mobile Number</p>
                                                                <div className="form-group">
                                                                    <input readOnly  value={this.state.phone} type="email" className="form-control my-profile-answer inputTextSize inputBoxSize" />
                                                                </div>
                                                            </Col>
                                                            }
                                                            <Col lg={12} md={12} className="profileInfos gender">
                                                                <p className="my-profile-title">Gender</p>
                                                                <Select
                                                                    className='inputTextSize'
                                                                    options={options}
                                                                    onChange={this.onGender}
                                                                    value = {
                                                                        options.filter(option =>
                                                                            option.value === this.state.gender)
                                                                    }
                                                                />
                                                            </Col>
                                                            <Col lg={12} md={12} sm={12} className=" profileInfos">
                                                                {this.state.loadingBtn ?
                                                                    <Button className="profileEditSubmitBtn mt-3 mb-3 btn">
                                                                        <div className="spinner-border text-light"
                                                                             role="status">
                                                                                <span
                                                                                    className="sr-only">Loading...</span>
                                                                        </div>
                                                                    </Button>:
                                                                    <Fragment>

                                                                        <Button onClick={this.submitForm} className="profileEditSubmitBtn mt-3 mb-3 btn">Save Changes</Button><br/>
                                                                    </Fragment>
                                                                }


                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                }
                            </Fragment>
                        </Row>
          </Container>
      </Fragment>
    )
  }
}


const mapDispatchToProps = {
    mediaLimit,
    selectedMedia,
    showMediaFile,
    profileUpdate
};

function mapStateToProps(state) {

    const avatar = state.userReducer.avatar;
    const name = state.userReducer.name;
    const email = state.userReducer.email;
    const phone = state.userReducer.phone;
    const gender = state.userReducer.gender;
    const birthday = state.userReducer.birthday;
    const dynamicData = state.mediaReducer;

    return {
        avatar,
        name,
        email,
        phone,
        gender,
        birthday,
        dynamicData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfilePart);




