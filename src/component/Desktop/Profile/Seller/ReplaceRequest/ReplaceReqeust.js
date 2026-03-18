import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import ReplaceRequestPart from "../../../../CommonScreen/Profile/Seller/ReplaceRequest/ReplaceRequestPart";
class ReplaceRequest extends PureComponent {
    render() {
        return (
            <Container>
                <span className="profile title mb-4">All Replace</span>
                <Fragment>
                    <ReplaceRequestPart/>
                </Fragment>
            </Container>
        );
    }
}
export default ReplaceRequest;