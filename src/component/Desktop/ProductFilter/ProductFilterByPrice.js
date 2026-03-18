import React, { Fragment, Component} from 'react';
import {searchProductSort} from "../../../services/actions/filterAction";
import {connect} from "react-redux";
import {Slider} from "@mui/material";
import {onCurrencyFormat} from "../../../services/common";
class ProductFilterByPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
                value: { min: 0, max: 1000 },
                min:0,
                max:10000,
        };
    }

   handleChange = (value) => {

        this.setState({
            value:value
        })
        const data = {
            priceRange:value
        }
        this.props.searchProductSort(data);
    }


    componentDidMount() {
        this.setState({
            value: { min: this.props.minPrice, max: this.props.maxPrice },
            min:this.props.minPrice,
            max:this.props.maxPrice
        })

    }

     handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

         this.setState({
             value: { min: newValue[0], max: newValue[1] },
         })

         const data = {
             priceRange:{ min: newValue[0], max: newValue[1] }
         }

         this.props.searchProductSort(data);

    };



    render() {


        let defaultCurrency = this.props.defaultCurrency;
        let currencySymbolFormat = this.props.currencySymbolFormat

        const marks = [
            {
                value: this.props.minPrice,
                label: currencySymbolFormat===1 ? onCurrencyFormat(this.props.minPrice) + `${defaultCurrency}` : `${defaultCurrency}` +
                     onCurrencyFormat(this.props.minPrice)
            },
            {
                value:this.props.maxPrice,
                label:  currencySymbolFormat===1 ? onCurrencyFormat(this.props.maxPrice) + `${defaultCurrency}` : `${defaultCurrency}` +
                    onCurrencyFormat(this.props.maxPrice)
            },
        ];

        return (
            <Fragment>
                <div className="productSearch mb-5">
                    <div className="productSearchTitle"><h6>Price range </h6></div>
                    <div className="px-4">
                        <Slider
                            aria-label="Temperature"
                            defaultValue={[this.state.value.min, this.state.value.max]}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={this.handleChange2}
                            value={[this.state.value.min, this.state.value.max]}
                            min={this.state.min}
                            max={this.state.max}
                        />
                    </div>

                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    searchProductSort
};

function mapStateToProps(state) {
    const maxPrice = state.filterReducer.maxPrice;
    const minPrice = state.filterReducer.minPrice;
    const priceSortingRange = state.filterReducer.priceSortingRange;
    const defaultCurrency = state.starterReducer.defaultCurrency;
    const currencySymbolFormat = state.starterReducer.currencySymbolFormat;
    return {
        maxPrice,
        minPrice,
        priceSortingRange,
        defaultCurrency,
        currencySymbolFormat
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilterByPrice);

