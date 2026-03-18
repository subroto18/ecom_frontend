import React, {PureComponent} from 'react';
import LoadingBar from "react-top-loading-bar";
import {topProgressBar} from "../../services/actions/commonAction";
import {connect} from "react-redux";

class TopBarProgress extends PureComponent {

    render() {
        return (
            <LoadingBar
                color='#f11946'
                progress={this.context.progress}
                onLoaderFinished={() => this.props.topProgressBar(0)}
            />
        );
    }
}

const mapDispatchToProps = {
    topProgressBar
};

function mapStateToProps(state) {

    const progress = state.commonReducer.progress;
    return {
        progress
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarProgress);

