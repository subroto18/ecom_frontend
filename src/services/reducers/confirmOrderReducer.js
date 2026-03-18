import {invoice_data, invoice_loading} from "../types";

const initialState = {
    invoice: [],
    invoiceDataLoading: true,
};

const confirmOrderReducer  = (state = initialState, action) => {
    switch(action.type){
        case invoice_data:
            return {
                ...state,
                invoice:action.invoice,
                invoiceDataLoading:action.invoiceDataLoading
            }
        case invoice_loading:
            return {
                ...state,
                invoiceDataLoading:action.invoiceDataLoading
            }
        default:
            return state;
    }
}

export default confirmOrderReducer;