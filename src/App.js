import React, { Component } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Routes
import { getLoggedInUser, isUserAuthorized } from 'helpers/auth';
import { QueryProvider } from 'helpers/query';
import { authProtectedRoutes, publicRoutes } from './routes';
import AppRoute from './routes/route';

// layouts
import VerticalLayout from './components/VerticalLayout';
import NonAuthLayout from './components/NonAuthLayout';

// Import scss
import './theme.scss';

// Fake backend
import fakeBackend from './helpers/AuthType/fakeBackend';

// Activating fake backend
fakeBackend();

class App extends Component {
    render() {
        return (
            <>
                <Router>
                    <QueryProvider>
                        <Switch>
                            {authProtectedRoutes.map((route, idx) => (
                                <AppRoute
                                    exact
                                    key={idx}
                                    path={route.path}
                                    layout={route.layout || VerticalLayout}
                                    component={route.component}
                                    isAuthProtected
                                />
                            ))}
                            {publicRoutes.map((route, idx) => (
                                <AppRoute
                                    exact
                                    key={idx}
                                    path={route.path}
                                    layout={NonAuthLayout}
                                    component={route.component}
                                />
                            ))}
                        </Switch>
                    </QueryProvider>
                </Router>
            </>
        );
    }
}

const mapStateToProps = ({ Layout }) => ({
    layout: Layout,
});

export default connect(mapStateToProps, null)(App);
