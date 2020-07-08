import {API} from '../../config';

export const createProduct = (product, userId, jwt) => {

    console.log(product, userId, jwt)

    return fetch(`${API}/product/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: product
        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
};