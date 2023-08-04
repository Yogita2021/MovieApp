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
          // console.log(data);
          // console.log(data.data);
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

// ////modal///
const createPlaylistBtn = document.getElementById("myBtn");

// Function to create a playlist
let playlistName = document.getElementById("playlistName");
let playlistType = document.getElementById("playlistType");
let playlistform = document.getElementById("playlistForm");
console.log(playlistform);

playlistform.addEventListener("submit", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to create a playlist.");
    return;
  }
  let obj = { name: playlistName.value, type: playlistType.value };
  console.log(obj);

  fetch("http://localhost:8000/playlist/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    // Replace this with actual playlist data (e.g., name and type)
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.isErrer) {
        alert("Playlist created successfully!");
        console.log(data);
        console.log("New Playlist:", data.playlist);
      } else {
        alert("Failed to create playlist.");
      }
    });
});

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//
