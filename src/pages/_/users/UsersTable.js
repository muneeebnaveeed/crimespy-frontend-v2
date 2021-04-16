import React, { useCallback, useEffect } from "react";
import { Card, CardBody, Table } from "reactstrap";

// Import Breadcrumb
import { batch, useDispatch, useSelector } from "react-redux";
import { fetchProducts, useModifiedQuery } from "helpers/query";

import dayjs from "dayjs";
import Spinner from "components/Common/Spinner";
import Error from "components/Common/Error";
import Button from "components/Common/Button";
import { setDeleteProductId, toggleDeleteProductDisclosure } from "store/routes/products/actions";
import Th from "components/Common/Th";
import useProductsQuery from "./useUsersQuery";
import { db, getLoggedInUser } from "helpers/auth";

const fetchUser = async () => {
    const user = getLoggedInUser();
    const snapshot = db.collection("users").get();
    const docs = (await snapshot).docs;

    return new Promise((resolve, reject) => {
        const users = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        resolve(users);
    });
};

function UsersTable(props) {
    const users = useModifiedQuery("users", fetchUser);

    const dispatch = useDispatch();

    // console.log(users);

    const { data, isLoading, isError, refetch } = useProductsQuery();

    const onDelete = (user) => {
       
        db.collection('users').doc(user.id).delete()
                           }

    return (
        <Card>
            {" "}
            {isLoading && !isError && <Spinner />}
            {isError && !isLoading && <Error for="users" onClick={refetch} />}
            <CardBody className="pt-0" style={{ minHeight: 350 }}>
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
                            <th>id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {" "}
                        {users.data?.map((user, i) => (
                            <>
                                <tr key={i}>
                                    <Th scope="row" key={i}>
                                        {user.uid}
                                    </Th>
                                    <Th>{user.displayName}</Th>
                                    <Th>{user.email}</Th>
                                    {/*  */}
                                    <Th>{user.role}</Th>
                                    <Th>
                                        <Button color="light" size="sm" onClick={() =>onDelete(user)}>
                                            <i className="fas fa-trash-alt" />
                                        </Button>
                                    </Th>
                                </tr>
                            </>
                        ))}{" "}
                    </tbody>
                    {!data?.length && !isLoading && !isError && (
                        <caption style={{ textAlign: "center" }}>No products found</caption>
                    )}{" "}
                </Table>
            </CardBody>
        </Card>
    );
}

export default UsersTable;
