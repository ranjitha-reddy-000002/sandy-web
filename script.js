const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Madrid", "Berlin"],
    answer: "Paris",
    hint: "It's also called the City of Light."
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "12", "14", "11"],
    answer: "12",
    hint: "It’s more than 11 but less than 13."
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
    hint: "It’s named after the Roman god of war."
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "HO"],
    answer: "H2O",
    hint: "It contains hydrogen and oxygen."
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Mark Twain", "Shakespeare", "Jane Austen"],
    answer: "Shakespeare",
    hint: "Famous English playwright from the 1600s."
  },
  {
    question: "Which continent is the Sahara Desert in?",
    options: ["Asia", "Africa", "Australia", "South America"],
    answer: "Africa",
    hint: "It's the second-largest continent."
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Monoxide", "Nitrogen", "Carbon Dioxide"],
    answer: "Carbon Dioxide",
    hint: "It’s the gas humans exhale."
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
    hint: "It’s a perfect round number."
  },
  {
    question: "Which organ pumps blood through the body?",
    options: ["Liver", "Heart", "Lungs", "Kidney"],
    answer: "Heart",
    hint: "It’s also a symbol of love."
  }
];

let currentQuestion = 0;
let coins = 0;
let hintUsed = false;

const coinDisplay = document.getElementById('coinCount');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const hintText = document.getElementById('hintText');

function updateUI() {
  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  hintText.textContent = "";
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });

  hintUsed = false;
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    coins += 1;
    coinDisplay.textContent = coins;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    updateUI();
  } else {
    showFinalMessage();
  }
}

function showHint() {
  if (hintUsed) return;
  if (coins >= 3) {
    coins -= 3;
    coinDisplay.textContent = coins;
    hintText.textContent = "Hint: " + questions[currentQuestion].hint;
    hintUsed = true;
  } else {
    alert("Not enough coins for a hint!");
  }
}

function showFinalMessage() {
  questionText.textContent = `Quiz Completed! 🎉 You earned ${coins} coins.`;
  optionsContainer.innerHTML = "";
  hintText.textContent = "";
  document.querySelector(".actions").style.display = "none";
}

// Initialize
updateUI();
