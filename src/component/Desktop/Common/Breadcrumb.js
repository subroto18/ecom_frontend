import React, {Component,Fragment} from 'react';
import Link from "next/link";
class Breadcrumb extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Fragment>
                <nav aria-label="breadcrumb">
                    {this.props.pageName=="category" ?
                        <ol className="breadcrumb">
                             <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                             <li className="breadcrumb-item"><Link href="/product/all-categories">Category</Link></li>
                             <li className="breadcrumb-item active" aria-current="page">{this.props.slug}</li>
                        </ol>:this.props.pageName=="brand" ?
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link href="/product/all-brands">Brands</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{this.props.slug}</li>
                            </ol>
                            :
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                <li className="breadcrumb-item">Search</li>
                                <li className="breadcrumb-item active" aria-current="page">{this.props.slug}</li>
                            </ol>
                    }

                </nav>
            </Fragment>
        );
    }
}
export default Breadcrumb;