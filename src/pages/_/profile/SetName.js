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
import { userSchema } from "helpers/schema";
import { db, getLoggedInUser } from "helpers/auth";
import Button from "components/Common/Button";
import { showSuccessToast } from "helpers/showToast";
import { useQueryClient } from "react-query";
import Select from "components/Common/Select";
const SetName = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsupdatin] = useState(false);
    const queryClient = useQueryClient();
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (values) => {
        console.log(values);
        const user = getLoggedInUser();
        setIsupdatin(true);
        const info = {
            displayName: values.fullname,
            dob: values.dob,
            gender: values.gender,
        };

        try {
            console.log(info);
            await db.collection("users").doc(user.uid).update(info);
            console.log("updated");
            showSuccessToast({ message: "General Information has been updated successfully" });
            setIsupdatin(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const gender = [
        {
            value: "Male",
            label: "Male",
        },
        {
            value: "Female",
            label: "Female",
        },
    ];

    const formik = useFormik({
        initialValues: {
            fullname: "",
            dob: "",
            gender: gender[0].value,
        },
        // onSubmit: handleSubmit,
        onSubmit: handleSubmit,
        validate: (values) => {
            let errors = {};

            const validationErrors = userSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });
    console.log(formik.errors);
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }} size="lg" block outline>
                Update General info
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    placeholder="Enter Full Name"
                                    invalid={formik.errors.fullname && formik.touched.fullname}
                                    onChange={formik.handleChange}
                                    value={formik.value}
                                />
                                <FormFeedback> {formik.errors.fullname}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Date of Birth</Label>
                                <Input
                                    type="date"
                                    name="dob"
                                    id="dob"
                                    placeholder="Select your date of birth"
                                    invalid={formik.errors.dob && formik.touched.dob}
                                    onChange={formik.handleChange}
                                    value={formik.value}
                                />
                                <FormFeedback> {formik.errors.dob}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender</Label>
                                <Select
                                    options={gender}
                                    defaultValue={gender[0]}
                                    onChange={(gender) => formik.setFieldValue("gender", gender.value)}
                                />
                                <FormFeedback> {formik.errors.gender}</FormFeedback>
                            </FormGroup>
                            <Button w="74px" loading={false} type="submit" color="primary" loading={isUpdating}>
                                Update
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};
export default SetName;
