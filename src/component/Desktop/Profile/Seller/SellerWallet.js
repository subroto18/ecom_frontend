import React, {PureComponent,Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
class SellerWallet extends PureComponent {
    render() {
        return (
            <Fragment>
                <h4 className="seller-dashboard-title mb-3">My Wallet</h4>
                <Row>
                    <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                        <div className="seller-color-divs color-type1">
                            <h4>$5000</h4>
                            <p>Wallet Balance</p>
                            <i className="fas fa-money-check-alt fa-5x seller-dashboard-icons"></i>
                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                        <a href="">
                            <div className="seller-color-divs color-type1">
                                <h4><i className="fas fa-plus"></i></h4>
                                <p>Wallet Recharge</p>
                                <i className="fas fa-plus fa-5x seller-dashboard-icons"></i>
                            </div>
                        </a>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="white-bg p-4">
                            <Table striped bordered hover className="m-0">
                                <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Sending Date</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>#100002</td>
                                    <td>2020-12-03 18:50:23</td>
                                    <td>An Issue that i am trying to solve but you guys are not helping out</td>
                                    <td className="text-center"><Badge variant="secondary">Pending</Badge></td>
                                    <td><a href="" className="ticket-view-more">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>#100002</td>
                                    <td>2020-12-03 18:50:23</td>
                                    <td>An Issue</td>
                                    <td className="text-center"><Badge variant="success">Closed</Badge></td>
                                    <td><a href="" className="ticket-view-more">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>#100002</td>
                                    <td>2020-12-03 18:50:23</td>
                                    <td>An Issue</td>
                                    <td className="text-center"><Badge variant="danger">Pending</Badge></td>
                                    <td><a href="" className="ticket-view-more">View Details</a></td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
export default SellerWallet;