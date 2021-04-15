import React, { useState } from "react";
import { Row, Col, Container } from "reactstrap";

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>{year} © Crimespy</Col>
                        {/* <Col sm={6}>
                            <div className="text-sm-right d-none d-sm-block">
                                Crafted with <i className="mdi mdi-heart text-danger"></i> by Muneeb
                                Naveed
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
