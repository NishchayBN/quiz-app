console.log("hello manoj")
const questions = [
    {
        question: "Which is the national bird of india?",
        answers: [
            { text: "pigeon", correct: false},
            { text: "parrot", correct: false},
            { text: "peacock", correct: true},
            { text: "crow", correct: false},
        ]
    },
    {
        question: "Which is the national animal of india?",
        answers: [
            { text: "tiger", correct: true},
            { text: "lion", correct: false},
            { text: "elephant", correct: false},
            { text: "pig", correct: false},
        ]  
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ] 
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerText=answer.text + ""
        
        answerButtons.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}
    function resetState(){
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
    function selectAnswer(e){
        const selectBtn = e.target;
        const isCorrect = selectBtn.dataset.correct === "true";
        if(isCorrect){
            selectBtn.classList.add("correct");
            score++;
        }else{
            selectBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button =>  {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showscore(){
        resetState();
        questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML ="play again";
        nextButton.style.display = "block";
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showscore();
        }
    }
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else(
        startQuiz()
    )
})

startQuiz()