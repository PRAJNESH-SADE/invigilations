import firebase from 'firebase/app';
import 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBriOcX3-lSMsw6IEFRHStIeHX-9LRnmB4",
    authDomain: "webathon-76ab9.firebaseapp.com",
    projectId: "webathon-76ab9",
    storageBucket: "webathon-76ab9.appspot.com",
    messagingSenderId: "97446231330",
    appId: "1:97446231330:web:0a90f15eacf840ee2eb97b",
    measurementId: "G-R2DZQHE52Y"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GooleAuthProvider();
