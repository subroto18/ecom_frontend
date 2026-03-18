import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {MDBDataTable} from "mdbreact";
import Api from "../../../../../ClientApi/Api";
import {connect} from "react-redux";
import {onCurrencyFormat} from "../../../../../services/common";
class CommissionsPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading:true
        }
    }
    async componentDidMount() {
      await  Api().get('getCommissionHistory').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch(error=>{
        })
    }


  render() {
    let data = this.state.data;

      let defaultCurrency = this.props.defaultCurrency;
      let currencySymbolFormat = this.props.currencySymbolFormat
        let commission = [];
        if(data.length>0){
            data.map((pd,index)=>{
                console.log(pd,pd.order_id,pd.admin_commission);
                commission.push({
                    serial: `${index+1}`,
                    order_id: pd.order_id,
                    admin_commission:<div>
                        {
                            currencySymbolFormat===1 ?
                                <span>{onCurrencyFormat(pd.admin_commission)}{defaultCurrency}</span>:
                                <span>{defaultCurrency}{onCurrencyFormat(pd.admin_commission)}</span>
                        }
                    </div>,
                    seller_commission:<div>
                        {
                            currencySymbolFormat===1 ?
                                <span>{onCurrencyFormat(pd.seller_commission)}{defaultCurrency}</span>:
                                <span>{defaultCurrency}{onCurrencyFormat(pd.seller_commission)}</span>
                        }
                    </div>
                });
            })
        }
        let  commission_details = {
            columns: [
                {
                    label: '#',
                    field: 'serial',
                    width: 100,
                },
                {
                    label: 'Order Id',
                    field: 'order_id',
                    width: 100,
                },
                {
                    label: 'Admin commission',
                    field: 'admin_commission',
                    width: 100,
                },
                {
                    label: 'Seller commission',
                    field: 'seller_commission',
                    width: 100,
                },
            ],
            rows: commission,
        }

        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
    return (
      <Fragment>
          <div className="card-body">
         <Row className="mb-3 px-3">
             <Col lg={4}>
             </Col>
             <Col lg={4}>
            </Col>
             <Col lg={4}>
            </Col>
            <Col lg={12}>
        <Fragment>
            {this.state.loading ?
                <Fragment>
                    <div className="loader-spinner-div">
                        {loader}
                    </div>
                </Fragment> :
                <Fragment>
                    {this.state.data.length>0 ?
                        <Fragment>
                            <div className='sellerTableSize resSellerTable table-responsive-sm table-responsive-md table-responsive-lg'>
                            <MDBDataTable
                                striped
                                bordered
                                hover
                                data={commission_details}
                            />
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="alert alert-info">
                                There is no commission yet
                            </div>
                        </Fragment>
                    }
                </Fragment>
            }
        </Fragment>
    </Col>
</Row>
</div>
      </Fragment>
    )
  }
}



function mapStateToProps(state) {

    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    return {
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps)(CommissionsPart);

