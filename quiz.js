const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement =
  document.getElementById("question-container");
let questionElement = document.getElementById("question");
let answerButtonsElement = document.getElementById("answer-button");

let shuffleQuestion, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("started");
  startButton.classList.add("hide");
  shuffleQuestion = question.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestion[currentQuestionIndex]);
  console.log("displaying the next question");
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffleQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
  nextButton.classList.remove("hide");
}

function setStatusClass(element, correct) {
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const question = [
  {
    question: "What is 2 + 2?",
    answer: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "What is 10 * 10?",
    answer: [
      { text: "1000", correct: false },
      { text: "100", correct: true },
      { text: "5000", correct: false },
      { text: "500", correct: false },
    ],
  },
  {
    question: "What is 2 * 12?",
    answer: [
      { text: "44", correct: false },
      { text: "24", correct: true },
      { text: "26", correct: false },
      { text: "20", correct: false },
    ],
  },
  {
    question: "What is (2 + 2/2)*2?",
    answer: [
      { text: "4", correct: false },
      { text: "8", correct: false },
      { text: "10", correct: false },
      { text: "6", correct: true },
    ],
  },
  {
    question: "What is 8/2(2+2)?",
    answer: [
      { text: "16", correct: true },
      { text: "22", correct: false },
      { text: "30", correct: false },
      { text: "14", correct: false },
    ],
  },
];