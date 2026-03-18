import React, {PureComponent, Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import Link from "next/link";
class FailedOrderPart extends PureComponent {
    render() {
        return (
            <Fragment>
                <Container className="Confirm-Container">
                    <div className="payment-failed-div">
                        <i className="fad fa-times-octagon payment-failed-icon"/>
                        <div className="alert alert-danger mb-3">
                            <h6>Your payment was not successfully processed.</h6>
                            <p className="text-muted">Please try again or connect our customer care</p>
                        </div>
                        <Link className="btn" href="/">Back to Home</Link>
                    </div>
                </Container>
            </Fragment>
        );
    }
}
export default FailedOrderPart;