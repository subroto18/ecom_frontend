import React, {PureComponent, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import FailedOrderPart from "../../CommonScreen/FailedOrder/FailedOrderPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";

class FailedOrder extends PureComponent {
    render() {
        return (
            <Fragment>
                <DesktopHeaderPart/>
                    <section id="confirm">
                        <Container className="pt-4">
                            <div className="div">
                                <FailedOrderPart/>
                            </div>
                        </Container>
                    </section>
                <DesktopFooterPart/>
            </Fragment>
        );
    }
}

export default FailedOrder;