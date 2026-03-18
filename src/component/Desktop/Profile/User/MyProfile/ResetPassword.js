import React, {PureComponent, Fragment} from 'react';
import DesktopFooterPart from "../../../Common/DesktopFooterPart";
import DesktopHeaderPart from "../../../Common/DesktopHeaderPart";
import ResetPasswordPart from "../../../../CommonScreen/Profile/User/MyProfile/ResetPasswordPart";

class ResetPassword extends PureComponent {

    render() {
        return (

            <Fragment>
                <DesktopHeaderPart/>
                <Fragment>
                   <ResetPasswordPart/>
                </Fragment>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default ResetPassword;
