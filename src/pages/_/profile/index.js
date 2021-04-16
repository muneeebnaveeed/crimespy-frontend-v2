import React, { useState, useEffect, useRef } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import SetuserName from "./SetName";
import {
    Col,
    Collapse,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Label,
    Row,
    Button,
} from "reactstrap";
import SetBio from "./SetBio";

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "profile", link: "/profile" },
];

const profile = () => {
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col xs={12}>
                            <SetuserName />
                            <SetBio />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
export default profile;
