let questions = [];
let currentQuestion = 0;
let coins = 6;
let hintUsed = false;

// Simulated OTP
let generatedOTP = '';

function sendOTP() {
  const user = document.getElementById('userInput').value;
  if (user.trim() === '') {
    alert('Please enter a phone number or email.');
    return;
  }
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
  alert("Your OTP is: " + generatedOTP); // simulate OTP
  document.getElementById('otp-section').style.display = 'block';
}

function verifyOTP() {
  const otp = document.getElementById('otpInput').value;
  if (otp === generatedOTP) {
    startQuiz();
  } else {
    alert('Incorrect OTP');
  }
}

function startQuiz() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'block';
  fetch('questions_1000.json')
    .then(response => response.json())
    .then(data => {
      questions = shuffle(data).slice(0, 10); // Load 10 random questions
      loadQuestion();
    });
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('questionText').textContent = `Q${currentQuestion + 1}: ${q.question}`;
  document.getElementById('hintText').textContent = '';
  document.getElementById('optionsContainer').innerHTML = '';
  hintUsed = false;

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    document.getElementById('optionsContainer').appendChild(btn);
  });

  document.getElementById('coinCount').textContent = coins;
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    coins += 1;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function showHint() {
  if (hintUsed) return;
  if (coins < 3) {
    alert("Not enough coins.");
    return;
  }
  coins -= 3;
  hintUsed = true;
  document.getElementById('coinCount').textContent = coins;
  document.getElementById('hintText').textContent = "Hint: " + questions[currentQuestion].hint;
}

function endQuiz() {
  document.getElementById('questionText').textContent = `Quiz Completed! 🎉 You earned ${coins} coins.`;
  document.getElementById('optionsContainer').innerHTML = '';
  document.querySelector('.actions').style.display = 'none';
}

// Utility: Shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
