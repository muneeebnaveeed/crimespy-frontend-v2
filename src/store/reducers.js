import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Routes
import Products from "./routes/products/reducer";
import Categories from "./routes/categories/reducer";

// Authentication Module
import Account from "./auth/register/reducer";
import Login from "./auth/login/reducer";
import Forget from "./auth/forgetpwd/reducer";

const rootReducer = combineReducers({
    // public
    Layout,

    // Authentication
    Account,
    Login,
    Forget,

    Products,
    Categories,
});

export default rootReducer;
