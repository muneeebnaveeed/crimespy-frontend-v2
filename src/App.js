import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./theme.scss";

//Fake backend
import fakeBackend from "./helpers/AuthType/fakeBackend";

import { QueryProvider } from "helpers/query";
import { getLoggedInUser, isUserAuthorized } from "helpers/auth";

// Activating fake backend
fakeBackend();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
        };
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <QueryProvider>
                        <Switch>
                            {publicRoutes.map((route, idx) => (
                                <AppRoute
                                    exact
                                    key={idx}
                                    path={route.path}
                                    layout={NonAuthLayout}
                                    component={route.component}
                                />
                            ))}

                            {authProtectedRoutes.map((route, idx) => {
                                if (isUserAuthorized(route.roles, this.state.user))
                                    return (
                                        <AppRoute
                                            exact
                                            key={idx}
                                            path={route.path}
                                            layout={VerticalLayout}
                                            component={route.component}
                                            isAuthProtected
                                        />
                                    );

                                return null;
                            })}
                        </Switch>
                    </QueryProvider>
                </Router>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ Layout }) => {
    return {
        layout: Layout,
    };
};

export default connect(mapStateToProps, null)(App);
