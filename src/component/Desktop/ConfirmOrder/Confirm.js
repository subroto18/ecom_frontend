import React, {PureComponent,Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import ConfirmPart from "../../CommonScreen/Confirm/ConfirmPart";

class Confirm extends PureComponent {

    render() {
        return (
            <Fragment>
               <DesktopHeaderPart/>
                 <section id="confirm">
                    <Container className="pt-4">
                        <div className="div">
                           <ConfirmPart/>
                        </div>
                    </Container>
                </section>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default Confirm;