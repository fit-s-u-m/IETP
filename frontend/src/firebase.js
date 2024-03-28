// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDp9SxfFTdy0KlncZ-JQaWKFLB4SCh2F3g",
//   authDomain: "ietp-ec9c0.firebaseapp.com",
//   projectId: "ietp-ec9c0",
//   storageBucket: "ietp-ec9c0.appspot.com",
//   messagingSenderId: "800697572803",
//   appId: "1:800697572803:web:531f7d464ebea322d47176"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDp9SxfFTdy0KlncZ-JQaWKFLB4SCh2F3g",
  authDomain: "ietp-ec9c0.firebaseapp.com",
  projectId: "ietp-ec9c0",
  storageBucket: "ietp-ec9c0.appspot.com",
  messagingSenderId: "800697572803",
  appId: "1:800697572803:web:cd24e2a8a9ca6f15d47176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth
