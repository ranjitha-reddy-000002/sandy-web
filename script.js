// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt08Yg5p92V9RZoPyF9a8ib23QlcaqGw8",
  authDomain: "sandy-auth-37c6a.firebaseapp.com",
  projectId: "sandy-auth-37c6a",
  storageBucket: "sandy-auth-37c6a.firebasestorage.app",
  messagingSenderId: "1016034907815",
  appId: "1:1016034907815:web:404d500a50eebc70f96d82",
  measurementId: "G-X2T1HVDTSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function startSurvey() {
  const number = document.getElementById('mobileNumber').value;

  if (!number || number.length < 10) {
    alert("Please enter a valid mobile number.");
    return;
  }

  // Save to localStorage
  localStorage.setItem("mobile", number);

  // Redirect to questions page
  window.location.href = "questions.html";
}

