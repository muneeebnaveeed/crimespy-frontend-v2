import React, { useCallback, useState } from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import UsersTable from "./UsersTable";

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "Users", link: "/users" },
];

function Users() {
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Users" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col lg={12}>
                        <UsersTable />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Users;
