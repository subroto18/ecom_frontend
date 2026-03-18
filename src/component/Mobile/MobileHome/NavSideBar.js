import React, {PureComponent,Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import Router from "next/router";
import {logout} from "../../../services/actions/userAction";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";

class NavSideBar extends PureComponent {
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
    }
    onVisible = (isVisible) => {
        if(isVisible){
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
    }


    closeBar =  () => {
        this.props.triggerParentUpdate();
    }
    onRedirect =  (url) =>{
        if(url==="home"){
            Router.push('/');
        }else if(url==="category"){
            Router.push('product/all-categories')
        }
        else if(url==="signIn"){
            Router.push('login')
        }
        else if(url==="signUp"){
            Router.push('user/registration')
        }else if(url==="sellerSignUp"){
            Router.push('seller/registration')
        }
        else if(url==="sellerSignUp"){
            Router.push('seller/registration')
        }
        else if(url==="logout"){
            Api().get('logout').then(res => {
               this.props.logout();
            }).catch(error=>{
                this.props.logout();
            })
        }
        else if(url==="orders"){
            Router.history.push('my-orders')
        }
        else if(url==="wishlist"){
            Router.history.push('wishlist')
        }
        else if(url==="cart"){
            Router.history.push('cart')
        }
        else if (url === 'dashboard')
        this.closeBar();
    }
    render() {
        return (
            <Fragment>
                <div  className={this.props.className}>
                    <div className="user-profile-div">
                        {this.props.avatar.length>0 ?

                            <Photo
                                src={ this.props.avatar.map(pd=>{
                                    return `${this.props.backendApi}${pd.media_url}`
                                }) }
                                blurDataURL="/blank.jpg"
                                className="user-avatar mobile-avatar"
                            />
                             :


                            <Photo
                                src="/admin.png"
                                blurDataURL="/admin.png"
                                className="user-avatar mobile-avatar"
                            />
                        }
                        <p className="user-name">{this.props.name}</p>
                        <p className="user-email">{this.props.email}</p>
                    </div>

                    <div  className="nav-sidebar-details-div">
                        <ul>
                                <Fragment>
                                    <li onClick={()=>this.onRedirect('dashboard')} className="mobile-sidebar-nav-link-li">
                                        <p  className="mobile-sidebar-nav-link"><span className="nav-sidebar-icon">
                                          <i className="fad fa-chart-pie  mobile-nav-fa-icon"/></span>
                                            <span className="nav-sidebar-link-name">Dashboard</span>
                                        </p>
                                    </li>
                                    <li onClick={()=>this.onRedirect('cart')} className="mobile-sidebar-nav-link-li">
                                        <p  className="mobile-sidebar-nav-link">
                                            <span className="nav-sidebar-icon">
                                               <i className="far fa-cart-plus  mobile-nav-fa-icon"/>
                                             </span><span className="nav-sidebar-link-name">My cart</span>
                                        </p>
                                    </li>
                                    <li onClick={()=>this.onRedirect('wishlist')} className="mobile-sidebar-nav-link-li">
                                        <p  className="mobile-sidebar-nav-link"><span className="nav-sidebar-icon"><i className="far fa-heart  mobile-nav-fa-icon"></i></span><span className="nav-sidebar-link-name">Wishlist</span></p>
                                    </li>
                                    <li onClick={()=>this.onRedirect('orders')} className="mobile-sidebar-nav-link-li">
                                        <p  className="mobile-sidebar-nav-link"><span className="nav-sidebar-icon">
                                          <i className="far fa-sign-in-alt mobile-nav-fa-icon"/></span><span className="nav-sidebar-link-name">My orders</span></p>
                                    </li>
                                    {this.props.role===1 &&
                                      <Fragment>
                                          {this.props.vendor===1 &&
                                              <li onClick={()=>this.onRedirect('sellerSignUp')} className="mobile-sidebar-nav-link-li">
                                                  <p  className="mobile-sidebar-nav-link"><span className="nav-sidebar-icon"><i className="far fa-truck-loading  mobile-nav-fa-icon"/></span><span className="nav-sidebar-link-name">Become a seller</span></p>
                                              </li>
                                          }
                                      </Fragment>
                                    }
                                    {this.props.isAuthorized ?
                                    <Fragment>
                                        <li onClick={()=>this.onRedirect('logout')} className="mobile-sidebar-nav-link-li">
                                            <p  className="mobile-sidebar-nav-link"><span className="nav-sidebar-icon">
                                               <i className="far fa-sign-in-alt mobile-nav-fa-icon"/></span><span className="nav-sidebar-link-name">Logout</span></p>
                                        </li>
                                    </Fragment>:
                                      <Fragment>
                                            <li onClick={()=>this.onRedirect('signIn')} className="mobile-sidebar-nav-link-li">
                                                <p  className="mobile-sidebar-nav-link"><span className="nav-sidebar-icon">
                                              <i className="far fa-sign-in-alt mobile-nav-fa-icon"/></span><span className="nav-sidebar-link-name">Sign In</span></p>
                                            </li>
                                            {this.props.vendor===1 &&
                                                <li onClick={()=>this.onRedirect('sellerSignUp')} className="mobile-sidebar-nav-link-li">
                                                    <p  className="mobile-sidebar-nav-link"><span className="nav-sidebar-icon"><i className="far fa-truck-loading  mobile-nav-fa-icon"/></span><span className="nav-sidebar-link-name">Become a seller</span></p>
                                                </li>
                                            }
                                        </Fragment>
                                    }
                                </Fragment>
                        </ul>
                    </div>

                    <div className="nav-contact-us-div">
                        <div className="nav-social-div">
                            <span className="payment-title">Connect with us</span>

                                <VisibilitySensor  onChange={this.onVisible}>
                                    <div className="footer-social-icon">
                                        {this.state.facebook_link && <Link  href={this.state.facebook_link} ><i className="fab fa-facebook-f footer-social-icons mr-2"/></Link>}
                                        {this.state.twitter_link && <Link  href={this.state.twitter_link } > <i className="fab fa-twitter footer-social-icons mr-2"/> </Link>}
                                        {this.state.instagram_link &&   <Link  href={this.state.instagram_link} ><i className="fab fa-instagram footer-social-icons mr-2"/> </Link> }
                                        {this.state.youtube_link && <Link  href={this.state.youtube_link} ><i className="fab fa-youtube footer-social-icons"/></Link> }

                                    </div>

                                </VisibilitySensor>


                        </div>
                    </div>
                </div>
                <div  onClick={this.closeBar} className={this.props.ovarlay}/>
            </Fragment>
        );
    }
}



const mapDispatchToProps = {
    logout
};

function mapStateToProps(state) {
    const vendor = state.starterReducer.vendor;
    const isAuthorized  = state.starterReducer.isAuthorized;
    const role = state.userReducer.role;
    const avatar = state.userReducer.avatar;
    const name = state.userReducer.name;
    const email = state.userReducer.email
    return {
        vendor,
        isAuthorized,
        role,
        avatar,
        name,
        email
    };
}





export default connect(mapStateToProps, mapDispatchToProps)(NavSideBar);




