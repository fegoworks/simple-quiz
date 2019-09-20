const username = document.querySelector("#username")

const btnSignup = document.querySelector("form")

console.log("app is running ")
const DATABASE_URI = "http://localhost:3000/users"

btnSignup.addEventListener('submit', async (event) => {
  const email = document.querySelector("#email")
  const phone = document.querySelector("#phone")
  const password = document.querySelector("#password")
  event.preventDefault();

  const response = await fetch(`${DATABASE_URI}?email=${email.value}`);
  const [user] = await response.json();

  if (user) {
    alert("This email already exists. Please use another")
  } else {
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
  }

});