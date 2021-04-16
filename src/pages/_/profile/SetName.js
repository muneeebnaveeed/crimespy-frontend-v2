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
const SetName = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const formik = useFormik({
        initialValues: {
            fullname: "",
            dob: "",
            gender: "",
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
                Update General info
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Form onSubmit={formik.handleSubit}>
                            <FormGroup>
                                <Label>Full-Name :</Label>
                                <Input type="text" name="fullname" id="fullname" placeholder="Enter Full Name" />
                                <FormFeedback> {formik.errors.fullname}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Date of Birth :</Label>
                                <Input type="date" name="dob" id="dob" placeholder="Select your date of birth" />
                                <FormFeedback> {formik.errors.dob}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender:</Label>
                                <Input type="select" name="gender" id="gender">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Shemale</option>
                                </Input>
                                <FormFeedback> {formik.errors.gender}</FormFeedback>
                            </FormGroup>
                            <Button type="submit">Update</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};
export default SetName;
