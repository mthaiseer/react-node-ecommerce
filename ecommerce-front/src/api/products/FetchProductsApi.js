import {
    API
} from '../../config';
import queryString from 'query-string';

export const FetchProductsApi = (sortBy, order, limit) => {

    console.log(sortBy, order, limit)

    return fetch(`${API}/product/?sortBy=${sortBy}&order=${order}&limit=${limit}`, {

        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
};


export const SearchProduct = (params) => {

    const query = queryString.stringify(params)

    return fetch(`${API}/product/search/?${query}`, {
        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
};


export const ProductDetails = (productId) => {

    return fetch(`${API}/product/${productId}`, {
        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
};

export const RelatedProducts = (productId) => {

    return fetch(`${API}/product/related/${productId}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
};