import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import EditUserAddressPart from "../../../../CommonScreen/Profile/User/MyAddress/EditUserAddressPart";

class EditUserAddress extends PureComponent {
    render() {
        return (
            <Fragment>
                    <Container>
                        <span className="profile title mb-4">Edit Address</span>
                              <Fragment>
                                <EditUserAddressPart/>
                              </Fragment>
                    </Container>
                </Fragment>
        );
    }
}
export default EditUserAddress;
