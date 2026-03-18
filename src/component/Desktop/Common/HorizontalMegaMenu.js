import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
class HorizontalMegaMenu extends PureComponent {
    constructor() {
        super();
        this.state = {
            div:'horizontalMegaMenuDiv',
            subCatDiv:'subCat'
        }
    }
    fixedTop = () => {
        if(window.scrollY>30){
            this.setState({
                div:'horizontalMegaMenuDivFixed',
                subCatDiv:'subCatFixed'
            })
        }
        else{
            this.setState({
                div:'horizontalMegaMenuDiv',
                subCatDiv:'subCat'
            })
        }
    }
    render() {
        window.addEventListener('scroll',this.fixedTop);
        return (
            <Fragment>
                <div className={this.state.div}>
                <Container>
                    <div className="horizontalMegaMenu">
                        <div className="horizontalMegaMenuList">
                            <ul>
                                <li>
                                     <a className="catLink" href="" >
                                         <span className="mr-1">Women Fashion</span>
                                        <span><i className="far fa-angle-down"></i></span>
                                      </a>
                                    <div className={this.state.subCatDiv}>
                                        <div className="row">
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Hot Categories</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Wedding & event</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink" href="#">See More</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink  subCatBtn" href="#">See More <i
                                                            className="far fa-chevron-double-right seeMoreIcon"></i> </a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </li>
                                <li>  <a className="catLink" href="" > <span>Men Fashion</span> </a></li>
                                <li>  <a className="catLink" href="" > <span>Kids & toys</span></a> </li>
                                <li>  <a className="catLink" href="" > <span>Sports & outdoor</span></a> </li>
                                <li>  <a className="catLink" href="" > <span>Jewelry & Watches</span></a> </li>
                                <li> <a className="catLink" href="" >  <span>Cellphones & Tabs</span></a> </li>
                                <li>  <a className="catLink" href="" > <span>Beauty, Health & Hair</span></a> </li>
                                <li>
                                    <a className="catLink" href="" >
                                        <span className="mr-1">Home decoration & Appliance</span>
                                        <span><i className="far fa-angle-down"></i></span>
                                        </a>
                                    <div className={this.state.subCatDiv }>
                                        <div className="row">
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Hot Categories</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Wedding & event</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink" href="#">See More</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                        <li>  <a className="subCatLink  subCatBtn" href="#">See More <i
                                                            className="far fa-chevron-double-right seeMoreIcon"></i> </a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <div className="subCatList">
                                                    <h3 className="subCatTitle">Bottom</h3>
                                                    <hr className="subCatTitleLink" />
                                                    <ul>
                                                        <li> <a className="subCatLink" href="#">Link 1</a></li>
                                                        <li> <a className="subCatLink" href="#">Link 2</a></li>
                                                        <li>  <a className="subCatLink" href="#">Link 3</a></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </li>
                                <li>  <a className="catLink" href="" > <span className="mr-1">See all <i
                                    className="fas fa-angle-double-right"></i></span>  </a> </li>
                            </ul>
                        </div>
                    </div>
                </Container>
                </div>
            </Fragment>
        );
    }
}
export default HorizontalMegaMenu;