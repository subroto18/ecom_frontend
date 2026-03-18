import React, { PureComponent, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import AuthContext from '../../../../Auth/Auth';
const SellerDigitalProductEditPart = React.lazy(() => import('../../../CommonScreen/Profile/Seller/SellerProduct/SellerDigitalProductEditPart'));
const MobileTopBack = React.lazy(() => import('../../MobileCommon/MobileTopBack'));

class MobileSellerDigitalProductEdit extends PureComponent {
    static contextType = AuthContext;
  render() {
    return (
        <Fragment>
            <MobileTopBack title="Edit Product"/>
            <Container className='mobileContainer'>
                <SellerDigitalProductEditPart id={this.props.id}/>
            </Container>
        </Fragment>
    )
  }
}
export default MobileSellerDigitalProductEdit;