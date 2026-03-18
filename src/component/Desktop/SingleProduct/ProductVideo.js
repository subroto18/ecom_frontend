import React, {PureComponent,Fragment} from 'react';
import ReactPlayer from 'react-player'
class ProductVideo extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={this.props.vedio}
                    />
                </div>
            </Fragment>
        );
    }
}
export default ProductVideo;