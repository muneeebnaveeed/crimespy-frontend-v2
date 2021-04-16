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
import { userSchema } from "helpers/schema";
const SetBio = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const formik = useFormik({
        initialValues: {
            qualification: "",
            address: "",
            job: "",
        },
        // onSubmit: handleSubmit,
        onSubmit: (values) => {
            console.log("Form data", values);
        },
        validate: (values) => {
            let errors = {};

            const validationErrors = userSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }} size="lg" block outline>
                Update User Bio
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>What is Your qualification :</Label>
                                <Input
                                    type="textarea"
                                    name="qaulification"
                                    id="qaulification"
                                    placeholder="Enter Qualification Here"
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
                                    placeholder="Enter what you are doing for a living "
                                    rows={4}
                                />
                                <FormFeedback> {formik.errors.job}</FormFeedback>
                            </FormGroup>
                            <Button>Update</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};
export default SetBio;
