import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../api/auth';
import { Link } from 'react-router-dom';

const Dashboard =  ()=>{

   const {user :{ name, email, role}} =  isAuthenticated();

   const userProfile  = ()=>{
       return (

         <>
                <div className="card mb-5">
                        <h3 className="card-header">User Information</h3>
                        <ul className="list-group">
                            <li className="list-group-item">{name}</li>
                            <li className="list-group-item">{email}</li>
                            <li className="list-group-item">{role === 1? 'ADMIN' : 'NORMAL USER'}</li>
                        </ul>
                    </div>

                                
                    <div className="card mb-5">
                    <h3 className="card-header">Purchase history</h3>
                    <ul className="list-group">
                        <li className="list-group-item">history</li>
                    </ul>
                    </div>
            </>
         )
   }

   const userActions  = ()=>{
    return (
       <div className="card mb-5">
             <h3 className="card-header">User Information</h3>
             <ul className="list-group">
                 <Link className="list-group-item" to='/cart'>Cart</Link>
                 <Link  className="list-group-item" to='/user/updateProfile'>Update Profile</Link>
             </ul>
         </div>
    )
}
   
    return(
        <Layout title="Dashboard" description={`Welcome Mr. ${name}`} className="container-fluid">
           
            <div className="row ">
             <div className="col-3">{userActions()}</div>
            <div className="col-9">{userProfile()}</div>
            </div>

        </Layout>
    )
}

export default Dashboard;