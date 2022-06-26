// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9oYZgClsFqZ914qOKM9f4jxs9jyIPQuo",
  authDomain: "netflixclone-1d440.firebaseapp.com",
  projectId: "netflixclone-1d440",
  storageBucket: "netflixclone-1d440.appspot.com",
  messagingSenderId: "444965615413",
  appId: "1:444965615413:web:365f022dddd8f625eb7e7c",
  measurementId: "G-9TZB66R1ST"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()
// const analytics = getAnalytics(app);
export default app
export { auth, db }