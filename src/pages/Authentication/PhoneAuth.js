/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, useState } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css';
import { db, setSession } from 'helpers/auth';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth/actions';

export default function PhoneAuth(props) {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    const [mobileSent, setMobileSent] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmitMobile = (e) => {
        e.preventDefault();

        if (mobileSent) return;

        setMobileSent(true);
        setUpRecaptcha();
        const phoneNumber = `+92${mobile}`;
        const appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => (window.confirmationResult = confirmationResult))
            .catch(function (error) {
                console.log(error);
            });
    };

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback(response) {
                handleSubmitMobile();
            },
            defaultCountry: 'PK',
        });
    };

    const handleSubmitOTP = async (e) => {
        e.preventDefault();
        setOtpSent(true);
        const optConfirm = window.confirmationResult;
        optConfirm
            .confirm(otp)
            .then(async function (result) {
                const dbUser = await (await db.collection('users').doc(result.user.uid).get()).data();
                let user = {
                    id: result.user.uid,
                    displayName: 'PhoneUser',
                    photoUrl: '',
                    role: 'user',
                    gender: 'Male',
                    email: '',
                    bio: '',
                    dob: '',
                    permissions: {
                        timeline: ['review'],
                        users: ['review'],
                        feed: [],
                        map: ['review'],
                        chart: ['review'],
                    },
                };
                navigator.geolocation.getCurrentPosition(async (position) =>{

                    if (!dbUser){
                        await db
                        .collection('users')
                        .doc(result.user.uid)
                        .set({ ...user, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
                    }
                    else user = dbUser;
                    
                  
    
                    setSession({...user,lat:position.coords.latitude,lon:position.coords.longitude});
                    dispatch(setUser(user));
    
                    history.push('/feed');
                    
                })

               
            })
            .catch(function (error) {
                console.log(error.response);
                debugger;
                // alert('Incorrect OTP');
            });
    };

    return (
        <div className="phoneAuth">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-sm-6 text-left">
                        <h2 className="mt-3">Phone Login</h2>
                        <form onSubmit={handleSubmitMobile}>
                            <div id="recaptcha-container" />
                            <div className="form-group mt-5">
                                <label htmlFor="exampleInputEmail">Phone Number</label>
                                <input
                                    type="number"
                                    name="mobile"
                                    className="form-control"
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {mobileSent ? 'OTP IS SENT!' : 'Submit'}
                            </button>
                        </form>

                        <form onSubmit={handleSubmitOTP}>
                            <div className="form-group mt-5">
                                <label htmlFor="exampleInputEmail">OTP</label>
                                <input
                                    type="number"
                                    id="otp"
                                    name="otp"
                                    className="form-control"
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {otpSent ? 'Loading...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
