import Button from "components/Common/Button";
import api, { generateErrorMessage } from "helpers/query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import { toggleCreateCategoryDisclosure } from "store/routes/categories/actions";
import { useFormik } from "formik";
import { categorySchema } from "helpers/schema";

function CreateCategory() {
    const { createDisclosure } = useSelector((state) => ({
        ...state.Categories,
    }));
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [isCreatingCategory, setIsCreatingCategory] = useState(false);

    const focusRef = useRef();

    const handleCreateCategory = useCallback(
        async (values, form) => {
            setIsCreatingCategory(true);
            const newCategory = { ...values, created_by_user: 1 };
            try {
                await api.post("/categories", newCategory);
                await queryClient.invalidateQueries("categories");
                showSuccessToast({ message: "Category has been created" });
                form.resetForm();
            } catch (err) {
                const message = generateErrorMessage(err);
                showErrorToast({ message: "Cannot create category: " + message });
            }
            setIsCreatingCategory(false);
        },
        [queryClient]
    );

    const handleOpen = useCallback(() => focusRef.current.focus(), []);

    const { values, touched, errors, handleChange, resetForm, ...formik } = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            name: "",
        },
        validate: (values) => {
            let errors = {};
            const nameError = categorySchema.name.validate(values.name)?.error?.details[0]?.message;
            if (nameError) errors.name = nameError;
            return errors;
        },
        onSubmit: handleCreateCategory,
    });

    const toggleDisclosure = useCallback(() => {
        if (!isCreatingCategory) dispatch(toggleCreateCategoryDisclosure());
    }, [dispatch, isCreatingCategory]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!isCreatingCategory) formik.handleSubmit();
        },
        [formik, isCreatingCategory]
    );

    return (
        <Modal
            isOpen={createDisclosure}
            toggle={toggleDisclosure}
            onOpened={handleOpen}
            onClosed={resetForm}
            centered
        >
            <ModalHeader toggle={toggleDisclosure}>Create Category</ModalHeader>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-tag" />
                                </span>
                            </InputGroupAddon>
                            <Input
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                invalid={errors.name && touched.name}
                                disabled={isCreatingCategory}
                                innerRef={focusRef}
                            />
                            <FormFeedback invalid="true">{errors.name}</FormFeedback>
                        </InputGroup>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" size="sm" onClick={toggleDisclosure}>
                        Cancel
                    </Button>
                    <Button
                        w="55.5px"
                        loading={isCreatingCategory}
                        color="primary"
                        size="sm"
                        type="submit"
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default CreateCategory;
