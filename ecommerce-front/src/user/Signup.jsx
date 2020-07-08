import React, { useState } from 'react';
import Layout from '../core/Layout';
import {registerUser} from '../api/auth/index'


const Signup = () => {

     const[formValues, setFormValues] =  useState({
         name : '',
         password : '',
         email : '',
         success: false,
         error : ''
     })

     //SET ALL VALUES ON USER ENTER EVENT
     const handleChange  = name => event => {
        setFormValues({...formValues, error: '', [name]: event.target.value} )
    }

   const showError   =  ()=>(
       <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
       </div>
   )

   const showSuccess   =  ()=>(
    <div className="alert alert-success" style={{display: success ? '': 'none'}}>
         {'User created successfully'}
    </div>
   )

   const {name, email, password, error, success} =  formValues;


   const clickSubmit = (e)=>{
       e.preventDefault();
       registerUser({name, password, email})
       .then( data =>{
                if(data.error){
                    setFormValues({...formValues, error: data.error, success:false})
                } else{
                    setFormValues(
                        {...formValues,
                        name :'',
                        email : '',
                        password : '',
                        error: false, 
                            success:true
                    })
                }   

            }).catch( e =>{
                setFormValues({...formValues, error: 'User creation failed', success:false})
        })
    }

    const signupForm  =   ()=>{
        return(
    
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" autoComplete="off" onChange={handleChange('name')} value={name} className="form-control"/>
                </div>
    
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange('email')}  value={email} className="form-control"/>
                </div>
    
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" onChange={handleChange('password')} value={password} className="form-control"/>
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    }

    return (
        <Layout title="Register Page" description="Please login here" className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {signupForm()}
         </Layout>

    )
}

export default Signup;
