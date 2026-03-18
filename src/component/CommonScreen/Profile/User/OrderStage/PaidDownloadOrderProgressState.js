import React, {Component, Fragment} from 'react';

class PaidDownloadOrderProgressState extends Component {
    render() {
        return (
            <Fragment>
                <div className="stepper-wrapper">
                    <div className="stepper-item completed active">
                        <div className="step-counter">1</div>
                        <div className="step-name">Payment Paid</div>
                    </div>
                    <div className="stepper-item completed active">
                        <div className="step-counter">2</div>
                        <div className="step-name">Downloaded</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PaidDownloadOrderProgressState;