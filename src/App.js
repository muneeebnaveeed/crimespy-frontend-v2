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

//Firebase helper
import { initFirebaseBackend } from "./helpers/firebase_helper";
import { QueryProvider } from "helpers/query";

// Activating fake backend
fakeBackend();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// init firebase backend
initFirebaseBackend(firebaseConfig);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <QueryProvider>
                        <Switch>
                            {publicRoutes.map((route, idx) => (
                                <AppRoute
                                    key={idx}
                                    path={route.path}
                                    layout={NonAuthLayout}
                                    component={route.component}
                                />
                            ))}

                            {authProtectedRoutes.map((route, idx) => (
                                <AppRoute
                                    key={idx}
                                    path={route.path}
                                    layout={VerticalLayout}
                                    component={route.component}
                                    isAuthProtected
                                />
                            ))}
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
