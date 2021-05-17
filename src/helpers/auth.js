import firebase from "firebase";

import "firebase/firebase-firestore";
import "firebase/storage";

import { Cookies } from "react-cookie";

const firebaseConfig = {
    apiKey: "AIzaSyAVTMeHLm8coDhFavDKigMSlG1WSokGczs",
    authDomain: "crimespyv3.firebaseapp.com",
    projectId: "crimespyv3",
    storageBucket: "crimespyv3.appspot.com",
    messagingSenderId: "287743355804",
    appId: "1:287743355804:web:4759f001f135a9f057b659",
    measurementId: "G-5NK3RTNND8",
};
// Initialize Firebase

const firebaseapp = firebase.initializeApp(firebaseConfig);
const facebookProvider = new firebase.auth.FacebookAuthProvider();
//    const googleProvider = new firebase.auth.GoogleAuthProvider();

export const auth = firebaseapp.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage, facebookProvider };

export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);
export const signOutFireabse = () => auth.signOut();

export const setSession = (user) => {
    let cookies = new Cookies();
    if (user) cookies.set("user", user, { path: "/" });
    else cookies.remove("user", { path: "/" });
};

export const isUserAuthorized = (routeKey, user) => {
    if (!routeKey) return true;
    if (routeKey == "timeline") console.log("userPermissions() [permissions:%o]", user.permissions);
    if (user.permissions[routeKey]) return true;
    return false;
};

/**
 * Returns the logged in user
 */
export const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get("user");
    return user;
};

export default firebaseapp;
