
import {invoice_data, invoice_loading} from "../types";

export const  invoice  =  (data) => {

    return async (dispatch) => {
        dispatch({
            type:invoice_data,
            invoice: data,
            invoiceDataLoading: false
        })
    }
}


export const  loadingInvoice  =  () => {

    return async (dispatch) => {
        dispatch({
            type:invoice_loading,
            invoiceDataLoading: true
        })
    }
}


