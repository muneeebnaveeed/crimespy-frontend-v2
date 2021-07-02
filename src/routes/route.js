import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLoggedInUser } from 'helpers/auth';

const AppRoute = ({ component: Component, layout: Layout, isAuthProtected = false, roles = [], ...rest }) => {
    const [user, setUser] = useState(getLoggedInUser());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthProtected && !user) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
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
