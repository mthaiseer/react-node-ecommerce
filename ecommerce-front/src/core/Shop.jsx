import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { Card } from './Card';
import { FetchCategoryApi } from '../api/admin/FetchCategoryList';
import Checkbox from './Checkbox';
import { prices } from './fixedPrices'
import RadioBox from './RadioBox';
import loadProductByFilter from '../api/admin/FetchProductByFilter';

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filterProductList, setFilterProductList] = useState([]);

    const allCategories = () => {
        FetchCategoryApi().then(res => {
            if (res.error) {
                setError(res.error)
                return;
            }
            setCategories(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        allCategories()
        loadProductByFilter()

    }, []);


    const getFilteredApiResult = filterd => {
        return loadProductByFilter(limit, skip, filterd)
            .then(result => {
                if (result.error) {
                    console.log('Error', result.error);
                    setError(result.error)
                    return;

                }
                //console.log('SIZE : ' + result.size)
                setSize(result.size)
                setFilterProductList(result.data)
                setSkip(skip);

            }).catch(e => {
                console.log('Error', e)
            })
    }

    const loadMoreProductApiResult = () => {
        const newSkip  =  skip+ limit;
   
        
        return loadProductByFilter(limit, newSkip, myFilters.filters)
            .then(result => {
                if (result.error) {
                    console.log('Error', result.error);
                    setError(result.error)
                    return;

                }
                console.log('SIZE : ' + result.size)
                console.log('Load more product '+result.data)
               // const newProductList =  {...filterProductList, ...result.data}
                setFilterProductList( [...filterProductList, ...result.data])

            }).catch(e => {
                console.log('Error', e)
            })
            setSkip(0);

    }

    //method pass to child Checkbox component
    const handleFilters = (filters, filterby) => {
        const currentFilters = { ...myFilters };
        currentFilters.filters[filterby] = filters
        if (filterby === 'price') {
            currentFilters.filters[filterby] = getPriceArray(filters);
        }
        getFilteredApiResult(myFilters.filters);
        setMyFilters(currentFilters);
    }

    const getPriceArray = priceId => {
        const tempPrices = prices;
        let array = [];

        for (let key in tempPrices) {
            if (tempPrices[key]._id === parseInt(priceId)) {
                array = tempPrices[key].array;
            }
        }
        return array;
    }

    const loadMore = ()=>{
        loadMoreProductApiResult()
    }


    //TODO : Hide button if all results are fetched 
    const loadMoreButton = () => {
        return(
            size > 0 &&  limit <=size &&( <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>)
        )

    }


    return (
        <Layout title="Shop" description="Find yout favorite projects" className='container-fluid'>
            <div className="row">
                <div className="col-4">
                    <h4>Filter By Categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={(filter) => handleFilters(filter, 'category')} />
                    </ul>

                    <h4>Filter By Prices</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={(filter) => handleFilters(filter, 'price')}
                        />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {
                            filterProductList && filterProductList.map((product, i) =>
                                <Card key={i} product={product} />
                            )
                        }
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
}

export default Shop;
