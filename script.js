"use strict";
//Selecting the DOM elements
const characterCard = document.querySelector(".characterCard");
const originCard = document.querySelector(".originCard");
const filmCard = document.querySelector(".filmCard");
const characterName = document.querySelector(".characterName");
const btn = document.querySelector(".btn");

//LOOK --> CHARACTER CARD
//Render characters to the character card
function renderCharacter(data, speciesName) {
  //render the name of the character to the dom
  characterName.innerHTML = `${data.name}`;

  //render character stats to the DOM.
  const html = `
      <div class="cardInfo">
      <ul>
        <li><strong class="subTitle">Birth Year: </strong><span>${data.birth_year}</span></li>
        <li><strong class="subTitle">Species: </strong><span>${speciesName}</span></li>
        <li><strong class="subTitle">Gender: </strong><span>${data.gender}</span></li>
        <li><strong class="subTitle">Eye Color: </strong><span>${data.eye_color}</span></li>
      </ul>
        </div>
      `;
  characterCard.insertAdjacentHTML("beforeend", html);
  //call to get homeworld data.
  getHomeworldData(data.homeworld);
  //call to get film data.
  getFilmData(data.films);
}

//LOOK ----> HOMEWORLD CARD
//Render homeworld info
function renderOrigin(data) {
  const originHTML = `
    <div class="cardInfo">
      <ul>
          <li><strong class="subTitle">Planet Name: </strong><span>${data.name}</span></li>
          <li><strong class="subTitle">Orbital Period: </strong><span>${data.orbital_period}</span></li>
          <li><strong class="subTitle">Population: </strong><span>${data.population}</span></li>
          <li><strong class="subTitle">Terrain: </strong><span>${data.terrain}</span></li>
      </ul>
      </div>
        `;
  originCard.insertAdjacentHTML("beforeend", originHTML);
}

//LOOK ----> FILM CARD
//Render film info
function renderFilms(data) {
  console.log(data.title, data.director);
  const filmHTML = `
      <div class="cardInfo">
      <ul>
      <li><strong class="subTitle">Title: </strong><span>${data.title}</span></li>
      <li><strong class="subTitle">Director: </strong><span>${data.director}</span></li>
      <li><strong class="subTitle">Release Date: </strong><span>${data.release_date}</span></li>
      </ul>
      </div>
        `;
  //   console.log(filmHTML);
  filmCard.insertAdjacentHTML("beforeend", filmHTML);
}

//LOOK --> Fetching data from API

//Generate a random person from the api
const maxCharacters = 87;

function randomGenerator(num) {
  return Math.floor(Math.random() * num) + 1;
}

//Fetching data from the characters endpoint.
async function getCharacterData() {
  const res = await fetch(
    `https://swapi.dev/api/people/${randomGenerator(maxCharacters)}/`
  );
  const data = await res.json();
  //Fetch the name of the species from the link
  let speciesRes = await fetch(data.species);
  let speciesData = await speciesRes.json();
  renderCharacter(data, speciesData.name);
}
getCharacterData(randomGenerator(maxCharacters));

//Fetching data from home world endpoint.
async function getHomeworldData(homeworld) {
  const res = await fetch(homeworld);
  const data = await res.json();
  renderOrigin(data);
}

//Fetching data from the films endpoint.
//use map method to fetch all film json data and create an array of promiese. then use Promise.all will wait for all of the promises to resolve, and retrieve the resolved values all at once.
async function getFilmData(films) {
  const filmData = await Promise.all(
    films.map(async (film) => {
      const res = await fetch(film);
      return res.json();
    })
  );
  //calling renderFilms for each of the values in the filmData array.
  filmData.forEach(renderFilms);
}

// adding click event to button
btn.addEventListener("click", getCharacterData);
