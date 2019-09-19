const username = document.querySelector("#username")
const saveScore = document.querySelector("#saveScore")
const finalScore = document.querySelector("#finalScore")

const recentScore = localStorage.getItem("recentScore")

finalScore.innerText = recentScore

// username.addEventListener("keyup", () => {
//   saveScore.disabled = !username.value
// })