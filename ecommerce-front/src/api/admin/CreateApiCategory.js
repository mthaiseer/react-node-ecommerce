import {API} from '../../config';

export const CreateCategoryApi = (categoryName, userId, jwt) => {

    console.log(categoryName, userId, jwt)

    return fetch(`${API}/category/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify(categoryName)
        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
};