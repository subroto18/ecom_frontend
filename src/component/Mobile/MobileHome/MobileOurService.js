import React, {PureComponent,Fragment} from 'react';
import dynamic from "next/dynamic"
const OurServices = dynamic(() => import("../../Desktop/Common/OurServices"));
class MobileOurService extends PureComponent {
    render() {
        return (
            <Fragment>
                <OurServices/>
            </Fragment>
        );
    }
}
export default MobileOurService;