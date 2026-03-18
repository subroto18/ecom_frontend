import React, { PureComponent, Fragment } from "react";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Api from "../../../../../ClientApi/Api";
import Link from "next/link";
class UserAddressPart extends PureComponent {
    constructor() {
        super();
        this.state = {
          data:[],
          loading:true
        }
      }
      componentDidMount() {
          Api().get('getShippingAddress').then(res=>{
             this.setState({
               data:res.data,
               loading:false
             })
          }).catch(error=>{
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
        {this.state.loading ?
            <div className="">
              {loader}
            </div>:
            <Fragment>
              <Fragment>
                    <Fragment>
                      {this.state.data.length>0 ?
                          <Fragment>
                            <div className="d-flex justify-content-between addressHeading">
                              <span className="profile title profile-title mb-4">My Address</span>
                              <div className="addressText">
                                <Link href="/default-shipping-address" className="defaultAddressText">Make default shipping address</Link>
                                <span className="mx-2 mx-md-1">|</span>
                                <Link  href="/default-billing-address"  className="defaultAddressText">Make default billing address</Link>
                              </div>
                            </div>
                            <div className="addressTableContainer">
                            <div className="user-address-div table-responsive-sm table-responsive-md">
                              <Table className="userAddressTable" hover>
                                <thead>
                                <tr className="tableTextSize">
                                  <th>Full Name</th>
                                  <th>Address</th>
                                  <th>Region</th>
                                  <th>Phone</th>
                                  <th>#</th>
                                  <th>Option</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((pd,i)=>{
                                  return <tr className="tableTextSize">
                                    <td>{pd.name}</td>
                                    <td><Badge variant="danger">{pd.shippingPlace}</Badge> {pd.address}</td>
                                    <td>{pd.region}-{pd.city}-{pd.area}</td>
                                    <td>{pd.phone}</td>
                                    <td>
                                      {pd.defaultShipping===1 && <span>Default Shipping Address</span> }
                                      {(pd.defaultShipping===1 && pd.defaultBilling===1 ) && <br/>}
                                      {pd.defaultBilling===1 && <span>Default billing Address</span>}
                                    </td>
                                    <td><Link href={"/edit-address/id/"+i} className="userAddressEdi btn" >Edit</Link></td>
                                  </tr>
                                })}
                                </tbody>
                              </Table>
                            </div>
                            <Link className="btn mt-2 float-right" href="/add-address">Add New Address</Link>
                            </div>
                          </Fragment>
                            :
                            <Fragment>
                              <div className="d-flex justify-content-between">
                                <span className="profile title mb-4">My Address</span>
                              </div>
                              <div className="addressTableContainer">
                              <div className="address-background">
                                <div className="user-address-div">
                                  <Table className="userAddressTable" hover>
                                    <thead>
                                    <tr>
                                      <th>Full Name</th>
                                      <th>Address</th>
                                      <th>Region</th>
                                      <th>Phone</th>
                                      <th>#</th>
                                      <th>Option</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="text-center py-5" colSpan="6">There is no shipping and billing address set yet</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                  <Link className="btn mt-2 float-right" href="/add-address">Add New Address</Link>
                                </div>
                              </div>
                              </div>
                            </Fragment>
                      }
                    </Fragment>
              </Fragment>
            </Fragment>
        }
      </Fragment>
    )
  }
}
export default UserAddressPart;
