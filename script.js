const questions = [
  {
    question: "¿Qué significa HTML?",
    answers: [
      { text: "Lenguaje de Marcado de Hiper Texto", correct: true },
      { text: "Lenguaje de Marcado de Hiper Trasferencia", correct: false },
      { text: "Lenguaje de Marcado Textual de Alto Nivel ", correct: false },
      { text: "Lenguaje de gestión de Hipertexto", correct: false },
    ],
  },

  {
    question: "Cúal es el propósito de CSS?",
    answers: [
      { text: "Software de atención al cliente", correct: false },
      { text: "Hojas de estilo en cascada", correct: true },
      { text: "Sistema de estilo centralizado", correct: false },
      { text: "Software de estilo informático", correct: false },
    ],
  },
  {
    question: "Explica el término diseño responsivo en diseño web",
    answers: [
      { text: "Diseño para todos los dispositivos", correct: true },
      { text: "Diseño solo para escritorio", correct: false },
      { text: "Diseño para medios impresos", correct: false },
      { text: "Diseño para dispositivos de audio", correct: false },
    ],
  },

  {
    question: "Cual es el proposito del atributo 'alt' en HTML?",
    answers: [
      { text: "Texto alternativo para imágenes", correct: true },
      { text: "Alinear texto", correct: false },
      { text: "Listar atributos de un texto", correct: false },
      { text: "Animar texto alternativo", correct: false },
    ],
  },
  {
    question: "Define 'API' en el contexto del desarrollo web.",
    answers: [
      { text: "Interfaz de Programación automática", correct: false },
      { text: "Interfaz de Programación de aplicaciones", correct: true },
      { text: "Interfaz de Programación de Protocolo Aplicada", correct: false },
      { text: "Integración de Protocolo Automatizada", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let userScore = 0;

const startButtonEl = document.querySelector(".start-btn");
const welcomeScreenEl = document.querySelector(".welcome-screen");
const quizScreenEl = document.querySelector(".quiz-screen");
const questionEl = document.querySelector(".question");
const answersButtons = document.querySelector(".answers-container");
const nextButtonEl = document.querySelector(".next-btn");

startButtonEl.addEventListener("click", startQuiz);

function startQuiz() {
  welcomeScreenEl.style.display = "none";
  // quizScreenEl.style.display = "block";
  quizScreenEl.style.display = "flex";
  currentQuestionIndex = 0;
  userScore = 0;
  nextButtonEl.innerHTML = "Siguiente pregunta";
  nextButtonEl.style.display = "none";
  displayQuestion();
}

function displayQuestion() {
  resetContainer();
  questionEl.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach((answer) => {
    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = answer.text;
    buttonEl.classList.add("ans-btn");
    answersButtons.appendChild(buttonEl);

    if (answer.correct) {
      buttonEl.dataset.correctAns = answer.correct;
    }

    // console.log(buttonEl);

    buttonEl.addEventListener("click", checkAnswer);
  });
}

function checkAnswer(e) {
  const selectedButton = e.target;
  if (selectedButton.dataset.correctAns) {
    userScore++;
    console.log(userScore);
    selectedButton.classList.add("correct-ans");
  } else {
    selectedButton.classList.add("wrong-ans");
  }

  Array.from(answersButtons.children).forEach((button) => {
    if (button.dataset.correctAns === "true") {
      button.classList.add("correct-ans");
    }
    button.disabled = "true";
  });

  nextButtonEl.style.display = "block";
}

function displayResult() {
  resetContainer();
  questionEl.innerHTML = `Quiz Completado! <br> Tu Puntaje fue: <span class="score">${userScore}/${questions.length}</span>`;

  nextButtonEl.innerHTML = "Reiniciar Quiz";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    nextButtonEl.style.display = "none";
  } else {
    displayResult();
  }
}

nextButtonEl.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    nextQuestion();
  } else {
    startQuiz();
  }
});

function resetContainer() {
  questionEl.textContent = "";
  answersButtons.innerHTML = "";
}
