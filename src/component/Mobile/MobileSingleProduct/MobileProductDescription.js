import React, {PureComponent,Fragment} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import dynamic from "next/dynamic"
const ProductSpecifications = dynamic(() => import("../../Desktop/SingleProduct/ProductSpecifications"));
const ProductVideo = dynamic(() => import("../../Desktop/SingleProduct/ProductVideo"));

class MobileProductDescription extends PureComponent {
    render() {
        return (
            <Fragment>
                <div  className="mobile-product-des my-3">
                    <div className="productDes">
                        <Tabs defaultActiveKey="Description" id="uncontrolled-tab-example">
                            <Tab eventKey="Description" title="Description">
                                <ProductSpecifications  descriptionValue={this.props.des} />
                            </Tab>
                            <Tab eventKey="Video" title="Video">
                                <ProductVideo vedio={this.props.video_link}/>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MobileProductDescription;