import React, {PureComponent,Fragment,createRef} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {connect} from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic"
import Photo from "../../CommonScreen/Image/Photo";
const NavSideBar = dynamic(() => import("../MobileHome/NavSideBar"))
const Search = dynamic(() => import("../../Desktop/Common/Search"))

class NavMobileTop extends PureComponent {
    wrapperRef = createRef();
    constructor() {
        super();
        this.state = {
            header:'mainNav sticky-top',
            login:false,
            value: '',
            suggestions: [],
            navSideBar:'nav-sidebar-close',
            overlay:'overlay-close',
            searchBar:false
        }
        this.navOpen = this.navOpen.bind(this)
    }
    fixedTop = () => {
        if(window.scrollY>30){
            this.setState({
                header:'mainNav sticky-top'
            })
        }
        else{
            this.setState({
                header:'mainNav'
            })
        }
    }

    navOpen(){
        if(this.state.navSideBar=='nav-sidebar-close'){
            this.setState({
                navSideBar:'nav-sidebar-open',
                overlay:'overlay-open'
            })
        }
        else{
            this.setState({
                navSideBar:'nav-sidebar-close',
                overlay:'overlay-close'
            })
        }
    }
    navClose = () => {
       this.setState({
           navSideBar:'nav-sidebar-close',
           overlay:'overlay-close'
       })
   }
    componentDidMount() {
        window.scroll(0,0)
    }
    openSearchBar = () => {
     this.setState({
         searchBar:true
     })
    }
    closeSearchBar =  () => {
        this.setState({
            searchBar:false
        })
    }
    render() {
        if(this.props.stickyHeader==1){
            window.addEventListener('scroll',this.fixedTop);
        }
        return (
            <Fragment>
                <header className={this.state.header}>
                    <Container>
                        <nav  className="navbar">
                            {this.state.searchBar  ?
                                <Row className="w-100">
                                    <Col sm={1} xs={1} className="nav-search-col-arrow">
                                        <span className="nav-search-col-arrow-div"> <span className="nav-search-col-arrow-link" onClick={this.closeSearchBar}><i className="far fa-long-arrow-left nav-search-col-arrow-icon"></i></span></span>
                                    </Col>
                                    <Col sm={11} xs={11} className="barCol">
                                        <Search/>
                                    </Col>
                                 </Row>
                                :
                                <Row className="w-100">
                                    <Col sm={1} xs={1} className="barCol">
                                        <div  className="bar">
                                            <i onClick={this.navOpen}   className="far fa-bars mobileBar"/>
                                        </div>
                                    </Col>
                                    <Col  sm={10} xs={10} className="mobileLogoCol">
                                        <div onClick={this.navOpen} className="mobile-logo">
                                            <Link href='/'  >
                                                <div className="mobile-logo-div">
                                                    {this.props.logo==undefined ?
                                                        <Fragment>

                                                            <Photo
                                                                src="/logo.png"
                                                                blurDataURL="/logo.png"
                                                                class="logo"
                                                            />


                                                        </Fragment>:
                                                        <Fragment>
                                                            {this.props.logo==null ?
                                                                <Photo
                                                                    src="/logo.png"
                                                                    blurDataURL="/logo.png"
                                                                    class="logo"
                                                                />:
                                                                <Photo
                                                                    src={this.props.backendApi+this.props.logo}
                                                                    blurDataURL={this.props.backendApi+this.props.logo}
                                                                    class="logo"
                                                                />

                                                            }
                                                        </Fragment>
                                                    }
                                                </div>
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col  sm={1} xs={1} className="barColRight">
                                        <div className="search">
                                            <i onClick={this.openSearchBar} className="far fa-search mobileSearch"/>
                                        </div>
                                    </Col>
                                </Row>
                            }
                        </nav>
                        <NavSideBar triggerParentUpdate={this.navClose} className={this.state.navSideBar} ovarlay={this.state.overlay}/>
                    </Container>
                </header>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const logo = state.starterReducer.logo;
    const backendApi = state.starterReducer.backendApi;
    const stickyHeader  = state.starterReducer.stickyHeader
    return {
        logo,
        backendApi,
        stickyHeader
    };
}





export default connect(mapStateToProps)(NavMobileTop);

