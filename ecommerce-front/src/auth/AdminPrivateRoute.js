import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../api/auth";


const AdminPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 1  ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminPrivateRoute;