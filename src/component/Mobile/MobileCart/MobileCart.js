import React, {PureComponent, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MobileTopBack from "../MobileCommon/MobileTopBack";
import CartPart from "../../CommonScreen/Cart/CartPart";
import OrderSummary from "../../CommonScreen/CheckoutDetails/OrderSummary";
import Link from "next/link";
import {connect} from "react-redux";
class MobileCart extends PureComponent {
    constructor() {
        super();
        this.state = {
            isCheck:false,
            isCheckId:[],
            isGoing: true,
            isCheckAll:false,
            checkClass:'CheckBoxIcon',
            checkClassOut:'CheckBoxOutlineBlankIcon'
        }
        this.onCheckSingleProduct = this.onCheckSingleProduct.bind(this);
        this.onCheckBtn = this.onCheckBtn.bind(this);
    }
    componentDidMount() {
        window.scroll(0,0);
        this.setState({
            isCheckAll:false
        })
    }
    onCheckBtn(e){
        if(this.state.isCheckAll===false){
            this.setState({
                isCheckAll:true
            })
        }
        else{
            this.setState({
                isCheckAll:false
            })
        }
    }
    onCheckSingleProduct(e){
        let value = this.state.isCheckId;
        if(e.target.checked==true) {
            value.push(e.target.value);
            this.setState({isCheckId:value})
        }
        else{
            {
                var index = value.indexOf(e.target.value)
                if (index !== -1) {
                    value.splice(index, 1);
                    this.setState({isCheckId: value});
                }
            }
        }
        if(this.state.isCheck===false){
            this.setState({
                isCheck:true
            })
        }
        else{
            this.setState({
                isCheck:false
            })
        }
    }

    render() {
        const loader =  <div  className="pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <MobileTopBack  title="Cart" />
                <section id="cart">
                    <Container>
                        <Row className="cartRow">
                                {this.props.cartProductLoadingStatus ?
                                    <Fragment>
                                        <Col lg={12}>
                                            <div className="cart-empty-div">
                                                {loader}
                                            </div>
                                        </Col>
                                    </Fragment> :
                                    <Fragment>
                                        {this.props.cartProductDetails.length>0 ?
                                            <Fragment>
                                                <div className="cartTopBarMobile ">
                                                    <CartPart/>
                                                </div>
                                            </Fragment>:
                                            <Fragment>
                                                <Col lg={12}>
                                                    <div className="cart-empty-div">
                                                        <div className="emptyPage">
                                                            <div className="py-5">
                                                                <div className="text-center pageContent">
                                                                    <h2 className='text-muted iconSize'><i class="far fa-cart-plus"></i></h2>
                                                                    <h6 className='text-muted'>There is no  product  yet</h6>
                                                                    <Link href="/"><div className='btn btn-outline-warning text-uppercase'>Continue Shopping</div></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </Row>
                    </Container>
                </section>
                <OrderSummary mobileCart={true} />
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    const cartProductLoadingStatus = state.cartReducer.cartProductLoadingStatus;
    const cartProductDetails = state.cartReducer.cartProductDetails;

    return {
        cartProductLoadingStatus,
        cartProductDetails
    };
}

export default connect(mapStateToProps)(MobileCart);