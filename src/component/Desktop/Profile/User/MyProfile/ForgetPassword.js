import React, {PureComponent, Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import ForgetPasswordPart from "../../../../CommonScreen/Profile/User/MyProfile/ForgetPasswordPart";
import DesktopHeaderPart from "../../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../../Common/DesktopFooterPart";

class ForgetPassword extends PureComponent {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                <Fragment>
                     <Container>
                       <ForgetPasswordPart/>
                     </Container>
                </Fragment>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default ForgetPassword;
