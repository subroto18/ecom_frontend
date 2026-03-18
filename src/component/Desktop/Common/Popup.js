import React, {PureComponent,Fragment} from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactHtmlParser from 'react-html-parser';
import Api from "../../../ClientApi/Api";
import SimpleReactValidator from "simple-react-validator";
import {connect} from "react-redux";
import {setCookie} from "../../../services/actions/commonAction";
import {alert} from "../../../services/common";

class Popup extends PureComponent {
    constructor() {
        super();
        this.state  = {
            modal:true,
            popUp:false,
            email:"",
            msg:"",
        }
        this.handleClose   = this.handleClose.bind(this)
        this.validator = new SimpleReactValidator();
        this.onEmail  = this.onEmail.bind(this)
        this.onSubscribe  = this.onSubscribe.bind(this)
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({popUp: true});
        }, 3000)
    }
    handleClose(){
      this.setState({
          modal:false
      })
        this.props.setCookie('popup',1,1);
    }
    onEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onSubscribe(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
        {
            const data = {
                email:this.state.email
            }
            this.setState({
                loadingBtn:true
            })
            Api().post('subscribe',data).then(res=>{
                if(res.data===1){
                    this.setState({
                        email:""
                    })

                    alert('success','Subscribe successfully!');

                    this.handleClose();
                }
                this.setState({
                    loadingBtn:false
                })
            }).catch(res=>{})
        }
    }

    render() {
        const html = `${this.props.popupContent}`
        return (
            <Fragment>
                {this.state.popUp &&
                <Modal
                    show={this.state.modal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="popupModal"
                >
                    <Modal.Body>
                        <div className="popUpContent">
                            <div className="popupDiv">
                                { ReactHtmlParser(html) }
                                <i onClick={this.handleClose} className="fa fa-times-circle popupCancel"></i>
                            </div>
                            {/*check weather the newsletter status is on or off*/}
                            <Fragment>
                                {this.props.newsletterStatus===1 &&
                                <div className="popUpForm">
                                    <Form.Group>
                                        <Form.Control  onChange={(e)=>this.onEmail(e)} placeholder="Enter your email"  type="text"  />
                                        {this.state.loadingBtn ?
                                            <Button className="w-100 mt-3"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                Loading...
                                            </Button> :
                                            <Button onClick={this.onSubscribe} className="w-100 mt-3">Subscribe</Button>
                                        }
                                    </Form.Group>
                                </div>
                                }
                            </Fragment>
                        </div>
                    </Modal.Body>
                </Modal>
                }
            </Fragment>
        );
    }
}



const mapDispatchToProps = {
    setCookie
};

function mapStateToProps(state) {
     const newsletterStatus = state.starterReducer.newsletterStatus
     const popupContent = state.starterReducer.popupContent
    return {
        newsletterStatus,
        popupContent
    };
}





export default connect(mapStateToProps, mapDispatchToProps)(Popup);
