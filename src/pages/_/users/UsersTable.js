import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ButtonGroup, Card, CardBody, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

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
import useUsersQuery from "./useUsersQuery";
import { db, getLoggedInUser } from "helpers/auth";
import useDisclosure from "helpers/useDisclosure";
import { useQueryClient } from "react-query";
import { showSuccessToast } from "helpers/showToast";
import { useHistory } from "react-router";
import usePermissions from "helpers/usePermissions";

const fetchUsers = async () => {
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

const fetchPresets = async () => {
    const snapshot = db.collection("presets").get();
    const docs = (await snapshot).docs;

    return new Promise((resolve, reject) => {
        const presets = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const modifiedPresets = presets.map((preset) => ({
            value: preset,
            label: preset.title,
        }));
        resolve(modifiedPresets);
    });
};

function UsersTable(props) {
    const users = useModifiedQuery("users", fetchUsers);
    const presets = useModifiedQuery("presets", fetchPresets);
    const queryClient = useQueryClient();
    const { isOpen, toggle, onOpen } = useDisclosure();
    const [isDeletingUser, setIsDeletingUser] = useState(false);
    const [changingRole, setChangingRole] = useState(null);
    const history = useHistory();

    const loggedInUser = useMemo(() => getLoggedInUser(), []);
    const dispatch = useDispatch();

    const isAuthorized = usePermissions("users");

    const handleChangeRole = useCallback(async (role, id) => {
        setChangingRole(id);
        try {
            await db.collection("users").doc(id).update({
                role: role.value.title,
                permissions: role.value.permissions,
            });
            await queryClient.invalidateQueries("users");
        } catch (err) {
            console.error(err.message);
        }
        setChangingRole(null);
    }, []);

    const toggleModal = useCallback(() => {
        if (!isDeletingUser) toggle();
    }, [isDeletingUser, toggle]);

    return (
        <>
            <Card>
                {((users.isLoading && !users.isError) || (presets.isLoading && !presets.isError)) && <Spinner />}
                {((users.isError && !users.isLoading) || (presets.isError && !presets.isLoading)) && (
                    <Error
                        for={users.isError ? "users" : "roles"}
                        onClick={users.isError ? users.refetch : presets.refetch}
                    />
                )}
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
                                <th className="bold-text">#</th>
                                <th className="bold-text">Username</th>
                                <th className="bold-text">Email</th>
                                <th className="bold-text">Role Presets</th>
                                <th className="bold-text">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data?.map((user, i) => {
                                const isSelectBusy = changingRole === user.uid;
                                return (
                                    <>
                                        <tr key={i}>
                                            <Th scope="row" key={i}>
                                                {user.uid.substring(user.uid.length - 3, user.uid.length)}
                                            </Th>
                                            <Th>{user.displayName}</Th>
                                            <Th>{user.email}</Th>
                                            <Th>
                                                <Select
                                                    // as={AsyncSelect}
                                                    options={presets.data}
                                                    defaultValue={{
                                                        value: user.permissions,
                                                        label: user.role,
                                                    }}
                                                    onChange={(role) =>
                                                        role.label !== user.role
                                                            ? handleChangeRole(role, user.uid)
                                                            : null
                                                    }
                                                    isLoading={isSelectBusy}
                                                    isDisabled={isSelectBusy}
                                                />
                                            </Th>
                                            <Th>
                                                <ButtonGroup>
                                                    {isAuthorized("edit") && (
                                                        <Button
                                                            color="light"
                                                            size="sm"
                                                            onClick={() => history.push(`/users/edit?user=${user.uid}`)}
                                                        >
                                                            <i class="fas fa-user-edit" />
                                                        </Button>
                                                    )}
                                                    {isAuthorized("delete") && (
                                                        <Button color="light" size="sm" onClick={onOpen}>
                                                            <i className="fas fa-trash-alt" />
                                                        </Button>
                                                    )}
                                                </ButtonGroup>
                                            </Th>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                        {!users.data?.length && !users.isLoading && !users.isError && (
                            <caption style={{ textAlign: "center" }}>No users found</caption>
                        )}
                    </Table>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} toggle={toggleModal} centered>
                <ModalHeader>Delete User</ModalHeader>
                <ModalBody>
                    <Label>Are you sure you want to delete this user?</Label>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" w="55.5px" size="sm" onClick={toggle}>
                        No
                    </Button>
                    <Button w="55.5px" color="primary" size="sm" onClick={toggle} loading={isDeletingUser}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UsersTable;
