import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import {starter} from "../services/actions/starterAction"
import {selectedCheckoutProduct} from "../services/actions/productAction";
import {getCartProductDetails} from "../services/actions/cartAction";
import Link from "next/link";

class ClientError extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className='pageNotFound py-5'>
                    <div className='text-center py-5 mt-5'>
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

const mapDispatchToProps = {
    starter,
    selectedCheckoutProduct,
    getCartProductDetails
};

function mapStateToProps(state) {

    const isAuthorized = state.userReducer.isAuthorized;
    return {
        isAuthorized
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientError);


