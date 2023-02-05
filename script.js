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
      <ul>
      <li><h3>CHARACTER</h3></li>
        <li><strong class="subTitle">Name: </strong><span>${data.name}</span></li>
        <li><strong class="subTitle">Birth Year: </strong><span>${data.birth_year}</span></li>
        <li><strong class="subTitle">Species: </strong><span>${speciesName}</span></li>
        <li><strong class="subTitle">Gender: </strong><span>${data.gender}</span></li>
      </ul>
   
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

//LOOK ----> HOMEWORLD CARD
//Render homeworld info
const renderOrigin = function (data) {
  const originHTML = `
  
    <ul>
        <li><h3>HOME WORLD</h3></li>
        <li><strong class="subTitle">Planet Name: </strong><span>${data.name}</span></li>
        <li><strong class="subTitle">Population: </strong><span>${data.population}</span></li>
        <li><strong class="subTitle">Terrain: </strong><span>${data.terrain}</span></li>
    </ul>
    
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
  const filmHTML = `
  <ul>
  <li><h3>FILMS:</h3></li>
  <li><strong class="subTitle">Title: </strong><span>${data.title}</span></li>
  <li><strong class="subTitle">Director: </strong><span>${data.director}</span></li>
  <li><strong class="subTitle">Release Date: </strong><span>${data.release_date}</span></li>
  </ul>
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
