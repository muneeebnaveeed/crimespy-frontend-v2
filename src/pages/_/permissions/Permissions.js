import React, { useState, useEffect, useRef } from "react";
import { Formik, useFormik } from "formik";
import {
    Col,
    Collapse,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Card,
    CardBody,
    Label,
    Row,
} from "reactstrap";
import useDisclosure from "helpers/useDisclosure";
import RoleModel from "./roleModel";
import { userPermissionSchema } from "helpers/schema";
import { showSuccessToast } from "helpers/showToast";
import { db, getLoggedInUser } from "helpers/auth";
import { useQueryClient } from "react-query";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import Button from "components/Common/Button";
import { useHistory } from "react-router";
import { ButtonGroup } from "reactstrap/lib";

const permissions = {
    map: [],
    users: [
        { key: "create", label: "Create Users" },
        { key: "edit", label: "Give Permissions" },
        { key: "delete", label: "Delete User" },
    ],
    feed: [
        { key: "verify", label: "Verify Posts" },
        { key: "deleteAll", label: "Delete Others Post" },
        { key: "create", label: "Create Post" },
        { key: "createComment", label: "Comment on Post" },
        { key: "createVote", label: "up and down vote" },
    ],
    chart: [
        { key: "create", label: "Create Crime Chart" },
        { key: "delete", label: "Delete Crime Chart" },
    ],
};

const getFormikInitialValues = () => {
    const permissionGroups = Object.keys(permissions);
    const perm = permissionGroups.map((permissionGroup) =>
        permissions[permissionGroup].map((permission) => permission.key)
    );
    let computedPermissions = {};

    permissionGroups.forEach((permissionGroup, index) => {
        computedPermissions[permissionGroup] = perm[index];
    });

    console.log(computedPermissions);

    return computedPermissions;
};

const Permissions = ({ user, userId }) => {
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    const queryClient = useQueryClient();
    const history = useHistory();

    const handleSubmit = async (values, form) => {
        setIsUpdatingUser(true);

        try {
            await db.collection("users").doc(user.uid).update({ permissions: values });
            await queryClient.invalidateQueries(["user", userId]);
            showSuccessToast({ message: "Permission updated Successfully" });
        } catch (err) {
            console.error(err.message);
        }

        setIsUpdatingUser(false);
    };

    const handleChange = (checked, permissionGroup, key) => {
        let updatedPermissions = formik.values[permissionGroup];

        if (!checked) updatedPermissions = updatedPermissions.filter((permission) => permission !== key);
        else if (checked && !updatedPermissions.includes(key)) updatedPermissions.push(key);

        formik.setFieldValue(permissionGroup, updatedPermissions);
    };

    const formik = useFormik({
        initialValues: user.permissions,
        onSubmit: handleSubmit,
        validateOnChange: false,
    });

    useEffect(() => console.log(user.permissions), []);
    const { isOpen, toggle } = useDisclosure();
    return (
        <>
            <Card>
                <CardBody>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        <div className="d-flex flex-wrap mb-4" style={{ gap: "5rem" }}>
                            {Object.keys(permissions).map((permissionGroup, i) => {
                                if (permissions[permissionGroup].length)
                                    return (
                                        <div key={`permission-${i}`}>
                                            <div className="page-title-box pb-0">
                                                <h4>{permissionGroup}</h4>
                                            </div>
                                            {permissions[permissionGroup].map((permission, j) => (
                                                <div className="mb-2" key={`permissions-group-${i * j}`}>
                                                    <FormGroup check>
                                                        <Label check style={{ cursor: "pointer" }}>
                                                            <Input
                                                                type="checkbox"
                                                                name={permission.key}
                                                                id={permission.key}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        e.target.checked,
                                                                        permissionGroup,
                                                                        permission.key
                                                                    )
                                                                }
                                                                checked={formik.values[permissionGroup].includes(
                                                                    permission.key
                                                                )}
                                                                style={{ cursor: "pointer" }}
                                                            />{" "}
                                                            {permission.label}
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            ))}
                                        </div>
                                    );
                            })}
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button color="success" type="button" onClick={toggle}>
                                <i class="fas fa-save" /> Save Preset
                            </Button>
                            <ButtonGroup>
                                <Button color="light" onClick={() => history.push("/users")}>
                                    Go Back
                                </Button>
                                <Button w="118px" loading={isUpdatingUser} type="submit" color="primary">
                                    Save Changes
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <RoleModel isOpen={isOpen} toggle={toggle} permissions={formik.values} />
        </>
    );
};
export default Permissions;
