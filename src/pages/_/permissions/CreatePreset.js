/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';

import {
    Form,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { useFormik } from 'formik';
import { showSuccessToast } from 'helpers/showToast';
import { db } from 'helpers/auth';
import Button from 'components/Common/Button';
import { preSetSchema } from 'helpers/schema';
import { useQueryClient } from 'react-query';

const CreatePreset = ({ permissions, toggle, isOpen }) => {
    const [isCreatingPreset, setIsCreatingPreset] = useState(false);
    const queryClient = useQueryClient();

    const toggleModal = useCallback(() => {
        if (!isCreatingPreset) toggle();
    }, [isCreatingPreset, toggle]);

    const handleSubmit = async ({ title }, form) => {
        setIsCreatingPreset(true);

        const presetExists = await (await db.collection('presets').doc(title.toLowerCase()).get()).data();
        if (presetExists) {
            form.setFieldError('title', 'Preset already exists');
            setIsCreatingPreset(false);
            return;
        }

        const newPreset = { title, permissions };
        try {
            await db.collection('presets').doc(title.toLowerCase()).set(newPreset);
            await queryClient.invalidateQueries('presets');
            toggle();
            showSuccessToast({ message: 'Preset created successfully' });
        } catch (err) {
            console.error(err.message);
        }
        setIsCreatingPreset(false);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};

            const validationErrors = preSetSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggleModal} centered>
                <ModalHeader>Create Preset</ModalHeader>
                <Form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <label>Title</label>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" w="55px" loading={isCreatingPreset}>
                            Save
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
};
export default CreatePreset;
