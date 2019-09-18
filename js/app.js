const question = document.querySelector("#question")
const optionOne = document.querySelector("#option-1")
const optionTwo = document.querySelector("#option-2")
const optionThree = document.querySelector("#option-3")
const optionFour = document.querySelector("#option-4")
const questionAnswer = document.querySelector("#answer")
const addQuestion = document.querySelector("#newQuestion")
const updateQuestion = document.querySelector("#updateQuestion")
updateQuestion.style.display = 'none';
let QUESTION_TO_EDIT



console.log("app is running ")
const DATABASE_URI = "http://localhost:3000/questions"

// Get data from backend
const getQuestions = async () => {
  const response = await fetch(DATABASE_URI)
  const questions = await response.json();
  populateQuestions(questions)
  const editQuestion = document.querySelectorAll("#edit");

  const deleteQuestion = document.querySelectorAll("#delete");

  editQuestion.forEach(button => {
    button.addEventListener("click", ({
      path
    }) => {
      addQuestion.style.display = 'none';
      updateQuestion.style.display = 'unset';

      const questionToEdit = JSON.parse(path[2].dataset.questionoptions)
      QUESTION_TO_EDIT = questionToEdit
      question.value = questionToEdit.question
      optionOne.value = questionToEdit.option_1
      optionTwo.value = questionToEdit.option_2
      optionThree.value = questionToEdit.option_3
      optionFour.value = questionToEdit.option_4
      questionAnswer.value = questionToEdit.answer
    })
  })

  deleteQuestion.forEach(button =>
    button.addEventListener('click', async ({
      path
    }) => {
      const question = path[2];
      const {
        id
      } = JSON.parse(path[2].dataset.questionoptions);
      question.remove();

      await fetch(`${DATABASE_URI}/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      alert("Question deleted")
    })
  );
};


addQuestion.addEventListener('click', async (event) => {
  event.preventDefault();

  await fetch(DATABASE_URI, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: question.value,
      option_1: optionOne.value,
      option_2: optionTwo.value,
      option_3: optionThree.value,
      option_4: optionFour.value,
      answer: questionAnswer.value
    })
  });
  alert("Question added successfully")

});


updateQuestion.addEventListener('click', async (event) => {
  event.preventDefault();

  const {
    id
  } = QUESTION_TO_EDIT
  console.log(event.path)
  await fetch(`${DATABASE_URI}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: question.value,
      option_1: optionOne.value,
      option_2: optionTwo.value,
      option_3: optionThree.value,
      option_4: optionFour.value,
      answer: questionAnswer.value
    })
  });
  alert("Question successfully updated")
});



// Get data and populate page with data
const populateQuestions = questions => {
  const formatedQuestions = questions.sort((a, b) => b.id - a.id).map(formatQuestion)
  const displayQuestions = document.querySelector('.question-list');

  displayQuestions.innerHTML += formatedQuestions.join(" ")
}



// Get single contact data and format it
const formatQuestion = (questionOptions) => {
  const {
    id,
    question,
    option_1,
    option_2,
    option_3,
    option_4,
    answer
  } = questionOptions

  let displayAnswer = ""
  if (answer == 1) {
    displayAnswer = option_1
  } else if (answer == 2) {
    displayAnswer = option_2
  } else if (answer == 3) {
    displayAnswer = option_3
  } else {
    displayAnswer = option_4
  }

  return `
  <div id="game" class="justify-center flex-column" data-questionoptions='${JSON.stringify(questionOptions)}'>
  <h2 id="question">${question}</h2>
  <div class="option-container">
    <p class="option-prefix">A</p>
    <p class="option-text" data-number="1">${option_1}</p>
  </div>
  <div class="option-container">
    <p class="option-prefix">B</p>
    <p class="option-text" data-number="2">${option_2}</p>
  </div>
  <div class="option-container">
    <p class="option-prefix">C</p>
    <p class="option-text" data-number="3">${option_3}</p>
  </div>
  <div class="option-container">
    <p class="option-prefix">D</p>
    <p class="option-text" data-number="4">${option_4}</p>
  </div>
  <div class="option-container">
    
    <p class="option-text">${displayAnswer}</p>
  </div>
  <div class="btn-container">
    <button class="btn-small" id="edit" data-id="${id}">Edit</button>
    <button class="btn-small" id="delete" data-id="${id}">Delete</button>
  </div>
  </div>`
}

getQuestions()