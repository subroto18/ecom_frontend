import React, {PureComponent, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Api from "../../../../../ClientApi/Api";
import SimpleReactValidator from "simple-react-validator";
import {alert, onCurrencyFormat} from "../../../../../services/common";
import {connect} from "react-redux";

class MoneyWithdrawPart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator()
        this.state = {
            payout_data:[],
            remaining_balance:0,
            shop_id:0,
            cash_payment:0,
            bank_payment:0,
            modal:false,
            loadingBtn:false,
            amount:"",
            message:"",
            total_earning:0
        }
        this.onHandle = this.onHandle.bind(this)
        this.onPaymentWithdraw = this.onPaymentWithdraw.bind(this)
        this.onAmount  = this.onAmount.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        Api().get('getEarningBalance').then(res=>{
            this.setState({
                remaining_balance:res.data.remaining_balance,
                shop_id:res.data.shop_id,
                cash_payment:res.data.cashPayment,
                bank_payment:res.data.bankPayment,
                payout_data:res.data.payout_data,
                total_earning:res.data.total_earning
            })
        }).catch(error=>{
        })
    }
    onPaymentWithdraw(){
        if(this.state.cash_payment===0 && this.state.bank_payment===0){
            alert('info','Please enable  payout setting for received your money');
        }else{
            this.setState({
                modal:true
            })
        }
    }
    onHandle(){
        this.setState({
            modal:false,
            loadingBtn:false,
        })
    }
    onAmount(e){
        this.setState({
            amount:e.target.value,
        })
    }
    onMessage(e){
        this.setState({
            message:e.target.value
        })
    }
    onSubmit(){
        if(this.state.remaining_balance>this.state.amount){
            if (this.validator.allValid()) {
                this.setState({
                    loadingBtn:true,
                })
                let amount = this.state.amount;
                let message = this.state.message;
                const data = {
                    amount:amount,
                    message:message,
                    total_amount:this.state.remaining_balance,
                    shop_id:this.state.shop_id
                }
                Api().post('post-seller-payout-request',data).then(res=>{
                   if(res.data===1){
                       this.setState({
                           modal:false,
                           loadingBtn:false,
                       })

                       alert('success','Payout Request has been sent!');

                       this.componentDidMount();
                   }else if(res.data===2){
                       this.setState({
                           modal:false,
                           loadingBtn:false,
                       })

                       alert('info','Payout Request has been still pending. You can make request once it resolved..');

                       this.componentDidMount();
                   }else if(res.data===3){
                       this.setState({
                           modal:false,
                           loadingBtn:false,
                       })

                       alert('warning','Requested amount will not be bigger then your payable amount!');

                       this.componentDidMount();
                   }
                }).catch(error=>{
                })
            } else {
                this.validator.showMessages();
                this.forceUpdate();
            }
        }
    }

  render() {
      let defaultCurrency = this.props.defaultCurrency;
      let currencySymbolFormat = this.props.currencySymbolFormat
      const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>

        return (
          <Fragment>
              <Row className="mt-3">
                            <Col lg={4} md={12} sm={12} xs={12}>
                                <div className="wallet-div">
                                    <div className="wallet-content-div balance">
                                        <h6 className="wallet-recharge walletBalance"><i className="fal fa-wallet walletIcon"/> Total Earning</h6>
                                        <p className="wallet-balance">
                                            {this.state.loading?
                                                <span>
                                                    {
                                                        currencySymbolFormat===1 ?
                                                            <span>{onCurrencyFormat(0)}{defaultCurrency}</span>:
                                                            <span>{defaultCurrency}{onCurrencyFormat(0)}</span>
                                                    }
                                               </span>
                                                   :
                                                <span>
                                                     {
                                                         currencySymbolFormat===1 ?
                                                             <span>{onCurrencyFormat(this.state.total_earning)}{defaultCurrency}</span>:
                                                             <span>{defaultCurrency}{onCurrencyFormat(this.state.total_earning)}</span>
                                                     }
                                                  </span>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6} sm={6} xs={12}>
                                <div className="wallet-div">
                                    <div className="wallet-content-div balance">
                                        <h6 className="wallet-recharge walletBalance">  <i className="fal fa-wallet walletIcon"/> Pending balance</h6>
                                        <p className="wallet-balance">
                                            {this.state.loading?
                                                <span>
                                                    {
                                                        currencySymbolFormat===1 ?
                                                            <span>{onCurrencyFormat(0)}{defaultCurrency}</span>:
                                                            <span>{defaultCurrency}{onCurrencyFormat(0)}</span>
                                                    }
                                               </span>
                                                :
                                                <span>
                                                     {
                                                         currencySymbolFormat===1 ?
                                                             <span>{onCurrencyFormat(this.state.remaining_balance)}{defaultCurrency}</span>:
                                                             <span>{defaultCurrency}{onCurrencyFormat(this.state.remaining_balance)}</span>
                                                     }
                                                  </span>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6} sm={6} xs={12}>
                                <div onClick={this.onPaymentWithdraw} className="wallet-div recharge">
                                    <div className="wallet-content-div">
                                        <i className="fad fa-plus-octagon addWalletIcon"/>
                                        <p className="wallet-recharge">Send withdraw request</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="my-wallet-div walletHistory">
                            <Row>
                                <Col lg={12}>
                                    <h6>Payout History</h6>
                                    {this.state.loading ?
                                        <div className="loader-spinner-div">
                                            {loader}
                                        </div>
                                        :
                                       <div className='sellerTableSize resSellerTable table-responsive-sm table-responsive-md table-responsive-lg'>
                                            <Table striped bordered hover className="text-center">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Payment date</th>
                                                <th>Request Amount</th>
                                                <th>Approved Amount</th>
                                                <th>Payment Approval</th>
                                            </tr>
                                            </thead>
                                            <Fragment>
                                                <Fragment>
                                                    {this.state.payout_data.length>0 ?
                                                        <tbody>
                                                            {this.state.payout_data.map((pd,i)=>{
                                                                            return  <tr>
                                                                                <td>{i+1}</td>
                                                                                <td>{pd.date}</td>
                                                                                <td>{pd.requested_amount}</td>
                                                                                <td>{pd.approved_amount}</td>
                                                                                {pd.status==="Pending" ?
                                                                                    <td><span className="badge pending">{pd.status}</span></td>:
                                                                                    <td><span className="badge approve">{pd.status}</span></td>
                                                                                }
                                                                            </tr>
                                                            })}
                                                        </tbody>
                                                        :
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan="5">There isn't any wallet recharge yep</td>
                                                        </tr>
                                                        </tbody>
                                                     }
                                                </Fragment>
                                            </Fragment>
                                        </Table>
                                       </div>
                                    }
                                </Col>
                            </Row>
                        </div>
                        <Modal centered size="xl | lg | sm" className='responsiveModal' show={this.state.modal}  >
                            <Modal.Header>
                                <h6>Send Withdraw request</h6>
                                <button onClick={this.onHandle} type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="p-3">
                                    <div className="offline-wallet-recharge">
                                        <div className="form-group inputBoxTitle">
                                            <label>Amount * </label>
                                            <input  max={this.state.remaining_balance} onChange={(e)=>this.onAmount(e)}  type="text" className="form-control inputTextSize"  placeholder="Enter your recharged Amount"/>
                                            <div className="mb-2 text-danger"> {this.validator.message('amount', this.state.amount, `required|currency|max:120`)}</div>
                                            {(this.state.amount>this.state.remaining_balance) &&
                                              <div className="text-danger">Amount should not be more then

                                                  {
                                                      currencySymbolFormat===1 ?
                                                          <span>{onCurrencyFormat(this.state.remaining_balance)}{defaultCurrency}</span>:
                                                          <span>{defaultCurrency}{onCurrencyFormat(this.state.remaining_balance)}</span>
                                                  }

                                              </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label className='inputBoxTitle'>Message </label>
                                            <textarea className="form-control inputTextSize inputBoxSize" onChange={(e)=>this.onMessage(e)} rows="3"/>
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        {this.state.loadingBtn ?
                                            <Button className="float-right my-2"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                                Loading...
                                            </Button>:
                                            <Button onClick={this.onSubmit} className="float-right my-2">Submit</Button>
                                        }
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
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
export default connect(mapStateToProps)(MoneyWithdrawPart);