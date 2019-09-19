const btnLogin = document.querySelector("form")

console.log(email);


console.log("app is running ")
const DATABASE_URI = "http://localhost:3000/users"

btnLogin.addEventListener('submit', async (event) => {
  const email = document.querySelector("#email").value
  const password = document.querySelector("#password").value

  event.preventDefault()
  const response = await fetch(`${DATABASE_URI}?email=${email}`);
  const [user] = await response.json();


  console.log(user)

  // const user = await users.find(user => {
  //   return user.email == email;
  // })

  console.log(user.email)

  if (!user) {
    alert("The email address that you've entered doesn't match any account. Sign up for an account.")
  } else if (password != user.password) {
    alert("The password you have entered is incorrect")
  } else {
    localStorage.setItem('user', JSON.stringify(user))

    user.userrole === "admin" ? window.location.assign('./admin/admin.html') :
      window.location.assign('./pages/dashboard.html')
  }

})