import React, { useState, useEffect, useRef } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import SetuserName from "./SetName";
import Deactivate from "./Deactivate";
import {
    Col,
    Collapse,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Label,
    Row,
    Button,
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import SetBio from "./SetBio";
import UserDisplay from "../permissions/UserDisplay";
import { db, getLoggedInUser, storage } from "helpers/auth";
import { showSuccessToast } from "helpers/showToast";

const user = getLoggedInUser();

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "profile", link: "/profile" },
];

const profile = () => {
    console.log(user);
    const handleImage = async (e) =>{
        console.log('Event ', e.target.files[0])
        var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
        console.log('sdasdas',selectedImageSrc)
        const uploadTask = storage.ref(`users/profile_${user.id}.jpg`).put(e.target.files[0]);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            async () => {
                // const postId = uuid();

                try {
                    const imageUrl = await storage.ref().child(`users/profile_${user.id}.jpg`).getDownloadURL();
                

                    const newPost = {
                      photoUrl:imageUrl
                    };
                    console.log("uploading");
                    db.collection('users').doc(user.id).update(newPost);
                    // await axios.post(`https://crimespy.herokuapp.com/posts`, newPost);
                
                    showSuccessToast({ message: "Image has been Uploaded" });
                   
                   
                } catch (err) {
                    console.error(err.message);
                }
            }
        );


    }
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col xs={12}>
                            <UserDisplay user={user} />
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
                                    onChange={handleImage}
                                    style={{ display: "none" }}
                                    // ref={}
                                / >
                                
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SetuserName />
                            <SetBio />
                            <Deactivate />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
export default profile;
