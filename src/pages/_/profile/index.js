import React, { useState, useEffect, useRef } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import SetuserName from "./SetName";
import Deactivate from "./Deactivate";
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
import UserDisplay from "../permissions/UserDisplay";
import { getLoggedInUser } from "helpers/auth";

const user = getLoggedInUser();

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "profile", link: "/profile" },
];

const profile = () => {
    console.log(user);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col xs={12}>
                            <UserDisplay user={user} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SetuserName />
                            <SetBio />
                            <Deactivate />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
export default profile;
