import { useState, useRef } from "react";
import { useEffect } from "react";

function App() {
  const questions = [
    {
      question: "Which is the national bird of india?",
      answers: [
        { text: "pigeon", correct: false },
        { text: "parrot", correct: false },
        { text: "peacock", correct: true },
        { text: "crow", correct: false },
      ],
    },
    {
      question: "Which is the national animal of india?",
      answers: [
        { text: "tiger", correct: true },
        { text: "lion", correct: false },
        { text: "elephant", correct: false },
        { text: "pig", correct: false },
      ],
    },
    {
      question: "Which is the smallest continent in the world?",
      answers: [
        { text: "Asia", correct: false },
        { text: "Australia", correct: true },
        { text: "Arctic", correct: false },
        { text: "Africa", correct: false },
      ],
    },
  ];

  const questionElement = useRef();
  const answerButtons = useRef();
  const nextButton = useRef();
  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.current.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.current.innerHTML =
      questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.innerText = answer.text + "";
      answerButtons.current.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  function resetState() {
    nextButton.current.style.display = "none";
    while (answerButtons.current.firstChild) {
      answerButtons.current.removeChild(answerButtons.current.firstChild);
    }
  }
  function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
      selectBtn.classList.add("correct");
      score++;
    } else {
      selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.current.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.current.style.display = "block";
  }

  function showscore() {
    resetState();
    questionElement.current.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.current.innerHTML = "play again";
    nextButton.current.style.display = "block";
  }

  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showscore();
    }
  }
  useEffect(() => {
    startQuiz();
  }, []);

  return (
    <>
      <div className="app">
        <h1>Quiz App</h1>
        <div className="quiz">
          <h2 id="question" ref={questionElement}>
            Question goes here
          </h2>
          <div id="answer-buttons" ref={answerButtons}>
            <button className="btn">Answer 1</button>
            <button className="btn">Answer 2</button>
            <button className="btn">Answer 3</button>
            <button className="btn">Answer 4</button>
          </div>
        </div>
        <button
          id="next-btn"
          ref={nextButton}
          onClick={() => {
            if (currentQuestionIndex < questions.length) {
              handleNextButton();
            } else startQuiz();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
