import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MegaMenu from "./MegaMenu";
import HomeSlider from "./HomeSlider";
import DealOfTheDay from "./DealOfTheDay";
import dynamic from 'next/dynamic'
const ResponsiveDesktopDealOfTheDay = dynamic(() => import('../../ResponsiveDesktop/ResponsiveDesktopHome/ResponsiveDesktopDealOfTheDay'), {
    ssr: false,
})

class TopNavWithDeal extends PureComponent {
    constructor() {
        super();
        this.state  = {
            width:''
        }
    }
    render() {
        return (
            <Fragment>
               <section id="topNav">
                   <Container>
                       <Row className="navMenu">
                           <Col  xl={3} lg={3} md={4}>
                             <MegaMenu/>
                           </Col>
                           <Col xl={7} lg={7} md={8} className="slider">
                             <HomeSlider/>
                           </Col>
                           <Col xl={2} lg={2} md={12} className="slider">
                               <div className="without-res">
                                   <DealOfTheDay/>
                               </div>
                               <div className="res">
                                  <ResponsiveDesktopDealOfTheDay/>
                               </div>
                           </Col>
                       </Row>
                   </Container>
               </section>
            </Fragment>
        );
    }
}
export default TopNavWithDeal;