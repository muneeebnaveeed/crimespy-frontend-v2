import React, { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";

// Import Breadcrumb
import { batch, useDispatch, useSelector } from "react-redux";
import { fetchProducts, useModifiedQuery } from "helpers/query";
import Select from "../../../components/Common/Select";

import dayjs from "dayjs";
import Spinner from "components/Common/Spinner";
import Error from "components/Common/Error";
import Button from "components/Common/Button";
import { setDeleteProductId, toggleDeleteProductDisclosure } from "store/routes/products/actions";
import Th from "components/Common/Th";
import useProductsQuery from "./useUsersQuery";
import { db, getLoggedInUser } from "helpers/auth";
import useDisclosure from "helpers/useDisclosure";
import Confirmation from "./Confirmation";
import { useQueryClient } from "react-query";
import { showSuccessToast } from "helpers/showToast";
import { useHistory } from "react-router";

const fetchUser = async () => {
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
const roles = [
    {
        value: "admin",
        label: "admin",
    },
    {
        value: "user",
        label: "user",
    },
];

const handleROLE = async (role, id) => {
    console.log(role);

    try {
        const newRole = {
            role: role.value,
        };

        await db.collection("users").doc(id).update(newRole);
    } catch (err) {
        console.error(err.message);
    }
};
function UsersTable(props) {
    const users = useModifiedQuery("users", fetchUser);
    const queryClient = useQueryClient();
    const { isOpen, toggle } = useDisclosure();
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: isOpen, title: "", subTitle: "" });
    const [isDeleting, setIsdeleting] = useState(false);
    const history = useHistory();
    // const [isopen, setIsopen] = useState(false);
    const dispatch = useDispatch();

    // console.log(users);

    var res;

    const { data, isLoading, isError, refetch } = useProductsQuery();

    const onDelete = async (user) => {
        setIsdeleting(true);
        await db.collection("users").doc(user.id).delete();
        await queryClient.invalidateQueries("users");
        // setIsopen(!isopen);
        setIsdeleting(false);
        setConfirmDialog(!confirmDialog);
        showSuccessToast({ message: "Post has been created" });
    };

    return (
        <>
            <Card>
                {" "}
                {isLoading && !isError && <Spinner />}
                {isError && !isLoading && <Error for="users" onClick={refetch} />}
                <CardBody className="pt-0" style={users.data?.length ? {} : { minHeight: 350 }}>
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
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data?.map((user, i) => (
                                <>
                                    <tr key={i}>
                                        <Th scope="row" key={i}>
                                            {(res = user.uid.substring(user.uid.length - 3, user.uid.length))}
                                            {}{" "}
                                        </Th>
                                        <Th>{user.displayName}</Th>
                                        <Th>{user.email}</Th>
                                        {/*  */}
                                        <Th>
                                            <Select
                                                options={roles}
                                                defaultValue={{
                                                    value: user.role,
                                                    label: user.role,
                                                }}
                                                onChange={(role) => handleROLE(role, user.uid)}
                                            />
                                        </Th>
                                        <Th>
                                            <Button
                                                color="light"
                                                size="sm"
                                                onClick={() =>
                                                    setConfirmDialog({
                                                        isOpen: toggle,
                                                        onConfirm: () => {
                                                            onDelete(user);
                                                        },
                                                    })
                                                }
                                            >
                                                <i className="fas fa-trash-alt" />
                                            </Button>
                                            <Button
                                                color="light"
                                                size="sm"
                                                onClick={() => history.push(`/users/edit?user=${user.uid}`)}
                                            >
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
            <Confirmation
                isOpen={isOpen}
                toggle={toggle}
                onDelete={onDelete}
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                isDeleting={isDeleting}
                setIsdeleting={setIsdeleting}
            />
        </>
    );
}

export default UsersTable;
