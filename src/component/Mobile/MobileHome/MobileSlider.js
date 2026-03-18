import React, {PureComponent,Fragment} from 'react';
import Container from "react-bootstrap/Container";
import HomeSlider from "../../Desktop/DesktopHome/HomeSlider";
class MobileSlider extends PureComponent {
    render() {
        return (
            <Fragment>
               <section id="mobile-slider">
                   <Container>
                       <HomeSlider/>
                   </Container>
               </section>
            </Fragment>
        );
    }
}
export default MobileSlider;