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
window.onload(getAllMovies());

function movieCard(data) {
  container.innerHTML = "";
  data.map((elem) => {
    console.log(elem);
    let div = document.createElement("div");
    let img = document.createElement("img");
    let date = document.createElement("p");
    let name = document.createElement("p");
    name.innerText = `Title: ${elem.Title}`;
    img.setAttribute("src", elem.Poster);
    date.innerText = `Year: ${elem.Year}`;
    div.append(img, name, date);
    container.append(div);
  });
}
