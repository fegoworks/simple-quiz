const username = document.querySelector("#username")
const email = document.querySelector("#email")
const phone = document.querySelector("#phone")
const password = document.querySelector("#password")
const btnSignup = document.querySelector("form")

console.log("app is running ")
const DATABASE_URI = "http://localhost:3000/users"

btnSignup.addEventListener('submit', async (event) => {
  event.preventDefault();

  await fetch(DATABASE_URI, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      userrole: "user",
      password: password.value,
      phone: phone.value
    })
  });

  window.location.assign('../index.html')
});