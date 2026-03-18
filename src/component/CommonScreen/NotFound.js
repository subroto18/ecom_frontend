import React, {Component, Fragment} from 'react';
import Link from "next/link";
class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <div className='pageNotFound py-5'>
                    <div className='text-center'>
                        <h1>404</h1>
                        <h3>Opps, Sorry we can't find that page</h3>
                        <p>Either something went wrong or the page doesn't exist anymore.</p>
                        <Link className="mt-2" href="/"><div className='btn btn-primary'>Go to home Page</div></Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default NotFound;