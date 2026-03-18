import React, { Fragment, Component} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {searchProductSort} from "../../../services/actions/filterAction";
import {connect} from "react-redux";
class ProductFilterBySorting extends Component {
    constructor() {
        super();
        this.state = {
            sorting : ['Oldest', 'Newest','Low to high(price)','High to low(price)'],
            BrandOptions:[],
            SellersOptions:[],
            priceValue:'',
            brandValue:'',
            sellerValue:'',
            priceRange:''
        }
    }
    sortByPrice =  (e) => {
        if(e==null){
            let dataSorting = {
                dataSorting:true
            }
            this.props.searchProductSort(dataSorting)
        }else{
            let dataSorting = {
                dataSorting:e.value
            }
            this.props.searchProductSort(dataSorting)
        }
    }
    sortByBrand =  (e) => {
        console.log(e,'e');
        if(e==null){
            let brand = {
                brand:true
            }
            this.props.searchProductSort(brand)
        }else{
            let brand = {
                brand:e
            }
            this.props.searchProductSort(brand)
        }
    }
    sortBySeller =  (e) => {
        if(e==null){
            let seller = {
                seller:true
            }
            this.props.searchProductSort(seller)
        }else{
            let seller = {
                seller:e
            }
            this.props.searchProductSort(seller)
        }
    }

    render() {
        const sorting = [
            {label:'Oldest',value:'oldest'},
            {label:'Newest',value:'newest'},
            {label:'Low to high(price)',value:'low+to+high(price)'},
            {label:'High to low(price)',value:'high+to+low(price)'}
        ];

        const BrandOptions = this.props.brands;
        const SellersOptions = this.props.shops;
       let sortValue = ""
           sorting.map(pd=>{
            if(pd.value===this.props.dataSorting){
                sortValue =  pd.label
            }
        })
        return (
            <Fragment>
               <Row className="productSortRow ">
                   <Col className="productSortCol" xl={3} lg={3} md={4} sm={12} xs={12}>
                       <Autocomplete

                           className='shortBy'
                             id="controllable-states-demo"
                             onChange={(e,value)=>{this.sortByPrice(value)}}
                             options={sorting}
                             renderInput={(params) => <TextField
                                 {...params}
                                 label="Sort By Price"
                                 placeholder="Sort By Price"
                                 variant="outlined"
                             />}
                             value = "Sort By Price"
                       />
                   </Col>
                   <Col  className="productSortCol" xl={3} lg={3} md={4} sm={12} xs={12}>
                       <Autocomplete
                           className='shortBy'
                           onChange={(e,value)=>{this.sortByBrand(value)}}
                           options={BrandOptions}
                           renderInput={(params) => <TextField className="text-muted"
                               {...params}
                               label="Sort By Brands"
                               placeholder="Sort By Brands"
                               variant="outlined" />
                            }
                               value="Sort By Brands"
                       />
                   </Col>
                   <Col  className="productSortCol" xl={3} lg={3} md={4} sm={12} xs={12}>
                       <Autocomplete
                           className='shortBy'
                           onChange={(e,value)=>{this.sortBySeller(value)}}
                           options={SellersOptions}
                           renderInput={(params) => <TextField
                               {...params}
                               label="Sort By Categories"
                               placeholder="Sort By Categories"
                           />}
                           value="Sort By Category"
                       />
                   </Col>
               </Row>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    searchProductSort
};

function mapStateToProps(state) {
    const sellerSorting = state.filterReducer.sellerSorting;
    const brandSorting = state.filterReducer.brandSorting;
    const dataSorting = state.filterReducer.dataSorting
    const brands = state.filterReducer.brands
    const shops = state.filterReducer.shops


    return {
        sellerSorting,
        brandSorting,
        dataSorting,
        brands,
        shops
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductFilterBySorting);