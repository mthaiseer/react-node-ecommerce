import {API} from '../../config';

export const getBrainTreeClientToken  =  (token, userId) =>{
  
    return fetch(`${API}/braintree/getToken/${userId}`, {
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


export const processPayment  =  (token, userId, paymentPayload) =>{
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(paymentPayload)
    }).then(response => {
        return response.json();
    })
    .catch(e => console.log(e))
};

