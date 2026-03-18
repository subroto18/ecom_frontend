import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SimpleReactValidator from 'simple-react-validator';
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import {alert} from "../../../services/common";

class Newslatter extends PureComponent {
    constructor() {
        super();
        this.state = {
            email:"",
            msg:"",
        }
        this.validator = new SimpleReactValidator();
        this.onEmail  = this.onEmail.bind(this)
        this.onSubscribe  = this.onSubscribe.bind(this)
    }
    onEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onSubscribe(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
        {
               const data = {
                   email:this.state.email
               }
               Api().post('subscribe',data).then(res=>{
                   if(res.data===1){

                       this.setState({
                           email:""
                       })

                       alert('success','Subscribe successfully!');
                   }
               }).catch(res=>{
               })
        }
    }

    render() {
        return (
            <Fragment>
                <section id="newsLatter" className="pt-4">
                    <Container>
                        <Row className="newsletter-section">
                            <Col lg={6} md={6} xs={12}>
                                <div className="d-flex newsletter-info">
                                    <i className="fab fa-telegram-plane fa-3x mr-3"/>
                                    <div>
                                        <h3 className="newsletter-title">Join our Newsletter now</h3>
                                        <p className="newsletter-subtitle">Register now to get updates on promotions.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} md={6} xs={12}>
                                <div className="d-flex justify-content-center">
                                    <Form.Group className="newsletter-form" controlId="formBasicEmail">
                                        <Form.Control value={this.state.email} onChange={(e)=>this.onEmail(e)} type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Button onClick={this.onSubscribe} className="newsletter-btn"><i className="fab fa-telegram-plane"></i> Send</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Fragment>
        );
    }
}




export default connect(null)(Newslatter);

