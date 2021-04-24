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

const permissions = {
    map: [{ key: "mapUser", label: "map access" }],
    users: [
        { key: "CreateUsers", label: "Create Users" },
        { key: "givePermissions", label: "Give Permissions" },
        { key: "DeleteUser", label: "Delete User" },
    ],
    Posts: [
        { key: "VerifyPost", label: "Verify Posts" },
        { key: "DeleteOthersPost", label: "Delete Others Post" },
    ],
    Feed: [
        { key: "CreatePost", label: "Create Post" },
        { key: "PostComment", label: "Comment on Post" },
        { key: "confirmPost", label: "up and down vote" },
    ],
    CrimeChart: [
        { key: "CreateChart", label: "Create Crime Chart" },
        { key: "DeleteChart", label: "Delete Crime Chart" },
    ],
};

const Permissions = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsupdatin] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleSubmit = async (values, form) => {
        // const user = getLoggedInUser();
        setIsupdatin(true);
        const info = {
            userPermission: {
                mapUser: values.mapUser,
                CreateUsers: values.CreateUsers,
                DeleteUser: values.DeleteUser,
                givePermissions: values.givePermissions,
                VerifyPost: values.VerifyPost,
                DeleteOthersPost: values.DeleteOthersPost,
                CreatePost: values.CreatePost,
                PostComment: values.PostComment,
                confirmPost: values.confirmPost,
                CreateChart: values.CreateChart,
                DeleteChart: values.DeleteChart,
            },
        };

        try {
            console.log("values", values);
            // for permissions
            await db.collection("users").doc(user.uid).update(info);
            console.log("updated");
            showSuccessToast({ message: "Permission updated Successfully" });
            setIsupdatin(false);
        } catch (err) {
            console.error(err.message);
        }
        console.log(values);
        form.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            mapUser: false,
            CreateUsers: false,
            DeleteUser: false,
            givePermissions: false,
            VerifyPost: false,
            DeleteOthersPost: false,
            CreatePost: false,
            PostComment: false,
            confirmPost: false,
            CreateChart: false,
            DeleteChart: false,
        },
        // onSubmit: handleSubmit,
        onSubmit: handleSubmit,
        validate: (values) => {
            let errors = {};

            // const validationErrors = mapPermissionSchema.validate(values, { abortEarly: false })?.error?.details;

            // if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    console.log(formik.errors);
    console.log(formik.values);
    return (
        <Card>
            <CardBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                >
                    <div className="d-flex flex-wrap mb-4" style={{ gap: "5rem" }}>
                        {Object.keys(permissions).map((permissionGroup) => (
                            <div>
                                <div className="page-title-box pb-0">
                                    <h4>{permissionGroup}</h4>
                                </div>
                                {permissions[permissionGroup].map((permission, index) => (
                                    <div className="mb-2">
                                        <FormGroup check>
                                            <Label check style={{ cursor: "pointer" }}>
                                                <Input
                                                    type="checkbox"
                                                    name={permission.key}
                                                    id={permission.key}
                                                    onChange={formik.handleChange}
                                                    value={formik.value}
                                                    style={{ cursor: "pointer" }}
                                                />{" "}
                                                {permission.label}
                                            </Label>
                                        </FormGroup>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* <div className="page-title-box pb-0">
                        <h4>Users</h4>
                    </div>
                    <Label>Set User Permission</Label> */}

                    <Button w="118px" type="submit" color="primary" loading={isUpdating}>
                        Save Changes
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
};
export default Permissions;
