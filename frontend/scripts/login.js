// ******************************baseUrl**********************************************/

const Base_Url = "http://localhost:8000";

// ***************************Login functionality***************************************/

const form = document.querySelector("form");

let email = document.getElementById("email");

let password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = {
    email: email.value,
    password: password.value,
  };

  fetch(`${Base_Url}/user/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("userDetails", JSON.stringify(data.user));

      // alert(data.msg);
      if (data.msg == "Login successful !") {
        window.location.href = "../index.html";
      }
      localStorage.setItem("token", data.token);
    })
    .catch((err) => console.log(err));
});
