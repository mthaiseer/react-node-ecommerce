import React, { useState, useEffect } from 'react';
import { FetchCategoryApi } from '../api/admin/FetchCategoryList';
import { SearchProduct } from '../api/products/FetchProductsApi';
import { Card } from './Card';

const SearchBar = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        searchResult: [],
        isSearched: false,
    })

    const [error, setError] = useState(false);

    const { categories, category, search: search, searchResult, isSearched } = data;


    const loadCategories = () => {

        FetchCategoryApi()
            .then(result => {
                if (result.error) {
                    setError(result.error);
                    return;
                }
                setData({ ...data, categories: result.data });

            }).catch(e => console.log('ERROR ', e))


    }

    const  searchProduct = ()=>{
       SearchProduct({search: search || '', category: category})
         .then(result  => {
             console.log(result)
             setData({...data, searchResult: result, isSearched: true}
         )})
         .catch( e => console.log(e))
    }
    
    const searchSubmit  =  (e) =>{
      e.preventDefault();
      searchProduct(); 
    }

    const handleChange  =  type=> event=>{
       setData({...data, [type]: event.target.value, isSearched: false})
     
    }

    const showMessage =(result, flag)=>{

        if(flag && result.length > 0){
            return `Found ${result.length} items in the search`
        }

        if(flag && result.length < 1){
            return `No item found`
        }

      

    }

    const searchResultForm =(result =[]) =>{
        return (

            <div className="container mb-3">
                <h2 className="mt-4 mb-4">{showMessage(searchResult, isSearched)}</h2>
                <div className="row">
                    {result.map( (product, i) => <Card key={i} product={product}/>)}
                </div>
            </div>
        )
    }
    


    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <>
            <div className="row">
                <div className="container mb-3">{searchForm()}</div>
            </div>

            <div className="row">
                {searchResultForm(searchResult)}
            </div>


        </>
    )
}

export default SearchBar;
