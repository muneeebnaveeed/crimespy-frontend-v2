import React, { useCallback, useState } from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import PostTable from "./PostTable";

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "Statistics", link: "/statistics" },
];

function Posts() {
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Posts" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col lg={12}></Col>
                </Row>
                <Row>
                    <Col lg={12}></Col>
                </Row>
            </Container>
        </div>
    );
}

export default Posts;
