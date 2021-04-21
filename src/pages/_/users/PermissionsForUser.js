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
const PermissionForUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsupdatin] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleSubmit = async (values, form) => {
        const user = getLoggedInUser();
        setIsupdatin(true);
        const info = {
            userPermission: {
                viewUser: values.viewUser,
                createUser: values.createUser,
                deleteUser: values.deleteUser,
            },
        };

        try {
            console.log(info);
            // for permissions
            // await db.collection("users").doc(user.uid).update(info);
            // console.log("updated");
            showSuccessToast({ message: "Permission updated Successfully" });
            setIsupdatin(false);
        } catch (err) {
            console.error(err.message);
        }
        form.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            viewUser: false,
            deleteUser: false,
            createUser: false,
        },
        // onSubmit: handleSubmit,
        onSubmit: handleSubmit,
        validate: (values) => {
            let errors = {};

            const validationErrors = userPermissionSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    console.log(formik.errors);
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }} size="lg" block outline>
                Permission for User
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                formik.handleSubmit();
                            }}
                        >
                            <Label>Set User Permission</Label>
                            <FormGroup check inline>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="viewUser"
                                        id="viewUser"
                                        value={formik.value}
                                        onChange={formik.handleChange}
                                    />{" "}
                                    View Users
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="deleteUser"
                                        id="deleteUser"
                                        value={formik.value}
                                        onChange={formik.handleChange}
                                    />{" "}
                                    Delete Users
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="createUser"
                                        id="createUser"
                                        value={formik.value}
                                        onChange={formik.handleChange}
                                    />{" "}
                                    Create Users
                                </Label>
                            </FormGroup>
                            <Button w="74px" type="submit" color="primary" loading={isUpdating}>
                                Update
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};
export default PermissionForUser;
