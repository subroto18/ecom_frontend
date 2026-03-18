import React, { PureComponent, Fragment } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Reviews from "../Reviews/Reviews";
import {deleteCompareProduct} from "../../../services/actions/compareAction";
import {connect} from "react-redux";
import {addWishlistProduct} from "../../../services/actions/wishlishAction";
import {popupLoginOpen} from "../../../services/actions/commonAction";
import {cartVariationShow} from "../../../services/actions/productAction";
import Link from "next/link";
import Photo from "../Image/Photo";
import {onCurrencyFormat} from "../../../services/common";
class ComparePart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data:[],
            loading: true
        }
        this.onProductDel = this.onProductDel.bind(this)
        this.onWishList = this.onWishList.bind(this)
        this.onCart = this.onCart.bind(this)
    }
    componentDidMount() {
        window.scroll(0,0)
    }
    onProductDel(index){
        if(window.confirm('Are you sure you want to delete this item?')){
            console.log(index,'index');
           this.props.deleteCompareProduct(index);
        }

    }
    onWishList(index){
        if(this.props.isAuthorized){
            this.props.addWishlistProduct(index);
        }else{
            this.props.popupLoginOpen();
        }
    }
    onCart(index){
        if(this.props.isAuthorized){
            this.props.cartVariationShow(index);
        }else{
            this.props.popupLoginOpen();
        }
    }


    render() {
        let defaultCurrency = this.props.defaultCurrency;
        let symbolFormat = this.props.currencySymbolFormat;
        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                {this.state.data.loading>0  ?
                    <Fragment>
                        <div>
                            {loader}
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        {this.props.compareProduct.length>0 ?
                            <Row>
                                <Col md={12} lg={12}>
                                    <Fragment>
                                        {this.props.compareProduct.length>0 ?
                                            <Fragment>
                                                <div className="compareDiv py-3">
                                                    <Fragment>
                                                        {this.props.compareProduct.map((pd,i)=>{
                                                            return   <div className="compareCard " >
                                                                <table className="table compare-table table-bordered table-striped  table-hover clearfix shadow-sm" key={i} >
                                                                    <tr  className="compare-tr">
                                                                        <td>Product</td>
                                                                        <td className="hd-compare-td">
                                                                            <div  className="cPCard">
                                                                                <div>
                                                                                    <i onClick={()=>this.onProductDel(pd.index)} className="fas fa-times float-right"></i>
                                                                                </div>
                                                                                <Link href={`/product/`+pd.slug}>
                                                                                  <div className="cProductImage">
                                                                                      <Photo
                                                                                          src={`${this.props.backendApi}${pd.product_image}`}
                                                                                          blurDataURL="/blank.jpg"
                                                                                          class=" img-fluid"
                                                                                          className="empty"
                                                                                      />
                                                                                  </div>
                                                                                </Link>
                                                                                <p className="productTitle">{  pd.product_name.length > 20 ? pd.product_name.substring(0, 20) + "..." :  pd.product_name}</p>
                                                                            </div>
                                                                            <div>
                                                                                {pd.discount_price!==undefined  ?
                                                                                    <Fragment>
                                                                                        {symbolFormat===1 ?
                                                                                            <p className="regularPrice ml-3 mr-3"><span>{onCurrencyFormat(pd.discount_price)}{defaultCurrency}</span><del>{onCurrencyFormat(pd.product_price)}{defaultCurrency}</del></p>
                                                                                            :
                                                                                            <p className="regularPrice ml-3 mr-3"><span>{defaultCurrency}{onCurrencyFormat(pd.discount_price)}</span><del>{defaultCurrency}{onCurrencyFormat(pd.product_price)}</del></p>
                                                                                        }
                                                                                    </Fragment> :
                                                                                    <Fragment>
                                                                                        {symbolFormat===1 ?
                                                                                            <span className="regularPrice singlePrice ml-3 mr-3">{onCurrencyFormat(pd.product_price)}{defaultCurrency}</span>
                                                                                            :
                                                                                            <span className="regularPrice singlePrice ml-3 mr-3">{defaultCurrency}{onCurrencyFormat(pd.product_price)}</span>
                                                                                        }
                                                                                    </Fragment>
                                                                                }
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <Button onClick={()=>this.onCart(pd.index)}  className="mr-2">Add to Cart</Button>
                                                                                <Button  onClick={()=>this.onWishList(pd.index)}  className="card-icons leftCornerCardIcon">
                                                                                    Wishlist
                                                                                </Button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td >Brand</td>
                                                                        <td>
                                                                            {pd.brandName!=null?pd.brandName:'Null'}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {pd.parentCategory===null? 'Category' :
                                                                                pd.parentCategory===1? 'Sub Category' :
                                                                                    'Sub Sub Category'}
                                                                        </td>
                                                                        <td>
                                                                            <p>{pd.categoryName}</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            Reviews
                                                                        </td>
                                                                        <td >
                                                                            <Reviews value={pd.review}/>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        })}
                                                    </Fragment>
                                                </div>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <div className="EmptyDiv py-5">
                                                    <p>Your compare cart is empty</p>
                                                </div>
                                            </Fragment>
                                        }
                                    </Fragment>
                                </Col>
                            </Row>
                            :
                            <Fragment>
                                <div className="emptyPage">
                                    <div className="py-5">
                                        <div className="text-center pageContent">
                                            <h2 className='text-muted iconSize'><i className="far fa-sync-alt"/></h2>
                                            <h6 className='text-muted'>There is no compare product  yet</h6>
                                            <Link href="/"><div className='btn btn-outline-warning text-uppercase'>Continue Shopping</div></Link>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </Fragment>
                }
            </Fragment>
        )
    }
}



const mapDispatchToProps = {
    deleteCompareProduct,
    addWishlistProduct,
    popupLoginOpen,
    cartVariationShow
};

function mapStateToProps(state) {
    const isAuthorized = state.userReducer.isAuthorized;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    const compareProduct = state.compareReducer.compareProduct;
    const backendApi = state.starterReducer.backendApi
    const compareProductLoadingStatus = state.compareReducer.compareProductLoadingStatus
    return {
        isAuthorized,
        defaultCurrency,
        currencySymbolFormat,
        compareProduct,
        backendApi,
        compareProductLoadingStatus
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparePart);


