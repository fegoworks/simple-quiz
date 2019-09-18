const question = document.querySelector("#question")
const options = Array.from(document.getElementsByClassName("option-text"))
const countText = document.querySelector("#questionCount")
const scoreText = document.querySelector("#score")

const DATABASE_URI = "http://localhost:3000/questions"

let currentQuestion = {};
let acceptAnswer = true;
let score = 0;
let questionCount = 0;
let questionsArr = [];

const max_questions = 5;
const bonus = 10;
// Get questions from backend
const startQuiz = async () => {
  const response = await fetch(DATABASE_URI);
  const questions = await response.json();
  score = 0;
  questionCount = 0;

  questionsArr = [...questions]
  // console.log(questionsArr)
  getQuestion()
}

const getQuestion = () => {
  if (questionsArr.length === 0 || questionsArr > max_questions) {
    localStorage.setItem("recentScore", score)
    // Take user to end page
    return window.location.assign('endGame.html')
  }
  questionCount = questionCount + 1;
  countText.innerText = `${questionCount}/${max_questions}`


  let index = Math.floor(Math.random() * questionsArr.length)
  currentQuestion = questionsArr[index]
  question.innerText = currentQuestion.question;

  options.forEach(option => {
    const number = option.dataset["number"]
    option.innerText = currentQuestion["option_" + number]
  })

  questionsArr.splice(index, 1)
  acceptAnswer = true
}

options.forEach(option => {
  option.addEventListener("click", event => {
    if (!acceptAnswer) {
      return
    }

    acceptAnswer = false
    const selectedOption = event.target;
    const selectedAnswer = selectedOption.dataset["number"]

    // Display feedback for correct or incorrect answers
    let correctClass = "incorrect"
    if (selectedAnswer == currentQuestion.answer) {
      correctClass = "correct"
    }

    if (correctClass == "correct") {
      getScore(bonus)
    }

    selectedOption.parentElement.classList.add(correctClass)

    setTimeout(() => {
      selectedOption.parentElement.classList.remove(correctClass)
      getQuestion()
    }, 1000)

    // console.log(selectedAnswer == currentQuestion.answer)
  })
})

const getScore = number => {
  score += number
  // console.log(score)
  scoreText.innerText = score;
}

startQuiz()