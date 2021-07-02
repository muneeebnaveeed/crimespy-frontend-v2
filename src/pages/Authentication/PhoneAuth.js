import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css';
import { db } from 'helpers/auth';

class PhoneAuth extends Component {
    componentDidMount() {
        // firebase.initializeApp(firebaseConfig);
        const uiConfig = {
            signInOptions: [
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    recaptchaParameters: {
                        type: 'image',
                        size: 'normal',
                        badge: 'bottomleft',
                    },
                    defaultCountry: 'VN',
                },
            ],
            callbacks: {
                async signInSuccessWithAuthResult(authResult, redirectUrl) {
                    alert('successful', authResult.user.uid);
                    console.log('herere', authResult.user.uid);
                    let user = {
                        // ...fbUser,
                        id: authResult.user.uid,
                        displayName: 'PhoneUser',

                        photoUrl: '',
                        role: 'user',
                        gender: '',
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
                    const dbUser = (await db.collection('users').doc(authResult.user.uid).get()).data();

                    if (!dbUser)
                        // axios.post(`https://crimespy.herokuapp.com/users/id/${user.uid}/lat/${lat}/long/${lon}`, user).then((res) => {
                        //     console.log(res);
                        // });
                        //   axios.post(`https://crimespy.herokuapp.com/users/id/${authResult.user.uid}`, user).then((res) => {
                        //     console.log('here',res);
                        // });
                      await db.collection('users')
                            .doc(authResult.user.uid)
                            .set({ ...user, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
                    else user = dbUser;
                    return true;
                },
            },
            signInSuccessUrl: '',
        };

        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    render() {
        return <div id="firebaseui-auth-container" />;
    }
}

export default PhoneAuth;

// import React from 'react'
// import firebaseConfig from '../../helpers/firebaseConfig';
// import * as firebaseui from 'firebaseui';
// import firebase from 'firebase';
// import 'firebaseui/dist/firebaseui.css';
// import { db, setSession } from 'helpers/auth';
// import { useDispatch } from 'react-redux';
// import { setUser } from 'store/auth/actions';

// export default function PhoneAuth() {

// const dispatch = useDispatch();
//     const uiConfig = {
//         signInOptions: [{
//           provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//           recaptchaParameters: {
//             type: 'image',
//             size: 'normal',
//             badge: 'bottomleft'
//           },
//           defaultCountry: 'VN'
//         }],
//         callbacks: {
//           signInSuccessWithAuthResult: async function (authResult, redirectUrl){
//             alert('successful',authResult.user.uid);
//             console.log('herere',authResult.user.uid);
//             let user = {
//               // ...fbUser,
//               id: authResult.user.uid,
//               displayName:"PhoneUser",

//               photoUrl: "",
//               role: "user",
//               gender: "",
//               email:"",

//               bio: "",
//               dob: "",
//               permissions: {
//                   timeline: ["review"],
//                   users: ["review"],
//                   feed: [],
//                   map: ["review"],
//                   chart: ["review"],
//               },

//           };
//           const dbUser = (await db.collection("users").doc(authResult.user.uid).get()).data();

//           if (!dbUser)
//           // axios.post(`https://crimespy.herokuapp.com/users/id/${user.uid}/lat/${lat}/long/${lon}`, user).then((res) => {
//           //     console.log(res);
//           // });
//           //   axios.post(`https://crimespy.herokuapp.com/users/id/${authResult.user.uid}`, user).then((res) => {
//           //     console.log('here',res);
//           // });
//           db.collection('users').doc(authResult.user.uid).set({...user,timestamp:firebase.firestore.FieldValue.serverTimestamp()})

//           else user = dbUser;

//         //   dispatch(setUser(user))
//         //   setSession(user);
//             return true;
//           }
//         },
//         signInSuccessUrl : ""
//       };

//       var ui = new firebaseui.auth.AuthUI(firebase.auth());
//       ui.start("#firebaseui-auth-container", uiConfig);

//     //   ui.delete()
//     return (
//         <div id='firebaseui-auth-container'>

//       </div>
//     )
// }
