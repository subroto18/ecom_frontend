import React, {Component, Fragment} from 'react';
import Image from "next/image";


class Photo extends Component {
    render() {

        let footerImage = this.props.footer;
        let menuIcon = this.props.menu;
        let className = this.props.className

        return (
            <Fragment>

                {footerImage ?
                        <div className={this.props.class}>
                            <Image
                                objectPosition="center"
                                src={this.props.src}
                                layout="fill"
                                alt=""
                                placeholder="blur"
                                blurDataURL={this.props.blurDataURL}
                            />
                          </div>
                    :menuIcon ?
                        <div className={this.props.class}>
                            <Image
                                objectPosition="center"
                                src={this.props.src}
                                layout="fill"
                                alt=""
                                placeholder="blur"
                                blurDataURL={this.props.blurDataURL}
                            />
                        </div>:
                        className==="empty" ?
                            <div className="photo-div">
                                <Image
                                    objectPosition="center"
                                    src={this.props.src}
                                    layout="fill"
                                    alt=""
                                    placeholder="blur"
                                    blurDataURL={this.props.blurDataURL}
                                />
                            </div>:

                    <div className="next-image-div">
                        <div className={this.props.class}>
                            <Image
                                objectPosition="center"
                                src={this.props.src}
                                layout="fill"
                                alt=""
                                placeholder="blur"
                                blurDataURL={this.props.blurDataURL}
                            />
                        </div>
                    </div>

                }




            </Fragment>
        );
    }
}

export default Photo;