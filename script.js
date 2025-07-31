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
// 🔑 Your Firebase config — replace these values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let userPhone = "";
let coinCount = 10;
let currentQuestionIndex = 0;

// Example questions
const questions = [
  {
    question: "What is the capital of India?",
    answer: "Delhi",
    hint: "It's not Mumbai."
  },
  {
    question: "What color is the sky?",
    answer: "Blue",
    hint: "Same as the ocean."
  }
  // Add more as needed
];

// Send OTP
function sendOTP() {
  userPhone = document.getElementById("phoneNumber").value;
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal'
  });

  auth.signInWithPhoneNumber(userPhone, window.recaptchaVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent");
      document.getElementById("otp-section").style.display = "block";
    })
    .catch(error => alert(error.message));
}

// Verify OTP
function verifyOTP() {
  const code = document.getElementById("otpCode").value;
  confirmationResult.confirm(code)
    .then(result => {
      alert("Login successful");
      startGame(result.user.phoneNumber);
    })
    .catch(error => alert("Invalid OTP"));
}

// Start Game
function startGame(phone) {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  document.getElementById("welcome").innerText = `Welcome ${phone}`;
  updateCoins();
  showQuestion();
}

// Show Question
function showQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById("question-text").innerText = q.question;
  document.getElementById("userAnswer").value = "";
  document.getElementById("hint-text").style.display = "none";
  document.getElementById("hint-text").innerText = q.hint;
}

// Show Hint
function showHint() {
  if (coinCount < 3) {
    alert("Not enough coins for hint.");
    return;
  }
  coinCount -= 3;
  updateCoins();
  document.getElementById("hint-text").style.display = "block";
}

// Submit Answer
function submitAnswer() {
  const userInput = document.getElementById("userAnswer").value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

  if (userInput === correctAnswer) {
    coinCount += 1;
    alert("Correct! +1 coin");
  } else {
    alert("Wrong answer");
  }

  updateCoins();

  // Save answer to Firebase
  db.collection("gameResponses").add({
    phone: userPhone,
    question: questions[currentQuestionIndex].question,
    userAnswer: userInput,
    correct: userInput === correctAnswer,
    timestamp: new Date()
  });

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    alert("Game Over!");
    document.getElementById("question-box").innerHTML = "<h3>Thanks for playing!</h3>";
  }
}

// Update Coins on screen
function updateCoins() {
  document.getElementById("coinCount").innerText = coinCount;
}
