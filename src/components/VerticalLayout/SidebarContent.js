import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    changePreloader,
} from "../../store/actions";
import { authProtectedRoutes } from "routes";

import { getLoggedInUser, isUserAuthorized } from "helpers/auth";

class SidebarContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
        };
    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.type !== prevProps.type) {
                this.initMenu();
            }
        }
    }

    initMenu() {
        new MetisMenu("#side-menu");

        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = (item) => {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>

                        {/* <li>
                            <Link to="/dashboard" className="waves-effect">
                                <i className="ri-dashboard-line"></i>
                                <span className="badge badge-pill badge-success float-right">3</span>
                                <span className="ml-1">Feed</span>
                            </Link>
                        </li> */}

                        {authProtectedRoutes.map((route, index) => {
                            if (isUserAuthorized(route.roles, this.state.user))
                                return (
                                    <li key={`sidebar-list-item-${index}`}>
                                        <Link to={route.path} className="waves-effect">
                                            {route.icon && <i className={route.icon} />}
                                            <span className="ml-1">{route.title}</span>
                                        </Link>
                                    </li>
                                );

                            return null;
                        })}

                        {/* <li>
                            <Link to="products" className="waves-effect">
                                <i className="fas fa-archive"></i>
                                <span className="ml-1">Products</span>
                            </Link>
                        </li> */}

                        {/* <li>
                            <Link to="calendar" className=" waves-effect">
                                <i className="ri-calendar-2-line"></i>
                                <span className="ml-1">Calendar</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="apps-chat" className=" waves-effect">
                                <i className="ri-chat-1-line"></i>
                                <span className="ml-1">Chat</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-store-2-line"></i>
                                <span className="ml-1">Ecommerce</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="ecommerce-products">Products</Link>
                                </li>
                                <li>
                                    <Link to="ecommerce-product-detail">Product Detail</Link>
                                </li>
                                <li>
                                    <Link to="ecommerce-orders">Orders</Link>
                                </li>
                                <li>
                                    <Link to="ecommerce-customers">Customers</Link>
                                </li>
                                <li>
                                    <Link to="ecommerce-cart">Cart</Link>
                                </li>
                                <li>
                                    <Link to="ecommerce-checkout">Checkout</Link>
                                </li>
                                <li>
                                    <Link to="ecommerce-shops">Shops</Link>
                                </li>
                                <li>
                                    <Link to="ecommerce-add-product">Add Product</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-mail-send-line"></i>
                                <span className="ml-1">Email</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="email-inbox">Inbox</Link>
                                </li>
                                <li>
                                    <Link to="email-read">Read Email</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="apps-kanban-board" className=" waves-effect">
                                <i className="ri-artboard-2-line"></i>
                                <span className="ml-1">Kanban Board</span>
                            </Link>
                        </li>

                        <li className="menu-title">Pages</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-account-circle-line"></i>
                                <span className="ml-1">Authentication</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="auth-login">Login</Link>
                                </li>
                                <li>
                                    <Link to="auth-register">Register</Link>
                                </li>
                                <li>
                                    <Link to="auth-recoverpw">Recover Password</Link>
                                </li>
                                <li>
                                    <Link to="auth-lock-screen">Lock Screen</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-profile-line"></i>
                                <span className="ml-1">Utility</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="pages-starter">Starter Page</Link>
                                </li>
                                <li>
                                    <Link to="pages-maintenance">Maintenance</Link>
                                </li>
                                <li>
                                    <Link to="pages-comingsoon">Coming Soon</Link>
                                </li>
                                <li>
                                    <Link to="pages-timeline">Timeline</Link>
                                </li>
                                <li>
                                    <Link to="pages-faqs">FAQs</Link>
                                </li>
                                <li>
                                    <Link to="pages-pricing">Pricing</Link>
                                </li>
                                <li>
                                    <Link to="pages-404">Error 404</Link>
                                </li>
                                <li>
                                    <Link to="pages-500">Error 500</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-title">Components</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-pencil-ruler-2-line"></i>
                                <span className="ml-1">UI Elements</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="ui-alerts">Alerts</Link>
                                </li>
                                <li>
                                    <Link to="ui-buttons">Buttons</Link>
                                </li>
                                <li>
                                    <Link to="ui-cards">Cards</Link>
                                </li>
                                <li>
                                    <Link to="ui-carousel">Carousel</Link>
                                </li>
                                <li>
                                    <Link to="ui-dropdowns">Dropdowns</Link>
                                </li>
                                <li>
                                    <Link to="ui-grid">Grid</Link>
                                </li>
                                <li>
                                    <Link to="ui-images">Images</Link>
                                </li>
                                <li>
                                    <Link to="ui-lightbox">Lightbox</Link>
                                </li>
                                <li>
                                    <Link to="ui-modals">Modals</Link>
                                </li>
                                <li>
                                    <Link to="ui-rangeslider">Range Slider</Link>
                                </li>
                                <li>
                                    <Link to="ui-roundslider">Round Slider</Link>
                                </li>
                                <li>
                                    <Link to="ui-session-timeout">Session Timeout</Link>
                                </li>
                                <li>
                                    <Link to="ui-progressbars">Progress Bars</Link>
                                </li>
                                <li>
                                    <Link to="ui-sweet-alert">Sweet Alerts</Link>
                                </li>
                                <li>
                                    <Link to="ui-tabs-accordions">Tabs & Accordions</Link>
                                </li>
                                <li>
                                    <Link to="ui-typography">Typography</Link>
                                </li>
                                <li>
                                    <Link to="ui-video">Video</Link>
                                </li>
                                <li>
                                    <Link to="ui-general">General</Link>
                                </li>
                                <li>
                                    <Link to="ui-rating">Rating</Link>
                                </li>
                                <li>
                                    <Link to="ui-notifications">Notifications</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="waves-effect">
                                <i className="ri-eraser-fill"></i>
                                <span className="badge badge-pill badge-danger float-right">6</span>
                                <span className="ml-1">Forms</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="form-elements">Elements</Link>
                                </li>
                                <li>
                                    <Link to="form-validation">Validation</Link>
                                </li>
                                <li>
                                    <Link to="form-advanced">Advanced Plugins</Link>
                                </li>
                                <li>
                                    <Link to="form-editors">Editors</Link>
                                </li>
                                <li>
                                    <Link to="form-uploads">File Upload</Link>
                                </li>
                                <li>
                                    <Link to="form-xeditable">X-editable</Link>
                                </li>
                                <li>
                                    <Link to="form-wizard">Wizard</Link>
                                </li>
                                <li>
                                    <Link to="form-mask">Mask</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-table-2"></i>
                                <span className="ml-1">Tables</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="tables-basic">Basic Tables</Link>
                                </li>
                                <li>
                                    <Link to="tables-datatable">Data Tables</Link>
                                </li>
                                <li>
                                    <Link to="tables-responsive">Responsive Table</Link>
                                </li>
                                <li>
                                    <Link to="tables-editable">Editable Table</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-bar-chart-line"></i>
                                <span className="ml-1">Charts</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="charts-apex">Apexcharts</Link>
                                </li>
                                <li>
                                    <Link to="charts-chartjs">Chartjs</Link>
                                </li>
                                <li>
                                    <Link to="charts-knob">Jquery Knob</Link>
                                </li>
                                <li>
                                    <Link to="charts-sparkline">Sparkline</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-brush-line"></i>
                                <span className="ml-1">Icons</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="icons-remix">Remix Icons</Link>
                                </li>
                                <li>
                                    <Link to="icons-materialdesign">Material Design</Link>
                                </li>
                                <li>
                                    <Link to="icons-dripicons">Dripicons</Link>
                                </li>
                                <li>
                                    <Link to="icons-fontawesome">Font awesome 5</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-map-pin-line"></i>
                                <span className="ml-1">Maps</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="maps-google">Google Maps</Link>
                                </li>
                                <li>
                                    <Link to="maps-vector">Vector Maps</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-share-line"></i>
                                <span className="ml-1">Multi Level</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="true">
                                <li>
                                    <Link to="/#">Level 1.1</Link>
                                </li>
                                <li>
                                    <Link to="/#" className="has-arrow">
                                        Level 1.2
                                    </Link>
                                    <ul className="sub-menu" aria-expanded="true">
                                        <li>
                                            <Link to="/#">Level 2.1</Link>
                                        </li>
                                        <li>
                                            <Link to="/#">Level 2.2</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => {
    return { ...state.Layout };
};

export default withRouter(
    connect(mapStatetoProps, {
        changeLayout,
        changeSidebarTheme,
        changeSidebarType,
        changeLayoutWidth,
        changePreloader,
    })(SidebarContent)
);
