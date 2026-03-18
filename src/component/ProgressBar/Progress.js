import React, {Component,Fragment} from 'react';
import LoadingBar from "react-top-loading-bar";
class Progress extends Component {
    constructor() {
        super();
        this.state = {
            progress:0
        }
        this.onPageLoadProgress = this.onPageLoadProgress.bind(this);
    }
    componentDidMount() {
        this.onPageLoadProgress(100);
    }
    onPageLoadProgress(e){
        this.setState({
            progress:e
        })
    }
    render() {
        return (
            <Fragment>
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progress}
                    onLoaderFinished={() => this.onPageLoadProgress(0)}
                />
                <br />
            </Fragment>
        );
    }
}
export default Progress;