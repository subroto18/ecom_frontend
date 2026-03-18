import React, {PureComponent} from 'react';
class UnpaidOrderProgressStage extends PureComponent {
    render() {
        let orderStatus = this.props.orderStatus
        return (
            <div>
                {orderStatus === "Pending" ?
                    <div className="stepper-wrapper">
                        <div className="stepper-item completed active">
                            <div className="step-counter">1</div>
                            <div className="step-name">Processing</div>
                        </div>
                        <div className="stepper-item active">
                            <div className="step-counter">2</div>
                            <div className="step-name">Pickup</div>
                        </div>
                        <div className="stepper-item ">
                            <div className="step-counter">3</div>
                            <div className="step-name">On the way</div>
                        </div>
                        <div className="stepper-item ">
                            <div className="step-counter">4</div>
                            <div className="step-name">Delivered</div>
                        </div>
                    </div>:
                    orderStatus==="Confirmed" ?
                        <div className="stepper-wrapper">
                            <div className="stepper-item completed active">
                                <div className="step-counter">1</div>
                                <div className="step-name">Processing</div>
                            </div>
                            <div className="stepper-item completed active">
                                <div className="step-counter">2</div>
                                <div className="step-name">Pickup</div>
                            </div>
                            <div className="stepper-item active">
                                <div className="step-counter">3</div>
                                <div className="step-name">On the way</div>
                            </div>
                            <div className="stepper-item active">
                                <div className="step-counter">4</div>
                                <div className="step-name">Delivered</div>
                            </div>
                        </div>:
                        orderStatus==="Picked up" ?
                            <div className="stepper-wrapper">
                                <div className="stepper-item completed active">
                                    <div className="step-counter">1</div>
                                    <div className="step-name">Confirmed</div>
                                </div>
                                <div className="stepper-item completed active">
                                    <div className="step-counter">2</div>
                                    <div className="step-name">Pickup</div>
                                </div>
                                <div className="stepper-item  active">
                                    <div className="step-counter">3</div>
                                    <div className="step-name">On the way</div>
                                </div>
                                <div className="stepper-item active">
                                    <div className="step-counter">4</div>
                                    <div className="step-name">Delivered</div>
                                </div>
                            </div>:
                            orderStatus==="On the way"?
                                <div className="stepper-wrapper">
                                    <div className="stepper-item completed active">
                                        <div className="step-counter">1</div>
                                        <div className="step-name">Confirmed</div>
                                    </div>
                                    <div className="stepper-item completed active">
                                        <div className="step-counter">2</div>
                                        <div className="step-name">Picked up</div>
                                    </div>
                                    <div className="stepper-item completed active">
                                        <div className="step-counter">3</div>
                                        <div className="step-name">On the way</div>
                                    </div>
                                    <div className="stepper-item  active">
                                        <div className="step-counter">4</div>
                                        <div className="step-name">Delivered</div>
                                    </div>
                                </div> :
                                orderStatus==="Delivered" ?
                                    <div className="stepper-wrapper">
                                        <div className="stepper-item completed active">
                                            <div className="step-counter">1</div>
                                            <div className="step-name">Confirmed</div>
                                        </div>
                                        <div className="stepper-item completed active">
                                            <div className="step-counter">2</div>
                                            <div className="step-name">Picked up</div>
                                        </div>
                                        <div className="stepper-item completed active">
                                            <div className="step-counter">3</div>
                                            <div className="step-name">On the way</div>
                                        </div>
                                        <div className="stepper-item completed active">
                                            <div className="step-counter">4</div>
                                            <div className="step-name">Delivered</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="stepper-wrapper">
                                        <div className="stepper-item completed active">
                                            <div className="step-counter">1</div>
                                            <div className="step-name">Cancellation in Progress</div>
                                        </div>
                                        <div className="stepper-item completed active">
                                            <div className="step-counter">2</div>
                                            <div className="step-name">Cancelled</div>
                                        </div>
                                    </div>
                }
            </div>
        );
    }
}
export default UnpaidOrderProgressStage;