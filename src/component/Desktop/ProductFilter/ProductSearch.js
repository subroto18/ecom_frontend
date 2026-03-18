import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DesktopHeaderPart from "../Common/DesktopHeaderPart";
import ProductFilterMenu from "./ProductFilterMenu";
import ApplyFilterButton from "./ApplyFilterButton";
import ProductFilterByPrice from "./ProductFilterByPrice";
import ProductVariation from "./ProductVariation";
import Breadcrumb from "../Common/Breadcrumb";
import ProductFilterBySorting from "./ProductFilterBySorting";
import ShowAllFilterProduct from "./ShowAllFilterProduct";
import DesktopFooterPart from "../Common/DesktopFooterPart";
import {connect} from "react-redux";
class ProductSearch extends PureComponent {
    constructor() {
        super();
        this.state = {
            MinPrice:"",
            MaxPrice:"",
            variationArray:[],
            Sort:"",
            Seller:"",
            Brands:"",
            menu:"",
            clear:false,
            width:768
        }
        this.onVariation = this.onVariation.bind(this)
        this.onPrice  = this.onPrice.bind(this)
        this.onSort = this.onSort.bind(this)
        this.onMenu = this.onMenu.bind(this)
        this.onClear = this.onClear.bind(this)
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.scroll(0,0)
        let width = window.innerWidth;
        this.setState({
            width:width
        })
    }
    onVariation(data){
        this.setState({
            variationArray:data.data['variationArray']
        })
        this.setState({
            clear:false
        })
    }
    onPrice(data){
        this.setState({
            MinPrice:data.data['minPrice'],
            MaxPrice:data.data['maxPrice'],
        })
        this.setState({
            clear:false
        })
    }
    onSort(data){
        if(data.sort!==undefined){
            if(data.sort['sort']==="null"){
                this.setState({
                    Sort:""
                })
            }else{
                this.setState({
                    Sort:data.sort['sort']
                })
            }
        }
        if(data.brands!==undefined){
            if(data.brands['brands']==="null"){
                this.setState({
                    Brands:""
                })
            }else{
                this.setState({
                    Brands:data.brands['brands']
                })
            }
        }
        if(data.sellers!==undefined){
            if(data.sellers['sellers']==="null"){
                this.setState({
                    Seller:""
                })
            }else{
                this.setState({
                    Seller:data.sellers['sellers']
                })
            }
        }
        this.setState({
            clear:false
        })
    }
    onMenu(slug){
           this.setState({
               MinPrice:"",
               MaxPrice:"",
               variationArray:[],
               Sort:"",
               Seller:"",
               Brands:"",
               menu:slug.slug,
               clear:true
           })
    }
    onClear(){
        this.setState({
            MinPrice:"",
            MaxPrice:"",
            variationArray:[],
            Sort:"",
            Seller:"",
            Brands:"",
            clear:true
        })
    }
    handleScroll = e => {
        let width = window.innerWidth;
        this.setState({
            width:width
        })
    }

    render() {
            return (
                <Fragment>
                    <DesktopHeaderPart/>
                    <section >
                        <Container className="pt-4">
                            <Row>

                                <Col xl={3} lg={3} md={4}>
                                    <ProductFilterMenu triggerParentUpdate={this.onMenu}/>
                                    <ApplyFilterButton
                                        search={this.props.searchFilterLoading}
                                        variation={this.state.variationArray}
                                        minPrice={this.state.MinPrice}
                                        maxPrice={this.state.MaxPrice}
                                        brands={this.state.Brands}
                                        sort={this.state.Sort}
                                        seller={this.state.Seller}
                                        slug={this.state.menu}
                                        triggerParentUpdate={this.onClear}
                                    />
                                    <ProductFilterByPrice triggerParentUpdate={this.onPrice} />
                                    <ProductVariation clear={this.state.clear} triggerParentUpdate={this.onVariation} />
                                </Col>
                                <Col xl={9} lg={9} md={8}>
                                    <Breadcrumb pageName={this.props.pageName}  />
                                    <ProductFilterBySorting  triggerParentUpdate={this.onSort} />
                                    <ShowAllFilterProduct  />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <DesktopFooterPart/>
                </Fragment>
            );
    }
}


function mapStateToProps(state) {
    const searchFilterLoading = state.filterReducer.searchFilterLoading
    return {
        searchFilterLoading
    };
}

export default connect(mapStateToProps)(ProductSearch);




