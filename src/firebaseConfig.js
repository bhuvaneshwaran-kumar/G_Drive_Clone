import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const provider = new firebase.auth.GoogleAuthProvider()