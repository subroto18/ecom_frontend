import React, {Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class MobileUserEditEmail extends Component {

    constructor() {
        super();
        this.state = {
            email: ''
        }
    }

    changeInput = (e) => {
        if(e.target.name === 'email') {
            this.setState({
                email: e.target.value
            });
        }
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <div className="mobileEmailEditDiv">
                        <Form>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="editLabel">Email</Form.Label>
                                <Form.Control type="text" placeholder="Email Address" name="email" value={this.state.email} onChange={this.changeInput} />
                            </Form.Group>
                            <Button className="mobileSaveInfo">Save Email Address</Button>
                        </Form>
                    </div>
                </Container>
            </Fragment>
        );
    }
}

export default MobileUserEditEmail;