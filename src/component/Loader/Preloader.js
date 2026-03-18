import React, {PureComponent,Fragment} from 'react';
import { Rings} from "react-loader-spinner";
import {connect} from "react-redux";
class Preloader extends PureComponent {
    render() {
        return (
            <Fragment>
                    <div className="loader-spinner">
                        <Rings
                            height="80"
                            width="80"
                            color={this.props.siteColor}
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        />
                    </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const siteColor = state.starterReducer.siteColor
    return {
        siteColor
    };
}





export default connect(mapStateToProps)(Preloader);

