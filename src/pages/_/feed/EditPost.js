import React, { useCallback, useMemo, useRef, useState } from 'react';
import Button from 'components/Common/Button';

import axios from 'axios';
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
} from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { Formik, useFormik } from 'formik';
import { Col, Row } from 'reactstrap/lib';
import Select from 'components/Common/Select';
import firebase from 'firebase';
import { postSchema } from 'helpers/schema';
import { db, getLoggedInUser, storage } from 'helpers/auth';
import makeid from 'helpers/imagefunction';
import { useQueryClient } from 'react-query';
import { showSuccessToast } from 'helpers/showToast';
import crimeCategories from 'config/crimeCategories';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditPostDisclosure } from 'store/routes/feed/actions';

const geofire = require('geofire-common');

const EditPost = (props) => {
    // const postRef = db.collection("posts");
    // const fileimageRef = useRef();
    // const user = getLoggedInUser();
    // const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [isGettingGeo, setIsgettingGeo] = useState(false);

    const { editPostDisclosure, selectedPost } = useSelector((state) => state.Feed);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            title: selectedPost.Title,
            description: selectedPost.description,
            location: selectedPost.location,
            crimeCategory: crimeCategories[0].value,
            longitude: selectedPost.longitude,
            latitude: selectedPost.latitude,
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};

            const validationErrors = postSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    const handleCurrentLocation = async () => {
        setIsgettingGeo(true);
        await navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude.toString();
            const lon = position.coords.longitude.toString();

            formik.setFieldValue('latitude', lat);
            formik.setFieldValue('longitude', lon);
        });
        setIsgettingGeo(false);
    };

    const toggleModal = useCallback(() => {
        dispatch(toggleEditPostDisclosure());
    }, [dispatch]);

    console.log('EditPost() [isOpen:%s,selectedPost:%o]', editPostDisclosure, selectedPost);

    return (
        <>
            <Modal isOpen={editPostDisclosure} toggle={toggleModal} centered>
                <ModalHeader>Edit Post</ModalHeader>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                invalid={formik.errors.title && formik.touched.title}
                                placeholder="Enter a short Title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                            <FormFeedback> {formik.errors.title}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                style={{
                                    minHeight: 100,
                                    maxHeight: 300,
                                }}
                                type="textarea"
                                rows={8}
                                name="description"
                                id="description"
                                invalid={formik.errors.description && formik.touched.description}
                                placeholder="Enter all detail of event in here atlesat above 150 words"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                            <FormFeedback> {formik.errors.description}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="crimeCategory">Category</Label>
                            <Select
                                options={crimeCategories}
                                defaultValue={crimeCategories[0]}
                                customStyles={{ menu: { maxHeight: 150, overflowY: 'hidden' } }}
                                onChange={(crimeCategory) => formik.setFieldValue('crimeCategory', crimeCategory.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <InputGroup>
                                <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    invalid={formik.errors.location && formik.touched.location}
                                    placeholder="Enter the events location here"
                                    onChange={formik.handleChange}
                                    value={formik.values.location}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button
                                        color="warning"
                                        type="button"
                                        onClick={handleCurrentLocation}
                                        loading={isGettingGeo}
                                        style={{ zIndex: 0 }}
                                    >
                                        Current Location
                                    </Button>
                                </InputGroupAddon>
                                <FormFeedback>{formik.errors.location}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* <Label
                                className="image_preview"
                                style={{
                                    height: "36PX",
                                    width: "30PX",
                                    borderRadius: "4px",
                                }}
                            >
                                <img id="image-preview" style={{ height: "100%" }} alt="" />
                            </Label>
                            <Label
                                className="customImageBtn"
                                style={{
                                    border: "1px solid #ccc",
                                    display: "inline-block",
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    backgroundColor: "",
                                }}
                            >
                                <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    style={{ display: "none" }}
                                    ref={fileimageRef}
                                />
                                Attach Image
                            </Label> */}
                            <div className="invalid-feedback">{formik.errors.image}</div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" size="sm" onClick={toggleModal}>
                            Cancel
                        </Button>
                        <Button
                            // loading={isCreatingPost}
                            w="55.5px"
                            color="primary"
                            size="sm"
                            type="submit"
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
};
export default EditPost;
