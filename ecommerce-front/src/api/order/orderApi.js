import { API} from '../../config';


export const  makeOrder  =  (token, userId, orderPayload) =>{

    console.log( JSON.stringify({order : orderPayload}))

    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({order : orderPayload})
    }).then(response => {
        return response.json();
    })
    .catch(e => console.log(e))
};


export const listAllOrders = (token, userId) =>{

    
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }).then(response => {
        return response.json();
    })
    .catch(e => console.log(e))
};

export const listAllOrderStatus = (token, userId) =>{

    
    return fetch(`${API}/order/list-status/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }).then(response => {
        return response.json();
    })
    .catch(e => console.log(e))
};


