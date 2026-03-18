import React, { PureComponent, Fragment } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Api from "../../../../../ClientApi/Api";
import Router from "next/router";
import {connect} from "react-redux";
import {selectedMedia,mediaLimit,showMediaFile} from "../../../../../services/actions/mediaAction";
import Photo from "../../../Image/Photo";
import MediaUpload from "../../../Media/MediaUpload";
class LiveSupportPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true,
            modal:false,
            loadingImage:false,
            message:"",
            pageLoad:true,
            photoIndex: 0,
            isOpen: false,
            showUrl:"",
            photoId:""
        }
        this.onSubmit=  this.onSubmit.bind(this)
        this.onGetMessage = this.onGetMessage.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.onOpenImageBox  = this.onOpenImageBox.bind(this)
        this.onCloseImageBox  = this.onCloseImageBox.bind(this)
    }
    componentDidMount() {
        const token = {
            token:this.props.token
        }
        Api().post('getTicketConversation',token).then(res=>{
            if(res.data!==0){
                if(res.data[0].status!=="pending"){
                    this.setState({
                        data:res.data,
                        loading:false,
                        pageLoad:false
                    })
                }else{
                    Router.push("/support-ticket")
                }
            }else{
                Router.push("/support-ticket")
            }
        })
    }
    onMessage(e){
        this.setState({
            message:e.target.value
        })
    }
    onSubmit(){
        let token = this.props.token;
        let message = this.state.message;
        let Photos = this.props.dynamicData['selected_for_ticket']!==undefined ? this.props.dynamicData['selected_for_ticket']: null;
        let status = "";
        this.state.data.map(pd=>{
            status = pd.status
            });
        if(status==="open"){
            if(message!=="" || Photos!==null){
                const data  = {
                    message:message,
                    PhotoId:Photos,
                    token:token
                }
                Api().post('sendTicketMessage',data).then(res=>{
                    if(res.data===1){
                        this.setState({
                            message:"",
                        })
                        this.props.selectedMedia({
                            photoId:[],
                            type:'ticket'
                        });
                        this.props.mediaLimit({
                            limit: '',
                            type:'ticket'
                        })
                        this.props.showMediaFile({
                            showFile: [],
                            type:'ticket'
                        });
                        this.onGetMessage()
                    }
                }).catch()
            }
        }
    }
    onGetMessage(){
        const token = {
            token:this.props.token
        }
       Api().post('getTicketConversation',token).then(res=>{
            this.setState({
                data:res.data,
                loading:false,
            })
        })
    }
    onRefresh(){
     this.componentDidMount()
    }
    onOpenImageBox(url){
        this.setState({
            isOpen:true,
            showUrl:url
        })
    }
    onCloseImageBox(){
        this.setState({
            isOpen:false
        })
    }

  render() {
    const loader =  <div  className="pre-loader">
        <div className="loader-spinner">
            <div className="spinner-border text-muted"/>
        </div>
    </div>
      let ticketMedia =  this.props.dynamicData['selected_for_ticket'];
    return (
      <Fragment>
          {this.state.pageLoad ?
                 <div className="">
                     <Fragment>{loader}</Fragment>
                 </div>:
                    <Fragment>
                        {this.state.data.map(pd=>{
                          return <div className="live-support">
                                <div  className="live-support-header">
                                    <Row>
                                        <Col lg={6}>
                                            <div>
                                                <h6>{pd.subject}</h6>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <p className="float-right"><span className="ticket-status">{pd.status}</span></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div id="liveSupportBody" className="live-support-body">
                                    <div  className="live-chat">
                                        {pd.conversation.map(con=>{
                                            return  <div className={con.sender==='admin' ? "admin" : "user"} >
                                                <div className={con.sender==='admin' ? "admin-chat-div d-flex" : "user-chat-div d-flex"} >
                                                    <div className="avatar">
                                                        <Photo
                                                            src="/admin1.jpg"
                                                            blurDataURL="/admin1.jpg"
                                                            class="avatar-img"
                                                        />
                                                    </div>
                                                    <div className="message-div">
                                                        {con.message!==null &&
                                                          <p className="text-message ticketTextMessage">{con.message}</p>
                                                        }

                                                        {con.media!==null  &&
                                                          <Fragment>
                                                              <Photo
                                                                  src={`${this.props.backendApi}${con.media}`}
                                                                  blurDataURL="/blank.jpg"
                                                                  class="ticket-media ticketMediaImg"
                                                                  onClick={()=>this.onOpenImageBox(con.media)}
                                                              />

                                                          </Fragment>
                                                        }
                                                        <p className="text-time">{con.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                              <div className="live-support-footer ">
                                 <div className=""  >
                                 </div>
                                  <div className="d-flex">
                                      <div className="live-support-media">
                                          {pd.status==="open" ?
                                              <Fragment>

                                                  <MediaUpload    multipleFile={false} type="ticket" for="ticket"  limit={1} widthSize={400} heightSize={300} liveChat={true}  />
                                              </Fragment>:
                                              <Fragment>
                                                  <i className="fas fa-paperclip ticket-media disabled"/>
                                              </Fragment>
                                          }
                                      </div>
                                      <div className="live-support-send-msg">
                                          <input value={this.state.message} onChange={(e)=>this.onMessage(e)} className="form-control" type="text" placeholder="Write your message"/>
                                      </div>
                                      <div className="live-support-send">
                                          {pd.status==="open" ?
                                              <Fragment>
                                                  {this.state.message!="" || (ticketMedia!==undefined ? ticketMedia.length>0 : ticketMedia!==undefined) ?
                                                      <i onClick={this.onSubmit} className="fas fa-location-arrow"/>:
                                                      <i onClick={this.onSubmit} className="fas fa-location-arrow disabled"/>
                                                  }
                                              </Fragment>:
                                              <Fragment>
                                                  <i onClick={this.onSubmit} className="fas fa-location-arrow disabled"/>
                                              </Fragment>
                                          }
                                      </div>
                                      <div className="live-support-refresh">
                                          <Button onClick={this.onRefresh}>Refresh</Button>
                                      </div>
                                  </div>
                              </div>
                            </div>
                        })}
                    </Fragment>
                }
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
    selectedMedia,
    mediaLimit,
    showMediaFile
};

function mapStateToProps(state) {
    const dynamicData = state.mediaReducer;
    const backendApi = state.starterReducer.backendApi
    return {
        dynamicData,
        backendApi
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(LiveSupportPart);

