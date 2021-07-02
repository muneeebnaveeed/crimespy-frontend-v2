import React, { useState } from 'react';
import { Row, Col, Container } from 'reactstrap';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>{year} © Crimespy</Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Footer;
