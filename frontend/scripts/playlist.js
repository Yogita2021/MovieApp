// Navbar js

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
  localStorage.removeItem("token");
  location.href = "../index.html";
});
if (userDetails) {
  userLogin.innerText = userDetails.name;

  logoutBtn.style.visibility = "visible";
} else {
  logoutBtn.style.visibility = "hidden";
}

const url = "http://localhost:8000";

const playlistsContainer = document.getElementById("playlists-container");

// Function to fetch playlists from the backend and display them

const privateBtn = document.getElementById("privateBtn");

privateBtn.addEventListener("click", function privatePlaylists() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to view your playlists.");
    window.location.href = "../htmlFiles/login.html";
    return;
  }

  fetch(`${url}/playlist/privatePlaylist`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      console.log(data.PrivatePlaylist);
      if (!data.isError) {
        displayPlaylists(data.PrivatePlaylist);
      } else {
        alert("Failed to fetch PrivatePlaylist.");
      }
    })
    .catch((err) => console.log(err));
});

// Function to display playlists

function displayPlaylists(playlists) {
  playlistsContainer.innerHTML = "";

  playlists.forEach((playlist) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist-item");
    playlistDiv.innerHTML = `
      <h3>${playlist.name}</h3>
     
    `;
    //  <p>Type: ${playlist.type}</p>
    playlistsContainer.appendChild(playlistDiv);
  });
}
const publicBtn = document.getElementById("publicBtn");
// window.onload = viewPublicPlaylists;

publicBtn.addEventListener("click", viewPublicPlaylists);
function viewPublicPlaylists() {
  fetch(`${url}/playlist/PublicPlaylist`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      console.log(data.PublicPlaylist);
      if (!data.isError) {
        displayPlaylists(data.PublicPlaylist);
      } else {
        alert("Failed to fetch PublicPlaylist.");
      }
    })
    .catch((err) => console.log(err));
}
// by default all the movies
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

// window.onload = getAllMovies;
window.onload = function () {
  viewPublicPlaylists();
  getAllMovies();
};

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

    name.innerText = `Title: ${elem.Title}`;
    img.setAttribute("src", elem.Poster);
    date.innerText = `Year: ${elem.Year}`;
    div.append(imgDiv, pDiv, date);
    container.append(div);
  });
}
