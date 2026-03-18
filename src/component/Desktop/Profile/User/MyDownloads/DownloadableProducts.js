import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import DownloadableProductsPart from "../../../../CommonScreen/Profile/User/MyDownloads/DownloadableProductsPart";
class DownloadableProducts extends PureComponent {
    render() {
        return (
            <Fragment>
                <Fragment>
                    <span className="profile title mb-4">My Downloads</span>
                      <div className="py-3">
                        <div>
                            <Fragment>
                                <DownloadableProductsPart/>
                            </Fragment>
                        </div>
                    </div>
                </Fragment>
            </Fragment>
        );
    }
}
export default DownloadableProducts;