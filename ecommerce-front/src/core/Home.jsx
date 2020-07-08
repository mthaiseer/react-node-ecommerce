import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { FetchProductsApi } from '../api/products/FetchProductsApi';
import { Card } from './Card';
import SearchBar from './SearchBar';



const Home = () => {

    const [productBySold, setProductBySold] = useState([]);
    const [productByArraival, setProductByArraival] = useState([]);
    const [error, setError] = useState('');


    const getProductByArraival = () => {
        FetchProductsApi('createdAt', 'desc', '6')
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    return;
                }

                setProductByArraival(res);
            }).catch(e => {
                console.log(e)
            })
    }


    const getProductBySold = () => {
        FetchProductsApi('sold', 'desc', '6')
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    return;
                }
                setProductBySold(res);
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getProductByArraival();
        getProductBySold();
    }, [])




    return (
        <Layout title="Home Page" description="Node React E-commerce App" className='container'>

            <SearchBar />

            <h2 className="mb-4">Hottest Products</h2>
            <div className="row">

                {productBySold.map((product, i) => <Card key={i} product={product}></Card>)}
            </div>


            <h2 className="mb-4">New Arraivals</h2>
            <div className="row">

                {productByArraival.map((product, i) => <Card key={i} product={product}></Card>)}

            </div>


        </Layout>

    )
}

export default Home;
