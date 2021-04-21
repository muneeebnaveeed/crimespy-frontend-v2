import React, { useCallback, useState } from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import UsersTable from "./UsersTable";

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "Permission", link: "/Permission" },
];

const Permission = () => {
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Users" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col lg={12}></Col>
                </Row>
            </Container>
        </div>
    );
};
export default Permission;
