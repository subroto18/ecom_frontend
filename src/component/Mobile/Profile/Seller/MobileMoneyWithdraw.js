import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import MoneyWithdrawPart from "../../../CommonScreen/Profile/Seller/MoneyWithdraw/MoneyWithdrawPart";

class MobileMoneyWithdraw extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="Earning balance"/>
            <Container className='mobileContainer'>
                <MoneyWithdrawPart/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileMoneyWithdraw;