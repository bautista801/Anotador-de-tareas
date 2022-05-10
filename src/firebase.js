import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAa-dk3B2aXkOF7MnpVtIpfw2TSTFvfWsk",
    authDomain: "proyecto-firebase-1-b0b7f.firebaseapp.com",
    projectId: "proyecto-firebase-1-b0b7f",
    storageBucket: "proyecto-firebase-1-b0b7f.appspot.com",
    messagingSenderId: "788786735222",
    appId: "1:788786735222:web:c0e57a5cb9f54e52b95757"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}