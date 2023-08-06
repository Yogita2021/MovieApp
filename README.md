# [MovieApp]

It's a Movie App website in which user can create Public or private playlist , add movies into it and also see the particular playlist information.

**Frontend Deployed Link:** https://64cf474ddad64a26482baa0e--playful-macaron-7e59bc.netlify.app/

**Backend Deployed Link:** https://movieapp-1979.onrender.com/

## Tech Stack

**Client:** HTML | CSS | Javascript

**Server:** Node.js | Express.js

**Database:** MongoDB

**npm packages:** bcrypt | cors | dotev | express | jsonwebtoken | mongoose | node-fetch | nodemon

**github:** To maintain repository and collabration and version control.

**VS Code:** To write HTML,CSS and JavaScript code.

**Google Chrome :** To check the functionality and run the code.

# Getting Started

### Prerequisites

- npm
  ```sh
  npm install
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Yogita2021/MovieApp.git
   ```

2. Run api only

   ```sh
   npm start
   ```

3. Open http://localhost:8000 to backend run in the browser

## Frontend Part

- Home Page
- Login/Signup
- View Playlist Page

## Backend Part

- Authentication using JWT
- Routes for get all the movies, search movies by its title , create playlist , Add movie to the playlist , sign up and login ,get movies from  
  particular Playlist

## Database

- MongoDB

## Features

- User can able to login and signup
- User can search particular movie
- User can create both public and private playlists
- User can able to Add movie to the playlists
- User can see all the movies from particular playlist
- Only authorized user can see private playlist
- Responsive for mobile view

<br>

## Home Page

![image](./frontend/Images/homePage.png)

## Registeration Page

![image](./frontend/Images/register.png)

## Login Page

![image](./frontend/Images/login.png)

## Create Playlist

![image](./frontend/Images/createPlaylist.png)

## Add Movie to the playlist

![image](./frontend/Images/addToplaylist.png)

## View All the Playlist Information

![image](./frontend/Images/publicPlaylist.png)
