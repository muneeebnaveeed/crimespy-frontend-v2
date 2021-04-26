import React from "react";
import { useState, useCallback } from "react";
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
    ButtonGroup,
    Button,
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import { Formik, FormikConsumer, useFormik } from "formik";
import { showSuccessToast } from "helpers/showToast";
import { useControllableProp } from "@chakra-ui/hooks";

const RoleModel = ({ permissions, toggle, isOpen }) => {
    const [isCreatingRole, setIsCreatingRole] = useState(false);

    const toggleModal = useCallback(() => {
        if (!isCreatingRole) toggle();
    }, [isCreatingRole, toggle]);

    const handleSubmit = async (values, form) => {
        console.log(values);
    };

    const newformik = useFormik({
        initialValues: {
            Role_Title: "",
            permissionsPreSet: permissions,
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            let errors = {};

            // const validationErrors = commentSchema.validate(values, { abortEarly: false })?.error?.details;

            // if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggleModal} centered>
                <ModalHeader>Create New Permission Pre Set</ModalHeader>
                <Form onSubmit={newformik.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <label>Enter Pre-set Title</label>
                            <Input
                                id="Role_Title"
                                name="Role_Title"
                                placeholder="Role for pre-set"
                                type="text"
                                onChange={newformik.handleChange}
                                value={newformik.values.Role_Title}
                                invalid={newformik.errors.Role_Title}
                            />
                            <FormFeedback>{newformik.errors.Role_Title}</FormFeedback>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={toggleModal}>Cancel</Button>
                            <Button color="primary" type="submit">
                                Create
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
};
export default RoleModel;
