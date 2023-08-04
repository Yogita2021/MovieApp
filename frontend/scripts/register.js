// ******************************baseUrl**********************************************/

const Base_Url = "http://localhost:8000";

// ***************************Register  functionality***************************************/

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

  fetch(`${Base_Url}/user/register`, {
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
