import React, {PureComponent,Fragment} from 'react';
import DesktopHeaderPart from "../../Common/DesktopHeaderPart";
import DesktopFooterPart from "../../Common/DesktopFooterPart";
import AllCategoriesPart from "../../../CommonScreen/AllCategories/AllCategoriesPart";
class AllCategories extends PureComponent {
    render() {
        return (
            <Fragment>
                   <DesktopHeaderPart/>
                      <AllCategoriesPart/>
                   <DesktopFooterPart/>
            </Fragment>
        );
    }
}
export default AllCategories;