import React from "react";
import Button from "components/Common/Button";
import { useCallback, useMemo, useRef, useState } from "react";
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
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import { Formik, useFormik } from "formik";
import { Col, Row } from "reactstrap/lib";
import Select from "components/Common/Select";
import firebase from "firebase";
import { postSchema } from "helpers/schema";
import { db, getLoggedInUser, storage } from "helpers/auth";
import makeid from "helpers/imagefunction";
import { useQueryClient } from "react-query";
import { showSuccessToast } from "helpers/showToast";

const CreatePost = ({ toggle, isOpen }) => {
    const uuid = (a) => {
        return a
            ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
            : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
    };
    const postRef = db.collection("posts");
    const fileimageRef = useRef();
    const user = getLoggedInUser();
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [isGettingGeo, setIsgettingGeo] = useState(false);
    const [getCurrentLocation, setCurrentLocation] = useState('');
    const queryClient = useQueryClient();

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            formik.setFieldValue("image", e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagepreview = document.getElementById("image-preview");
            imagepreview.src = selectedImageSrc;
            imagepreview.style.display = "block";
        }
    };

    const handleCurrentLocation =  async () =>{
        setIsgettingGeo(true)
     await navigator.geolocation.getCurrentPosition((position) =>{
        console.log(position.coords);
        setCurrentLocation(`${position.coords.latitude}/${position.coords.longitude}`);
        console.log(getCurrentLocation)

     }
    
     );
     setCurrentLocation()
       setIsgettingGeo(false);
    }

    const handleSubmit = useCallback((values) => {
        var imageName = makeid(10);
        const uploadTask = storage.ref(`images/${imageName}.jpg`).put(values.image);
        setIsCreatingPost(true);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            async () => {
                const postId = uuid();
                // GET DOWNLOAD URL AND UPLOAD THE POST INFO

                try {
                    const imageUrl = await storage.ref("images").child(`${imageName}.jpg`).getDownloadURL();

                    const newPost = {
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        postId: postId,
                        ownerId: user.uid,
                        Title: values.title,
                        verifiedpost: 0,
                        notverified:0,
                        description: values.description,
                        location: values.location,
                        mediaUrl: imageUrl,
                        username: user.displayName.toLowerCase(),
                        profileUrl: user.photoURL,
                    };

                    await postRef.doc(user.uid).collection("userPosts").doc(postId).set(newPost);
                    await queryClient.invalidateQueries("posts");
                    showSuccessToast({ message: "Post has been created" });
                    toggleModal();
                    setIsCreatingPost(false);
                } catch (err) {
                    console.error(err.message);
                }
            }
        );
    }, []);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            location: "",
            image: "",
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            let errors = {};

            const validationErrors = postSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    const toggleModal = useCallback(() => {
        if (!isCreatingPost) toggle();
    }, [isCreatingPost, toggle]);

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggleModal} centered>
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
                                value={formik.value}
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
                                value={formik.value}
                            />
                            <FormFeedback> {formik.errors.description}</FormFeedback>
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
                                    value={formik.value}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="warning" type="button" onClick={handleCurrentLocation} loading={isGettingGeo}>
                                        Current Location
                                    </Button>
                                </InputGroupAddon>
                                <FormFeedback> {formik.errors.location}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Label
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
