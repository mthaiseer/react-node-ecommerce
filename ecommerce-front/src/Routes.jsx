import React from 'react';
import{BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home'
import ErrorPage from './core/Error'
import Dashboard from './user/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminDashboard from './user/AdminDashboard';
import AdminPrivateRoute from './auth/AdminPrivateRoute';
import CreateCategoryApi from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './core/Orders';
import UserProfile from './user/UserProfile';
const Routes =  ()=>{
    return (
       <Router>
           
           <Switch>
                <Route path='/' exact component={Home}/>
               <Route path='/login' exact component={Signin}/>
               <Route path='/register' exact component={Signup}/>
               <Route path='/product/:productId' exact component={Product}/>
               <Route path='/cart' exact component={Cart}/>
               <Route path='/shop' exact component={Shop}/>
               <PrivateRoute path='/user/updateProfile'  component={UserProfile}/>
               <PrivateRoute path='/user/dashboard'  component={Dashboard}/>
               <AdminPrivateRoute path='/admin/dashboard'  component={AdminDashboard}/>CreateCategory
               <AdminPrivateRoute path='/admin/create/category'  component={CreateCategoryApi}/>
               <AdminPrivateRoute path='/admin/create/product'  component={CreateProduct}/>
               <AdminPrivateRoute path='/admin/orders/list'  component={Orders}/>
               
               <Route path=''  component={ErrorPage}/>
           </Switch>
       </Router> 
    )
}

export default Routes;