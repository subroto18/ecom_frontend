import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import Select from "react-select";
import Api from "../../../../../ClientApi/Api";
import Link from "next/link";
import Photo from "../../../Image/Photo";
import Pagination from "../../../../Desktop/SingleProduct/Pagination";
import {connect} from "react-redux";

class UserOrderPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading: true,
            data: [],
            showPerPage: 3,
            pagination: {
                start: 0,
                end: this.showPerPage,
            },
            showData: {value: 'all', label: 'All orders'}
        }
        this.onDataChangeByDays = this.onDataChangeByDays.bind(this)
    }

    componentDidMount() {
        window.scrollTo({behavior: 'smooth', top: '0px'});
        Api().get('getOrder').then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        })
    }

    onDataChangeByDays(e) {
        let data = {
            day: e.value
        }
        this.setState({
            loading: true,
            showData: e
        })
        Api().post('getOrderByDates', data).then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        })
    }

    render() {
        let data = this.state.data;
        const onPaginationChange = (start, end) => {
            this.setState({
                loading: true
            })
            window.scroll(0, 0)
            this.setState({
                pagination: {start: start, end: end},
                loading: false
            });
        };
        const options = [
            {value: '5', label: 'Last 5 days orders'},
            {value: '15', label: 'Last 15 days orders'},
            {value: '30', label: 'Last 30 days orders'},
            {value: 'all', label: 'All orders'}
        ]
        const loader = <div className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <div className="py-3">
                    <div>
                        <Fragment>
                            {this.state.loading ?
                                <div>
                                    <Fragment>{loader}</Fragment>
                                </div>
                                :
                                <Fragment>
                                    <div className="orderDiv  d-flex">
                                        <div className="orderDiv-l">
                                            <span>Show:  </span>
                                        </div>
                                        <div className="orderDiv-r">
                                            <Select
                                                className='inputTextSize'
                                                options={options}
                                                defaultValue={options[3]}
                                                onChange={this.onDataChangeByDays}
                                                value={this.state.showData}
                                            />
                                        </div>
                                    </div>
                                    {data.length > 0 ?
                                        <Fragment>
                                            {data.slice(this.state.pagination.start, this.state.pagination.end).map((pd) => (
                                                <div className="orderDiv ">
                                                    <div className="d-flex justify-content-between">
                                                        <div className='orderDetails'>
                                                            <p><span className="mr-2">Order</span><span
                                                                className="orderId">{pd.orderId}</span></p>
                                                            <p><span>Placed on {pd.orderData}</span></p>
                                                        </div>
                                                        <div className='manageText'>
                                                            <Link
                                                                href={`orders/view/${pd.orderId.substring(1)}`}>MANAGE</Link>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    {pd.orderProductInfo.map(product => {
                                                        return <div className="order-details-div d-flex">
                                                            <div className="oder-cd-div">

                                                                <Photo
                                                                    src={`${this.props.backendApi}${product.product_thumbnail}`}
                                                                    blurDataURL="/blank.jpg"
                                                                    class="order-img"
                                                                />

                                                            </div>
                                                            <div className="order-title-div oder-cd">
                                                                <p>{product.product_name}</p>
                                                                <span className="text-muted">
                                                                                       {product.product_variation != null &&
                                                                                           <Fragment>{
                                                                                               product.product_variation.map((pd, i) => {
                                                                                                   return <Fragment
                                                                                                       className="text-left"><span
                                                                                                       className="variation">{(Object.keys(pd))[0]}: </span>
                                                                                                       <span
                                                                                                           className="variation">{(Object.values(pd))[0]}</span></Fragment>
                                                                                               })
                                                                                           }
                                                                                           </Fragment>
                                                                                       }
                                                                                    </span>
                                                            </div>
                                                            <div className="order-qnt-div oder-cd">
                                                                <p>Qty: {product.product_qnt}</p>
                                                            </div>

                                                            {product.cat_type !== "digital" &&
                                                                <div className="order-delivery-div oder-cd">
                                                                    {product.delivery_status === "Pending" ?
                                                                        <Fragment>
                                                                            {product.product_status !== "cancel" ?
                                                                                <Fragment>
                                                                                    {product.shipping_days_same ?
                                                                                        <p>Estimated Delivery
                                                                                            By {product.min_shipping_days}</p> :
                                                                                        <p>Estimated Delivery
                                                                                            By {product.min_shipping_days} - {product.max_shipping_days}</p>
                                                                                    }
                                                                                </Fragment> :
                                                                                <Fragment>
                                                                                    <p>Cancelled</p>
                                                                                </Fragment>
                                                                            }
                                                                        </Fragment>
                                                                        :
                                                                        <Fragment>
                                                                            <p>{product.delivery_status}</p>
                                                                        </Fragment>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    })}
                                                </div>
                                            ))}
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <div className="emptyPage">
                                                <div className="py-5">
                                                    <div className="text-center pageContent">
                                                        <h2 className='text-muted iconSize'><i class="fas fa-box-full"/>
                                                        </h2>
                                                        <h6 className='text-muted'>There is no Order yet</h6>
                                                        <Link href="/">
                                                            <div
                                                                className='btn btn-outline-warning text-uppercase'>Continue
                                                                Shopping
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    }
                                    {data.length > 3 &&
                                        <nav className="paginationReview">
                                            <ul className="pagination">
                                                <Pagination
                                                    showPerPage={this.state.showPerPage}
                                                    onPaginationChange={onPaginationChange}
                                                    total={data.length}
                                                    className="mx-3"
                                                />
                                            </ul>
                                        </nav>
                                    }
                                </Fragment>
                            }
                        </Fragment>
                    </div>
                </div>
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(UserOrderPart);