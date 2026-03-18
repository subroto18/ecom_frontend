import React, { Fragment, PureComponent} from "react";
import Container from "react-bootstrap/Container";
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import DownloadableProductsPart from "../../../CommonScreen/Profile/User/MyDownloads/DownloadableProductsPart";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";

class MobileDownloadableProducts extends PureComponent {

  render() {
    return (
        <Fragment>
            <MobileTopBack title="My Downloads"/>
            <Container className="MobileDownloadable-Products mobileContainer">
               <div className="Mobile-Download">
                 <DownloadableProductsPart/>
               </div>
            </Container>
            <NavMobileBottom/>
      </Fragment>
    )
  }
}
export default MobileDownloadableProducts;
