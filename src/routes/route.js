import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getLoggedInUser } from "helpers/auth";

const AppRoute = ({ component: Component, layout: Layout, isAuthProtected = false, roles = [], ...rest }) => {
    const auth = useSelector((state) => state.Auth);

    const isUserLoggedIn = getLoggedInUser();

    console.log(isUserLoggedIn);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthProtected && !isUserLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                }

                // route has specific roles && user doesn't has the specific role
                // if (roles.length && !roles.includes(getCurrentUser().role))
                //     return <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />;

                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                );
            }}
        />
    );
};

export default AppRoute;
