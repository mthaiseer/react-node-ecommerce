import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../api/auth';
import { CreateCategoryApi } from '../api/admin/CreateApiCategory';

const CreateCategory = ()=>{

    const {user, token} = isAuthenticated();
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess]= useState(false);
    const [message, setMessage]= useState(false);


    const handleChange =  (e) =>{
        setError(false);
        setCategoryName(e.target.value)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
       // console.log('Submit called : ' + categoryName)
       CreateCategoryApi({name: categoryName}, user._id, token)
          .then(response => {
              if(response.error){
                  setError(true);
                  setMessage(response.error)
                  return;
              }
             setError(false);
             setSuccess(true);
             setMessage('Category creation was successful ')
          })
          .catch ( e => console.log(e))
    } 

    const showError   =  ()=>
     (  error &&  <div className="alert alert-danger">
             {message}
        </div>
     )

 
    const showSuccess   =  ()=>(
    success &&  <div className="alert alert-success">
          {message}
     </div>
    )
 

    const categoryForm = () =>(
        
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" autoFocus required onChange={handleChange}/>
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )
    return(
        <Layout title="Create Category" description="Hello Admin, create category here" className="col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
           {categoryForm()}
         </Layout>


    )
}

export default CreateCategory;