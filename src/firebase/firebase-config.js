import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyApcuI1RJriOh5d6G44fy25Hc0JJmRT8lA',
  authDomain: 'journal-app-2022-8e1ae.firebaseapp.com',
  projectId: 'journal-app-2022-8e1ae',
  storageBucket: 'journal-app-2022-8e1ae.appspot.com',
  messagingSenderId: '985101422572',
  appId: '1:985101422572:web:ca9065406051464b563ac9',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// DB
const db = firebase.firestore()

// Google Auth on Firebase
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { db, googleAuthProvider, firebase }
