import React, {PureComponent, Fragment} from 'react';
import 'react-tabs/style/react-tabs.css';
import Api from "../../../../../ClientApi/Api";
import Button from "react-bootstrap/Button";
import fileDownload from 'js-file-download'
import {connect} from "react-redux";
import Photo from "../../../Image/Photo";
import Link from "next/link";


class DownloadableProductsPart extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading:true,
            data:[],
            downloadData:'',
            fileName:''
        }
    }
    componentDidMount() {
        Api().get('getDownloadProducts').then(res=>{
           this.setState({
               data:res.data,
               loading:false
           })
        }).catch(error=>{
        })
    }


    handleDownload = (url) => {
        Api().get(url, {
            responseType: 'blob',
        }).then((res) => {
                fileDownload(res.data, this.state.fileName)
            })
    }


    onDownload(e){
        
        const data = {
            id:e
        }
        let product_name = this.state.data.map(pd=>{
            if(pd.product_index==e){
                return pd.product_name;
            }
        })

        this.setState({
            fileName:product_name
        })

        const FileDownload = require("js-file-download");


        Api().post('downloadProduct',data,{
            responseType: 'arraybuffer'
        }).then((response) => response.data)
            .then((blob) => {
                FileDownload(blob, product_name);
                this.setState({
                    downloadData:blob
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
         {this.state.loading ?
            <Fragment>{loader}</Fragment>:
            <Fragment>
                <div className="orderDiv downloadProductPart ">
                    {this.state.data.length>0 ?
                      <Fragment>
                          {this.state.data.map(pd=>{
                              return  <div className="d-flex justify-content-between py-4">
                                  <div className="oder-cd-div downloadProductDiv">
                                      <div className="d-flex">
                                          <div>

                                              <Photo
                                                  src={`${this.props.backendApi}${pd.thumbnail}`}
                                                  blurDataURL="/blank.jpg"
                                                  class="order-img downloadPic"
                                              />

                                          </div>
                                      </div>
                                  </div>
                                  <div className="order-title-div oder-cd downloadTitleDiv">
                                      <p>{pd.name}</p>
                                  </div>
                                  <div  className="order-qnt-div oder-cd downloadQntDiv">
                                          <Button onClick={()=>this.onDownload(pd.product_index)}>Download Now</Button>
                                  </div>
                              </div>
                          })}
                      </Fragment> :
                        <Fragment>
                            <div className="emptyPage">
                              <div className="py-5">
                                  <div className="text-center pageContent">
                                      <h2 className='text-muted iconSize'><i className="fas fa-download"/></h2>
                                      <h6 className='text-muted'>There is no downloadable product  yet</h6>
                                      <Link href="/"><div className='btn btn-outline-warning text-uppercase'>Continue Shopping</div></Link>
                                  </div>
                              </div>
                          </div>
                        </Fragment>
                    }
                </div>
            </Fragment>
        }
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

export default connect(mapStateToProps)(DownloadableProductsPart);
