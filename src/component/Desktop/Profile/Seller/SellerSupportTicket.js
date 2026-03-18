import React, {PureComponent,Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
class SellerSupportTicket extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: false
        }
    }
    handleModal = () => this.setState({show: !this.state.show});
    render() {
        return (
            <Fragment>
                <h4 className="seller-dashboard-title mb-3">Support Ticket</h4>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="white-bg p-4">
                            <Button onClick={this.handleModal} className="support-ticket-btn mb-3"><i className="fas fa-ticket-alt"></i> Open a Ticket</Button>
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
                <Modal show={this.state.show} onHide={this.handleModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Open a Support Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Support Subject" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Support Description"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicSubject">
                            <Form.Label>Upload File</Form.Label>
                            <Form.File
                                id="custom-file"
                                label="Upload File"
                                custom
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal}>
                            Close
                        </Button>
                        <Button className="support-ticket-btn" onClick={this.handleModal}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}
export default SellerSupportTicket;