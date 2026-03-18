import React, {PureComponent, Fragment} from 'react';
import MobileTopBack from "../MobileCommon/MobileTopBack";
const AllCategoriesPart = React.lazy(() => import("../../CommonScreen/AllCategories/AllCategoriesPart"));
class MobileCategory extends PureComponent {
    render() {
        return (
            <Fragment>
                <MobileTopBack title="All categories"/>
                <AllCategoriesPart/>
            </Fragment>
        );
    }
}
export default MobileCategory;