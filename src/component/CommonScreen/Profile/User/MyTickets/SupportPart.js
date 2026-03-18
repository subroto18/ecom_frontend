import React, { PureComponent, Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Api from "../../../../../ClientApi/Api";
import {alert} from "../../../../../services/common";
import {connect} from "react-redux";
import Link from "next/link";
import MediaUpload from "../../../Media/MediaUpload";
class SupportPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true,
            modal:false,
            subject:"",
            message:"",
            selectedPhoto:"",
            loadingBtn:false
        }
        this.onCreateTicket = this.onCreateTicket.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onSelectedPhoto = this.onSelectedPhoto.bind(this)
        this.onSubmit=  this.onSubmit.bind(this)
    }
    componentDidMount() {
        Api().get('getTicket').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        })
    }
    onSubject(e){
        this.setState({
            subject:e.target.value
        })
    }
    onMessage(e){
        this.setState({
            message:e.target.value
        })
    }
    onCreateTicket(){
        this.setState({
            modal:true
        })
    }
    onCloseModal(){
        this.setState({
            modal:false
        })
    }
    onSelectedPhoto(photo){
        this.setState({
            selectedPhoto:photo.photo
        })
    }
    onSubmit(){
        let subject  = this.state.subject;
        let message = this.state.message;
        let Photos =   this.props.dynamicData['selected_for_support']!==undefined ? this.props.dynamicData['selected_for_support']: null
        const data  = {
            subject:subject,
            message:message,
            PhotoId:Photos,
        }
        this.setState({
            loadingBtn:true
        })
        Api().post('createTicket',data).then(res=>{
            if(res.data==1){
                this.onCloseModal();
                alert('success','Ticket has been created!')
                this.componentDidMount()
            }
            this.setState({
                loadingBtn:false
            })
        }).catch()
    }
    render() {
        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <Fragment>
                    {this.state.loading ?
                        <div className="">
                            <Fragment>{loader}</Fragment>
                        </div>
                        :
                        <Fragment>
                            <div className="support-div">
                                <Button onClick={this.onCreateTicket}> <i className="fad fa-ticket"/> Create a ticket</Button>
                            </div>
                            {this.state.data.length>0 ?
                                <div className="support-ticket-div table-responsive-sm">
                                    <table className="table">
                                        <thead>
                                        <tr className="thead-light">
                                            <th scope="col">Token</th>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Created at</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-body-part">
                                        {this.state.data.map(pd=>{
                                            return   <tr>
                                                <td scope="col">{pd.token}</td>
                                                <td scope="col">{pd.subject}</td>
                                                <td scope="col">
                                                    {pd.status=="closed" ?
                                                        <badge  className="badge badge-primary">Solved</badge>:
                                                        <badge  className={pd.status==="pending" ? "badge badge-danger" : "badge badge-success"}>{pd.status}</badge>
                                                    }
                                                </td>
                                                <td scope="col">{pd.created_at}</td>
                                                {pd.status!=="pending" ?
                                                    <td scope="col"><Link href={`/live-support/`+pd.token.substring(1)}>
                                                        <badge className="badge badge-success">Chat</badge>
                                                    </Link></td>:
                                                    <td title="You can only chat when status will open" className="disabled" scope="col">
                                                        <badge className="badge badge-primary">Pending</badge>
                                                    </td>
                                                }
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>:
                                <Fragment>
                                    <div className="emptyPage">
                                        <div className="py-5">
                                            <div className="text-center pageContent">
                                                <h2 className='text-muted iconSize'><i class="fas fa-ticket-alt"></i></h2>
                                                <h6 className='text-muted'>There is no ticket  yet</h6>
                                                <Link href="/"><div className='btn btn-outline-warning text-uppercase'>Continue Shopping</div></Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            }
                        </Fragment>
                    }
                </Fragment>
                <Modal centered size="lg" show={this.state.modal}  >
                    <div className="modal-header">
                        <button onClick={this.onCloseModal} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h6 className="ticket-title">Create a Ticket</h6>
                        <div className="ticket-modal-form">
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input onChange={(e)=>this.onSubject(e)} id="subject" type="email" className="form-control"/>
                            </div>
                            <label htmlFor="message">Message</label>
                            <textarea onChange={(e)=>this.onMessage(e)} className="form-control" id="message" rows="3"></textarea>
                            <div className="form-group my-3">
                                <MediaUpload  title="Attachment"  multipleFile={false} type="support" for="support"   limit={1} widthSize={300} heightSize={300}   />
                            </div>
                            {this.state.subject!="" ?
                                <Fragment>
                                    {this.state.loadingBtn ?
                                        <Button className="float-right mb-3"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                            Loading...
                                        </Button> :
                                        <Button className="float-right mb-3" onClick={this.onSubmit} type="submit">Submit</Button>
                                    }
                                </Fragment>
                                :
                                <Button disabled={true}  type="submit" className="float-right btn btn-primary disabled mb-3">Submit</Button>
                            }
                        </div>
                    </div>
                </Modal>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const dynamicData = state.mediaReducer;
    return {
        dynamicData,
    };
}

export default connect(mapStateToProps)(SupportPart);

