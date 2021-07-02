/* eslint-disable no-new */
import React, { Component } from 'react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { withRouter, Link } from 'react-router-dom';

import { getLoggedInUser, setSession, signOutFireabse, isUserAuthorized } from 'helpers/auth';
import { connect } from 'react-redux';
import { sideBarRoutes } from 'routes';
import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    changePreloader,
} from '../../store/actions';

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

    handleLogout = async () => {
        try {
            await signOutFireabse();
            setSession(null);
            this.props.history.push('/login');
        } catch (err) {
            console.error(err.message);
        }
    };

    activateParentDropdown = (item) => {
        item.classList.add('active');
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add('mm-active');
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add('mm-show');

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add('mm-active'); // li
                    parent3.childNodes[0].classList.add('mm-active'); // a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add('mm-active');
                    }
                }
            }
            return false;
        }
        return false;
    };

    initMenu() {
        new MetisMenu('#side-menu');

        let matchingMenuItem = null;
        const ul = document.getElementById('side-menu');
        const items = ul.getElementsByTagName('a');
        for (let i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    render() {
        return (
            <>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>

                        {sideBarRoutes.map((route, index) => {
                            if (isUserAuthorized(route.key, this.state.user))
                                return (
                                    <li key={`sidebar-list-item-${index}`}>
                                        <Link
                                            to={`${route.path}${
                                                route.key == 'timeline' ? `?user=${getLoggedInUser().id}` : ``
                                            }`}
                                            className="waves-effect"
                                        >
                                            {route.icon && <i className={route.icon} />}
                                            <span className="ml-1">{route.title}</span>
                                        </Link>
                                    </li>
                                );

                            return null;
                        })}

                        <li key="logout">
                            <Link className="waves-effect" onClick={this.handleLogout}>
                                <i className="ri-shut-down-line align-middle mr-1 " />
                                <span className="ml-1">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

const mapStatetoProps = (state) => ({ ...state.Layout });

export default withRouter(
    connect(mapStatetoProps, {
        changeLayout,
        changeSidebarTheme,
        changeSidebarType,
        changeLayoutWidth,
        changePreloader,
    })(SidebarContent)
);
