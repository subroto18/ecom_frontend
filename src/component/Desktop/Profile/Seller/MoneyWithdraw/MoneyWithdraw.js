import React, {PureComponent, Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import MoneyWithdrawPart from "../../../../CommonScreen/Profile/Seller/MoneyWithdraw/MoneyWithdrawPart";
class MoneyWithdraw extends PureComponent {
    render() {
        return (
            <div>
                <Fragment>
                    <Container>
                    <span className="profile title mb-4">Earning balance</span>
                        <Fragment>
                            <MoneyWithdrawPart/>
                        </Fragment>
                    </Container>
                </Fragment>
            </div>
        );
    }
}
export default MoneyWithdraw;