import firebase from "firebase";

import "firebase/firebase-firestore";
import "firebase/storage";

import { Cookies } from "react-cookie";

const firebaseConfig = {
    apiKey: "AIzaSyABIcKRrQeXZB4aSLiHRDG47MrmWDHtDL4",
    authDomain: "crimespy-6fc6f.firebaseapp.com",
    projectId: "crimespy-6fc6f",
    storageBucket: "crimespy-6fc6f.appspot.com",
    messagingSenderId: "61138601926",
    appId: "1:61138601926:web:875ef65092b5d533c554c7",
    measurementId: "G-HHD8Z9F5FT",
};
// Initialize Firebase

const firebaseapp = firebase.initializeApp(firebaseConfig);
const facebookProvider = new firebase.auth.FacebookAuthProvider();
//    const googleProvider = new firebase.auth.GoogleAuthProvider();

export const auth = firebaseapp.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export const firestore = firebase.firestore;

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
    if (user.permissions[routeKey]?.length) return true;
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
