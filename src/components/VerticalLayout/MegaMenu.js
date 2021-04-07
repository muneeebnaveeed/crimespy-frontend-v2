import React, { Component } from "react";
import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";

//Import Images
import megamenuImg from "../../assets/images/megamenu-img.png";

class MegaMenu extends Component {
    state = {
        megaMenu: false,
    };
    render() {
        return (
            <React.Fragment>
                <Dropdown
                    className="dropdown-mega d-none d-lg-block ml-2"
                    isOpen={this.state.megaMenu}
                    toggle={() => {
                        this.setState({ megaMenu: !this.state.megaMenu });
                    }}
                >
                    <DropdownToggle
                        tag="button"
                        type="button"
                        caret
                        className="btn header-item waves-effect"
                    >
                        Mega Menu
                        <i className="mdi mdi-chevron-down"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-megamenu">
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    <Col md={4}>
                                        <h5 className="font-size-14 mt-0">UI Components</h5>
                                        <ul className="list-unstyled megamenu-list">
                                            <li>
                                                <Link to="#">Lightbox</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Range Slider</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Sweet Alert</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Rating</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Forms</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Tables</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Charts</Link>
                                            </li>
                                        </ul>
                                    </Col>

                                    <Col md={4}>
                                        <h5 className="font-size-14 mt-0">Applications</h5>
                                        <ul className="list-unstyled megamenu-list">
                                            <li>
                                                <Link to="#">Ecommerce</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Calendar</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Email</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Projects</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Tasks</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Contacts</Link>
                                            </li>
                                        </ul>
                                    </Col>

                                    <Col md={4}>
                                        <h5 className="font-size-14 mt-0">Extra Pages</h5>
                                        <ul className="list-unstyled megamenu-list">
                                            <li>
                                                <Link to="#">Light Sidebar</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Compact Sidebar</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Horizontal layout</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Maintenance</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Coming Soon</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Timeline</Link>
                                            </li>
                                            <li>
                                                <Link to="#">FAQs</Link>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={4}>
                                <Row>
                                    <Col sm={6}>
                                        <h5 className="font-size-14 mt-0">UI Components</h5>
                                        <ul className="list-unstyled megamenu-list">
                                            <li>
                                                <Link to="#">Lightbox</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Range Slider</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Sweet Alert</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Rating</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Forms</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Tables</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Charts</Link>
                                            </li>
                                        </ul>
                                    </Col>

                                    <Col sm={5}>
                                        <div>
                                            <img
                                                src={megamenuImg}
                                                alt=""
                                                className="img-fluid mx-auto d-block"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default MegaMenu;
