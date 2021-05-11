import React, {useEffect} from "react";

import {
    Row,
    Col,
    Input,
    Button,
    Alert,
    Container,
    Label,
    FormGroup
} from "reactstrap";
import {db} from "../../helpers/auth";
import firebase from "firebase/app";

// Redux
import {useDispatch, useSelector} from "react-redux";

import _ from "lodash";

// import images
import logodark from "../../assets/images/logo-dark.png";
import {auth, getLoggedInUser, setSession, signInWithFacebook} from "helpers/auth";
import {setUser} from "store/auth/actions";
import {Redirect, useHistory} from "react-router";
import axios from 'axios'

function Login(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const state = useSelector((state) => state.Auth);

    useEffect(() => {
        document.body.classList.add("auth-body-bg");
        return() => {
            document.body.classList.remove("auth-body-bg");
        };
    }, []);

    const handleLogin = async () => {
        let lon;
        let lat;
        try {
            const res = await signInWithFacebook();

            const fbUser = _.pick(res.user, ["uid", "displayName", "email", "photoURL"]);

            // const data = {
            //     firstName: 'Finn',
            //     lastName: 'Williams'
            // }


            const dbUser = (await db.collection("users").doc(fbUser.uid).get()).data();
            // console.log("location", location)
            // console.log(`DATA FROM DB ${dbUser}`);
            await navigator.geolocation.getCurrentPosition((position) => {
                console.log("1")
                lon = position.coords.longitude;
                lat = position.coords.latitude;
                console.log(lon, lat)
                let user = {
                    ... fbUser,
                    role: "user",
                    gender: "",
                    longitude: lon,
                    latitude: lat,
                    bio: "",
                    dob: "",
                    permissions: {
                        users: ["review"],
                        feed: [],
                        map: ["review"],
                        chart: ["review"]
                    },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                };


                // axios.post(`http://localhost:5000/users/id/${
                //     user.uid
                // }`, user).then(res => {
                //     console.log(res)
                // })
                if (! dbUser) 

                    axios.post(`http://localhost:5000/users/id/${
                        user.uid
                    }`, user).then(res => {
                        console.log(res)
                    })
                 else 
                    user = dbUser;
                 dispatch(setUser(user));
                setSession(user);
                history.push("/");

            });


        } catch (err) {
            console.error(err.message);
        }
    };

    if (getLoggedInUser()) 
        return <Redirect to={
            {
                pathname: "/",
                from: "/login"
            }
        }/>;
    


    return (
        <> {/* <div className="home-btn d-none d-sm-block">
                <i className="mdi mdi-home-variant h2 text-white"></i>
            </div> */}

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
                                                        <img src={logodark}
                                                            height="60"
                                                            alt="logo"/>
                                                    </div>

                                                    <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                    <p className="text-muted">Sign in to continue to Crimespy.</p>
                                                </div>

                                                <div className="p-2 mt-5 d-flex justify-content-center">
                                                    <Button color="primary"
                                                        onClick={handleLogin}>
                                                        <i className="fab fa-facebook-f mr-1"/>
                                                        Login with Facebook
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
