import React from "react";
import Button from "components/Common/Button";
import { useCallback, useMemo, useRef, useState } from "react";
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
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import { Formik, useFormik } from "formik";
import { Col, Row } from "reactstrap/lib";
import Select from "components/Common/Select";
import { postSchema } from "helpers/schema";

const CreatePost = ({ toggle, isOpen }) => {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            location: "",
        },
        onSubmit: (values) => {
            console.log("Form data", values);
        },
        validate: (values) => {
            let errors = {};

            const validationErrors = postSchema.validate(values, {
                abortEarly: false,
            })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} centered>
                <ModalHeader>Create Post</ModalHeader>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                invalid={formik.errors.title && formik.touched.title}
                                placeholder="Enter a short Title"
                                onChange={formik.handleChange}
                                value={formik.value}
                            />
                            <FormFeedback>{formik.errors.title}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                style={{ minHeight: 100, maxHeight: 300 }}
                                type="textarea"
                                rows={8}
                                name="description"
                                id="description"
                                invalid={formik.errors.description && formik.touched.description}
                                placeholder="Enter all detail of event in here atlesat above 150 words"
                                onChange={formik.handleChange}
                                value={formik.value}
                            />
                            <FormFeedback>{formik.errors.description}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <InputGroup>
                                <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    invalid={formik.errors.location && formik.touched.location}
                                    placeholder="Enter the events location here"
                                    onChange={formik.handleChange}
                                    value={formik.value}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="warning" type="button">
                                        Current Location
                                    </Button>
                                </InputGroupAddon>
                                <FormFeedback>{formik.errors.location}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="image">Image :</Label>
                            <Input type="file" name="image" id="image" />
                            <FormText color="muted">allowed files are jpeg jpg or any jpg category</FormText>
                        </FormGroup> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" size="sm" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button w="55.5px" color="primary" size="sm" type="submit">
                            Post
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
};
export default CreatePost;
