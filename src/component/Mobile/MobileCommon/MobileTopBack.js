import React, {PureComponent, Fragment} from 'react';

import Button from "react-bootstrap/Button";
import Router from "next/router";
class MobileTopBack extends PureComponent {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        Router.back();
    }
    render() {
        return (
            <Fragment>
                <div className="mobileBackTopBar">
                    <Button   onClick={this.handleClick} className="backArrow btn"><i className="far fa-arrow-left"/></Button>
                    <span className="back-text text-right">{this.props.title}</span>
                </div>
            </Fragment>
        );
    }
}

export default MobileTopBack;
