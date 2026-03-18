import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TopBarProgress from "../../../../Loader/TopBarProgress";
import SellerDigitalProductPart from "../../../../CommonScreen/Profile/Seller/SellerProduct/SellerDigitalProductPart";

class SellerDigitalProduct extends PureComponent {
    render() {
        return (
            <Fragment>
                <section className="sectionDiv">
                    <Container>
                        <span className="profile title mb-4">Digital Product</span>
                        <Row>
                            <Fragment>
                                <SellerDigitalProductPart/>
                            </Fragment>
                        </Row>
                        <TopBarProgress/>
                    </Container>
                </section>
            </Fragment>
        );
    }
}
export default SellerDigitalProduct;
