import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Search from "../../Desktop/Common/Search";
import Router from "next/router";


class NavSearchTop extends PureComponent {
    constructor() {
        super();
        this.state = {
            headerClass:'navSearchTopHeader'
        }
        this.onPreviousPage = this.onPreviousPage.bind(this)
    }
    fixedTop = () => {
        if(window.scrollY>30){
            this.setState({
                headerClass:'navSearchTopHeaderFixed'
            })
        }
        else{
            this.setState({
                headerClass:'navSearchTopHeader'
            })
        }
    }

    onPreviousPage(){
        Router.back();
    }

    render() {
        window.addEventListener('scroll',this.fixedTop);
        return (
            <Fragment>
                <header className={this.state.header}>
                        <nav  className="navbar navSearchTop">
                            <Row className="w-100">
                                <Col sm={1} xs={1} className="barCol">
                                    <i  onClick={this.onPreviousPage} className="far fa-arrow-left search-back-arrow"/>
                                </Col>
                                <Col  sm={11} xs={11} className="mobileLogoCol mobileSearchBar">
                                    <Search/>
                                </Col>
                            </Row>
                        </nav>
                </header>
            </Fragment>
        );
    }
}
export default NavSearchTop;