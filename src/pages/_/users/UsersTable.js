import React, { useCallback } from "react";
import { Card, CardBody, Table } from "reactstrap";

//Import Breadcrumb
import { batch, useDispatch, useSelector } from "react-redux";
import { fetchProducts, useModifiedQuery } from "helpers/query";

import dayjs from "dayjs";
import Spinner from "components/Common/Spinner";
import Error from "components/Common/Error";
import Button from "components/Common/Button";
import { setDeleteProductId, toggleDeleteProductDisclosure } from "store/routes/products/actions";
import Th from "components/Common/Th";
import useProductsQuery from "./useUsersQuery";

function UsersTable() {
    // const { page, pageSize, sort, order } = useSelector(
    //   (state) => state.Products
    // );
    const dispatch = useDispatch();

    const { data, isLoading, isError, refetch } = useProductsQuery();

    const handleDeleteCategory = useCallback(
        (id) => {
            batch(() => {
                dispatch(toggleDeleteProductDisclosure());
                dispatch(setDeleteProductId(id));
            });
        },
        [dispatch]
    );

    return (
        <Card>
            {isLoading && !isError && <Spinner />}
            {isError && !isLoading && <Error for="users" onClick={refetch} />}
            <CardBody className="pt-0" style={{ minHeight: 150 }}>
                <Table
                    responsive
                    size="xl"
                    borderless
                    hover
                    style={{ minWidth: "706px" }}
                    className="position-relative"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Date</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(({ id, name, category, created_by_user, created_at }, index) => {
                            const date = dayjs(created_at).format("D MMM, YYYY");
                            return (
                                <tr key={`products-tr-${index}`}>
                                    <Th scope="row">{id}</Th>
                                    <Th>{name}</Th>
                                    <Th>{category?.name}</Th>
                                    <Th>{created_by_user.name}</Th>
                                    <Th>{date}</Th>
                                    <Th>
                                        <Button color="light" size="sm" onClick={() => handleDeleteCategory(id)}>
                                            <i className="fas fa-trash-alt" />
                                        </Button>
                                    </Th>
                                </tr>
                            );
                        })}
                    </tbody>
                    {!data?.length && !isLoading && !isError && (
                        <caption style={{ textAlign: "center" }}>No products found</caption>
                    )}
                </Table>
            </CardBody>
        </Card>
    );
}

export default UsersTable;
