const url = "http://localhost:8000";
const registration_url = `${url}/user/register`;
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

let nameEl = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = {
    name: nameEl.value,
    email: email.value,
    password: password.value,
  };

  fetch(`${registration_url}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(data.msg);
      if (data.msg == "New user registered !") {
        console.log("redirected");
        window.location.href = "../htmlFiles/login.html";
      }
    })
    .catch((err) => console.log(err));
});
