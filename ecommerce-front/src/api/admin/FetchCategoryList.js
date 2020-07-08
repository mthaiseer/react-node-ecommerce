import {API} from '../../config';

export const FetchCategoryApi = () => {

    return fetch(`${API}/category`, {
            method: "GET",
        }).then(response => {
            return response.json();
        })
        .catch(e => console.log(e))
};