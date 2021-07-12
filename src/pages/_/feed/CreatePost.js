import React, { useCallback, useRef, useState } from 'react';
import Button from 'components/Common/Button';
import Geocode from 'react-geocode';

import {
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
import Select from 'components/Common/Select';
import firebase from 'firebase';
import { postSchema } from 'helpers/schema';
import { db, getLoggedInUser, storage } from 'helpers/auth';
import makeid from 'helpers/imagefunction';
import { useQueryClient } from 'react-query';
import { showSuccessToast } from 'helpers/showToast';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import crimeCategories from "config/crimeCategories";
import crimeCategories from 'config/crimeCategories';
import { v4 as uuid } from 'uuid';

const geofire = require('geofire-common');

const CreatePost = ({ toggle, isOpen }) => {
    const fileimageRef = useRef();
    const user = getLoggedInUser();
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [isGettingGeo, setIsgettingGeo] = useState(false);
    const queryClient = useQueryClient();
    const [address, setAddress] = React.useState('');
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null,
    });
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

    const toggleModal = useCallback(
        (resetForm) => {
            if (!isCreatingPost) toggle();
            debugger;
            if (toggle) resetForm();
        },
        [isCreatingPost, toggle]
    );

    const handleSubmit = useCallback(
        (values, form) => {
            const postId = uuid();
            const uploadTask = storage.ref(`post_${postId}.jpg`).put(values.image);
            // Geocode.fromAddress(values.location).then(
            //     (response) => {
            //         const { lat, lng } = response.results[0].geometry.location;
            //         debugger;
            //     },
            //     (error) => {
            //         console.error(error);
            //     }
            // );
            setIsCreatingPost(true);
            uploadTask.on(
                'state_changed',
                (snapshot) => {},
                (error) => {
                    console.log(error);
                },
                async () => {
                    try {
                        const imageUrl = await storage.ref().child(`post_${postId}.jpg`).getDownloadURL();

                        const newPost = {
                            postId,
                            ownerId: user.id,
                            longitude: parseFloat(values.longitude),
                            latitude: parseFloat(values.latitude),
                            Title: values.title,
                            peopleVerifiedPost: {},
                            description: values.description,
                            location: values.location,
                            mediaUrl: imageUrl,
                            postVerified: false,
                            category: values.crimeCategory,
                            username: user.displayName.toLowerCase(),
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        };
                        db.collection('posts').doc(user.id).collection('userPosts').doc(postId).set(newPost);
                        await queryClient.invalidateQueries('posts');
                        showSuccessToast({ message: 'Post has been created' });
                        toggleModal(formik.resetForm);
                        setIsCreatingPost(false);
                    } catch (err) {
                        console.error(err.message);
                    }
                }
            );
        },
        [queryClient, toggleModal, user.displayName, user.id]
    );

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            location: '',
            image: '',
            crimeCategory: crimeCategories[0].value,
            longitude: '',
            latitude: '',
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};

            const validationErrors = postSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            if (errors.location && !(errors.longitude && errors.latitude)) delete errors.location;
            else if (!errors.location && errors.longitude && errors.latitude) {
                delete errors.longitude;
                delete errors.latitude;
            }

            return errors;
        },
        validateOnChange: false,
    });
    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        formik.setFieldValue('location', value);
        formik.setFieldValue('latitude', latLng.lat);
        formik.setFieldValue('longitude', latLng.lng);
    };
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            formik.setFieldValue('image', e.target.files[0]);
            const selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            const imagepreview = document.getElementById('image-preview');
            imagepreview.src = selectedImageSrc;
            imagepreview.style.display = 'block';
        }
    };

    const handleCurrentLocation = async () => {
        setIsgettingGeo(true);
        await navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude.toString();
            const lon = position.coords.longitude.toString();

            Geocode.fromLatLng(lat, lon).then(
                (response) => {
                    const addr = response.results[0].formatted_address;
                    formik.setFieldValue('location', addr);
                    // debugger;
                },
                (error) => {
                    console.error(error);
                }
            );

            formik.setFieldValue('latitude', lat);
            formik.setFieldValue('longitude', lon);
        });
        setIsgettingGeo(false);
    };
    console.log({ errors: formik.errors });
    return (
        <>
            <Modal isOpen={isOpen} toggle={() => toggleModal(formik.resetForm)} centered>
                <ModalHeader>Create Post</ModalHeader>
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
                                customStyles={{ menu: { maxHeight: 250 } }}
                                onChange={(crimeCategory) => formik.setFieldValue('crimeCategory', crimeCategory.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>

                            {/* <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    invalid={formik.errors.location && formik.touched.location}
                                    placeholder="Enter the events location here"
                                    onChange={formik.handleChange}
                                    value={formik.values.location}
                                /> */}
                            <PlacesAutocomplete
                                value={formik.values.location}
                                onChange={(loc) => formik.setFieldValue('location', loc)}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    // formik.setFieldValue('location', value);
                                    <div key={suggestions.description} style={{ position: 'relative' }}>
                                        <InputGroup>
                                            <Input {...getInputProps({ placeholder: 'Type address' })} />
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
                                        </InputGroup>

                                        <div style={{ position: 'absolute', left: 0, top: '100%' }}>
                                            {loading ? <div>...loading</div> : null}

                                            {suggestions.map((suggestion) => {
                                                const style = {
                                                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                                    padding: '0.5rem',
                                                    cursor: 'pointer',
                                                };

                                                return (
                                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                                        {suggestion.description}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </FormGroup>
                        <FormGroup
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Label
                                className="image_preview"
                                style={{
                                    height: '36PX',
                                    width: '30PX',
                                    borderRadius: '4px',
                                }}
                            >
                                <img id="image-preview" style={{ height: '100%' }} alt="" />
                            </Label>
                            <Label
                                className="customImageBtn"
                                style={{
                                    border: '1px solid #ccc',
                                    display: 'inline-block',
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    backgroundColor: '',
                                }}
                            >
                                <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                    ref={fileimageRef}
                                />
                                Attach Image
                            </Label>
                            <div className="invalid-feedback">{formik.errors.image}</div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" size="sm" onClick={toggleModal}>
                            Cancel
                        </Button>
                        <Button loading={isCreatingPost} w="55.5px" color="primary" size="sm" type="submit">
                            Post
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
};
export default CreatePost;
