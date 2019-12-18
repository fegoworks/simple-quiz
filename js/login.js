const btnLogin = document.querySelector("form")

console.log(email);


console.log("app is running ")
const DATABASE_URI = "https://gist.githubusercontent.com/fegoworks/f2c5aea5e19bc333f5a08e0acf2041a7/raw/1304c2bd4740226ab417f5af55b454429238fc92/quizdb.json/"

btnLogin.addEventListener('submit', async (event) => {
  const email = document.querySelector("#email").value
  const password = document.querySelector("#password").value

  event.preventDefault()
  const response = await fetch(`${DATABASE_URI}`);
  const result = await response.json();
  const users = result.users;

  const user = await users.find(user => {
    return user.email == email;
  })

  // console.log(user.email)

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