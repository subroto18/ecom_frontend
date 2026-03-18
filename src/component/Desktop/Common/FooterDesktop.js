import React, {Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import Router from "next/router";
import {connect} from "react-redux";
import Api from "../../../ClientApi/Api";
import VisibilitySensor from "react-visibility-sensor";
import Button from "react-bootstrap/Button";
import Photo from "../../CommonScreen/Image/Photo";
import {alert} from "../../../services/common";
class FooterDesktop extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            modal:false,
            redirect:false,
            footerLogo:'',
            copy_right:'',
            footer_description:'',
            paymentLogo:[],
            contact_number:'',
            whatsapp_number:'',
            contact_email:'',
            contact_address:'',
            facebook_link:'',
            instagram_link:'',
            twitter_link:'',
            linkedIn_link:'',
            youtube_link:'',
            pinterest_link:'',
            tikTok_link:''
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(){
     this.setState({
         modal:false
     })
    }
    onVisible = () => {
            Api().get('getFooterDetails').then(res=>{
                this.setState({
                    footerLogo:res.data[0].footerLogo,
                    copy_right:res.data[0].copy_right,
                    footer_description:res.data[0].footer_description,
                    paymentLogo:res.data[0].paymentLogo,
                    contact_number:res.data[0].contact_number,
                    whatsapp_number:res.data[0].whatsapp_number,
                    contact_email:res.data[0].contact_email,
                    contact_address:res.data[0].contact_address,
                    facebook_link:res.data[0].facebook_link,
                    instagram_link:res.data[0].instagram_link,
                    twitter_link:res.data[0].twitter_link,
                    linkedIn_link:res.data[0].linkedIn_link,
                    youtube_link:res.data[0].youtube_link,
                    pinterest_link:res.data[0].pinterest_link,
                    tikTok_link:res.data[0].tikTok_link
                })
            }).catch(error=>{
            })
        }


    handleOpen(){
        if(this.props.isAuthorized==true){
            if(this.props.role===3){
             alert('info','Admin can not be a seller!');
            }
            else if(this.props.role===2){
                alert('info','You are already a seller!');
            }else{
                Router.push({
                    pathname: '/seller/registration',
                })
            }
        }else{
            Router.push({
                pathname: '/seller/registration',

            })

        }
    }

    render() {
        return (
        <Fragment>
            <VisibilitySensor  onChange={this.onVisible}>
                <Fragment>
                    <footer id="footer" className="pt-5">
                        <Container className="footerContainer" fluid={true}>
                            <div className="container">
                                <Row>
                                    <Col key={1}  xl={12} lg={12}>
                                        <Row>
                                            <Col key={1} xl={3} lg={3} md={3}>
                                                <div className="footerLogoIconDiv">
                                                    <div className="footer-logo">
                                                        <Photo
                                                            src={this.props.backendApi+this.state.footerLogo}
                                                            blurDataURL={this.props.backendApi+this.state.footerLogo}
                                                            class="footer-logo img-fluid mb-3"
                                                            footer={true}
                                                        />
                                                    </div>
                                                    <div className="footer-social-icon">
                                                        <a  href={this.state.facebook_link} ><i className="fab fa-facebook-f footer-social-icons mr-2"/></a>
                                                        <a  href={this.state.twitter_link } > <i className="fab fa-twitter footer-social-icons mr-2"/> </a>
                                                        <a  href={this.state.instagram_link} ><i className="fab fa-instagram footer-social-icons mr-2"/> </a>
                                                        <a  href={this.state.youtube_link} ><i className="fab fa-youtube footer-social-icons"/></a>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col key={2}  xl={3} lg={3} md={3}>
                                                <h4 className="footer-section-title">Contact Us</h4>
                                                <hr className="footer-hr"/>
                                                <ul className="footer-ul">
                                                    {this.props.contactNumber &&
                                                        <li className="mb-2"><i className="far fa-phone-rotary mr-1 footerIcon"/>{this.props.contactNumber}</li>
                                                    }
                                                    {this.props.whatsappNumber &&
                                                        <li className="mb-2"><i className="fab fa-whatsapp mr-1 footerIcon"/> {this.props.whatsappNumber} </li>
                                                    }
                                                    {this.props.contactEmail &&
                                                        <li className="mb-2"><i className="fas fa-envelope mr-1 footerIcon"/> {this.props.contactEmail} </li>
                                                    }
                                                    {this.props.contactAddress &&
                                                        <li className="mb-2"><i className="fas fa-map-marked-alt mr-1 footerIcon"/> {this.props.contactAddress} </li>
                                                    }
                                                </ul>
                                            </Col>
                                            <Col key={3} xl={3} lg={3} md={3}>
                                                <h5 className="footer-section-title">Our Policies</h5>
                                                <hr className="footer-hr"/>
                                                <ul className="footer-ul">
                                                    <li className="mb-2"><Link href="/terms-conditions"  className="footerLink" ><i className="fas fa-hand-point-right mr-1 footerIcon"/><span>Terms & Conditions</span></Link></li>
                                                    <li className="mb-2"><Link href="/privacy-policy"  className="footerLink" ><i className="fas fa-hand-point-right mr-1 footerIcon"/><span>Privacy policy</span></Link></li>
                                                    {this.props.vendor==1 &&
                                                        <li className="mb-2"><Link  href="/seller-policy" className="footerLink" ><i className="fas fa-hand-point-right mr-1 footerIcon"/><span>Sellers policy</span></Link></li>
                                                    }
                                                    <li className="mb-2"><Link  href="/refund-policy"  className="footerLink" ><i className="fas fa-hand-point-right mr-1 footerIcon"/><span>Refund policy</span></Link></li>
                                                    <li className="mb-2"><Link  href="/replace-policy"  className="footerLink" ><i className="fas fa-hand-point-right mr-1 footerIcon"/><span>Replace policy</span></Link></li>
                                                </ul>
                                            </Col>
                                            <Col key={4} xl={3} lg={3} md={3}>
                                                <h5 className="footer-section-title">My Account</h5>
                                                <hr className="footer-hr"/>
                                                <ul className="footer-ul">
                                                    <li className="mb-2"><Link  className="footerLink" href="/login"><i className="fal fa-user footerIcon footerIconAccount"/><span>Login</span></Link></li>
                                                    <li className="mb-2"><Link  className="footerLink" href="/my-orders"><i className="fal fa-shopping-cart footerIcon footerIconAccount"/><span>Order List</span></Link></li>
                                                    <li className="mb-2"><Link  className="footerLink" href="/wishlist"><i className="fal fa-heart footerIcon footerIconAccount"/><span>Wishlist</span></Link></li>
                                                </ul>
                                                {this.props.vendor!==0 &&
                                                    <Fragment>
                                                        <h5 className="footer-section-title">Be Come a Seller</h5>
                                                        <hr className="footer-hr"/>
                                                        <Button onClick={this.handleOpen} className="btn">Apply Now</Button>
                                                    </Fragment>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                    {this.props.footerPaymentStatus===1  &&
                                        <Col xl={12} lg={12}   className="text-center">
                                            <hr className="footer-hr"/>
                                            <h5 className="footer-section-title mb-3">We accept payment via</h5>
                                            <div className="payment-image-div">
                                                {this.state.paymentLogo.map(pd=>{
                                                    return  <Photo
                                                                src={this.props.backendApi+pd}
                                                                blurDataURL={this.props.backendApi+pd}
                                                                class="pg-logos mr-3 mb-2"
                                                                footer={true}
                                                            />
                                                })}
                                            </div>
                                        </Col>
                                    }
                                    <Col key={2} xl={12} lg={12}  className="text-center">
                                        <hr className="footer-hr"/>
                                        <p className="about-us-text">{this.props.footerDescription}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <Container fluid={true} className="all-rights text-center">
                            <Row>
                                <Col key={1} lg={12} md={12} sm={12} xs={12}>
                                    <p>{this.props.copyright}</p>
                                </Col>
                            </Row>
                        </Container>
                    </footer>

                    <Modal show={this.state.modal} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Sorry, Admin can not be seller</Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
            </VisibilitySensor>
        </Fragment>
        );
    }
}




function mapStateToProps(state) {
    const copyright = state.starterReducer.copyright;
    const footerDescription = state.starterReducer.footerDescription;
    const backendApi = state.starterReducer.backendApi;
    const isAuthorized = state.starterReducer.isAuthorized;
    const contactNumber = state.starterReducer.contactNumber;
    const whatsappNumber = state.starterReducer.whatsappNumber;
    const vendor = state.starterReducer.vendor
    const contactAddress = state.starterReducer.contactAddress
    const contactEmail = state.starterReducer.contactEmail
    const role = state.userReducer.role
    const footerPaymentStatus = state.starterReducer.footerPaymentStatus

    return {
        copyright,
        footerDescription,
        backendApi,
        isAuthorized,
        contactNumber,
        whatsappNumber,
        vendor,
        contactAddress,
        role,
        footerPaymentStatus
    };
}





export default connect(mapStateToProps)(FooterDesktop);



