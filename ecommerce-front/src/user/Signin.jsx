import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Redirect } from 'react-router-dom';
import {loginUser, authenticate, isAuthenticated} from '../api/auth/index'


const Signin = () => {

  const {user} =  isAuthenticated();

  /* React hook method */
  const [formValues, setFormValues] = useState({
    password: '',
    email: '',
    success: false,
    error: '',
    isLoading: false,
   
  })

  const { email, password, error, success, isLoading } = formValues;

  //SET ALL VALUES ON USER ENTER EVENT
  const handleChange = name => event => {
    setFormValues({ ...formValues, error: '', [name]: event.target.value })
  }


  /* handle use login button initiated */
  const clickSubmit = (e) => {
    setFormValues({ ...formValues, error: '', success: false, isLoading:true })
    e.preventDefault();
      loginUser({ email, password })
      .then(result => {
        if (result.error) {

          setFormValues({ ...formValues, error: result.error, success: false, isLoading: false })
        } else {

          authenticate(result , ()=>setFormValues({...formValues,success: true,isLoading: false}))
    
        }
      })
      .catch(e => {
        console.log(e)
        setFormValues({ ...formValues, error: 'User login failed', success: false, isLoading: false })
      })
  }

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showDashBoard = () => 
  {
    if(success){
      if(isAuthenticated() && user && user.role === 1 ){
        return <Redirect to="/admin/dashboard"/>
      }

      if(isAuthenticated() && user && user.role === 0 ){
        return <Redirect to="/user/dashboard"/>
      }
     
    }
    if(isAuthenticated()){
      return <Redirect to="/"/>
    }
   
  }
 


  const showLoading = () => (
     isLoading && <div className="alert alert-success" style={{ display: isLoading ? '' : 'none' }}>
      {'Login is in progress ...'}
    </div>
  )


  const signinForm = () => {
    return (

      <form>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" onChange={handleChange('email')} value={email} className="form-control" />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input type="password" onChange={handleChange('password')} value={password} className="form-control" />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
      </form>
    )
  }

  return (
    <Layout title="Login Page" description="Please login here" className="container">
      {showError()}
      {showLoading()}
      {showDashBoard()}
      {signinForm()}
    </Layout>

  )

}

export default Signin;
