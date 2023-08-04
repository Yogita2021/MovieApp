// ******************************baseUrl**********************************************/

const Base_Url = "http://localhost:8000";

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

/********************************For Search Selected Movies******************************* */

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

          ApiData = data.data;

          movieCard(ApiData);
        });
    } catch (error) {
      console.log(error);
    }
  }
});

//*******************************************get All the Movies************************** */
function getAllMovies() {
  fetch(`${Base_Url}/movies/`)
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

// ****************************************All Card created here*********************************/
function movieCard(data) {
  container.innerHTML = "";

  data.map((elem) => {
    // console.log(elem);

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
    btn.innerText = "Add To playlist";

    btn.addEventListener("click", () => {
      showModal();
    });

    name.innerText = `Title: ${elem.Title}`;

    img.setAttribute("src", elem.Poster);

    date.innerText = `Year: ${elem.Year}`;

    div.append(imgDiv, pDiv, btn);

    container.append(div);
  });
}
// ******************************Showing user details and logout functionality***********************/

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

/****************************************for Creating new playlists*********************** */

const createPlaylistBtn = document.getElementById("myBtn");

let playlistName = document.getElementById("playlistName");

let playlistType = document.getElementById("playlistType");

let playlistform = document.getElementById("playlistForm");

// console.log(playlistform);

playlistform.addEventListener("submit", (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to create a playlist.");
    return;
  }

  let obj = { name: playlistName.value, type: playlistType.value };

  // console.log(obj);

  fetch(`${Base_Url}/playlist/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },

    body: JSON.stringify(obj),
  })
    .then((res) => res.json())

    .then((data) => {
      if (!data.isErrer) {
        alert("Playlist created successfully!");
        // console.log(data);
        console.log("New Playlist:", data.playlist);
      } else {
        alert("Failed to create playlist.");
        return;
      }
    });
});

// *********************************** modal1 javascript*************************/

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

// **************************************modal2 javascript********************************/
function showModal() {
  const modal2 = document.getElementById("myModal2");

  modal2.style.display = "block";
}

function closeModal() {
  const modal2 = document.getElementById("myModal2");

  modal2.style.display = "none";
}

const playlistForm2 = document.getElementById("playlistForm2");

playlistForm2.addEventListener("submit", (event) => {
  event.preventDefault();

  const playlistName2 = document.getElementById("playlistName2").value;

  const playlistType2 = document.getElementById("playlistType2").value;

  console.log("Playlist Name:", playlistName2);

  console.log("Playlist Type:", playlistType2);

  closeModal();
});
