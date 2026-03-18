import React, {PureComponent,Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SellerProductsPart from "../../../../CommonScreen/Profile/Seller/SellerProduct/SellerProductsPart";

class SellerProducts extends PureComponent {
    render() {
        return (
            <Fragment>
                   <section className="sectionDiv">
                    <Container>
                        <span className="profile title mb-4">Product</span>
                        <Row>
                           <Fragment>
                                <SellerProductsPart/>
                            </Fragment> 
                        </Row>
                    </Container>
                </section>
            </Fragment>
        );
    }
}
export default SellerProducts;
