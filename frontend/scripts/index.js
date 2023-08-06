// ******************************baseUrl**********************************************/

// const Base_Url = "http://localhost:8000/";

const Base_Url = "https://movieapp-1979.onrender.com/";

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

  // console.log(searchInput);

  try {
    fetch(`${Base_Url}movies/search`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(searchInput),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        ApiData = data.data;
        displayMovies(ApiData);
      });
  } catch (error) {
    console.log(error);
  }
});

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

  fetch(`${Base_Url}playlist/create`, {
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
        // alert("Playlist created successfully!");
        window.location.href = "./htmlFiles/playlist.html";
        // console.log(data);
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
  btn.style.background = "green";
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
  btn.style.background = "white";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// **************************************modal2 javascript********************************/

function showModal() {
  // btn.style.background = "green";
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

  // const playlistType2 = document.getElementById("playlistType2").value;

  // console.log("Playlist Type:", playlistType2);
  closeModal();
});

// ********************for getting list of public playlist And Private by select tag*********************/

let option = document.getElementById("playlistType2");

option.addEventListener("change", () => {
  let target = option.value;
  if (target == "PublicPlaylist") {
    fetch(`${Base_Url}playlist/${target}`)
      .then((res) => res.json())

      .then((data) => {
        // console.log(data.PublicPlaylist);

        if (!data.isError) {
          displayPlaylists(data.PublicPlaylist);
        } else {
          alert(data.message);
          playlistsContainer.innerHTML = null;
        }
      })
      .catch((err) => console.log(err));
  } else {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to view your playlists.");

      window.location.href = "./htmlFiles/login.html";
    }

    fetch(`${Base_Url}playlist/${target}`, {
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
  }
});

// *****************************display playlist in the table format*******************************/

const playlistNameEl = document.getElementById("playlistNameEl");

function displayPlaylists(playlists) {
  playlistNameEl.innerHTML = "";

  playlists.forEach((playlist) => {
    const playlistDiv = document.createElement("tr");

    playlistDiv.classList.add("playlist-item");

    playlistDiv.innerHTML = `
<tr>${playlist.name}</tr>
    `;

    playlistDiv.addEventListener("click", () => {
      playlistDiv.style.backgroundColor = "green";
      playlistDiv.style.cursor = "pointer";
      let id = playlist._id;
      let movie = JSON.parse(localStorage.getItem("movieData"));
      let obj = {
        Poster: movie.Poster,
        Title: movie.Title,
        Type: movie.Type,
        Year: movie.Year,
        imdbID: movie.imdbID,
      };
      console.log(movie);
      fetch(`${Base_Url}playlist/addMovie/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("movie added to playlist");
          window.location.href = "./index.html";
        });
    });

    playlistNameEl.appendChild(playlistDiv);
  });
}

//***************for paginated data************ */
let errmsgDiv = document.getElementById("errmsgDiv");
const moviesDiv = document.getElementById("container");
const paginationDiv = document.getElementById("PaginnationDiv");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentPage = 1;

const fetchMovies = async (page) => {
  try {
    const response = await fetch(`${Base_Url}movies/movie/?page=${page}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const displayMovies = (movies) => {
  moviesDiv.innerHTML = "";
  errmsgDiv.innerHTML = "";
  if (movies.length == 0) {
    let div = document.createElement("div");
    div.setAttribute("id", "errMsg");
    let h1 = document.createElement("h1");
    h1.setAttribute("id", "errMsgh1");
    h1.innerText = "Movie Not Found !!!";
    div.append(h1);
    errmsgDiv.append(div);
    paginationDiv.innerHTML = "";
  } else {
    movies.forEach((elem) => {
      // const movieDiv = document.createElement("div");
      // movieDiv.textContent = movie.Title;
      // moviesDiv.appendChild(movieDiv);
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
        localStorage.setItem("movieData", JSON.stringify(elem));
        showModal();
      });

      name.innerText = `Title: ${elem.Title}`;

      img.setAttribute("src", elem.Poster);

      date.innerText = `Year: ${elem.Year}`;

      div.append(imgDiv, pDiv, btn);

      moviesDiv.append(div);
    });
  }
};

const loadMovies = async (page) => {
  const movies = await fetchMovies(page);
  displayMovies(movies);
};

prevBtn.addEventListener("click", () => {
  currentPage = Math.max(1, currentPage - 1);
  loadMovies(currentPage);
});

nextBtn.addEventListener("click", () => {
  currentPage += 1;
  loadMovies(currentPage);
});

window.onload = loadMovies(currentPage);
