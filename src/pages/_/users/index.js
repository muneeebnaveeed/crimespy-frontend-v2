import React, { useCallback, useState } from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import UsersTable from "./UsersTable";
import Button from "components/Common/Button";
import { useDispatch } from "react-redux";
import { toggleCreateProductDisclosure, toggleDeleteProductDisclosure } from "store/routes/products/actions";
import CreateProduct from "./CreateProduct";

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "Users", link: "/users" },
];

function Users() {
    const dispatch = useDispatch();
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Users" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col lg={12}>
                            <Button onClick={() => dispatch(toggleCreateProductDisclosure())}>Create Product</Button>
                            <UsersTable />
                        </Col>
                    </Row>
                </Container>
            </div>
            <CreateProduct />
        </>
    );
}

export default Users;
