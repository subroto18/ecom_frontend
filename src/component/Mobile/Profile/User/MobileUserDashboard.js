import React, { Fragment, PureComponent} from 'react';
import MobileTopBack from "../../MobileCommon/MobileTopBack";
import MobileUserAccount from "./MobileUserAccount";
import MobileUserEditEmail from "./MobileUserEditEmail";
import NavMobileBottom from "../../MobileCommon/NavMobileBottom";


class MobileUserDashboard extends PureComponent {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="Dashboard"/>
                   <MobileUserAccount/>
                        {this.props.pageName== 'edit-email' &&
                          <MobileUserEditEmail/>
                        }
                 <NavMobileBottom/>
            </Fragment>

        );
    }
}

export default MobileUserDashboard;