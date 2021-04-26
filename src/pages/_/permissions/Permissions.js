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
    Button,
} from "reactstrap";

import { userPermissionSchema } from "helpers/schema";
import { showSuccessToast } from "helpers/showToast";
import { db, getLoggedInUser } from "helpers/auth";
import { useQueryClient } from "react-query";
import { isCompositeComponentWithType } from "react-dom/test-utils";

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

const Permissions = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsupdatin] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // const handleSubmit = async (values, form) => {
    //     // const user = getLoggedInUser();
    //     setIsupdatin(true);

    //     try {
    //         console.log("values", values);
    //         // for permissions
    //         await db.collection("users").doc(user.uid).update(info);
    //         console.log("updated");
    //         showSuccessToast({ message: "Permission updated Successfully" });
    //         setIsupdatin(false);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    //     form.resetForm();
    // };

    const handleChange = (checked, permissionGroup, key) => {
        let updatedPermissions = formik.values[permissionGroup];

        if (!checked) updatedPermissions = updatedPermissions.filter((permission) => permission !== key);
        else if (checked && !updatedPermissions.includes(key)) updatedPermissions.push(key);

        formik.setFieldValue(permissionGroup, updatedPermissions);
    };

    const formik = useFormik({
        initialValues: getFormikInitialValues(),
        validateOnChange: false,
    });

    return (
        <Card>
            <CardBody>
                <Form
                // onSubmit={(e) => {
                //     e.preventDefault();
                //     formik.handleSubmit();
                // }}
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

                    {/* <div className="page-title-box pb-0">
                        <h4>Users</h4>
                    </div>
                    <Label>Set User Permission</Label> */}

                    <Button w="118px" type="submit" color="primary" loading={isUpdating}>
                        Save Changes
                    </Button>
                    <Button w="118px" type="submit">
                        Back
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
};
export default Permissions;
