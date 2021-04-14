import React, { useEffect } from "react";

import { Row, Col, Input, Button, Alert, Container, Label, FormGroup } from "reactstrap";
import { db } from "../../helpers/auth";
import firebase from "firebase/app";

// Redux
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

// import images
import logodark from "../../assets/images/logo-dark.png";
import { auth, getLoggedInUser, setSession, signInWithFacebook } from "helpers/auth";
import { setUser } from "store/auth/actions";
import { Redirect, useHistory } from "react-router";

function Login(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const state = useSelector((state) => state.Auth);

    useEffect(() => {
        document.body.classList.add("auth-body-bg");
        return () => {
            document.body.classList.remove("auth-body-bg");
        };
    }, []);

    const handleLogin = async () => {
        try {
            const res = await signInWithFacebook();

            const user = _.pick(res.user, ["uid", "displayName", "email", "photoURL"]);

            const userExistsInDb = (await db.collection("users").doc(user.uid).get()).data();

            if (!userExistsInDb) {
                const dbUser = {
                    ...user,
                    gender: "",
                    bio: "",
                    dob: "",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                };

                await db.collection("users").doc(dbUser.uid).set(dbUser);
            }

            dispatch(setUser(user));
            setSession(user);
            history.push("/");
        } catch (err) {
            console.error(err.message);
        }
    };

    if (getLoggedInUser()) return <Redirect to={{ pathname: "/", from: "/login" }} />;

    return (
        <>
            <div className="home-btn d-none d-sm-block">
                <i className="mdi mdi-home-variant h2 text-white"></i>
            </div>

            <div>
                <Container fluid className="p-0">
                    <Row className="no-gutters">
                        <Col lg={4}>
                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col lg={9}>
                                            <div>
                                                <div className="text-center">
                                                    <div>
                                                        <img src={logodark} height="20" alt="logo" />
                                                    </div>

                                                    <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                    <p className="text-muted">Sign in to continue to Crimespy.</p>
                                                </div>

                                                <div className="p-2 mt-5 d-flex justify-content-center">
                                                    <Button color="primary" onClick={handleLogin}>
                                                        <i className="fab fa-facebook-f mr-1" /> Login with Facebook
                                                    </Button>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p>© 2021 Crimespy</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="authentication-bg">
                                <div className="bg-overlay"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Login;
