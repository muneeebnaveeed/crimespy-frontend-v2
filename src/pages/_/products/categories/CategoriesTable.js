import React, { useCallback, useState } from "react";
import { Table } from "reactstrap";

//Import Breadcrumb
import { useDispatch, useSelector, batch } from "react-redux";
import api, { useModifiedQuery } from "helpers/query";
import qs from "query-string";

import dayjs from "dayjs";
import Spinner from "components/Common/Spinner";
import Error from "components/Common/Error";
import Badge from "reactstrap/lib/Badge";
import Button from "components/Common/Button";
import { setDeleteCategoryId, toggleDeleteCategoryDisclosure } from "store/routes/categories/actions";
import Th from "components/Common/Th";
import useCategoriesQuery from "./useCategoriesQuery";
import { ButtonGroup } from "reactstrap/lib";
import { toggleCreateProductDisclosure } from "store/routes/products/actions";

function CategoriesTable() {
    const { page, pageSize, sort, order, ...state } = useSelector((state) => ({
        ...state.Categories,
    }));
    const dispatch = useDispatch();

    const { data, isLoading, isError, refetch } = useCategoriesQuery();

    const handleDeleteCategory = useCallback(
        (id) => {
            batch(() => {
                dispatch(toggleDeleteCategoryDisclosure());
                dispatch(setDeleteCategoryId(id));
            });
        },
        [dispatch]
    );

    return (
        <>
            <Table responsive size="xl" borderless hover style={{ minWidth: "706px" }} className="position-relative">
                {isLoading && !isError && <Spinner />}
                {isError && !isLoading && <Error for="categories" onClick={refetch} />}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Date</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map?.(({ id, name, products, created_by_user, created_at }, index) => {
                        const date = dayjs(created_at).format("D MMM, YYYY");
                        return (
                            <tr key={`categories-tr-${index}`}>
                                <Th scope="row">{id}</Th>
                                <Th>
                                    {name}{" "}
                                    {!!products?.length && (
                                        <Badge className="px-2 ml-2" color="primary">
                                            {products?.length}
                                        </Badge>
                                    )}
                                </Th>
                                <Th>{created_by_user.name}</Th>
                                <Th>{date}</Th>
                                <Th>
                                    <ButtonGroup>
                                        <Button color="light" size="sm" onClick={() => handleDeleteCategory(id)}>
                                            <i className="fas fa-trash-alt" />
                                        </Button>
                                        <Button
                                            color="success"
                                            size="sm"
                                            onClick={() => dispatch(toggleCreateProductDisclosure(id))}
                                        >
                                            <i className="fas fa-plus" />
                                        </Button>
                                    </ButtonGroup>
                                </Th>
                            </tr>
                        );
                    })}
                </tbody>
                {!data?.length && !isLoading && !isError && (
                    <caption style={{ textAlign: "center" }}>No categories found</caption>
                )}
            </Table>
        </>
    );
}

export default CategoriesTable;
