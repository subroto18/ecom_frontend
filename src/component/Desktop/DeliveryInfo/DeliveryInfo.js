import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import DeliveryInfoPart from "../../CommonScreen/DeliveryInfo/DeliveryInfoPart";
import DesktopFooterPart from "../Common/DesktopFooterPart";
class DeliveryInfo extends PureComponent {

    render() {
                return (
                    <Fragment>
                        <DesktopHeaderPart/>
                        <Container>
                            <DeliveryInfoPart/>
                        </Container>
                        <DesktopFooterPart/>
                    </Fragment>
                );

    }
}
export default DeliveryInfo;
