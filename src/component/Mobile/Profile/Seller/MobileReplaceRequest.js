import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ReplaceRequestPart from "../../../CommonScreen/Profile/Seller/ReplaceRequest/ReplaceRequestPart";

class MobileReplaceRequest extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="All Replace"/>
            <Container className='mobileContainer'>
                <ReplaceRequestPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileReplaceRequest;