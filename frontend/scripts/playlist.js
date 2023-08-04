/************************************Nav js for responsivness*********************** */

let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

// ******************************baseUrl**********************************************/

const Base_Url = "http://localhost:8000";

// ****************************navbar js for userDetails and logout functionality********************************/

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

// *****************************for getting private playlists*************************/

const playlistsContainer = document.getElementById("playlists-container");

const privateBtn = document.getElementById("privateBtn");

privateBtn.addEventListener("click", function privatePlaylists() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to view your playlists.");

    window.location.href = "../htmlFiles/login.html";
    return;
  }

  fetch(`${Base_Url}/playlist/privatePlaylist`, {
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

// ***********************************display function to show all the playlists******************/

function displayPlaylists(playlists) {
  playlistsContainer.innerHTML = "";

  playlists.forEach((playlist) => {
    const playlistDiv = document.createElement("div");

    playlistDiv.classList.add("playlist-item");

    playlistDiv.innerHTML = `
      <h3>${playlist.name}</h3>
     
    `;

    playlistsContainer.appendChild(playlistDiv);
  });
}

// ****************************** for getting public playlist***************************/

const publicBtn = document.getElementById("publicBtn");

publicBtn.addEventListener("click", viewPublicPlaylists);

function viewPublicPlaylists() {
  fetch(`${Base_Url}/playlist/PublicPlaylist`)
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

// *******************************getting Default movies*******************************/

function getAllMovies() {
  fetch(`${Base_Url}/movies/`)
    .then((res) => res.json())

    .then((data) => {
      // console.log(data);

      ApiData = data.data;

      movieCard(ApiData);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.onload = function () {
  viewPublicPlaylists();
  getAllMovies();
};

// ************************************display movie card************************************/
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

    name.innerText = `Title: ${elem.Title}`;

    img.setAttribute("src", elem.Poster);

    date.innerText = `Year: ${elem.Year}`;

    div.append(imgDiv, pDiv, date, btn);

    container.append(div);
  });
}

// *********************************Search movie*********************************************/

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
    fetch(`${Base_Url}/movies/search`, {
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
      })
      .catch((error) => connsole.log(error));
  }
});
