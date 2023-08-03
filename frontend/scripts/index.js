const movieSeacrhForm = document.querySelector("form");
let container = document.getElementById("container");

let ApiData = [];
movieSeacrhForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchInput = {
    query: movieSeacrhForm.search.value,
  };
  console.log(searchInput);
  if (!movieSeacrhForm.search.value) {
    getAllMovies();
  } else {
    try {
      fetch(`http://localhost:8000/movies/search`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(searchInput),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          ApiData = data.data;

          movieCard(ApiData);
        });
    } catch (error) {
      console.log(error);
    }
  }
});

function getAllMovies() {
  fetch(`http://localhost:8000/movies/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      ApiData = data.data;

      movieCard(ApiData);
    })
    .catch((error) => {
      console.log(error);
    });
}
window.onload = getAllMovies;

function movieCard(data) {
  container.innerHTML = "";
  data.map((elem) => {
    console.log(elem);
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "imgDiv");
    let img = document.createElement("img");
    img.setAttribute("class", "image");
    imgDiv.append(img);
    let pDiv = document.createElement("div");
    pDiv.setAttribute("class", "pDiv");
    let date = document.createElement("p");
    let name = document.createElement("p");
    pDiv.append(name, date);
    let btn = document.createElement("button");
    btn.innerText = "View";
    btn.addEventListener("click", () => {
      localStorage.setItem("MovieDetail", JSON.stringify(elem));
      window.location.href = "./htmlFiles/MovieDetail.html";
    });
    name.innerText = `Title: ${elem.Title}`;
    img.setAttribute("src", elem.Poster);
    date.innerText = `Year: ${elem.Year}`;
    div.append(imgDiv, pDiv, btn);
    container.append(div);
  });
}

let Login = document.getElementById("Login");
Login.addEventListener("click", () => {
  window.location.href = "./htmlFiles/login.html";
});

let currentuser = localStorage.getItem("token") || "";
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || "";
let userLogin = document.getElementById("userLogin");

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userDetails");
  location.href = "../index.html";
});
if (userDetails) {
  userLogin.innerText = userDetails.name;
  logoutBtn.style.visibility = "visible";
} else {
  logoutBtn.style.visibility = "hidden";
}

let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};
