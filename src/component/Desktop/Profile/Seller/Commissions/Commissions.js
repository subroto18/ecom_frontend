import React, {PureComponent, Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CommissionsPart from "../../../../CommonScreen/Profile/Seller/Commisions/CommissionsPart";
class Commissions extends PureComponent {
    render() {
        return (
            <Fragment>
                <span className="profile title mb-4">Commission History</span>
                <Row>
                    <Col lg={12}>
                        <div className="card">
                            <Fragment>
                                <CommissionsPart/>
                            </Fragment>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
export default Commissions;