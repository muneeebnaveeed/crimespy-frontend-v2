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
import { bioSchema } from "helpers/schema";
import { showSuccessToast } from "helpers/showToast";
const SetBio = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const formik = useFormik({
        initialValues: {
            qaulification: "",
            address: "",
            job: "",
        },
        // onSubmit: handleSubmit,
        onSubmit: (values) => {
            console.log("Form data", values);
            showSuccessToast({ message: "Post has been created" });
        },
        // validate: (values) => {
        //     let errors = {};

        //     const validationErrors = bioSchema.validate(values, { abortEarly: false })?.error?.details;

        //     if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

        //     return errors;
        // },
        // validateOnChange: false,
    });
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }} size="lg" block outline>
                Update User Bio
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <Label>What is Your qualification :</Label>
                                <Input
                                    type="textarea"
                                    name="qaulification"
                                    id="qaulification"
                                    placeholder="Enter Qualification Here"
                                    invalid={formik.errors.qualification && formik.touched.qualification}
                                    onChange={formik.handleChange}
                                    value={formik.value}
                                    rows={4}
                                />
                                <FormFeedback> {formik.errors.qualification}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Where do you live</Label>
                                <Input
                                    type="textarea"
                                    name="address"
                                    id="address"
                                    invalid={formik.errors.address && formik.touched.address}
                                    onChange={formik.handleChange}
                                    value={formik.value}
                                    placeholder="Enter your Address"
                                    rows={4}
                                />
                                <FormFeedback> {formik.errors.address}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>What Are you doing for a living</Label>

                                <Input
                                    type="textarea"
                                    name="job"
                                    id="job"
                                    invalid={formik.errors.job && formik.touched.job}
                                    onChange={formik.handleChange}
                                    value={formik.value}
                                    placeholder="Enter what you are doing for a living "
                                    rows={4}
                                />
                                <FormFeedback> {formik.errors.job}</FormFeedback>
                            </FormGroup>
                            <Button w="74px" loading={false} type="submit" color="primary">
                                Update
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};
export default SetBio;
