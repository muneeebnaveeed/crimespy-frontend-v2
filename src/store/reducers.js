import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';

// Routes
import Products from './routes/products/reducer';
import Categories from './routes/categories/reducer';

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';

import Auth from './auth/reducer';
import Feed from './routes/feed/reducer';

const rootReducer = combineReducers({
    // public
    Layout,

    // Authentication
    Account,
    Login,
    Forget,
    Auth,

    Feed,
});

export default rootReducer;
