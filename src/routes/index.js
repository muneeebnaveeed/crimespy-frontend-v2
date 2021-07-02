import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Pages Calendar
import Calendar from "../pages/Calendar/Calendar";

// Pages Component
import Chat from "../pages/Chat/Chat";

//Ecommerce Pages
// import Products from "../pages/Ecommerce/Products";
import ProductDetail from "../pages/Ecommerce/ProductDetail";
import Orders from "../pages/Ecommerce/Orders";
import Customers from "../pages/Ecommerce/Customers";
import Cart from "../pages/Ecommerce/Cart";
import CheckOut from "../pages/Ecommerce/CheckOut";
import Shops from "../pages/Ecommerce/Shops";
import AddProduct from "../pages/Ecommerce/AddProduct";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";

//Icons
import RemixIcons from "../pages/Icons/RemixIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign";
import DripiIcons from "../pages/Icons/DripiIcons";
import FontAwesome from "../pages/Icons/FontAwesome";

//Utility
import StarterPage from "../pages/Utility/StarterPage";
import Maintenance from "../pages/Utility/Maintenance";
import CommingSoon from "../pages/Utility/CommingSoon";
import FAQs from "../pages/Utility/FAQs";
import Pricing from "../pages/Utility/Pricing";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiSweetAlert from "../pages/Ui/UiSweetAlert";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UIRoundSlider from "../pages/Ui/UIRoundSlider";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

//Kanban Board
import KanbanBoard from "../pages/KanbanBoard/index";

// App Routes
import Feed from "pages/_/feed";
import Users from "pages/_/users";
import profile from "pages/_/profile";
import Mapcrime from "pages/_/MapCrime/MapCrime";
import Posts from "pages/_/posts";
import MapLayout from "components/VerticalLayout/MapLayout";
import UserPermissions from "pages/_/permissions";
import Timeline from "pages/_/timeline";
import Dashboard from "pages/_/dashboard";
import PhoneAuth from "pages/Authentication/PhoneAuth";

const hiddenRoutes = [
    {
        path: "/users/edit",
        icon: "fas fa-users",
        title: "User Permissions",
        key: "editPermissions",
        component: UserPermissions,
    },
   
];

const sideBarRoutes = [
    { path: "/dashboard", icon: "fas fa-columns", title: "Dashboard", key: "dashboard", component: Dashboard },
    { path: "/feed", icon: "fas fa-globe", title: "Feed", key: "feed", component: Feed },
    { path: "/timeline", icon: "fas fa-clock", title: "Time Line", key: "timeline", component: Timeline },
    { path: "/users", icon: "fas fa-users", title: "Users", key: "users", component: Users, roles: ["admin"] }, // doesn't appear for users
    {
        path: "/posts",
        icon: "fas fa-archive",
        title: "Post Management",
        key: "poststable",
        component: Posts,
    },
    { path: "/profile", icon: "fas fa-user", title: "User Profile", key: "profile", component: profile },
    { path: "/map", icon: "fas fa-map", title: "Map", key: "map", component: Mapcrime, layout: MapLayout },
];

const authProtectedRoutes = [...hiddenRoutes, ...sideBarRoutes];

const publicRoutes = [
    // this route should be at the end of all other routes
    { path: "/", exact: true, component: () => <Redirect to="/feed" /> },
    { path: "/logout", icon: "fas fa-power", component: Logout },
    { path: "/login", component: Login },
    { path: "/forgot-password", component: ForgetPwd },
    { path: "/register", component: Register },
    { path: "/auth-lock-screen", component: AuthLockScreen },

    // Authentication Inner
    { path: "/auth-login", component: Login1 },
    { path: "/auth-register", component: Register1 },
    { path: "/auth-recoverpw", component: ForgetPwd1 },
    {
        path: "/auth-phone",
        
        component: PhoneAuth,
    },

    { path: "/pages-maintenance", component: Maintenance },
    { path: "/pages-comingsoon", component: CommingSoon },
    { path: "/pages-404", component: Error404 },
    { path: "/pages-500", component: Error500 },
];

export { sideBarRoutes, authProtectedRoutes, publicRoutes };
