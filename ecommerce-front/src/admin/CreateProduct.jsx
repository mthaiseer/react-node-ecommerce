import React, { useState, useEffect  } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../api/auth';
import { createProduct } from '../api/admin/CreateApiProduct';
import { FetchCategoryApi } from '../api/admin/FetchCategoryList';


const CreateProduct  =  () =>{

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

  

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const init  =  ()=>{
        FetchCategoryApi()
           .then(res =>{
               console.log('RESPONSE ', res)
               if(res.error){
                   setValues({...values, error: res.error})
               }else{
                setValues({...values, categories: res.data, formData: new FormData()})  
               }

            }).catch(e =>{
                 console.log(e)
            })
    }

    useEffect(() => {
        init();
      }, []);
  
    const clickSubmit  = (e)=>{
        e.preventDefault();
        setValues({...values, error: '', loading: true});
        createProduct(formData, user._id, token)
           .then(response  =>{
               if(response.error){
                 setValues({...values, error: response.error, loading: false});
               }else{
                setValues({
                        ...values, error: '',
                        loading: false,
                        name: '',
                        description: '',
                        price: '',
                        shipping: '',
                        quantity: '',
                        photo: '',
                        createdProduct: response.name
                    });
               }
           }).catch( e =>{
               console.log(e)
           })
    }



    const createNewProductForm  =  ()=>(
        <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
            <label className="btn btn-secondary">
                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
            </label>
        </div>

        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
        </div>

        <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea onChange={handleChange('description')} className="form-control" value={description} />
        </div>

        <div className="form-group">
            <label className="text-muted">Price</label>
            <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
        </div>

        <div className="form-group">
            <label className="text-muted">Category</label>
            <select onChange={handleChange('category')} className="form-control">
                <option>Please select</option>
                {categories && categories.map((c, i) =>(
                  <option value={c._id}>{c.name}</option>
                ))}
            
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted">Shipping</label>
            <select onChange={handleChange('shipping')} className="form-control">
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
        </div>

        <button className="btn btn-outline-primary">Create Product</button>
    </form>
    );
    return(
        <Layout title="Create Product" description="Hello Admin, create product here" className="col-md-8 offset-md-2">

            {loading && <div className="alert alert-danger">Loading</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {createdProduct && <div className="alert alert-info">{`${createdProduct} created successfully !`}</div>}


           {createNewProductForm()}
         </Layout>


    )
}

export default CreateProduct;