import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import ReturnRequestPart from "../../../../CommonScreen/Profile/Seller/ReturnRequest/ReturnRequestPart";
class ReturnRequest extends PureComponent {
    render() {
        return (
            <Container>
                <span className="profile title mb-4">All Returns</span>
                <Fragment>
                    <ReturnRequestPart/>
                </Fragment>
            </Container>
        );
    }
}
export default ReturnRequest;