 
import firebase from 'firebase'

import 'firebase/firebase-firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBGE9OzcruNl7s-rIZygUkNIk-jpzRRxtI",
    authDomain: "crimespy-6fc6f.firebaseapp.com",
    projectId: "crimespy-6fc6f",
    storageBucket: "crimespy-6fc6f.appspot.com",
    messagingSenderId: "61138601926",
    appId: "1:61138601926:web:875ef65092b5d533c554c7",
    measurementId: "G-HHD8Z9F5FT"
}
// Initialize Firebase



    
       const firebaseapp = firebase.initializeApp(firebaseConfig)
       const facebookProvider = new firebase.auth.FacebookAuthProvider();
    //    const googleProvider = new firebase.auth.GoogleAuthProvider();
        
    




export const auth = firebaseapp.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {db, storage, facebookProvider};
export default firebaseapp;
