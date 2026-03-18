import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
class RefundRequest extends PureComponent {
    render() {
        return (
            <Container>
                <span className="profile title mb-4">All Refund</span>
                <Fragment>
                    {/*<RefundRequestPart/>*/}
                </Fragment>
            </Container>
        );
    }
}
export default RefundRequest;