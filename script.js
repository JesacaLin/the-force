"use strict";
//Selecting the DOM elements
const characterCard = document.querySelector(".characterCard");
const originCard = document.querySelector(".originCard");
const filmCard = document.querySelector(".filmCard");
const btn = document.querySelector(".btn");

//LOOK --> CHARACTER CARD
//Render characters to the character card
const renderCharacter = function (data) {
  // extract text of species from link
  let speciesName;
  fetch(data.species)
    .then((response) => response.json())
    .then((speciesData) => {
      speciesName = speciesData.name;
      //extra info of homeworld

      //render character data to the DOM.
      const html = `
      <section class="location">
        <strong class="characterName">Name: ${data.name}</strong>
        <strong class="birth_year">Birth Year: ${data.birth_year}</strong>
        <strong class="species">Species: ${speciesName}</strong>
        <strong class="gender">Gender: ${data.gender}</strong>
      </section>
      `;
      characterCard.insertAdjacentHTML("beforeend", html);
      //call to get homeworld data.
      getHomeworldData(data.homeworld);
      //call to get film data.
      getFilmData(data.films);
    });
};

//Generate a random person from the api
const maxCharacters = 87;

const randomGenerator = function (num) {
  return Math.floor(Math.random() * num) + 1;
};

//Fetching data from the characters endpoint.

const getCharacterData = function (person) {
  fetch(`https://swapi.dev/api/people/${randomGenerator(maxCharacters)}/`)
    //Create a promoise chain
    .then((response) => response.json())
    //Need to call the json method to unpack the data
    .then((data) => renderCharacter(data));
};
getCharacterData(randomGenerator(maxCharacters));
//Fetch homeworld data
// getHomeworldData(data.homeworld);
// getFilmData(data.films);

//LOOK ----> HOMEWORLD CARD
//Render homeworld info
const renderOrigin = function (data) {
  const originHTML = `
    <section class="originCard">
        <strong class="planetName">Planet Name: ${data.name}</strong>
        <strong class="population">Population: ${data.population}</strong>
        <strong class="terrain">Terrain: ${data.terrain}</strong>
      </section>
      `;
  originCard.insertAdjacentHTML("beforeend", originHTML);
};

const getHomeworldData = function (homeworld) {
  fetch(homeworld)
    .then((response) => response.json())
    .then((data) => renderOrigin(data));
};

//LOOK ----> FILM CARD
//Render film info
const renderFilms = function (data) {
  console.log(data);
  const filmHTML = `
    <section class="films">
        <strong class="title">Title: ${data.title}</strong>
        <strong class="director">Director: ${data.director}</strong>
        <strong class="release_date">Release Date:${data.release_date}</strong>
    </section>
    `;
  filmCard.insertAdjacentHTML("beforeend", filmHTML);
};

//Fetching data from the films endpoint.
const getFilmData = function (film) {
  film.forEach((film) => {
    fetch(film)
      .then((response) => response.json())
      .then((data) => renderFilms(data));
  });
};
