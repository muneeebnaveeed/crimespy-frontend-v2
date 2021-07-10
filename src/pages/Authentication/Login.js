import React, { useEffect } from 'react';

import { Row, Col, Button, Container } from 'reactstrap';

// Redux
import { useDispatch } from 'react-redux';

import _ from 'lodash';

// import images
import { getLoggedInUser, setSession, signInWithFacebook } from 'helpers/auth';
import { setUser } from 'store/auth/actions';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import logodark from '../../assets/images/logo-dark.png';
import PhoneAuth from './PhoneAuth';
import { db } from '../../helpers/auth';

function Login(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        document.body.classList.add('auth-body-bg');
        return () => {
            document.body.classList.remove('auth-body-bg');
        };
    }, []);

    const handleLogin = async () => {
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const loggedInData = await signInWithFacebook();

                const { uid, displayName, photoURL, email, phoneNumber } = loggedInData.user;

                const dbUser = (await db.collection('users').doc(uid).get()).data();

                const defaultPresetRef = await db.collection('presets').doc('user').get();
                const { permissions } = await defaultPresetRef.data();
                // console.log('llasd', loggedInData);

                let user = {
                    // ...fbUser,
                    id: uid,
                    displayName,

                    photoUrl: photoURL,
                    role: 'user',
                    gender: 'Male',
                    email,
                    phoneNumber,

                    bio: '',
                    dob: '',
                    permissions,
                };
                if (!dbUser)
                    axios.post(`https://crimespy.herokuapp.com/users/id/${uid}`, user).then((res) => {
                        console.log('here', res);
                    });
                else user = dbUser;
                dispatch(setUser(user));

                setSession({ ...user, lat: position.coords.latitude, lon: position.coords.longitude });

                history.push('/');
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleLoginPhoneNumber = () => {
        history.push('/auth-phone');
    };

    if (getLoggedInUser())
        return (
            <Redirect
                to={{
                    pathname: '/',
                    from: '/login',
                }}
            />
        );

    return (
        <>
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
                                                        <img src={logodark} height="60" alt="logo" />
                                                    </div>

                                                    <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                    <p className="text-muted">Sign in to continue to Crimespy.</p>
                                                </div>

                                                <div className="p-2 mt-5 d-flex justify-content-center">
                                                    <Button color="primary" onClick={handleLogin}>
                                                        <i className="fab fa-facebook-f mr-1" />
                                                        Login with Facebook
                                                    </Button>
                                                </div>
                                                <div className="p-2 mt-2 d-flex justify-content-center">
                                                    <Button color="secondary" onClick={handleLoginPhoneNumber}>
                                                        <i className="fa fa-phone-alt mr-1" />
                                                        Login with Number
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
                                <div className="bg-overlay" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Login;
