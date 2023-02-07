"use strict";
//Selecting the DOM elements
let characterCard = document.querySelector(".characterCard");
let originCard = document.querySelector(".originCard");
let filmCard = document.querySelector(".filmCard");
const characterName = document.querySelector(".characterName");
const btn = document.querySelector(".btn");
const loading = document.querySelector(".loading");

//LOOK --> CHARACTER CARD
//Render characters to the character card
function renderCharacter(data, speciesName) {
  //render the name of the character to the dom
  characterName.innerHTML = `${data.name}`;

  //render character stats to the DOM.
  const html = `
      <div class="cardInfo">
      <ul>
      <h3>STATS</h3>
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
      <h3>HOME WORLD</h3>
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
  const filmHTML = `
      <div class="cardInfo">
      <ul>
      <h3>FILMS</h3>
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

//Fetching data from the characters endpoint.
async function getCharacterData() {
  try {
    //Generate a random person from the api
    const maxCharacters = 82;

    function randomGenerator(num) {
      let personNum = Math.floor(Math.random() * num) + 1;
      return personNum;
    }
    const res = await fetch(
      `https://swapi.dev/api/people/${randomGenerator(maxCharacters)}/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    //Validating that species is not an empty array.
    let speciesData = {};
    if (data.species && data.species.length === 1) {
      let speciesRes = await fetch(data.species);
      let speciesData = await speciesRes.json();
      renderCharacter(data, speciesData.name);
    } else {
      speciesData.name = "No data available";
      renderCharacter(data, speciesData.name);
    }
  } catch (error) {
    console.error(error);
    console.log(await res.text());
  }
}

//Fetching data from home world endpoint.
async function getHomeworldData(homeworld) {
  try {
    const res = await fetch(homeworld);
    const data = await res.json();
    renderOrigin(data);
  } catch (error) {
    console.error(error);
  }
}

//Fetching data from the films endpoint.
//use map method to fetch all film json data and create an array of promiese. then use Promise.all will wait for all of the promises to resolve, and retrieve the resolved values all at once.
async function getFilmData(films) {
  try {
    const filmData = await Promise.all(
      films.map(async (film) => {
        const res = await fetch(film);
        return res.json();
      })
    );
    //calling renderFilms for each of the values in the filmData array.
    filmData.forEach(renderFilms);
  } catch (error) {
    console.error(error);
  }
}

// clearing old data before adding new data
btn.addEventListener("click", function () {
  characterCard.innerHTML = "";
  originCard.innerHTML = "";
  filmCard.innerHTML = "";
  getCharacterData();
});
