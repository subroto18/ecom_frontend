import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import ReturnRequestPart from "../../../CommonScreen/Profile/Seller/ReturnRequest/ReturnRequestPart";
class MobileReturnRequest extends PureComponent {
  render() {
    return (
        <Fragment>
            <MobileTopBack title="All Returns"/>
            <Container className='mobileContainer'>
                <ReturnRequestPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileReturnRequest;