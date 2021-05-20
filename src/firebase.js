// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAN4nCcI-ZfDGGV_bSV2UABTRO9Jgd91-s",
    authDomain: "todo-app-3423e.firebaseapp.com",
    projectId: "todo-app-3423e",
    storageBucket: "todo-app-3423e.appspot.com",
    messagingSenderId: "412076216896",
    appId: "1:412076216896:web:adee66cbf5ee068cc505a5",
    measurementId: "G-SHSQS4FHP0"
});


const db = firebaseApp.firestore();

export  {db} ;
