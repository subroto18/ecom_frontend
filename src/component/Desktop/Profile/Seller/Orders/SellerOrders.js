import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import SellerOrdersPart from "../../../../CommonScreen/Profile/Seller/Orders/SellerOrdersPart";
class SellerOrders extends PureComponent {
    render() {
        return (
            <Container>
                <span className="profile title mb-4">All Orders</span>
                <Fragment>
                    <SellerOrdersPart/>
                </Fragment>
            </Container>
        );
    }
}
export default SellerOrders;