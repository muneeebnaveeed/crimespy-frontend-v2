import React from "react";
import Button from "components/Common/Button";
import {useCallback, useMemo, useRef, useState} from "react";
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
    ModalHeader
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import {Formik, useFormik} from "formik";
import {Col, Row} from "reactstrap/lib";
import Select from "components/Common/Select";
import firebase from "firebase";
import {postSchema} from "helpers/schema";
import {db, getLoggedInUser, storage} from "helpers/auth";
import makeid from "helpers/imagefunction";

const CreatePost = ({toggle, isOpen}) => {
    const uuid = (a) => {
        return a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
    };
    const postRef = db.collection("posts");
    const fileimageRef = useRef();
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const user = getLoggedInUser();
    const postId = uuid();


   

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            console.log(image)

            var imagepreview = document.getElementById("image-preview");
            imagepreview.src = selectedImageSrc;
            imagepreview.style.display = "block"
        }

    }

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            location: ""
        },
        onSubmit: (values) => {


            if (image) {
                var imageName = makeid(10);
                const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
                uploadTask.on("state_changed", (snapshot) => { // progress Funtion 1%
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);


                }, (error) => {
                    console.log(error);
                }, () => { // GET DOWNLOAD URL AND UPLOAD THE POST INFO
                    storage.ref("images").child(`${imageName}.jpg`).getDownloadURL().then((imageUrl) => {
                        postRef.doc(user.uid).collection("userPosts").doc(postId).set({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            postId: postId,
                            ownerId: user.uid,
                            Title: values.title,
                            description: values.description,
                            location: values.location,
                            mediaUrl: imageUrl,
                            username: user.displayName.toLowerCase(),

                            profileUrl: user.photoURL
                        });


                        // db.collection("posts").add();
                    });
                })
            }
        },
        validate: (values) => {
            let errors = {};

            const validationErrors = postSchema.validate(values, {abortEarly: false}) ?. error ?. details;

            if (validationErrors) 
                validationErrors.forEach((err) => (errors[err.context.label] = err.message));
            


            return errors;
        },
        validateOnChange: false
    });

    return (<>
        <Modal isOpen={isOpen}
            toggle={toggle}
            centered>
            <ModalHeader>Create Post</ModalHeader>
            <form onSubmit={
                formik.handleSubmit
            }>
                <ModalBody>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title"
                            invalid={
                                formik.errors.title && formik.touched.title
                            }
                            placeholder="Enter a short Title"
                            onChange={
                                formik.handleChange
                            }
                            value={
                                formik.value
                            }/>
                        <FormFeedback> {
                            formik.errors.title
                        }</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input style={
                                {
                                    minHeight: 100,
                                    maxHeight: 300
                                }
                            }
                            type="textarea"
                            rows={8}
                            name="description"
                            id="description"
                            invalid={
                                formik.errors.description && formik.touched.description
                            }
                            placeholder="Enter all detail of event in here atlesat above 150 words"
                            onChange={
                                formik.handleChange
                            }
                            value={
                                formik.value
                            }/>
                        <FormFeedback> {
                            formik.errors.description
                        }</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <InputGroup>
                            <Input type="text" name="location" id="location"
                                invalid={
                                    formik.errors.location && formik.touched.location
                                }
                                placeholder="Enter the events location here"
                                onChange={
                                    formik.handleChange
                                }
                                value={
                                    formik.value
                                }/>
                            <InputGroupAddon addonType="append">
                                <Button color="warning" type="button">
                                    Current Location
                                </Button>
                            </InputGroupAddon>
                            <FormFeedback> {
                                formik.errors.location
                            }</FormFeedback>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup style={
                        {
                            display: "flex",
                            justifyContent: "space-between"
                        }
                    }>
                     <Label className="image_preview"
                            style={
                                {
                                    
                                    height: '36PX',
                                    width: '30PX',
                                    borderRadius: '4px'
                                }
                        }>
                            <img id="image-preview"
                               style={{height:'100%',
                               }}
                                
                                alt=""/>
                        </Label>
                        <Label className="customImageBtn"
                            style={
                                {
                                    border: '1px solid #ccc',
                                    display: "inline-block",
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    backgroundColor:''
                                }
                        }>

                            <Input type="file" name="image" id="image" accept="image/*"
                                onChange={handleChange}
                                style={
                                    {display: 'none'}
                                }
                                ref={fileimageRef}/>
                            Image Upload

                        </Label>

                       
                        {/* <Button w="auto" color="primary" size="sm"
                            onClick={handleImageUpload}>
                            Image Upload
                        </Button> */} </FormGroup>
                </ModalBody>
                <ModalFooter>
                <p>`Post {progress != 0 ? progress: ""}</p>
                    <Button color="light" size="sm"
                        onClick={toggle}>
                        Cancel
                    </Button>
                    <Button w="55.5px" color="primary" size="sm" type="submit">
                        Post
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    </>);
};
export default CreatePost;
