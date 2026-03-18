import React, {PureComponent,Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import Container from "react-bootstrap/Container";
import MobileTopBack from "../MobileCommon/MobileTopBack";
import MobileProduct from "../MobileProductCard/MobileProduct";
import NavMobileBottom from "../MobileCommon/NavMobileBottom";
class MobileAllTopRatedProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            loading:true,
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        Api().get('getAllTopRatedProduct').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        })
    }
    render() {
        const mobileLoader =  <div  className="mobile-pre-loader">
            <div className="loader-spinner">
                <div className="spinner-border text-muted"/>
            </div>
        </div>
        return (
            <Fragment>
                <MobileTopBack title="Top rated Product"/>
                <section className="pb-5">
                    <Container>
                        <Fragment>{this.state.loading ?
                            <Fragment>{mobileLoader}</Fragment>
                            :
                            <Fragment>
                                <MobileProduct loading={this.state.loading}  data={this.state.data} />
                            </Fragment>
                        }</Fragment>
                    </Container>
                </section>
                <NavMobileBottom/>
            </Fragment>
        );
    }
}
export default MobileAllTopRatedProduct;