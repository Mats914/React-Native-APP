
// App/2024/03/11



import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
const app = firebase.initializeApp({
  apiKey: "AIzaSyBz_q4tdN3P38A2ORZcKB1_iMOyDl8Dt8s",
  authDomain: "app-2024-03-11.firebaseapp.com",
  projectId: "app-2024-03-11",
  storageBucket: "app-2024-03-11.appspot.com",
  messagingSenderId: "948049463632",
  appId: "1:948049463632:web:8fca805cb63f009dcdc455"
})
export const db = getFirestore();

export const auth = app.auth()
export default app
