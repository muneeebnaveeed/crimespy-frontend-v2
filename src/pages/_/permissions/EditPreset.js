import Button from "components/Common/Button";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Form,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    FormText,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
} from "reactstrap";
import { permissions } from "config";
import { preSetSchema } from "helpers/schema";
import { useFormik } from "formik";

const EditPreset = ({}) => {
    const handleSubmit = () => {
        console.log(formik.values);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            let errors = {};

            const validationErrors = preSetSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    return (
        <>
            <Modal isOpen={true}>
                <ModalHeader>Update Preset</ModalHeader>
                <Form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label>Title</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                        <i className="fas fa-tags " />
                                    </div>
                                </InputGroupAddon>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    invalid={Boolean(formik.errors.title)}
                                />
                                <FormFeedback>{formik.errors.title}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
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
                                                                    formik.handleChange(
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
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Form>
            </Modal>
        </>
    );
};
export default EditPreset;
