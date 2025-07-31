let questions = [];
let selectedQuestions = [];
let currentQuestion = 0;
let coins = 6;
let hintUsed = false;

// Load 10 random questions from the JSON
async function loadQuestions() {
  const res = await fetch('questions_1000.json');
  const data = await res.json();
  shuffleArray(data);
  selectedQuestions = data.slice(0, 10);
  showQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ---- Login + OTP (Mocked) ----
function sendOTP() {
  const input = document.getElementById('userInput').value;
  if (input.trim() === '') {
    alert("Please enter email or phone.");
    return;
  }
  alert("Mock OTP sent: 1234");
  document.getElementById('otp-section').style.display = 'block';
}

function verifyOTP() {
  const otp = document.getElementById('otpInput').value;
  if (otp === '1234') {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuestions();
  } else {
    alert("Invalid OTP");
  }
}

// ---- Quiz Logic ----
function showQuestion() {
  const q = selectedQuestions[currentQuestion];
  document.getElementById('questionText').textContent = `Q${currentQuestion + 1}: ${q.question}`;
  document.getElementById('optionsContainer').innerHTML = '';
  document.getElementById('hintText').textContent = '';
  hintUsed = false;

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    document.getElementById('optionsContainer').appendChild(btn);
  });

  document.getElementById('coinCount').textContent = coins;
}

function checkAnswer(selected) {
  const correct = selectedQuestions[currentQuestion].answer;
  if (selected === correct) {
    coins += 1;
  }
  currentQuestion++;
  if (currentQuestion < selectedQuestions.length) {
    showQuestion();
  } else {
    showFinalMessage();
  }
  document.getElementById('coinCount').textContent = coins;
}

function showHint() {
  if (hintUsed) return;
  if (coins >= 3) {
    coins -= 3;
    hintUsed = true;
    document.getElementById('hintText').textContent = "Hint: " + selectedQuestions[currentQuestion].hint;
    document.getElementById('coinCount').textContent = coins;
  } else {
    alert("Not enough coins for hint!");
  }
}

function showFinalMessage() {
  document.querySelector('.quiz-container').innerHTML = `
    <h3>Quiz Finished 🎉</h3>
    <p>You earned ${coins} coins.</p>
  `;
}
d
