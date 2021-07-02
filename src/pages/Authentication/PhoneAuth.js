import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css';
import { db } from 'helpers/auth';

// class PhoneAuth extends Component {
//     componentDidMount() {
//         // firebase.initializeApp(firebaseConfig);
//         const uiConfig = {
//             signInOptions: [
//                 {
//                     provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//                     recaptchaParameters: {
//                         type: 'image',
//                         size: 'normal',
//                         badge: 'bottomleft',
//                     },
//                     defaultCountry: 'VN',
//                 },
//             ],
//             callbacks: {
//                 async signInSuccessWithAuthResult(authResult, redirectUrl) {
//                     alert('successful', authResult.user.uid);
//                     console.log('herere', authResult.user.uid);
//                     let user = {
//                         // ...fbUser,
//                         id: authResult.user.uid,
//                         displayName: 'PhoneUser',

//                         photoUrl: '',
//                         role: 'user',
//                         gender: '',
//                         email: '',

//                         bio: '',
//                         dob: '',
//                         permissions: {
//                             timeline: ['review'],
//                             users: ['review'],
//                             feed: [],
//                             map: ['review'],
//                             chart: ['review'],
//                         },
//                     };
//                     const dbUser = (await db.collection('users').doc(authResult.user.uid).get()).data();

//                     if (!dbUser)
//                         // axios.post(`https://crimespy.herokuapp.com/users/id/${user.uid}/lat/${lat}/long/${lon}`, user).then((res) => {
//                         //     console.log(res);
//                         // });
//                         //   axios.post(`https://crimespy.herokuapp.com/users/id/${authResult.user.uid}`, user).then((res) => {
//                         //     console.log('here',res);
//                         // });
//                       await db.collection('users')
//                             .doc(authResult.user.uid)
//                             .set({ ...user, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
//                     else user = dbUser;
//                     return true;
//                 },
//             },
//             signInSuccessUrl: '', 
//         };

//         const ui = new firebaseui.auth.AuthUI(firebase.auth());
//         ui.start('#firebaseui-auth-container', uiConfig);
//     }

//     render() {
//         return <div id="firebaseui-auth-container" />;
//     }
// }

// export default PhoneAuth;

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



export default class PhoneAuth extends Component {
  constructor() {
    super();
    this.state = {
      form: true,
      alert: false,
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    let phoneNumber = "+1" +  this.state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onSubmitOtp = async (e) => {
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    console.log(otpInput);
    optConfirm
      .confirm(otpInput)
      .then(async function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        // let user = result.user;
        const dbUser = await db.collection("users").doc(result.user.uid).get().data();
        let user = {
                        // ...fbUser,
                        id: result.user.uid,
                        displayName:"PhoneUser",
          
                        photoUrl: "",
                        role: "user",
                        gender: "",
                        email:"",
          
                        bio: "",
                        dob: "",
                        permissions: {
                            timeline: ["review"],
                            users: ["review"],
                            feed: [],
                            map: ["review"],
                            chart: ["review"],
                        },
          
                    };
        
          if (!dbUser)
     
         await db.collection('users').doc(result.user.uid).set({...user,timestamp:firebase.firestore.FieldValue.serverTimestamp()})

          else user = dbUser;

        console.log('user', user)
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  render() {
    return (
      <div className='phoneAuth'>
      <div className='container'>
        <div className='row justify-content-center align-items-center'>
        <div className='col-sm-6 text-left'>
        <h2>
          Phone Login
        </h2>
        <form onSubmit={this.onSignInSubmit}>
        <div id='recaptcha-container'></div>
          <div className="form-group">
          <label for='exampleInputEmail'>
            Phone Number
          </label>
          <input type='number' name='mobile' className='form-control' onChange={this.onChangeHandler}/>
          </div>
          <button type='submit' className="btn btn-primary">
          Submit
          </button>
        </form>

        <form onSubmit={this.onSubmitOtp}>
     
          <div className="form-group">
          <label for='exampleInputEmail'>
            OTP
          </label>
          <input type='number' id='otp' name='otp' className='form-control' onChange={this.onChangeHandler}/>
          </div>
          <button type='submit' className="btn btn-primary">
          Submit
          </button>
        </form>
        </div>
        </div>
      </div>
        
      </div>
    );
  }
}