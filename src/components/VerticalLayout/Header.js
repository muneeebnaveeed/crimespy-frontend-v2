import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Form, FormGroup, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

import { Link } from 'react-router-dom';

import ProfileMenu from '../CommonForBoth/ProfileMenu';

// Import Megamenu
import MegaMenu from './MegaMenu';

// Import logo Images
import logosmdark from '../../assets/images/logo-sm-dark.png';
import logodark from '../../assets/images/logo-dark.png';
import logosmlight from '../../assets/images/logo-sm-light.png';
import logolight from '../../assets/images/logo-light.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    /**
     * Toggle sidebar
     */
    toggleMenu() {
        this.props.toggleMenuCallback();
    }

    render() {
        return (
            <>
                <header id="page-topbar">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box">
                                <Link to="#" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src={logosmdark} alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src={logodark} alt="" height="20" />
                                    </span>
                                </Link>

                                <Link to="#" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src={logosmlight} alt="" height="40" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src={logolight} alt="" height="40" />
                                    </span>
                                </Link>
                            </div>

                            <Button
                                size="sm"
                                color="none"
                                type="button"
                                onClick={this.toggleMenu}
                                className="px-3 font-size-24 header-item waves-effect"
                                id="vertical-menu-btn"
                            >
                                <i className="ri-menu-2-line align-middle" />
                            </Button>
                        </div>

                        <div className="d-flex">
                            <ProfileMenu />
                        </div>
                    </div>
                </header>
            </>
        );
    }
}

const mapStatetoProps = (state) => {
    const { layoutType } = state.Layout;
    return { layoutType };
};

export default connect(mapStatetoProps, null)(Header);
