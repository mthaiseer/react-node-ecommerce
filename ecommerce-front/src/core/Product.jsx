import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { Card } from './Card';
import { ProductDetails, RelatedProducts } from '../api/products/FetchProductsApi';


const Product  =  (props) =>{

    const[product, setProduct] = useState({});
    const[relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(false);


    const{name, description, price}  =  product;


    const loadProductByFilter =  productId =>{
        ProductDetails(productId)
          .then(response  =>{
            if(response.error){
                setError(response.error);
                return;
            }
            setProduct(response.product);

            //load related products 
            loadRelatedProducts(response.product._id)

       }).catch( e => console.log(e))
    }

    const loadRelatedProducts = (id) =>{
        RelatedProducts(id)
        .then(result =>{
            if(result.error){
                 setError(result.error);
                 return;
            }else{
                setRelatedProducts(result);
            }
        }).catch( e => console.log(e))
    }

    useEffect(()=>{
        const id  =  props.match.params.productId;
        loadProductByFilter(id);
    }, [props])

    const showRelatedProducts =  products =>{

        console.log('relatedProducts', relatedProducts)
        if(products.length<=0){
            return <div>No related product found</div>
        }
         return products.map((product, i) => (<Card key={i}product={product}  />))
    }

    return (
        <Layout title={product.name} description={product.description} className='container-fluid'>
            
                <div className="row">
                    <div className="col-8">
                             <Card product={product} isViewButtonEnabled={false}/>
                    </div>
                    <div className="col-4">
                        <h2>Related Products</h2>
                        {showRelatedProducts(relatedProducts)}
                    </div>
                </div>
             
        </Layout>
    )

}

export default Product;