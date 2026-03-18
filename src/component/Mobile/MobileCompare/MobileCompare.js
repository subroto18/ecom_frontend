import React, {PureComponent,Fragment} from 'react';
import NavMobileTop from "../MobileCommon/NavMobileTop";
import ComparePart from "../../CommonScreen/Compare/ComparePart";
class MobileCompare extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavMobileTop/>
                <ComparePart/>
            </Fragment>
        );
    }
}
export default MobileCompare;