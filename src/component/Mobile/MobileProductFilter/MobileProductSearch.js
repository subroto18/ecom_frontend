import React, {Component, Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {connect} from "react-redux";
import {closeFilterDrawer, openFilterDrawer} from "../../../services/actions/filterAction";
import ApplyFilterButton from "../../Desktop/ProductFilter/ApplyFilterButton";
import ProductFilterBySorting from "../../Desktop/ProductFilter/ProductFilterBySorting";
import ProductVariation from "../../Desktop/ProductFilter/ProductVariation";
import ProductFilterByPrice from "../../Desktop/ProductFilter/ProductFilterByPrice";
import MobileShowAllFilterProduct from "./MobileShowAllFilterProduct";
import NavSearchTop from "../MobileCommon/NavSearchTop";

class MobileProductSearch extends Component {
    constructor() {
        super();
        this.state = {
            MinPrice: "",
            MaxPrice: "",
            variationArray: [],
            Sort: "",
            Seller: "",
            Brands: "",
            menu: "",
            clear: false,
            width: 768,
            drawer: 'active'
        }
        this.onVariation = this.onVariation.bind(this)
        this.onPrice = this.onPrice.bind(this)
        this.onSort = this.onSort.bind(this)
        this.onMenu = this.onMenu.bind(this)
        this.onClear = this.onClear.bind(this)
        this.openFilterDrawer = this.openFilterDrawer.bind(this)
        this.closeFilterDrawer = this.closeFilterDrawer.bind(this)

    }

    sortData = (value) => {

        if (value.priceRange != undefined) {

            this.setState({
                priceRange: [{
                    minLimit: value.priceRange[0],
                    maxLimit: value.priceRange[1],
                }]
            })

        }

        this.setState({
            data: [{
                price: value.priceValue,
                brand: value.brandValue,
                seller: value.sellerValue,

            }]
        })
    }


    componentDidMount() {
        window.scroll(0, 0)
    }

    onVariation(data) {
        this.setState({
            variationArray: data.data['variationArray']
        })
        this.setState({
            clear: false
        })
    }

    onPrice(data) {
        this.setState({
            MinPrice: data.data['minPrice'],
            MaxPrice: data.data['maxPrice'],
        })
        this.setState({
            clear: false
        })
    }

    onSort(data) {

        if (data.sort !== undefined) {
            if (data.sort['sort'] === "null") {
                this.setState({
                    Sort: ""
                })
            } else {
                this.setState({
                    Sort: data.sort['sort']
                })

            }

        }
        if (data.brands !== undefined) {
            if (data.brands['brands'] === "null") {
                this.setState({
                    Brands: ""
                })
            } else {
                this.setState({
                    Brands: data.brands['brands']
                })

            }
        }
        if (data.sellers !== undefined) {
            if (data.sellers['sellers'] === "null") {
                this.setState({
                    Seller: ""
                })
            } else {
                this.setState({
                    Seller: data.sellers['sellers']
                })

            }
        }


        this.setState({
            clear: false
        })
    }

    onMenu(slug) {

        this.setState({
            MinPrice: "",
            MaxPrice: "",
            variationArray: [],
            Sort: "",
            Seller: "",
            Brands: "",
            menu: slug.slug,
            clear: true
        })
    }


    openFilterDrawer() {
        this.props.openFilterDrawer();
    }

    closeFilterDrawer() {
        this.props.closeFilterDrawer();
    }

    onClear(e) {

        if (e.closeDrawer) {
            this.openFilterMenu();
        } else {
            this.setState({
                MinPrice: "",
                MaxPrice: "",
                variationArray: [],
                Sort: "",
                Seller: "",
                Brands: "",
                clear: true

            })
            this.openFilterMenu();
        }


    }


    render() {

        return (
            <Fragment>
                <NavSearchTop/>
                <div className={`outerFilterContainer ` + this.props.filterDrawer} onClick={this.closeFilterDrawer}>
                </div>

                <div className={`filterDrawer ` + this.props.filterDrawer}>
                    <Container>
                        <div className="d-flex justify-content-center mobileFilterButtons">
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
                        </div>

                        <ProductFilterBySorting/>
                        <ProductFilterByPrice triggerParentUpdate={this.sortData}/>
                        <ProductVariation clear={this.state.clear} triggerParentUpdate={this.onVariation}/>
                    </Container>
                    <div className="filterLastDiv"/>

                </div>

                <Container className="mobileProductFilterContainer">
                    <Row>

                        <Col lg={10} md={10} sm={12} xs={12} className="text-right mobileFilterIconDiv">
                            <span className="filter-icon" onClick={this.openFilterDrawer}>
                                <i className="far fa fa-truck"></i>
                            </span>
                            <span className="filter-icon" onClick={this.openFilterDrawer}><i
                                className="far fa-filter mobileFilterIcon"></i></span>
                        </Col>
                    </Row>


                    <MobileShowAllFilterProduct/>
                </Container>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    closeFilterDrawer,
    openFilterDrawer
};

function mapStateToProps(state) {
    const filterDrawer = state.filterReducer.filterDrawer;
    const searchFilterLoading = state.filterReducer.searchFilterLoading;
    return {
        filterDrawer,
        searchFilterLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileProductSearch);



