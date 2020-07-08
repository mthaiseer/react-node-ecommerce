import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../api/auth';
import { cartSize } from './cartHelpers';


const isActive = (history, path) => {

    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    return { color: '#fff' }
}
const Menu = (props) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">

                {(
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.history, '/')} to="/">Home</Link>
                        </li>
                    </Fragment>
                )}


                {(
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.history, '/shop')} to="/shop">Shop</Link>
                        </li>
                    </Fragment>
                )}



                {(
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.history, '/cart')} to="/cart">Cart <sup><small className="cart-badge">{cartSize()}</small></sup></Link>
                        </li>
                    </Fragment>
                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">

                            <Link className="nav-link" style={isActive(props.history, '/login')} to="/login">Login</Link>

                        </li>
                    </Fragment>
                )
                }
                {isAuthenticated() && isAuthenticated().user.role === 1 && (

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>


                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, '/admin/orders')} to="/admin/orders/list">Orders</Link>
                    </li>


                )}

                {isAuthenticated() && isAuthenticated().user.role === 0 && (

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, '/user/dashboard')} to="/user/dashboard">Dash Board</Link>
                    </li>



                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.history, '/register')} to="/register">Register</Link>
                        </li>
                    </Fragment>
                )
                }

                {isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{ cursor: 'pointer', color: "#fff" }}
                                onClick={() => signout(() => {
                                    props.history.push('/login')
                                })}

                            >Logout</span>
                        </li>
                    </Fragment>
                )}
            </ul>


        </div>
    )
}

export default withRouter(Menu)