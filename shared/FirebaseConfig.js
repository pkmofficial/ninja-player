// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkaWTxuRZJxFMIq8XixprLkt2nGzOfCgU",
  authDomain: "event-buzz-42fcf.firebaseapp.com",
  projectId: "event-buzz-42fcf",
  storageBucket: "event-buzz-42fcf.appspot.com",
  messagingSenderId: "853988051963",
  appId: "1:853988051963:web:ea156a77234dc61c53d95e",
  measurementId: "G-3175PVWH21"
};

//  "app" object is created by calling the initializeApp() function from the Firebase App SDK
const app = initializeApp(firebaseConfig);

//  it allows other modules or files that import this module to access the app object and use it for interacting with Firebase services
export default app;

// const analytics = getAnalytics(app);