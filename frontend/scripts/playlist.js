const url = "http://localhost:8000";

const playlistsContainer = document.getElementById("playlists-container");

// Function to fetch playlists from the backend and display them

const privateBtn = document.getElementById("privateBtn");

privateBtn.addEventListener("click", async function privatePlaylists() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to view your playlists.");
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

publicBtn.addEventListener("click", async function viewPublicPlaylists() {
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
});
