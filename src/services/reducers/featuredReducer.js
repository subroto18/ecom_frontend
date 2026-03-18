import {featured_product} from "../types";

const initialState = {
    featuredApi:false,
    featuredData:[],
    featuredLoading:true
};

const featuredProduct  = (state = initialState, action) => {
    switch(action.type){
        case featured_product:
            return {
                ...state,
                featuredApi:action.featuredApi,
                featuredData:action.featuredData,
                featuredLoading:action.featuredLoading
            }
        default:
            return state;
    }
}

export default featuredProduct;