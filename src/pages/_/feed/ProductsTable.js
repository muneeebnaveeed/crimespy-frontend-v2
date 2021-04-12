import React, { useCallback } from "react";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";

//Import Breadcrumb
import { batch, useDispatch, useSelector } from "react-redux";
import { fetchProducts, useModifiedQuery } from "helpers/query";

import dayjs from "dayjs";
import Spinner from "components/Common/Spinner";
import Error from "components/Common/Error";
import Button from "components/Common/Button";
import { setDeleteProductId, toggleDeleteProductDisclosure } from "store/routes/products/actions";
import Th from "components/Common/Th";
import useProductsQuery from "./useProductsQuery";
import Breadcrumbs from "components/Common/Breadcrumb";

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "Feed", link: "/dashboard" },
];

function ProductsTable() {
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Feed" breadcrumbItems={breadcrumbItems} />

                <Row>
                    <Col xs={7} className="align-self-center">
                        <Card>
                            <CardBody></CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductsTable;
