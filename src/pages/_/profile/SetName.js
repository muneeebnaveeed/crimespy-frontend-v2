import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Collapse, Form, FormFeedback, FormGroup, Input, Card, CardBody, Label } from 'reactstrap';
import { userSchema } from 'helpers/schema';
import { db, getLoggedInUser } from 'helpers/auth';
import Button from 'components/Common/Button';
import { showSuccessToast } from 'helpers/showToast';
import { useQueryClient } from 'react-query';
import Select from 'components/Common/Select';

const SetName = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsupdatin] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (values, form) => {
        console.log(values);
        const user = getLoggedInUser();
        setIsupdatin(true);
        const info = {
            displayName: values.fullname,
            dob: values.dob,
            gender: values.gender,
        };
        console.log('up here ', info);

        try {
            console.log(info);
            axios.put(`https://crimespy.herokuapp.com/users/id/${user.uid}`, info).then((res) => {
                console.log('reply from cache', res);
            });
            // await db.collection("users").doc(user.uid).update(info);
            console.log('updated');
            showSuccessToast({ message: 'General Information has been updated successfully' });
            setIsupdatin(false);
        } catch (err) {
            console.error(err.message);
        }

        form.resetForm();
    };

    const genders = [
        {
            value: 'Male',
            label: 'Male',
        },
        {
            value: 'Female',
            label: 'Female',
        },
    ];

    const formik = useFormik({
        initialValues: {
            fullname: '',
            dob: '',
            gender: genders[0].value,
        },
        // onSubmit: handleSubmit,
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};

            const validationErrors = userSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    console.log(formik.errors);
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }} size="lg" block outline>
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
                                    invalid={Boolean(formik.errors.fullname)}
                                    onChange={formik.handleChange}
                                    value={formik.values.fullname}
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
                                    invalid={Boolean(formik.errors.dob)}
                                    onChange={formik.handleChange}
                                    value={formik.values.dob}
                                />
                                <FormFeedback> {formik.errors.dob}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender</Label>
                                <Select
                                    options={genders}
                                    defaultValue={genders[0]}
                                    onChange={(gender) => formik.setFieldValue('gender', gender.value)}
                                />
                                <FormFeedback> {formik.errors.gender}</FormFeedback>
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
export default SetName;
