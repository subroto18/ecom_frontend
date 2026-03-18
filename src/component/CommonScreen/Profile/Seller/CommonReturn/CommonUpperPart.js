import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import Photo from "../../../Image/Photo";
import {onCurrencyFormat} from "../../../../../services/common";
class CommonUpperPart extends PureComponent {
    render() {
        const {t} = this.props;
        let pd = this.props.data;
        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat
        return (
            <Fragment>
                <div className="order-card">
                    <p><i className="fas fa-box-open"/> Package</p>
                    <p>Sold by <span className="shop-name">{pd.shop_name}</span></p>
                    <hr/>
                    <div className="sellerTableSize resSellerTable order-card table-responsive-lg table-responsive-md table-responsive-sm">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{"photo"}</th>
                                <th scope="col">{"title"}</th>
                                <th scope="col">{t("unit_price")}</th>
                                <th scope="col">{t("qty")}</th>
                                <th scope="col">{t("total")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pd.product_info.map((pi,index)=>{
                                return  <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>
                                        {pi.product_thumbnail!="" ?
                                            <Photo
                                                src={this.props.backendApi+pi.product_thumbnail}
                                                blurDataURL="/blank.jpg"
                                                class="thumbnailImage modalOrderImg"
                                            />
                                            :
                                            <Photo
                                                src="/blank.jpg"
                                                blurDataURL="/blank.jpg"
                                                class="thumbnailImage modalOrderImg"
                                            />

                                        }
                                    </td>
                                    <td>
                                        <p>{pi.product_name}</p>
                                        <p className="text-muted">
                                            {pi.product_variation != null &&
                                                <Fragment>{
                                                    pi.product_variation.map((variation, i) => {
                                                        return <Fragment
                                                            className="text-left mb-1"><span
                                                            className="variation">{(Object.keys(variation))}: </span>
                                                            <span
                                                                className="variation">{(Object.values(variation))}</span></Fragment>
                                                    })
                                                }
                                                </Fragment>
                                            }
                                        </p>
                                    </td>
                                    {pi.product_price!==pi.discount_price ?
                                        <td>
                                            {currencySymbolFormat===1?
                                                <span className="mr-2">{onCurrencyFormat(pi.discount_price)}{defaultCurrency}<del>{onCurrencyFormat(pi.product_price)}{defaultCurrency}</del></span>
                                                :
                                                <span className="mr-2">{defaultCurrency}{onCurrencyFormat(pi.discount_price)} <del>{defaultCurrency}{onCurrencyFormat(pi.product_price)}</del></span>
                                            }
                                        </td>:
                                        <td>
                                            {currencySymbolFormat===1?
                                                <span>{onCurrencyFormat(pi.total_price)}{defaultCurrency}</span>
                                                :
                                                <span>{defaultCurrency}{onCurrencyFormat(pi.total_price)}</span>
                                            }
                                        </td>
                                    }
                                    <td>{pi.product_qnt}</td>
                                    <td>{
                                        pi.product_price!==pi.discount_price ?
                                            <Fragment>
                                                {currencySymbolFormat===1 ?
                                                    <span>{onCurrencyFormat(pi.discount_price * pi.product_qnt)}{defaultCurrency}</span> :
                                                    <span>{defaultCurrency}{onCurrencyFormat(pi.discount_price * pi.product_qnt)}</span>
                                                }
                                            </Fragment>
                                            :
                                            <Fragment>
                                                {currencySymbolFormat===1 ?
                                                    <span>{onCurrencyFormat(pi.product_price * pi.product_qnt)}{defaultCurrency}</span>
                                                    :
                                                    <span>{defaultCurrency}{onCurrencyFormat(pi.product_price * pi.product_qnt)}</span>
                                                }
                                            </Fragment>
                                    }</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const backendApi = state.starterReducer.backendApi
    return {
        defaultCurrency,
        currencySymbolFormat,
        backendApi
    };
}

export default connect(mapStateToProps)(CommonUpperPart);
