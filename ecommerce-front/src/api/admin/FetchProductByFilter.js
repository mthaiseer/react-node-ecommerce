import {
    API
} from '../../config';

const loadProductByFilter = (limit, skip, filters = {}) => {

    const data = {
        limit, 
        skip, 
        filters
    }

    console.log('findArgs Data  : '+ JSON.stringify(data))


    return fetch(`${API}/product/by/search`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
}

export default loadProductByFilter;