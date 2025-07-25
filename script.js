let questions = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 15; // Changed from 10 to 15

// Load questions.json automatically
window.onload = async () => {
  try {
    const response = await fetch('questions.json');
    questions = await response.json();
    document.getElementById('startBtn').disabled = false;
  } catch (err) {
    alert("❌ Failed to load questions.json. Make sure it's in the same folder.");
  }
};

function startQuiz() {
  if (questions.length === 0) {
    alert("No questions loaded.");
    return;
  }
  document.getElementById('startBtn').classList.add('hidden');
  document.getElementById('quizCard').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  resetTimer();
  let q = questions[current];
  document.getElementById('questionText').innerText = q.question;
  let optionsHTML = '';
  q.options.forEach(opt => {
    optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
  });
  document.getElementById('options').innerHTML = optionsHTML;
  startTimer();
}

function checkAnswer(selected) {
  if (selected === questions[current].answer) score++;
  clearInterval(timer);
  nextQuestion();
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    document.getElementById('quizCard').classList.add('hidden');
    document.getElementById('scoreCard').classList.remove('hidden');
    document.getElementById('finalScore').innerText = `${score} / ${questions.length}`;
  } else {
    showQuestion();
  }
}

function startTimer() {
  timeLeft = 15; // Changed from 10 to 15
  document.getElementById('timer').innerText = `⏱️ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `⏱️ ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
}
