import Button from 'components/Common/Button';
import api, { generateErrorMessage } from 'helpers/query';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
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
} from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { useFormik } from 'formik';
import { productSchema } from 'helpers/schema';
import { toggleCreateProductDisclosure } from 'store/routes/products/actions';
import { Col, Row } from 'reactstrap/lib';
import Select from 'components/Common/Select';
import useCategoriesQuery from './categories/useCategoriesQuery';

function CreateProduct(props) {
    const { createDisclosure, categoryId } = useSelector((state) => state.Products);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [isCreatingProduct, setIsCreatingProduct] = useState(false);

    const focusRef = useRef();

    const { data } = useCategoriesQuery();

    const categories = useMemo(() => data?.map((cat) => ({ value: cat.id.toString(), label: cat.name })), [data]);

    const handleCreateProduct = useCallback(
        async (product, form) => {
            setIsCreatingProduct(true);
            const newProduct = { ...product, created_by_user: 1 };
            try {
                await api.post('/products', newProduct);
                await queryClient.invalidateQueries('products');
                showSuccessToast({ message: 'Product has been created' });
                form.resetForm();
            } catch (err) {
                const message = generateErrorMessage(err);
                showErrorToast({ message: `Cannot create product: ${message}` });
            }
            setIsCreatingProduct(false);
        },
        [queryClient]
    );

    const handleOpen = useCallback(() => focusRef.current.focus(), []);

    const { values, touched, errors, handleChange, resetForm, setFieldValue, ...formik } = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            name: '',
            price: 0,
            category: categoryId,
        },
        validate: (rawValues) => {
            const calculatedErrors = {};

            const validationErrors = productSchema.validate(rawValues, {
                abortEarly: false,
            })?.error?.details;

            if (validationErrors)
                validationErrors.forEach((err) => (calculatedErrors[err.context.label] = err.message));

            return calculatedErrors;
        },
        onSubmit: handleCreateProduct,
    });

    const toggleDisclosure = useCallback(() => {
        if (!isCreatingProduct) dispatch(toggleCreateProductDisclosure());
    }, [dispatch, isCreatingProduct]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!isCreatingProduct) formik.handleSubmit();
        },
        [formik, isCreatingProduct]
    );

    return (
        <Modal isOpen={createDisclosure} toggle={toggleDisclosure} onOpened={handleOpen} onClosed={resetForm} centered>
            <ModalHeader toggle={toggleDisclosure}>Create Product</ModalHeader>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col sm={12}>
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
                                        disabled={isCreatingProduct}
                                        innerRef={focusRef}
                                    />
                                    <FormFeedback invalid="true">{errors.name}</FormFeedback>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-dollar-sign" />
                                        </span>
                                    </InputGroupAddon>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={values.price}
                                        onChange={(e) => {
                                            if (e.target.value < 1) return;
                                            handleChange(e);
                                        }}
                                        invalid={errors.price && touched.price}
                                        disabled={isCreatingProduct}
                                    />
                                    <FormFeedback invalid="true">{errors.price}</FormFeedback>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-dollar-sign" />
                                        </span>
                                    </InputGroupAddon>
                                    <Select
                                        options={categories}
                                        noOptionsMessage="No category found"
                                        name="category"
                                        onChange={(category) => setFieldValue('category', category.value)}
                                    />
                                    <FormFeedback invalid="true" className="d-block">
                                        {errors.category}
                                    </FormFeedback>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" size="sm" onClick={toggleDisclosure}>
                        Cancel
                    </Button>
                    <Button w="55.5px" loading={isCreatingProduct} color="primary" size="sm" type="submit">
                        Save
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default CreateProduct;
