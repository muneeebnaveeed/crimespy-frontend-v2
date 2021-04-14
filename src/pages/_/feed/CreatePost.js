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

const CreatePost = () => {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            //image: "",
            // add user from data base
            //user: "",

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
    });

    const [formstate, setFormState] = useState(false);
    const toggleForm = () => {
        setFormState(!formstate);
    };
    console.log(formik.errors);
    return (
        <>
            <div className="PostCreation">
                <p>u can make post here</p>
                <button onClick={toggleForm}>Make Post</button>
            </div>

            <Modal isOpen={formstate}>
                <ModalHeader>Post Form</ModalHeader>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title :</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                invalid={formik.errors.title}
                                placeholder="Enter a short Title"
                                onChange={formik.handleChange}
                                value={formik.value}
                            />
                            <FormFeedback>{formik.errors.title}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description :</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                invalid={formik.errors.description}
                                placeholder="Enter all detail of event in here atlesat above 150 words"
                                onChange={formik.handleChange}
                                value={formik.value}
                            />
                            <FormFeedback>{formik.errors.description}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location :</Label>
                            <InputGroup>
                                <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    invalid={formik.errors.location}
                                    placeholder="Enter the events location here"
                                    onChange={formik.handleChange}
                                    value={formik.value}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button>Current Location</Button>
                                </InputGroupAddon>
                            </InputGroup>
                            <FormFeedback>{formik.errors.location}</FormFeedback>
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="image">Image :</Label>
                            <Input type="file" name="image" id="image" />
                            <FormText color="muted">allowed files are jpeg jpg or any jpg category</FormText>
                        </FormGroup> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" size="sm" onClick={toggleForm}>
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
