// ******************************baseUrl**********************************************/

// const Base_Url = "http://localhost:8000";

const Base_Url = "https://movieapp-1979.onrender.com/";

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
        localStorage.setItem("token", data.token);
        window.location.href = "../index.html";
      } else {
        alert("Invalid credential");
      }
    })
    .catch((err) => console.log(err));
});
