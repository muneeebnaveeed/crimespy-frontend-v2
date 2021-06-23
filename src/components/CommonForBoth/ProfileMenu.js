import { getLoggedInUser, setSession, signOutFireabse } from "helpers/auth";
import React, { Component } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { setUser } from "store/auth/actions";

// users
import avatar2 from "../../assets/images/users/avatar-2.jpg";

class ProfileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            user: getLoggedInUser(),
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState((prevState) => ({
            menu: !prevState.menu,
        }));
    }

    handleLogout = async () => {
        try {
            await signOutFireabse();
            setSession(null);
            this.props.history.push("/login");
        } catch (err) {
            console.error(err.message);
        }
    };
    handlePermissions = () => {
        this.props.history.push("/profile");
    };

    render() {
        return (
            <React.Fragment>
                <Dropdown
                    isOpen={this.state.menu}
                    onClick={this.handlePermissions}
                    className="d-inline-block user-dropdown"
                >
                    <DropdownToggle
                        tag="button"
                        className="btn header-item waves-effect"
                        id="page-header-user-dropdown"
                    >
                        <img
                            className="rounded-circle header-profile-user mr-1"
                            src={this.state.user.photoURL}
                            alt="Header Avatar"
                        />
                        <span className="d-none d-xl-inline-block ml-1 text-transform">
                            {this.state.user.displayName}
                        </span>
                        {/* <i className="mdi mdi-chevron-down d-none ml-1 d-xl-inline-block"></i> */}
                    </DropdownToggle>
                    {/* <DropdownMenu right>
                        <DropdownItem onClick={this.handlePermissions}>
                            <i className="ri-user-line align-middle mr-1"></i> Profile
                        </DropdownItem>
                        <DropdownItem href="#">
                            <i className="ri-wallet-2-line align-middle mr-1"></i> My Wallet
                        </DropdownItem>
                        <DropdownItem className="d-block" href="#">
                            <span className="badge badge-success float-right mt-1">11</span>
                            <i className="ri-settings-2-line align-middle mr-1"></i> Settings
                        </DropdownItem>
                        <DropdownItem href="#">
                            <i className="ri-lock-unlock-line align-middle mr-1"></i> Lock screen
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="text-danger" onClick={this.handleLogout}>
                            <i className="ri-shut-down-line align-middle mr-1 text-danger"></i> Logout
                        </DropdownItem>
                    </DropdownMenu> */}
                </Dropdown>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = ({ Auth }) => {
    return Auth;
};

export default withRouter(connect(mapStatetoProps, { setUser })(ProfileMenu));
