import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import Api from "../../../../../ClientApi/Api";
class UserCouponPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading:true,
            data:[]
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        Api().get('getOrder').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        })
    }

  render() {
    const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
    return (
      <Fragment>
          <div className="coupon-div table-responsive-sm table-responsive-md">
                        <table className="table">
                            <thead>
                            <tr className="thead-light tableTextSize">
                                <th scope="col">Active</th>
                                <th scope="col">Uses</th>
                                <th scope="col">Voucher Code</th>
                                <th scope="col">Valid From</th>
                                <th scope="col">Valid Until</th>
                                <th scope="col">Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="my-5">
                                <td className="no-coupon-text tableTextSize" colSpan="5">There are no vouchers yet</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
      </Fragment>
    )
  }
}
export default UserCouponPart;