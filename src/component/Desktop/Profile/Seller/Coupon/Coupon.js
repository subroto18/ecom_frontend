import React, {PureComponent} from 'react';
import Container from "react-bootstrap/Container";
import "react-datepicker/dist/react-datepicker.css";
import CouponPart from "../../../../CommonScreen/Profile/Seller/Coupon/CouponPart";
class Coupon extends PureComponent {
    render() {
            return (
                <Container>
                    <span className="profile title mb-4">Coupon</span>
                    <CouponPart/>
                </Container>
            );
        }
}
export default Coupon;